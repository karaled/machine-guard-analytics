# ⚙️ MachineGuard

### Predictive Maintenance System for Industrial Machines

An AI-based application that predicts industrial machine failure risk using operating parameters and provides maintenance recommendations.

---

## 📌 Project Overview

MachineGuard is an AI-based predictive maintenance application that integrates a web interface with a Python-based Machine Learning backend. It analyzes machine operating parameters to generate failure predictions and support maintenance decision-making.

## ✨ Key Features

* **Machine Failure Prediction** — Classifies machine conditions as normal or at risk of failure.
* **Parameter Analysis** — Processes six machine operating parameters.
* **Failure Probability** — Displays the probability returned by the prediction model.
* **Maintenance Recommendations** — Provides guidance based on the prediction result.
* **Interactive Interface** — Enables users to enter parameters and view assessment results.
* **ML Integration** — Connects the frontend to a Flask backend for prediction.

## 🛠️ Technology Stack

| Component           | Technologies                             |
| ------------------- | ---------------------------------------- |
| Frontend            | React, TypeScript (TSX), CSS             |
| Backend             | Python, Flask                            |
| Machine Learning    | Scikit-learn                             |
| Data Processing     | Pandas, NumPy                            |
| Model Serialization | Joblib                                   |
| Dataset             | AI4I 2020 Predictive Maintenance Dataset |

## 📂 Dataset

The project uses the **AI4I 2020 Predictive Maintenance Dataset** from the UCI Machine Learning Repository, containing machine operating parameters and failure-related labels.

🔗 [View Dataset](https://archive.ics.uci.edu/dataset/601/ai4i+2020+predictive+maintenance+dataset)

## 🎛️ Input Parameters

| Parameter               | Description                   |
| ----------------------- | ----------------------------- |
| Machine Type            | L, M, or H                    |
| Air Temperature [K]     | Ambient air temperature       |
| Process Temperature [K] | Machine process temperature   |
| Rotational Speed [rpm]  | Machine rotational speed      |
| Torque [Nm]             | Torque applied to the machine |
| Tool Wear [min]         | Accumulated tool wear         |

## 🔄 System Workflow

1. User enters machine operating parameters.
2. Frontend sends the data to the Flask backend.
3. Backend preprocesses the input.
4. Trained ML model generates a prediction.
5. Application displays the prediction, probability, and maintenance recommendation.

## 🏗️ System Architecture

```text
          User
            |
            v
   React + TypeScript
     Web Interface
            |
            v
        Flask API
            |
            v
   Input Preprocessing
            |
            v
     Trained ML Model
            |
            v
    Failure Prediction
            |
            v
  Probability & Maintenance
       Recommendation
            |
            v
    Results Interface
```

## 📁 Project Structure

```text
MachineGuard/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app.py
│   ├── predictive_model.pkl
│   ├── preprocessor.pkl
│   └── requirements.txt
└── README.md
```

*Note: The directory structure is illustrative; actual paths may vary.*

## 📊 Expected Output

* **Normal Operation** — The model predicts no failure for the submitted input.
* **Failure Risk Detected** — The model predicts a machine failure.
* **Failure Probability** — Displays the probability returned by the backend.
* **Maintenance Recommendation** — Provides guidance based on the prediction.

---

**MachineGuard | AI • Machine Learning • Predictive Maintenance**

