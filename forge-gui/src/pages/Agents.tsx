import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import { AGENT_META } from "@/lib/types";
import { fmtPct } from "@/lib/utils";
import { StatusDot, StatusBadge } from "@/components/ui/StatusDot";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function Agents() {
  const { config } = useAppStore();
  const navigate   = useNavigate();
  const dataDir    = config?.data_dir ?? "";

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["portfolio", dataDir],
    queryFn:  () => api.getPortfolio(dataDir),
    enabled:  !!dataDir,
  });

  return (
    <div className="px-6 py-5 space-y-4 max-w-[900px]">
      <div>
        <h1 className="text-title">Agents</h1>
        <p className="text-caption mt-0.5">Seven specialized project management agents</p>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-surface animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map(p => {
            const meta = AGENT_META[p.agent_id];
            return (
              <div
                key={p.id}
                onClick={() => navigate(`/agents/${p.agent_id}`)}
                className="card hover:border-ember/20 hover:bg-raised/50 cursor-default
                           transition-all duration-150 group"
              >
                <div className="flex items-center gap-4">
                  {/* Identity */}
                  <div className="flex items-center gap-3 w-[180px] shrink-0">
                    <StatusDot status={p.status} size="md"
                      pulse={p.status === "at_risk" || p.status === "off_track"} />
                    <div>
                      <p className="text-[13px] font-semibold text-primary group-hover:text-bright transition-colors">
                        {p.name}
                      </p>
                      <p className="text-caption">{meta?.role}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="w-[110px] shrink-0">
                    <StatusBadge status={p.status} />
                  </div>

                  {/* Budget */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-caption">Budget</span>
                      <span className="mono text-[11px] text-subtle">{fmtPct(p.budget_burn_pct)}</span>
                    </div>
                    <ProgressBar value={p.budget_burn_pct ?? 0} />
                  </div>

                  {/* Risks */}
                  <div className="w-[80px] text-right shrink-0">
                    <p className={`mono text-[13px] ${p.critical_risks > 0 ? "text-crimson" : p.open_risks > 0 ? "text-gold" : "text-muted"}`}>
                      {p.open_risks}
                    </p>
                    <p className="text-caption">risks</p>
                  </div>

                  {/* Compliance */}
                  <div className="w-[60px] text-right shrink-0">
                    <p className="mono text-[13px] text-primary">{Math.round(p.compliance_pct)}%</p>
                    <p className="text-caption">compliant</p>
                  </div>

                  {/* Clearance */}
                  <div className="w-[130px] text-right shrink-0">
                    <p className="text-caption">{meta?.clearance}</p>
                  </div>
                </div>

                {/* Phase bar */}
                <p className="text-caption mt-3 truncate">{p.phase}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
