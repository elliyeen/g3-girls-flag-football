import { cn } from "@/lib/utils";

const COLOR: Record<string, string> = {
  on_track:  "bg-jade",
  at_risk:   "bg-gold",
  off_track: "bg-crimson",
  on_hold:   "bg-muted",
  completed: "bg-steel",
  // milestones / risks
  complete:     "bg-jade",
  in_progress:  "bg-steel",
  not_started:  "bg-muted",
  overdue:      "bg-crimson",
  blocked:      "bg-crimson",
  open:         "bg-gold",
  mitigating:   "bg-steel",
  escalated:    "bg-crimson",
  accepted:     "bg-muted",
  closed:       "bg-jade",
};

export function StatusDot({
  status, size = "sm", pulse = false,
}: {
  status: string;
  size?:  "xs" | "sm" | "md";
  pulse?: boolean;
}) {
  const sz = size === "xs" ? "size-1.5" : size === "sm" ? "size-2" : "size-2.5";
  const bg = COLOR[status] ?? "bg-subtle";
  return (
    <span className={cn("rounded-full inline-block shrink-0", sz, bg,
      pulse && status !== "complete" && status !== "closed" && "animate-pulse"
    )} />
  );
}

export function StatusBadge({ status }: { status: string }) {
  const LABEL: Record<string, string> = {
    on_track: "On Track", at_risk: "At Risk", off_track: "Off Track",
    on_hold: "On Hold", completed: "Completed", complete: "Complete",
    in_progress: "In Progress", not_started: "Not Started",
    overdue: "Overdue", blocked: "Blocked",
    open: "Open", mitigating: "Mitigating", escalated: "Escalated",
    accepted: "Accepted", closed: "Closed",
  };
  const TEXT: Record<string, string> = {
    on_track: "text-jade", at_risk: "text-gold", off_track: "text-crimson",
    on_hold: "text-subtle", completed: "text-steel", complete: "text-jade",
    in_progress: "text-steel", not_started: "text-muted",
    overdue: "text-crimson", blocked: "text-crimson",
    open: "text-gold", mitigating: "text-steel", escalated: "text-crimson",
    accepted: "text-subtle", closed: "text-jade",
  };
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-[11px] font-medium",
      TEXT[status] ?? "text-subtle"
    )}>
      <StatusDot status={status} size="xs" />
      {LABEL[status] ?? status}
    </span>
  );
}
