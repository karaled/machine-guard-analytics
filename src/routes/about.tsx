import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Box, Braces, Cpu, Database, Gauge, Network, Server, ShieldCheck, Thermometer, Timer, Wrench } from "lucide-react";

import machineImage from "@/assets/machineguard-cnc.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About MachineGuard — System Architecture" },
    { name: "description", content: "Learn how MachineGuard connects React, Flask, preprocessing, and machine learning for industrial risk assessment." },
    { property: "og:title", content: "About MachineGuard — System Architecture" },
    { property: "og:description", content: "Explore the architecture, technologies, and operating inputs behind MachineGuard." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

const architecture = [
  ["Industrial Machine Parameters", Gauge], ["React Frontend", Braces], ["Flask API", Server], ["Data Preprocessor", Database],
  ["ML Prediction Model", Cpu], ["Failure Risk Assessment", ShieldCheck], ["Maintenance Recommendation", Wrench],
] as const;
const technologies = [["Frontend", "React", Braces], ["Backend", "Python Flask", Server], ["Machine Learning", "Scikit-learn", Cpu], ["Data Processing", "Pandas / NumPy", Database], ["Model Persistence", "Joblib", Box]] as const;
const parameters = [["Machine Type", "L / M / H", Network], ["Air Temperature", "Kelvin", Thermometer], ["Process Temperature", "Kelvin", Thermometer], ["Rotational Speed", "RPM", Gauge], ["Torque", "Newton-meter", Wrench], ["Tool Wear", "Minutes", Timer]] as const;

function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-card px-6 py-14 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">System briefing</p><h2 className="mt-2 text-4xl font-extrabold">About MachineGuard</h2><p className="mt-4 text-lg leading-8 text-muted-foreground">An intelligent predictive maintenance application for industrial machine risk assessment.</p></div>
      </section>

      <section className="grid gap-10 px-6 py-16 md:px-10 lg:px-14 xl:grid-cols-[0.9fr_1.1fr] xl:px-20">
        <div><SectionLabel number="01" text="Project Overview" /><h3 className="mt-5 text-3xl font-bold leading-tight">Machine intelligence for informed maintenance.</h3></div>
        <div className="space-y-5 text-base leading-8 text-muted-foreground"><p>MachineGuard uses machine operating parameters and a trained machine-learning model to estimate whether a machine is at risk of failure.</p><p>The system is designed to support preventive maintenance by providing an early risk indication and maintenance guidance.</p></div>
      </section>

      <section className="border-y border-border bg-card px-6 py-16 md:px-10 lg:px-14 xl:px-20">
        <SectionLabel number="02" text="System Architecture" />
        <div className="mt-9 grid gap-2 md:grid-cols-4 xl:grid-cols-7">
          {architecture.map(([label, Icon], index) => <div key={label} className="relative flex min-h-32 flex-col items-center justify-center border border-border bg-background p-4 text-center shadow-sm"><Icon size={22} className="text-primary" /><p className="mt-3 text-sm font-semibold leading-5">{label}</p>{index < architecture.length - 1 && <span className="absolute -bottom-5 z-10 grid size-8 place-items-center rounded-full border border-border bg-card text-muted-foreground md:-right-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:-rotate-90"><ArrowDown size={15} /></span>}</div>)}
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-14 xl:px-20">
        <SectionLabel number="03" text="Technology Stack" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{technologies.map(([group, name, Icon]) => <article key={group} className="border-t-2 border-primary bg-card p-5 shadow-sm"><Icon size={21} className="text-primary" /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{group}</p><h3 className="mt-1 font-bold">{name}</h3></article>)}</div>
      </section>

      <section className="border-y border-border bg-card px-6 py-16 md:px-10 lg:px-14 xl:px-20">
        <div className="grid gap-12 xl:grid-cols-[1fr_0.9fr]">
          <div><SectionLabel number="04" text="Model Inputs" /><div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">{parameters.map(([name, unit, Icon]) => <div key={name} className="flex items-center gap-4 bg-card p-5"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"><Icon size={19} /></span><div><h3 className="text-sm font-bold">{name}</h3><p className="mt-1 text-xs text-muted-foreground">{unit}</p></div></div>)}</div></div>
          <div><SectionLabel number="05" text="Purpose" /><h3 className="mt-6 text-2xl font-bold">What is Predictive Maintenance?</h3><p className="mt-4 text-base leading-8 text-muted-foreground">Predictive maintenance uses machine data and analytical or machine-learning techniques to identify possible abnormal or failure conditions, helping teams plan maintenance before unexpected downtime.</p></div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-14 xl:px-20">
        <div className="relative min-h-[360px] overflow-hidden bg-secondary text-secondary-foreground shadow-sm">
          <img src={machineImage} alt="CNC machine and robotic manufacturing equipment" loading="lazy" width={1536} height={1024} className="absolute inset-0 size-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-secondary)_0%,var(--color-secondary)_42%,transparent_100%)]" />
          <div className="relative flex min-h-[360px] max-w-xl flex-col justify-center p-8 md:p-12"><ShieldCheck size={34} className="text-sidebar-primary" /><p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-sidebar-muted">Project Highlight</p><h2 className="mt-2 text-4xl font-extrabold">MachineGuard</h2><p className="mt-4 text-xl font-semibold">Predict → Assess → Maintain</p><p className="mt-4 text-sm leading-6 text-sidebar-muted">A transparent workflow from operating data to practical maintenance guidance.</p></div>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ number, text }: { number: string; text: string }) {
  return <div className="flex items-center gap-3"><span className="font-mono text-xs font-bold text-primary">{number}</span><span className="h-px w-8 bg-border" /><p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{text}</p></div>;
}