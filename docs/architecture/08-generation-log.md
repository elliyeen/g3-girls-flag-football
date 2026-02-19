[IDX]  2026-02-19.C25
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-19T09:00:00-06:00
[3K]   architecture | generation-log | data-engineering
[CONF] 0.99
[REVIEW] false

---

# TPM Agent System — Generation Log Architecture

> Rust implementation of the generation log system.
> Two output types: `RunRecord` (JSONL) and `ArtifactRecord` (CSV).
> Agents return records — the CLI writes files. No shared mutable state.
> See: `docs/system/generation-log-spec.md` for the full specification.

---

## Rust Structs

### `RunRecord` — written to `logs/runs.jsonl`

```rust
use serde::{Deserialize, Serialize};

/// One record per `tpm run` or `tpm run-all` invocation.
/// Serialized as a single JSON line and appended to logs/runs.jsonl.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RunRecord {
    /// Unique run ID. Format: "YYYY-MM-DD.R##". Sequential per day.
    pub run_id: String,

    /// ISO-8601 timestamp of when the run started.
    pub timestamp: String,

    /// Agent identifier: "agent-01", "agent-03", "all"
    pub agent: String,

    /// Project name matching the data/<project>/ directory name.
    pub project: String,

    /// What triggered this run.
    pub trigger: RunTrigger,

    /// Task IDs that were executed in this run.
    pub tasks: Vec<String>,

    /// Outcome of the run.
    pub status: RunStatus,

    /// Wall time in milliseconds.
    pub duration_ms: u64,

    /// IDX codes of all artifacts produced. Empty if status == ThreatDetected.
    pub artifacts: Vec<String>,

    /// Error message. None when status == Ok.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RunTrigger {
    Manual,
    Scheduled,
    CrossAgent,
    Validate,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RunStatus {
    Ok,
    Error,
    Partial,
    ThreatDetected,
}
```

---

### `ArtifactRecord` — written to `logs/artifacts.csv`

```rust
use serde::Serialize;

/// One record per generated artifact (.md output file).
/// Serialized as a CSV row and appended to logs/artifacts.csv.
/// The same data is also injected as an IDX block at the top of the .md file.
#[derive(Debug, Clone, Serialize)]
pub struct ArtifactRecord {
    /// IDX code. Format: "YYYY-MM-DD.G<AGENT_ID>-<SEQ>".
    /// Example: "2026-02-19.G03-001"
    pub idx: String,

    /// ISO-8601 generation timestamp.
    pub timestamp: String,

    /// FK → RunRecord.run_id
    pub run_id: String,

    /// Agent that produced this artifact.
    pub agent: String,

    /// Project this artifact belongs to.
    pub project: String,

    /// Primary category from the 0–8 enterprise taxonomy.
    /// Example: "5_TECHNOLOGY", "0_MISSION", "7_OPERATIONS"
    pub cat: String,

    /// Canonical keyword 1 — artifact type.
    /// Example: "project-status", "risk-alert", "exec-brief"
    pub k1: String,

    /// Canonical keyword 2 — domain/project identifier.
    pub k2: String,

    /// Canonical keyword 3 — qualifier or scope.
    pub k3: String,

    /// Router confidence. Always 0.99 for agent-generated artifacts.
    pub conf: f32,

    /// Path relative to project root.
    /// Example: "outputs/medium_project/2026-02-19_project_status.md"
    pub file_path: String,
}
```

---

## IDX Code Generation

Agents generate their own IDX codes without shared state. Each agent owns its namespace.

```rust
/// Generates the next IDX code for an agent-produced artifact.
/// Format: "YYYY-MM-DD.G<AGENT_ID>-<SEQ>"
/// Example: "2026-02-19.G03-001"
///
/// seq: zero-padded 3-digit counter, incremented per artifact within this run.
pub fn agent_idx(date: &str, agent_id: u8, seq: u32) -> String {
    format!("{}.G{:02}-{:03}", date, agent_id, seq)
}
```

Agent ID map:

