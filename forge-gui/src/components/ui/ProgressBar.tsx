import { cn } from "@/lib/utils";

export function ProgressBar({
  value, max = 100, warn = 80, danger = 95, className,
}: {
  value:     number;
  max?:      number;
  warn?:     number;
  danger?:   number;
  className?: string;
}) {
  const pct   = Math.min((value / max) * 100, 100);
  const color = pct >= danger ? "bg-crimson"
              : pct >= warn   ? "bg-gold"
              :                 "bg-jade";
  return (
    <div className={cn("h-[3px] w-full rounded-full bg-border overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
