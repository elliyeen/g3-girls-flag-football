import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderPlus, Play, Check, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function Field({ label, hint, children }: {
  label: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-label block">{label}</label>
      {children}
      {hint && <p className="text-caption">{hint}</p>}
    </div>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9_\s-]/g, "")
    .replace(/[\s-]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export default function Submit() {
  const navigate = useNavigate();
  const { config, account } = useAppStore();

  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");
  const [sponsor,     setSponsor]     = useState("");
  const [pm,          setPm]          = useState("");
  const [startDate,   setStartDate]   = useState("");
  const [endDate,     setEndDate]     = useState("");
  const [budget,      setBudget]      = useState("50000");
  const [runAgents,   setRunAgents]   = useState(true);

  const [status,  setStatus]  = useState<"idle" | "saving" | "running" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const canSubmit = account.role === "admin" || account.role === "manager";
  const slug      = slugify(name);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!config || !canSubmit || !slug) return;

    setStatus("saving");
    setMessage("");

    let safeSlug: string;
    try {
      safeSlug = await api.writeProjectBrief(config.data_dir, {
        slug,
        name:            name.trim(),
        description:     description.trim(),
        sponsor:         sponsor.trim(),
        pm:              pm.trim(),
        start_date:      startDate,
        target_end_date: endDate,
        budget_total_usd: parseInt(budget, 10) || 0,
      });
    } catch (e: unknown) {
      setStatus("error");
      setMessage(String(e));
      return;
    }

    if (!runAgents) {
      setStatus("done");
      setMessage(`Project "${safeSlug}" created. Agents not run.`);
      setTimeout(() => navigate(`/agents/${safeSlug}`), 1200);
      return;
    }

    setStatus("running");
    setMessage("Running agent team…");
    try {
      await api.runForge(config.forge_binary, ["run-project", safeSlug]);
      setStatus("done");
      setMessage("Done. Navigating to project…");
      setTimeout(() => navigate(`/agents/${safeSlug}`), 800);
    } catch (e: unknown) {
      // Agents may return non-zero without being fatal — still navigate
      setStatus("done");
      setMessage(`Agents finished (may have warnings). Navigating…`);
      setTimeout(() => navigate(`/agents/${safeSlug}`), 1200);
    }
  }

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
        <p className="text-heading">Configure Seal first</p>
        <p className="text-subtle max-w-xs">
          Set the path to your Seal binary and data directory in Settings.
        </p>
        <Button variant="primary" onClick={() => navigate("/settings")}>
          Open Settings
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 space-y-6 max-w-[620px]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FolderPlus size={18} className="text-ember" />
        <div>
          <h1 className="text-title">Submit Project</h1>
          <p className="text-caption mt-0.5">
            The full agent team will analyse and manage this project.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Project name + slug preview */}
        <Field
          label="Project Name"
          hint={slug ? `Folder ID: ${slug}` : "Enter a name to auto-generate the project ID."}
        >
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Enterprise ERP Rollout"
            required
          />
        </Field>

        <Field label="Description">
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="One-paragraph scope summary"
            rows={3}
            className="w-full rounded-md border border-border bg-surface text-primary
                       text-[13px] px-3 py-2 placeholder:text-muted focus:outline-none
                       focus:ring-1 focus:ring-ember/40 resize-none"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Sponsor">
            <Input
              value={sponsor}
              onChange={e => setSponsor(e.target.value)}
              placeholder="Executive name"
            />
          </Field>
          <Field label="Project Manager">
            <Input
              value={pm}
              onChange={e => setPm(e.target.value)}
              placeholder="PM name"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Date">
            <Input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </Field>
          <Field label="Target End Date">
            <Input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </Field>
        </div>

        <Field label="Total Budget (USD)">
          <Input
            type="number"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            min="0"
            step="1000"
          />
        </Field>

        {/* Run agents toggle */}
        <label className="flex items-center gap-3 cursor-default select-none">
          <input
            type="checkbox"
            checked={runAgents}
            onChange={e => setRunAgents(e.target.checked)}
            className="w-4 h-4 accent-ember"
          />
          <div>
            <p className="text-[13px] text-primary">Run agent team immediately</p>
            <p className="text-caption">
              All 15 agents will analyse this project and write reports.
            </p>
          </div>
        </label>

        {/* Status bar */}
        {status !== "idle" && (
          <div className={`card text-[12px] flex items-center gap-2
            ${status === "error" ? "border-crimson/30 text-crimson" : "border-jade/20 text-jade"}`}>
            {status === "done"  && <Check size={13} />}
            {status === "error" && <AlertCircle size={13} />}
            {(status === "saving" || status === "running") && (
              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            <span>{message || (status === "saving" ? "Creating project…" : "Running agents…")}</span>
          </div>
        )}

        {!canSubmit && (
          <p className="text-caption text-gold">
            Viewer accounts cannot submit projects. Contact your admin.
          </p>
        )}

        <div className="flex justify-end pt-1">
          <Button
            type="submit"
            variant="primary"
            loading={status === "saving" || status === "running"}
            disabled={!canSubmit || !slug}
          >
            <Play size={12} />
            {runAgents ? "Submit & Run Agents" : "Submit Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
