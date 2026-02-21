import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import type { AppConfig } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

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

export default function Settings() {
  const { config, setConfig, account } = useAppStore();
  const navigate = useNavigate();
  const [form,    setForm]    = useState<AppConfig | null>(null);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account.role === "viewer") { navigate("/", { replace: true }); return; }
    api.getAppConfig().then(c => {
      setForm(c);
      if (!config) setConfig(c);
    });
  }, [account.role]);

  function update(key: keyof AppConfig, value: string) {
    setForm(f => f ? { ...f, [key]: value } : null);
  }

  async function save() {
    if (!form) return;
    setLoading(true);
    setError("");
    try {
      await api.saveAppConfig(form);
      setConfig(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: unknown) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  if (!form) {
    return (
      <div className="px-6 py-5 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-surface animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="px-6 py-5 space-y-6 max-w-[600px]">
      <div>
        <h1 className="text-title">Settings</h1>
        <p className="text-caption mt-0.5">Configure the Seal binary and project directories</p>
      </div>

      {/* Seal binary */}
      <div className="card space-y-4">
        <p className="text-label">Seal Binary</p>

        <Field label="Binary Path" hint="Path to the compiled Seal binary">
          <Input
            value={form.forge_binary}
            onChange={e => update("forge_binary", e.target.value)}
            placeholder="/path/to/seal"
          />
        </Field>

        <hr className="divider" />
        <p className="text-label">Directories</p>

        <Field label="Data Directory" hint="Contains project TOML files (data/)">
          <Input
            value={form.data_dir}
            onChange={e => update("data_dir", e.target.value)}
            placeholder="/path/to/tpm-agents/data"
          />
        </Field>

        <Field label="Output Directory" hint="Where reports are written (outputs/)">
          <Input
            value={form.output_dir}
            onChange={e => update("output_dir", e.target.value)}
            placeholder="/path/to/tpm-agents/outputs"
          />
        </Field>

        <Field label="Logs Directory" hint="Run history and artifact index (logs/)">
          <Input
            value={form.logs_dir}
            onChange={e => update("logs_dir", e.target.value)}
            placeholder="/path/to/tpm-agents/logs"
          />
        </Field>

        <Field label="Settings TOML" hint="config/settings.toml — viewed read-only">
          <Input
            value={form.config_path}
            onChange={e => update("config_path", e.target.value)}
            placeholder="/path/to/tpm-agents/config/settings.toml"
          />
        </Field>
      </div>

      {/* LLM hint */}
      <div className="card border-steel/20 space-y-2">
        <p className="text-label text-steel/80">LLM Configuration</p>
        <p className="text-[12px] text-subtle leading-relaxed">
          LLM settings are managed in <span className="mono text-primary">config/settings.toml</span> under{" "}
          <span className="mono text-primary">[tools.llm]</span>. Enable a provider there to use the Ask AI feature.
        </p>
        <p className="text-caption">
          Supported: OpenAI, Anthropic Claude, Ollama, Groq, Mistral, Azure OpenAI, LM Studio
        </p>
      </div>

      {error && (
        <div className="card border-crimson/20 text-crimson text-[12px] p-3">{error}</div>
      )}

      <div className="flex items-center gap-3">
        <Button variant="primary" loading={loading} onClick={save}>
          {saved && <Check size={13} />}
          {saved ? "Saved" : "Save Settings"}
        </Button>
        <Button variant="ghost" onClick={() => api.getAppConfig().then(setForm)}>
          Reset
        </Button>
      </div>
    </div>
  );
}
