import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";

/* ---------------------------------- Page ---------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="animate-rise flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {description ? <p className="max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  actions,
  children,
  className,
  padded = true,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <Card className={cn("gap-0 overflow-hidden border-border/80 py-0 shadow-panel", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-surface/60 px-5 py-4">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="mt-0.5 grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" aria-hidden />
            </span>
          ) : null}
          <div>
            <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
            {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
          </div>
        </div>
        {actions}
      </div>
      <CardContent className={cn(padded ? "p-5" : "p-0")}>{children}</CardContent>
    </Card>
  );
}

/* ---------------------------------- Stats --------------------------------- */

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: "default" | "accent" | "success" | "warning";
}) {
  const tones = {
    default: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent-foreground",
    success: "bg-success/12 text-success",
    warning: "bg-warning/18 text-warning-foreground",
  } as const;

  return (
    <Card className="animate-rise gap-0 border-border/80 py-0 shadow-panel transition-shadow hover:shadow-lift">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-semibold tabular-nums">{value}</p>
          {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", tones[tone])}>
          <Icon className="size-5" aria-hidden />
        </span>
      </CardContent>
    </Card>
  );
}

/* ------------------------------ Empty / Loading ---------------------------- */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface/50 px-6 py-14 text-center">
      <span className="grid size-11 place-items-center rounded-xl bg-muted text-muted-foreground">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mx-auto max-w-sm text-xs text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function LoadingRows({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-9 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-3 w-14" />
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- Progress -------------------------------- */

export function MeterBar({ percent, tone }: { percent: number; tone?: "success" | "warning" | "destructive" }) {
  const resolved = tone ?? (percent >= 85 ? "success" : percent >= 75 ? "warning" : "destructive");
  const colors = {
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
  } as const;
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={cn("h-full rounded-full transition-all", colors[resolved])} style={{ width: `${percent}%` }} />
    </div>
  );
}

/* ------------------------------- Quick links ------------------------------ */

export function QuickLink({
  to,
  label,
  description,
  icon: Icon,
}: {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-3 rounded-xl border border-border/80 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="grid size-9 place-items-center rounded-lg bg-surface text-primary transition-colors group-hover:bg-primary/10">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="space-y-0.5">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
      </span>
    </Link>
  );
}
