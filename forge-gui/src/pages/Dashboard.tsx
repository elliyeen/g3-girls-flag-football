import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Play, AlertTriangle, FolderPlus } from "lucide-react";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import { fmtPct, fmtUsd } from "@/lib/utils";
import { type ProjectSummary } from "@/lib/types";
import { StatusDot, StatusBadge } from "@/components/ui/StatusDot";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

type StatusFilter = "on_track" | "needs_attention" | "open_risks" | "overdue" | null;

function StatCard({ label, value, sub, accent, active, onClick }: {
  label: string; value: string | number; sub?: string; accent?: string;
  active?: boolean; onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`card flex flex-col gap-1.5 transition-all duration-150
        ${onClick ? "cursor-default hover:border-ember/40 select-none" : ""}
        ${active ? "border-ember/50 bg-ember/[0.03] shadow-sm" : ""}`}
    >
      <p className={`text-label ${active ? "text-ember" : ""}`}>{label}</p>
      <p className={`text-[22px] font-bold mono tracking-tight ${accent ?? "text-bright"}`}>
        {value}
      </p>
      {sub && <p className="text-caption">{sub}</p>}
    </div>
  );
}

function AgentRow({ p, onClick, onRisksClick, onMilestonesClick }: {
  p: ProjectSummary;
  onClick: () => void;
  onRisksClick: (e: React.MouseEvent) => void;
  onMilestonesClick: (e: React.MouseEvent) => void;
}) {
  return (
    <tr
      onClick={onClick}
      className="border-b border-border last:border-0 hover:bg-raised/40 cursor-default transition-colors duration-100 group"
    >
      <td className="py-2.5 pl-4 pr-3">
        <div className="flex items-center gap-2.5">
          <StatusDot status={p.status} size="sm" />
          <span className="text-[13px] font-medium text-primary group-hover:text-bright transition-colors">
            {p.name}
          </span>
        </div>
      </td>
      <td className="py-2.5 px-3">
        <StatusBadge status={p.status} />
      </td>
      <td className="py-2.5 px-3">
        <div className="flex items-center gap-2 min-w-[80px]">
          <ProgressBar value={p.budget_burn_pct ?? 0} className="w-16" />
          <span className="mono text-[12px] text-subtle">{fmtPct(p.budget_burn_pct)}</span>
        </div>
      </td>
      <td className="py-2.5 px-3">
        <span
          onClick={p.open_risks > 0 ? onRisksClick : undefined}
          className={`mono text-[12px] ${p.open_risks > 0 ? "cursor-default hover:underline underline-offset-2" : ""}`}
        >
          <span className={p.open_risks > 0 ? "text-gold" : "text-subtle"}>{p.open_risks}</span>
          {p.critical_risks > 0 && (
            <span className="text-crimson ml-1">({p.critical_risks} crit)</span>
          )}
        </span>
      </td>
      <td className="py-2.5 px-3">
        <span
          onClick={p.overdue_milestones > 0 ? onMilestonesClick : undefined}
          className={`mono text-[12px] text-subtle ${p.overdue_milestones > 0 ? "cursor-default" : ""}`}
        >
          {p.done_milestones}/{p.total_milestones}
          {p.overdue_milestones > 0 && (
            <span className="text-crimson ml-1 hover:underline underline-offset-2">
              {p.overdue_milestones} late
            </span>
          )}
        </span>
      </td>
      <td className="py-2.5 pl-3 pr-4">
        <span className="text-caption truncate max-w-[160px] block">{p.phase}</span>
      </td>
    </tr>
  );
}

