import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import { AGENT_META } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ArrowUp } from "lucide-react";

const MODEL_GROUPS: { label: string; models: { value: string; label: string }[] }[] = [
  {
    label: "Default (from settings.toml)",
    models: [{ value: "default", label: "Default — use settings.toml" }],
  },
  {
    label: "Anthropic",
    models: [
      { value: "claude-opus-4-6",           label: "Claude Opus 4.6" },
      { value: "claude-sonnet-4-6",          label: "Claude Sonnet 4.6" },
      { value: "claude-sonnet-4-5-20250929", label: "Claude Sonnet 4.5" },
      { value: "claude-haiku-4-5-20251001",  label: "Claude Haiku 4.5" },
    ],
  },
  {
    label: "OpenAI",
    models: [
      { value: "gpt-4o",      label: "GPT-4o" },
      { value: "gpt-4o-mini", label: "GPT-4o mini" },
      { value: "o1",          label: "o1" },
      { value: "o3-mini",     label: "o3-mini" },
    ],
  },
  {
    label: "Groq",
    models: [
      { value: "llama-3.3-70b-versatile", label: "Llama 3.3 70B (Groq)" },
      { value: "llama-3.1-8b-instant",    label: "Llama 3.1 8B (Groq)" },
      { value: "mixtral-8x7b-32768",      label: "Mixtral 8×7B (Groq)" },
    ],
  },
  {
    label: "Ollama (local)",
    models: [
      { value: "llama3.2",  label: "Llama 3.2" },
      { value: "mistral",   label: "Mistral" },
      { value: "qwen2.5",   label: "Qwen 2.5" },
      { value: "phi4",      label: "Phi-4" },
    ],
  },
];

interface Message {
  role:    "user" | "assistant";
  content: string;
  ts:      string;
  model?:  string;
}

const SUGGESTIONS = [
  "Which project needs the most attention right now?",
  "What is the overall compliance posture?",
  "Which project has the highest budget burn?",
  "Summarise all open risks across the portfolio.",
];

export default function Ask() {
  const { config, selectedModel, setSelectedModel } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [agent,    setAgent]    = useState<string>("all");
  const [error,    setError]    = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(question?: string) {
    const q = (question ?? input).trim();
    if (!q || !config) return;
    setInput("");
    setError("");

    const userMsg: Message = { role: "user", content: q, ts: now() };
    setMessages(m => [...m, userMsg]);
    setLoading(true);

    try {
      const args = [
        "ask",
        ...(agent !== "all" ? ["--agent", agent.replace(/_/g, "-")] : []),
        ...(selectedModel !== "default" ? ["--model", selectedModel] : []),
        q,
      ];
      const out  = await api.runForge(config.forge_binary, args);
      const clean = out.replace(/\x1b\[[0-9;]*m/g, "").trim();
      setMessages(m => [...m, { role: "assistant", content: clean, ts: now(),
        model: selectedModel !== "default" ? selectedModel : undefined }]);
    } catch (e: unknown) {
      const msg = String(e);
      if (msg.includes("LLM not enabled")) {
        setError("LLM is not enabled. Add [tools.llm] enabled = true to config/settings.toml and configure your provider.");
      } else {
        setError(msg);
      }
      setMessages(m => m.slice(0, -1)); // remove user message on fatal error
    } finally {
      setLoading(false);
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function now() {
    return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="flex flex-col h-full max-w-[760px] mx-auto w-full">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading">Ask AI</h1>
            <p className="text-caption mt-0.5">Ask anything about your projects</p>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-3">
            {/* Model selector */}
            <div className="flex items-center gap-2">
              <span className="text-caption">Model</span>
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="bg-raised border border-border rounded-md px-2.5 h-7 text-[12px]
                           text-primary focus:outline-none focus:border-ember transition-colors
                           max-w-[180px]"
              >
                {MODEL_GROUPS.map(g => (
                  <optgroup key={g.label} label={g.label}>
                    {g.models.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="w-px h-4 bg-border" />

            {/* Agent scope */}
            <div className="flex items-center gap-2">
              <span className="text-caption">Scope</span>
              <select
                value={agent}
                onChange={e => setAgent(e.target.value)}
                className="bg-raised border border-border rounded-md px-2.5 h-7 text-[12px]
                           text-primary focus:outline-none focus:border-ember transition-colors"
              >
                <option value="all">All Projects</option>
                {Object.entries(AGENT_META).map(([id, m]) => (
                  <option key={id} value={id}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {messages.length === 0 && !loading && (
          <div className="space-y-6 pt-4">
            <p className="text-subtle text-center text-[13px]">
              Ask a question to get strategic commentary on your projects.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="card text-left text-[12px] text-subtle hover:text-primary
                             hover:border-ember/20 transition-all duration-150 p-3 leading-snug"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="size-7 rounded-full bg-ember/10 border border-ember/20
                              flex items-center justify-center text-[10px] font-semibold text-ember shrink-0 mt-0.5">
                S
              </div>
            )}
            <div className={`max-w-[80%] ${m.role === "user" ? "order-first" : ""}`}>
              <div className={`rounded-xl px-4 py-3 text-[13px] leading-relaxed
                ${m.role === "user"
                  ? "bg-ember/10 border border-ember/15 text-primary rounded-br-sm"
                  : "bg-surface border border-border text-primary rounded-bl-sm"}`}>
                {m.content}
              </div>
              <p className="text-[10px] text-muted mt-1 px-1">
                {m.ts}{m.model && <span className="ml-1 opacity-60">· {m.model}</span>}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="size-7 rounded-full bg-ember/10 border border-ember/20
                            flex items-center justify-center text-[10px] font-semibold text-ember shrink-0">
              S
            </div>
            <div className="bg-surface border border-border rounded-xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="size-1.5 rounded-full bg-muted animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="card border-crimson/20 text-crimson text-[12px] p-3">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 pb-5 pt-3 shrink-0">
        <div className="card p-2 flex items-end gap-2 focus-within:border-ember/40 transition-colors">
          <textarea
            ref={textRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask a question about your projects..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-[13px] text-primary
                       placeholder:text-muted focus:outline-none min-h-[28px] max-h-32
                       leading-relaxed py-1 px-1"
            style={{ height: "auto" }}
            onInput={e => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = t.scrollHeight + "px";
            }}
          />
          <Button
            variant="primary" size="sm"
            disabled={!input.trim() || loading}
            onClick={() => send()}
            className="shrink-0 size-7 p-0"
          >
            <ArrowUp size={14} />
          </Button>
        </div>
        <p className="text-[10px] text-muted mt-2 text-center">
          Requires LLM enabled in config/settings.toml
        </p>
      </div>
    </div>
  );
}
