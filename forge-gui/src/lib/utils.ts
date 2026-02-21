import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProjectStatus, RiskStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusLabel(s: ProjectStatus): string {
  return { on_track: "On Track", at_risk: "At Risk", off_track: "Off Track",
           on_hold: "On Hold", completed: "Completed" }[s] ?? s;
}

export function riskStatusLabel(s: RiskStatus): string {
  return { open: "Open", mitigating: "Mitigating", accepted: "Accepted",
           closed: "Closed", escalated: "Escalated" }[s] ?? s;
}

export function riskScore(probability: string, impact: string): number {
  const p = probability === "high" ? 3 : probability === "medium" ? 2 : 1;
  const i = impact       === "high" ? 3 : impact       === "medium" ? 2 : 1;
  return p * i;
}

export function fmtUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export function fmtPct(n: number | null | undefined): string {
  if (n == null) return "—";
  return `${Math.round(n)}%`;
}

export function fmtDate(s: string): string {
  if (!s) return "—";
  const d = new Date(s + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function fmtBytes(n: number): string {
  if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
}

export function agentDisplayId(id: string): string {
  return id.replace(/_/g, "-");
}

export function slugToLabel(slug: string): string {
  return slug.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export function milestoneStatusLabel(s: string): string {
  return { not_started: "Not Started", in_progress: "In Progress", complete: "Complete",
           overdue: "Overdue", blocked: "Blocked" }[s] ?? s;
}

export function timeAgo(iso: string): string {
  const ms   = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60_000);
  if (mins < 1)   return "just now";
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
