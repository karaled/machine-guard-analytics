import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertCircle, ArrowRight, LoaderCircle, Settings2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { PredictionResult, type AssessmentValues, type Prediction } from "@/components/prediction-result";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/assessment")({
  head: () => ({ meta: [
    { title: "Machine Failure Assessment — MachineGuard" },
    { name: "description", content: "Submit current industrial machine parameters to the connected ML model for failure-risk assessment." },
    { property: "og:title", content: "Machine Failure Assessment — MachineGuard" },
    { property: "og:description", content: "Assess machine operating parameters and receive model-generated maintenance guidance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AssessmentPage,
});

type FormState = Record<keyof AssessmentValues, string>;
const initialForm: FormState = { type: "", air_temperature: "", process_temperature: "", rotational_speed: "", torque: "", tool_wear: "" };
const fields = [
  { key: "air_temperature" as const, label: "Air Temperature", unit: "K", placeholder: "e.g. 298.1", min: 0, step: "0.1" },
  { key: "process_temperature" as const, label: "Process Temperature", unit: "K", placeholder: "e.g. 308.6", min: 0, step: "0.1" },
  { key: "rotational_speed" as const, label: "Rotational Speed", unit: "rpm", placeholder: "e.g. 1551", min: 0, step: "1" },
  { key: "torque" as const, label: "Torque", unit: "Nm", placeholder: "e.g. 42.8", min: 0, step: "0.1" },
  { key: "tool_wear" as const, label: "Tool Wear", unit: "min", placeholder: "e.g. 100", min: 0, step: "1" },
];

function AssessmentPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [submittedValues, setSubmittedValues] = useState<AssessmentValues | null>(null);

  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!form.type || fields.some((field) => form[field.key] === "")) {
      setError("Please complete all machine parameters before running the assessment.");
      return;
    }

    const values: AssessmentValues = {
      type: form.type as AssessmentValues["type"],
      air_temperature: Number(form.air_temperature), process_temperature: Number(form.process_temperature),
      rotational_speed: Number(form.rotational_speed), torque: Number(form.torque), tool_wear: Number(form.tool_wear),
    };
    if (Object.values(values).some((value) => typeof value === "number" && (!Number.isFinite(value) || value < 0))) {
      setError("Enter valid non-negative numbers for every operating parameter.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const apiMessage = data && typeof data === "object" && "error" in data && typeof data.error === "string" ? data.error : "The prediction service returned an error. Please review your inputs and try again.";
        throw new Error(apiMessage);
      }
      if (!isPrediction(data)) throw new Error("The prediction service returned an unexpected response.");
      setPrediction(data); setSubmittedValues(values);
    } catch (caught) {
      if (caught instanceof TypeError) setError("Unable to connect to the prediction service. Please make sure the Flask backend is running on port 5000.");
      else setError(caught instanceof Error ? caught.message : "The assessment could not be completed.");
    } finally { setLoading(false); }
  }

  function reset() { setPrediction(null); setSubmittedValues(null); setError(null); setForm(initialForm); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:px-10 lg:py-12">
      <div className="mb-9 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Live model evaluation</p><h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Machine Failure Assessment</h2><p className="mt-3 text-base leading-7 text-muted-foreground">Enter the current operating parameters of the machine to generate a failure-risk prediction.</p></div>
      {prediction && submittedValues ? <PredictionResult prediction={prediction} values={submittedValues} onReset={reset} /> : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <form onSubmit={submit} className="border border-border bg-card shadow-sm">
            <div className="flex items-center gap-3 border-b border-border px-6 py-5 md:px-8"><span className="grid size-10 place-items-center rounded-md bg-primary-soft text-primary"><Settings2 size={20} /></span><div><h3 className="font-bold">Operating Parameters</h3><p className="text-xs text-muted-foreground">All six values are required</p></div></div>
            <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
              <label className="block"><span className="mb-2 flex items-center justify-between text-sm font-semibold">Machine Type <span className="text-xs font-medium text-muted-foreground">Category</span></span><select required value={form.type} onChange={(e) => update("type", e.target.value)} className="h-12 w-full rounded-md border border-input bg-card px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"><option value="" disabled>Select machine type</option><option value="L">L — Low</option><option value="M">M — Medium</option><option value="H">H — High</option></select></label>
              {fields.map((field) => <label key={field.key} className="block"><span className="mb-2 flex items-center justify-between text-sm font-semibold">{field.label} <span className="text-xs font-medium text-muted-foreground">{field.unit}</span></span><div className="relative"><input required type="number" min={field.min} step={field.step} value={form[field.key]} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder} className="h-12 w-full rounded-md border border-input bg-card px-3 pr-14 text-sm outline-none transition placeholder:text-muted-foreground/65 focus:border-primary focus:ring-2 focus:ring-primary/15" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-muted-foreground">{field.unit}</span></div></label>)}
            </div>
            {error && <div className="mx-6 mb-1 flex gap-3 border border-destructive/30 bg-danger-soft p-4 text-sm text-destructive md:mx-8" role="alert"><AlertCircle className="mt-0.5 shrink-0" size={18} /><p>{error}</p></div>}
            <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/45 px-6 py-5 md:px-8"><p className="hidden text-xs text-muted-foreground sm:block">Values are sent securely to the configured Flask service.</p><Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">{loading ? <><LoaderCircle className="animate-spin" size={17} />Assessing machine condition...</> : <>Run Failure Assessment <ArrowRight size={17} /></>}</Button></div>
          </form>
          <aside className="space-y-4">
            <div className="border border-border bg-secondary p-6 text-secondary-foreground shadow-sm"><Activity size={24} className="text-sidebar-primary" /><h3 className="mt-5 font-bold">Assessment Process</h3><p className="mt-2 text-sm leading-6 text-sidebar-muted">Your inputs are processed by the saved pipeline, then evaluated by the trained prediction model.</p></div>
            <div className="border border-border bg-card p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Important</p><p className="mt-3 text-sm leading-6 text-muted-foreground">MachineGuard provides decision support. Always follow site safety procedures and qualified maintenance guidance.</p></div>
          </aside>
        </div>
      )}
    </div>
  );
}

function isPrediction(value: unknown): value is Prediction {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (item.failure === 0 || item.failure === 1) && typeof item.failure_probability === "number" && Number.isFinite(item.failure_probability) && typeof item.recommendation === "string";
}