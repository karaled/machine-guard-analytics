import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Home, Info, Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const API_BASE_URL = "https://machineguard-backend.onrender.com";

type HealthState = "checking" | "ready" | "offline";

const navigation = [
  { to: "/" as const, label: "Home", icon: Home },
  { to: "/assessment" as const, label: "Prediction\u00a0", icon: Activity },
  { to: "/about" as const, label: "About", icon: Info },
];

const pageTitles: Record<string, string> = {
  "/": "Operations Overview",
  "/assessment": "Machine Prediction",
  "/about": "System Information",
};

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [health, setHealth] = useState<HealthState>("checking");

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 4000);

    fetch(`${API_BASE_URL}/health`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Health request failed");
        const data = (await response.json()) as {
          status?: string;
          model_loaded?: boolean;
          preprocessor_loaded?: boolean;
        };
        setHealth(
          data.status === "ok" && data.model_loaded === true && data.preprocessor_loaded === true
            ? "ready"
            : "offline",
        );
      })
      .catch(() => setHealth("offline"))
      .finally(() => window.clearTimeout(timer));

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const statusLabel = health === "checking" ? "Checking Service" : health === "ready" ? "System Ready" : "Service Offline";

  return (
    <div className="min-h-screen bg-background">
      {menuOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-overlay lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-24 items-center justify-between border-b border-sidebar-border px-7">
          <Link to="/" className="flex items-center gap-3" aria-label="MachineGuard home">
            <span className="grid size-10 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
              <ShieldCheck size={22} strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-base font-bold tracking-[0.08em]">MACHINEGUARD</span>
              <span className="block text-[11px] font-medium text-sidebar-muted">Predictive Maintenance</span>
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-8" aria-label="Primary navigation">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-sidebar-muted">Workspace</p>
          <div className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="flex h-12 items-center gap-3 rounded-md px-3 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-sidebar-border p-5">
          <div className="rounded-md border border-sidebar-border bg-sidebar-panel px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={`size-2 rounded-full ${health === "ready" ? "bg-status-ready" : health === "offline" ? "bg-status-danger" : "bg-status-pending animate-pulse"}`} />
              {statusLabel}
            </div>
            <p className="mt-1.5 text-[11px] leading-4 text-sidebar-muted">
              {health === "ready" ? "Model and preprocessor online" : health === "offline" ? "Prediction service unavailable" : "Verifying prediction service"}
            </p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-card/95 px-5 backdrop-blur md:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
              <Menu size={20} />
            </Button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">MachineGuard</p>
              <h1 className="text-base font-semibold text-foreground md:text-lg">{pageTitles[pathname] ?? "MachineGuard"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground">
            <span className={`size-2 rounded-full ${health === "ready" ? "bg-status-ready" : health === "offline" ? "bg-status-danger" : "bg-status-pending animate-pulse"}`} />
            <span className="hidden sm:inline">{statusLabel}</span>
          </div>
        </header>
        <main className="page-enter">{children}</main>
      </div>
    </div>
  );
}