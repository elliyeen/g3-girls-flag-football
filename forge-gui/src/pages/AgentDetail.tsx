import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play, RefreshCw, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import { AGENT_META, type Milestone, type Risk } from "@/lib/types";
import { fmtDate, fmtPct, fmtUsd, fmtBytes, slugToLabel } from "@/lib/utils";
import { StatusDot, StatusBadge } from "@/components/ui/StatusDot";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

function MilestoneRow({ m }: { m: Milestone }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <span className="mt-0.5"><StatusDot status={m.status} size="sm" /></span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-primary">{m.name}</span>
          {m.status === "complete" && m.completed_date && (
            <span className="text-caption">completed {fmtDate(m.completed_date)}</span>
          )}
        </div>
        {m.notes && <p className="text-caption mt-0.5 truncate">{m.notes}</p>}
      </div>
      <div className="text-right shrink-0">
        <p className="text-caption">{m.owner}</p>
        <p className={`text-[11px] mono ${m.status !== "complete" && m.due_date < new Date().toISOString().slice(0,10) ? "text-crimson" : "text-subtle"}`}>
          {m.status === "complete" ? "—" : `Due ${fmtDate(m.due_date)}`}
        </p>
      </div>
    </div>
  );
}

function RiskRow({ r }: { r: Risk }) {
  const score = (r.probability === "high" ? 3 : r.probability === "medium" ? 2 : 1) *
                (r.impact       === "high" ? 3 : r.impact       === "medium" ? 2 : 1);
  const scoreColor = score >= 6 ? "text-crimson" : score >= 4 ? "text-gold" : "text-subtle";
  return (
    <tr className="border-b border-border last:border-0 hover:bg-raised/30 transition-colors">
      <td className="py-2.5 pl-4 pr-3">
        <div className="flex items-center gap-2">
          {r.escalation_required && <StatusDot status="escalated" size="xs" pulse />}
          <span className="text-[13px] text-primary">{r.title}</span>
        </div>
        {r.mitigation_plan && (
          <p className="text-caption mt-0.5 truncate max-w-xs">{r.mitigation_plan}</p>
        )}
      </td>
      <td className="py-2.5 px-3"><StatusBadge status={r.status} /></td>
      <td className="py-2.5 px-3">
        <span className="text-caption">{slugToLabel(r.category)}</span>
      </td>
      <td className="py-2.5 px-3">
        <span className={`mono text-[13px] font-semibold ${scoreColor}`}>{score}</span>
        <span className="text-caption ml-1">/9</span>
      </td>
      <td className="py-2.5 pl-3 pr-4 text-caption">{r.owner}</td>
    </tr>
  );
}

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { config, account } = useAppStore();
  const [running, setRunning] = useState(false);
  const [runMsg,  setRunMsg]  = useState("");

  const initialTab = (searchParams.get("tab") ?? "milestones") as "milestones" | "risks" | "reports";
  const [activeTab,      setActiveTab]      = useState<"milestones" | "risks" | "reports">(initialTab);
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [reportContent,  setReportContent]  = useState<string>("");
  const [reportLoading,  setReportLoading]  = useState(false);

  const { data: detail, isLoading, refetch } = useQuery({
    queryKey: ["agent", id, config?.data_dir, config?.output_dir],
    queryFn:  () => api.getAgentDetail(id!, config!.data_dir, config!.output_dir),
    enabled:  !!id && !!config?.data_dir && !!config?.output_dir,
  });

  const canRun = account.role === "admin" || account.role === "manager";
  const meta   = id ? AGENT_META[id as keyof typeof AGENT_META] : null;

  async function handleRun() {
    if (!config || !id) return;
    setRunning(true);
    setRunMsg("");
    // Submitted projects (not in AGENT_META) use run-project; named agents use run
    const isNamedAgent = id in AGENT_META;
    const args = isNamedAgent
      ? ["run", id.replace(/_/g, "-")]
      : ["run-project", id];
    try {
      const out = await api.runForge(config.forge_binary, args);
      setRunMsg(out.slice(0, 300));
      refetch();
    } catch (e: unknown) {
      setRunMsg(String(e).slice(0, 300));
    } finally {
      setRunning(false);
    }
  }

  async function openReport(path: string) {
    if (selectedReport === path) { setSelectedReport(""); return; }
    setSelectedReport(path);
    setReportLoading(true);
    try {
      setReportContent(await api.readReportFile(path));
    } catch {
      setReportContent("Could not read report.");
    } finally {
      setReportLoading(false);
    }
  }

  if (isLoading || !detail) {
    return (
      <div className="px-6 py-5 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-surface animate-pulse" />
        ))}
      </div>
    );
  }

  const { summary, milestones, risks, reports, project } = detail;
  const p = project as Record<string, unknown>;

  const TABS = [
    { id: "milestones", label: `Milestones (${milestones.length})` },
    { id: "risks",      label: `Risks (${risks.length})` },
    { id: "reports",    label: `Reports (${reports.length})` },
  ];

  return (
    <div className="px-6 py-5 space-y-5 max-w-[1000px]">
      {/* Back + header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-subtle hover:text-primary text-[12px] mb-3 transition-colors"
        >
          <ArrowLeft size={13} /> Agents
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <StatusDot status={summary.status} size="md" pulse={summary.status === "at_risk"} />
              <h1 className="text-title">{summary.name}</h1>
            </div>
            <p className="text-caption mt-1">
              {[meta?.role, p.current_phase as string, meta?.clearance]
                .filter(Boolean).join("  ·  ")}
            </p>
            <p className="text-caption mt-0.5">{p.pm as string}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => refetch()}>
              <RefreshCw size={12} />
            </Button>
            {canRun && (
              <Button variant="primary" size="sm" loading={running} onClick={handleRun}>
                <Play size={12} /> Run Agent
              </Button>
            )}
          </div>
        </div>
      </div>

      {runMsg && (
        <div className="card text-[11px] mono whitespace-pre-wrap max-h-28 overflow-y-auto text-subtle">
          {runMsg}
        </div>
      )}

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Budget */}
        <div className="card space-y-3">
          <p className="text-label">Budget</p>
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[20px] font-bold mono text-bright">
                {fmtUsd(summary.budget_spent)}
              </span>
              <span className="text-caption">of {fmtUsd(summary.budget_total)}</span>
            </div>
            <ProgressBar value={summary.budget_burn_pct ?? 0} />
            <p className="text-caption mt-1.5">{fmtPct(summary.budget_burn_pct)} burned</p>
          </div>
        </div>

        {/* Compliance */}
        <div className="card space-y-3">
          <p className="text-label">Compliance</p>
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[20px] font-bold mono text-bright">
                {Math.round(summary.compliance_pct)}%
              </span>
              <span className="text-caption">{summary.open_findings} findings</span>
            </div>
            <ProgressBar value={summary.compliance_pct} warn={70} danger={50} />
            <p className="text-caption mt-1.5">
              {(p.compliance as Record<string,number>).controls_implemented ?? 0} / {(p.compliance as Record<string,number>).controls_total ?? 0} controls
            </p>
          </div>
        </div>

        {/* Milestones */}
        <div className="card space-y-3">
          <p className="text-label">Milestones</p>
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[20px] font-bold mono text-bright">
                {summary.done_milestones}/{summary.total_milestones}
              </span>
              {summary.overdue_milestones > 0 && (
                <span className="text-caption text-crimson">{summary.overdue_milestones} overdue</span>
              )}
            </div>
            <ProgressBar
              value={summary.done_milestones}
              max={Math.max(summary.total_milestones, 1)}
              warn={9999}
            />
            <p className="text-caption mt-1.5">
              {summary.open_risks} open risk{summary.open_risks !== 1 ? "s" : ""}
              {summary.critical_risks > 0 && `, ${summary.critical_risks} critical`}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card p-0 overflow-hidden">
        <div className="flex border-b border-border">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={`px-4 py-3 text-[12px] font-medium transition-colors border-b-[2px] -mb-[1px]
                ${activeTab === t.id
                  ? "border-ember text-primary"
                  : "border-transparent text-subtle hover:text-primary"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "milestones" && (
          <div className="px-4 py-1">
            {milestones.length === 0
              ? <p className="text-subtle py-4 text-center text-[13px]">No milestones</p>
              : (milestones as Milestone[]).map(m => <MilestoneRow key={m.id} m={m} />)
            }
          </div>
        )}

        {activeTab === "risks" && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Risk", "Status", "Category", "Score", "Owner"].map((h, i) => (
                  <th key={h} className={`text-label pb-2 pt-3 text-left font-normal
                    ${i === 0 ? "pl-4 pr-3" : i === 4 ? "pl-3 pr-4" : "px-3"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {risks.length === 0
                ? <tr><td colSpan={5} className="text-subtle py-4 text-center">No risks</td></tr>
                : (risks as Risk[]).map(r => <RiskRow key={r.id} r={r} />)
              }
            </tbody>
          </table>
        )}

        {activeTab === "reports" && (
          <div>
            <div className="divide-y divide-border">
              {reports.length === 0
                ? <p className="text-subtle py-4 text-center text-[13px] px-4">No reports yet. Run the agent to generate reports.</p>
                : reports.map(r => (
                  <button
                    key={r.filename}
                    onClick={() => openReport(r.path)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                      ${selectedReport === r.path ? "bg-raised" : "hover:bg-raised/30"}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-primary truncate">{r.filename}</p>
                      <p className="text-caption">{fmtBytes(r.size_bytes)}</p>
                    </div>
                    <ChevronRight
                      size={13}
                      className={`shrink-0 transition-transform ${selectedReport === r.path ? "rotate-90 text-ember" : "text-muted"}`}
                    />
                  </button>
                ))
              }
            </div>
            {selectedReport && (
              <div className="border-t border-border px-4 py-4 max-h-96 overflow-y-auto">
                {reportLoading
                  ? <div className="space-y-2">{[...Array(8)].map((_, i) => (
                      <div key={i} className="h-3 rounded bg-raised animate-pulse" style={{ width: `${60 + Math.random() * 35}%` }} />
                    ))}</div>
                  : <pre className="text-[11px] mono text-primary whitespace-pre-wrap leading-relaxed">{reportContent}</pre>
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