| Agent | `agent_id` |
|-------|-----------|
| agent-00 (generalist) | `0` |
| agent-01 (physical security) | `1` |
| agent-02 (crm) | `2` |
| agent-03 (cloud migration) | `3` |
| agent-04 (erp) | `4` |
| agent-05 (infrastructure) | `5` |

---

## Write Pattern — CLI

The CLI assembles records after all parallel agents complete, then writes both files:

```rust
use std::fs::OpenOptions;
use std::io::Write;

/// Appends a RunRecord as a single JSON line to logs/runs.jsonl.
pub fn append_run(log_path: &Path, record: &RunRecord) -> Result<(), AppError> {
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(log_path)?;

    let line = serde_json::to_string(record)?;
    writeln!(file, "{}", line)?;
    Ok(())
}

/// Appends ArtifactRecords to logs/artifacts.csv.
/// Writes the header row only if the file is new (empty).
pub fn append_artifacts(log_path: &Path, records: &[ArtifactRecord]) -> Result<(), AppError> {
    let file_is_new = !log_path.exists()
        || std::fs::metadata(log_path)?.len() == 0;

    let file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(log_path)?;

    let mut writer = csv::WriterBuilder::new()
        .has_headers(file_is_new)
        .from_writer(file);

    for record in records {
        writer.serialize(record)?;
    }

    writer.flush()?;
    Ok(())
}
```

---

## Agent Return Contract

Agents do not write to the log. They return a `AgentResult`:

```rust
/// Everything an agent produces in a single run.
/// Returned to the CLI after the agent completes.
pub struct AgentResult {
    /// The run record for this agent's execution.
    pub run_record: RunRecord,

    /// All artifacts produced. The CLI writes these to artifacts.csv.
    pub artifact_records: Vec<ArtifactRecord>,

    /// The report content, written to outputs/<project>/<filename>.md.
    /// The IDX block is prepended by the agent before returning.
    pub reports: Vec<Report>,
}
```

---

## CLI Orchestration — `tpm run-all`

```rust
// Pseudocode — illustrates the parallel-to-serial write pattern

let run_id = next_run_id(&today); // "2026-02-19.R01"

// Spawn all agents in parallel
let handles: Vec<JoinHandle<AgentResult>> = agents
    .iter()
    .map(|agent| tokio::spawn(agent.run(run_id.clone())))
    .collect();

// Await all completions
let results: Vec<AgentResult> = join_all(handles).await;

// Write output files
for result in &results {
    write_reports(&result.reports)?;
}

// Write logs — serial, after all agents complete
for result in &results {
    append_run(&logs_dir.join("runs.jsonl"), &result.run_record)?;
    append_artifacts(&logs_dir.join("artifacts.csv"), &result.artifact_records)?;
}
```

---

## Threat Detection — Log Behavior

When a threat is detected mid-run:

1. Agent **halts immediately** — no further TOML processing
2. Agent **writes the threat alert** to `outputs/<project>/YYYY-MM-DD_threat_alert.md`
3. Agent **returns an `AgentResult`** with:
   - `run_record.status = RunStatus::ThreatDetected`
   - `run_record.artifacts = vec![]` — no IDX codes assigned
   - `artifact_records = vec![]` — nothing logged in the artifact catalog
   - The threat alert file itself is **not** logged in artifacts.csv (it is not a normal deliverable)
4. CLI still writes the `RunRecord` to `runs.jsonl` — the threat event is permanently recorded

---

## Cargo Dependencies

```toml
[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
csv = "1"
```

No new dependencies beyond what `serde` already requires. Both `serde_json` and `csv` are standard Rust ecosystem crates.

---

## File Growth and Archival

Both log files grow indefinitely as designed. No rotation is required for typical TPM usage (tens of runs per day, not millions). For long-running engagements:

- Archive by year: `logs/2026/runs.jsonl`, `logs/2026/artifacts.csv`
- Git history provides point-in-time snapshots without requiring archival logic in the agent

---

*Last updated: 2026-02-19*
*Owner: System*
*Status: Active v1.0*
