import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import { fmtBytes } from "@/lib/utils";
import { AGENT_META } from "@/lib/types";
import { FileText, X, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function agentLabel(id: string) {
  return AGENT_META[id as keyof typeof AGENT_META]?.label ?? id;
}

export default function Reports() {
  const { config } = useAppStore();
  const [selected,     setSelected]     = useState<string | null>(null);
  const [content,      setContent]      = useState<string>("");
  const [loading,      setLoading]      = useState(false);
  const [filter,       setFilter]       = useState<string>("all");
  const [searchQuery,  setSearchQuery]  = useState<string>("");

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports", config?.output_dir],
    queryFn:  () => api.getAllReports(config!.output_dir),
    enabled:  !!config?.output_dir,
  });

  const agents = ["all", ...Array.from(new Set(reports.map(r => r.agent_id)))];
  const filtered = reports
    .filter(r => filter === "all" || r.agent_id === filter)
    .filter(r => !searchQuery || r.filename.toLowerCase().includes(searchQuery.toLowerCase()));

  async function openReport(path: string) {
    setLoading(true);
    setSelected(path);
    try {
      const text = await api.readReportFile(path);
      setContent(text);
    } catch {
      setContent("Could not read report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full">
      {/* File list */}
      <div className="flex flex-col w-[340px] min-w-[340px] border-r border-border h-full overflow-hidden">
        <div className="px-4 py-4 border-b border-border space-y-3">
          <h1 className="text-heading">Reports</h1>

          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search reports..."
              className="pl-9 h-8 text-[12px]"
            />
          </div>

          {/* Agent filter */}
          <div className="flex flex-wrap gap-1.5">
            {agents.map(a => (
              <button
                key={a}
                onClick={() => setFilter(a)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors
                  ${filter === a
                    ? "bg-ember text-white"
                    : "bg-raised text-subtle hover:text-primary border border-border"}`}
              >
                {a === "all" ? "All" : agentLabel(a)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 rounded bg-raised animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-center text-subtle text-[13px]">
              No reports found. Run agents to generate reports.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map(r => (
                <button
                  key={r.path}
                  onClick={() => openReport(r.path)}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors
                    ${selected === r.path ? "bg-raised" : "hover:bg-raised/40"}`}
                >
                  <FileText size={15} className="text-muted mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-primary truncate leading-snug">{r.filename}</p>
                    <p className="text-caption mt-0.5">
                      {agentLabel(r.agent_id)}  ·  {fmtBytes(r.size_bytes)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Report viewer */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selected ? (
          <>
            <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
              <p className="text-[12px] text-subtle truncate max-w-lg">{selected}</p>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
                <X size={13} />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-4 rounded bg-raised animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
                  ))}
                </div>
              ) : (
                <pre className="text-[12px] mono text-primary whitespace-pre-wrap leading-relaxed">
                  {content}
                </pre>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-subtle text-[13px]">
            Select a report to view
          </div>
        )}
      </div>
    </div>
  );
}
