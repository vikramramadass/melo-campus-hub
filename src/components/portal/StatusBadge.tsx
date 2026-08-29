import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "accent" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground ring-border",
  primary: "bg-primary/10 text-primary ring-primary/20",
  accent: "bg-accent/15 text-accent-foreground ring-accent/25",
  success: "bg-success/12 text-success ring-success/25",
  warning: "bg-warning/18 text-warning-foreground ring-warning/30",
  danger: "bg-destructive/10 text-destructive ring-destructive/25",
};

export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  switch (status) {
    case "graded":
    case "submitted":
    case "active":
    case "published":
      return "success";
    case "pending":
    case "late":
    case "draft":
      return "warning";
    case "detained":
    case "overdue":
      return "danger";
    case "alumni":
      return "primary";
    default:
      return "neutral";
  }
}
