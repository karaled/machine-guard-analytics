import { AlertTriangle, CheckCircle2, ClipboardList, RotateCcw, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";

export type AssessmentValues = {
  type: "L" | "M" | "H";
  air_temperature: number;
  process_temperature: number;
  rotational_speed: number;
  torque: number;
  tool_wear: number;
};

export type Prediction = {
  failure: 0 | 1;
  failure_probability: number;
  recommendation: string;
};

export function PredictionResult({ prediction, values, onReset }: { prediction: Prediction; values: AssessmentValues; onReset: () => void }) {
  const hasRisk = prediction.failure === 1;
  const Icon = hasRisk ? AlertTriangle : CheckCircle2;
  const rows = [
    ["Machine Type", values.type],
    ["Air Temperature", `${values.air_temperature} K`],
    ["Process Temperature", `${values.process_temperature} K`],
    ["Rotational Speed", `${values.rotational_speed} rpm`],
    ["Torque", `${values.torque} Nm`],
    ["Tool Wear", `${values.tool_wear} min`],
  ];

  return (
    <div className="space-y-5" aria-live="polite">
      <section className={`overflow-hidden border bg-card shadow-sm ${hasRisk ? "border-destructive/40" : "border-success/40"}`}>
        <div className={`flex items-center gap-3 border-b px-6 py-4 ${hasRisk ? "border-destructive/20 bg-danger-soft text-destructive" : "border-success/20 bg-success-soft text-success"}`}>
          <Icon size={20} /><p className="text-xs font-extrabold uppercase tracking-[0.14em]">{hasRisk ? "Failure Risk Detected" : "Prediction Complete"}</p>
        </div>
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-extrabold uppercase text-foreground md:text-3xl">{hasRisk ? "Maintenance Attention Recommended" : "Normal Operation"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{hasRisk ? "The model identified a potential failure condition." : "No failure predicted."}</p>
          <div className="mt-8">
            <div className="flex items-end justify-between gap-4"><p className="text-sm font-semibold">Model Failure Probability</p><p className={`text-3xl font-extrabold ${hasRisk ? "text-destructive" : "text-success"}`}>{prediction.failure_probability}%</p></div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Model failure probability" aria-valuenow={prediction.failure_probability} aria-valuemin={0} aria-valuemax={100}>
              <div className={`h-full rounded-full ${hasRisk ? "bg-destructive" : "bg-success"}`} style={{ width: `${Math.min(100, Math.max(0, prediction.failure_probability))}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Model output for the submitted operating conditions; not a guarantee of machine failure.</p>
          </div>
          <div className="mt-8 border-l-2 border-primary bg-primary-soft p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground"><Wrench size={18} className="text-primary" />Maintenance Guidance</div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{prediction.recommendation}</p>
          </div>
        </div>
      </section>

      <section className="border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-2"><ClipboardList size={19} className="text-primary" /><h2 className="text-lg font-bold">Assessment Summary</h2></div>
        <div className="mt-5 overflow-hidden border border-border">
          {rows.map(([label, value], index) => <div key={label} className={`grid grid-cols-[1.2fr_1fr] px-4 py-3 text-sm ${index !== rows.length - 1 ? "border-b border-border" : ""}`}><span className="text-muted-foreground">{label}</span><span className="font-semibold text-foreground">{value}</span></div>)}
        </div>
        <Button variant="secondary" className="mt-6" onClick={onReset}><RotateCcw size={17} />Run New Assessment</Button>
      </section>
    </div>
  );
}