from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import traceback
import os
from dotenv import load_dotenv
from supabase import create_client, Client

BASE_DIR = Path(__file__).resolve().parent


load_dotenv(dotenv_path=BASE_DIR / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def save_prediction(data, prediction, probability):
    supabase.table("predictions").insert({
        "machine_type": str(data["type"]).upper(),
        "air_temperature": float(data["air_temperature"]),
        "process_temperature": float(data["process_temperature"]),
        "rotational_speed": float(data["rotational_speed"]),
        "torque": float(data["torque"]),
        "tool_wear": float(data["tool_wear"]),
        "prediction": prediction,
        "failure_probability": probability
    }).execute()

MODEL_DIR = BASE_DIR / "model"

MODEL_PATH = MODEL_DIR / "predictive_model.pkl"
PREPROCESSOR_PATH = MODEL_DIR / "preprocessor.pkl"

app = Flask(__name__)
CORS(app)
model = None
preprocessor = None

def load_artifacts():
    global model, preprocessor
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model not found: {MODEL_PATH}")
    if not PREPROCESSOR_PATH.exists():
        raise FileNotFoundError(f"Preprocessor not found: {PREPROCESSOR_PATH}")

    model = joblib.load(MODEL_PATH)
    preprocessor = joblib.load(PREPROCESSOR_PATH)

load_artifacts()

def build_input(data):
    required = [
        "type", "air_temperature", "process_temperature",
        "rotational_speed", "torque", "tool_wear"
    ]

    missing = [key for key in required if key not in data or data[key] in ("", None)]
    if missing:
        raise ValueError("Missing fields: " + ", ".join(missing))

    row = pd.DataFrame([{
        "Type": str(data["type"]).upper(),
        "Air temperature [K]": float(data["air_temperature"]),
        "Process temperature [K]": float(data["process_temperature"]),
        "Rotational speed [rpm]": float(data["rotational_speed"]),
        "Torque [Nm]": float(data["torque"]),
        "Tool wear [min]": float(data["tool_wear"])
    }])

    return row

@app.get("/health")
def health():
    return jsonify({
        "status": "ok",
        "model_loaded": model is not None,
        "preprocessor_loaded": preprocessor is not None
    })

@app.post("/predict")
def predict():
    try:
        data = request.get_json(force=True)
        input_df = build_input(data)

        # The saved preprocessor handles the same raw input format used during training.
        processed = preprocessor.transform(input_df)
        prediction = int(model.predict(processed)[0])

        probability = None
        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(processed)[0]
            classes = list(model.classes_)
            if 1 in classes:
                probability = float(probabilities[classes.index(1)]) * 100
            else:
                probability = float(max(probabilities)) * 100

        probability = round(probability, 2) if probability is not None else 0.0

        save_prediction(data, prediction, probability)

        if prediction == 1:
            recommendation = (
                "Inspect the machine before the next operating cycle. "
                "Check tool wear, torque, temperature and rotational speed, "
                "and schedule preventive maintenance if abnormal conditions persist."
            )
        else:
            recommendation = (
                "Continue normal monitoring. Keep recording operating parameters "
                "and follow the planned preventive-maintenance schedule."
            )

        return jsonify({
            "failure": prediction,
            "failure_probability": probability,
            "recommendation": recommendation
        })

    except Exception as exc:
        traceback.print_exc()
        return jsonify({"error": str(exc)}), 500

if __name__ == "__main__":
    try:
        load_artifacts()
        print("Model and preprocessor loaded successfully.")
    except Exception as exc:
        print("\nERROR while loading model files:")
        print(exc)
        print("\nExpected files:")
        print(MODEL_PATH)
        print(PREPROCESSOR_PATH)
        raise

    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)