export default function Dashboard() {
  const { config, account, runStatus, runOutput, setRunStatus, setRunOutput } = useAppStore();
  const navigate = useNavigate();
  const [showOutput,    setShowOutput]    = useState(false);
  const [statusFilter,  setStatusFilter]  = useState<StatusFilter>(null);

  function toggleFilter(f: StatusFilter) {
    setStatusFilter(prev => prev === f ? null : f);
  }

  const dataDir = config?.data_dir ?? "";
  const { data: projects = [], isLoading, refetch } = useQuery({
    queryKey: ["portfolio", dataDir],
    queryFn:  () => api.getPortfolio(dataDir),
    enabled:  !!dataDir,
    refetchOnWindowFocus: false,
  });

  const onTrack  = projects.filter(p => p.status === "on_track").length;
  const atRisk   = projects.filter(p => p.status === "at_risk" || p.status === "off_track").length;
  const totalBudget  = projects.reduce((a, p) => a + p.budget_total, 0);
  const totalSpent   = projects.reduce((a, p) => a + p.budget_spent, 0);
  const totalBurn    = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const openRisks    = projects.reduce((a, p) => a + p.open_risks, 0);
  const critRisks    = projects.reduce((a, p) => a + p.critical_risks, 0);
  const overdueMilestones = projects.reduce((a, p) => a + p.overdue_milestones, 0);
  const alerts       = projects.filter(p => p.critical_risks > 0 || p.overdue_milestones > 0);

  const filteredProjects = statusFilter === null ? projects
    : statusFilter === "on_track"        ? projects.filter(p => p.status === "on_track")
    : statusFilter === "needs_attention" ? projects.filter(p => p.status === "at_risk" || p.status === "off_track")
    : statusFilter === "open_risks"      ? projects.filter(p => p.open_risks > 0)
    : statusFilter === "overdue"         ? projects.filter(p => p.overdue_milestones > 0)
    : projects;

  const filterLabel = statusFilter === "on_track"        ? "On Track"
    : statusFilter === "needs_attention" ? "Needs Attention"
    : statusFilter === "open_risks"      ? "Has Open Risks"
    : statusFilter === "overdue"         ? "Has Overdue Milestones"
    : "";

  const canRun = account.role === "admin" || account.role === "manager";

  async function handleRunAll() {
    if (!config || !canRun) return;
    setRunStatus("running");
    setRunOutput("");
    setShowOutput(true);
    try {
      const out = await api.runForge(config.forge_binary, ["run-all"]);
      setRunOutput(out);
      setRunStatus("success");
      refetch();
    } catch (e: unknown) {
      setRunOutput(String(e));
      setRunStatus("error");
    }
  }

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
        <p className="text-heading">Configure Seal</p>
        <p className="text-subtle max-w-xs">
          Set the path to your Seal binary and data directory to get started.
        </p>
        <Button variant="primary" onClick={() => navigate("/settings")}>
          Open Settings
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 space-y-5 max-w-[1100px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-title">Portfolio</h1>
          <p className="text-caption mt-0.5">{projects.length} active projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost" size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
          {canRun && (
            <Button
              variant="ghost" size="sm"
              onClick={() => navigate("/submit")}
            >
              <FolderPlus size={13} />
              New Project
            </Button>
          )}
          {canRun && (
            <Button
              variant="primary" size="sm"
              loading={runStatus === "running"}
              onClick={handleRunAll}
            >
              <Play size={12} />
              Run All
            </Button>
          )}
        </div>
      </div>

      {/* Run output */}
      {showOutput && runOutput && (
        <div className={`card text-[11px] mono whitespace-pre-wrap max-h-40 overflow-y-auto
          ${runStatus === "error" ? "border-crimson/30" : "border-jade/20"}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={runStatus === "error" ? "text-crimson" : "text-jade"}>
              {runStatus === "running" ? "Running..." : runStatus === "success" ? "Completed" : "Error"}
            </span>
            <button onClick={() => setShowOutput(false)} className="text-muted hover:text-subtle">
              Dismiss
            </button>
          </div>
          <span className="text-subtle">{runOutput}</span>
        </div>
      )}

      {/* Stat cards — click to filter the agent table */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="On Track" value={`${onTrack} / ${projects.length}`}
          sub={atRisk > 0 ? `${atRisk} need attention` : "All clear"}
          active={statusFilter === "on_track"}
          onClick={() => toggleFilter("on_track")} />
        <StatCard label="Portfolio Spend" value={fmtUsd(totalSpent)}
          sub={`${fmtPct(totalBurn)} of ${fmtUsd(totalBudget)}`}
          accent={totalBurn >= 90 ? "text-crimson" : totalBurn >= 75 ? "text-gold" : "text-bright"}
          active={statusFilter === "needs_attention"}
          onClick={() => toggleFilter("needs_attention")} />
        <StatCard label="Open Risks" value={openRisks}
          sub={critRisks > 0 ? `${critRisks} critical` : "None critical"}
          accent={critRisks > 0 ? "text-crimson" : openRisks > 0 ? "text-gold" : "text-bright"}
          active={statusFilter === "open_risks"}
          onClick={() => toggleFilter("open_risks")} />
        <StatCard label="Overdue" value={overdueMilestones}
          sub="milestones"
          accent={overdueMilestones > 0 ? "text-crimson" : "text-bright"}
          active={statusFilter === "overdue"}
          onClick={() => toggleFilter("overdue")} />
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="card space-y-2 border-crimson/20">
          <p className="text-label text-crimson/80 flex items-center gap-1.5">
            <AlertTriangle size={11} /> Active Alerts
          </p>
          {alerts.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/agents/${p.agent_id}`)}
              className="flex items-start gap-3 py-2 border-b border-border last:border-0
                         hover:bg-raised/40 -mx-2 px-2 rounded cursor-default transition-colors"
            >
              <StatusDot status={p.status} size="sm" pulse />
              <div>
                <span className="text-[13px] text-primary">{p.name}</span>
                <span className="text-subtle ml-2 text-[12px]">
                  {p.critical_risks > 0 && `${p.critical_risks} critical risk(s)`}
                  {p.critical_risks > 0 && p.overdue_milestones > 0 && "  ·  "}
                  {p.overdue_milestones > 0 && `${p.overdue_milestones} overdue milestone(s)`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Agent table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-label">Agents</p>
            {statusFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                               bg-ember/10 text-ember text-[11px] font-medium">
                {filterLabel}
                <button
                  onClick={() => setStatusFilter(null)}
                  className="ml-0.5 hover:opacity-70 leading-none"
                >×</button>
              </span>
            )}
          </div>
          {statusFilter && (
            <span className="text-caption">{filteredProjects.length} of {projects.length}</span>
          )}
        </div>
        {isLoading ? (
          <div className="px-4 pb-4 space-y-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-8 rounded bg-raised animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <p className="text-subtle text-center py-8 text-[13px]">No projects match this filter.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Project", "Status", "Budget", "Risks", "Milestones", "Phase"].map(h => (
                  <th key={h} className={`text-label pb-2 text-left font-normal
                    ${h === "Project" ? "pl-4 pr-3" : h === "Phase" ? "pl-3 pr-4" : "px-3"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(p => (
                <AgentRow
                  key={p.id}
                  p={p}
                  onClick={() => navigate(`/agents/${p.agent_id}`)}
                  onRisksClick={e => { e.stopPropagation(); navigate(`/agents/${p.agent_id}?tab=risks`); }}
                  onMilestonesClick={e => { e.stopPropagation(); navigate(`/agents/${p.agent_id}?tab=milestones`); }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
