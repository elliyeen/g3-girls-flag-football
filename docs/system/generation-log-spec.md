[IDX]  2026-02-19.C24
[CAT]  8_KAIZEN
[TIME] 2026-02-19T09:00:00-06:00
[3K]   generation-log | artifact-catalog | data-engineering
[CONF] 0.99
[REVIEW] false

---

# Generation Log Specification

> Append-only audit trail of every agent run and every artifact produced.
> Two files, two concerns: operational log (JSONL) + artifact catalog (CSV).
> Offline. Git-trackable. No database. Queryable with standard tools.

---

## Architecture Overview

```
tpm run-all
    │
    ├─ agent-01 ──► Vec<ArtifactRecord>
    ├─ agent-02 ──► Vec<ArtifactRecord>      ← agents return records,
    ├─ agent-03 ──► Vec<ArtifactRecord>        don't write directly
    ├─ agent-04 ──► Vec<ArtifactRecord>
    └─ agent-05 ──► Vec<ArtifactRecord>
              │
              ▼
         CLI collects all records
              │
              ├──► logs/runs.jsonl       (one line appended per run)
              └──► logs/artifacts.csv   (one row appended per artifact)
```

Agents never write to the log directly. They return `Vec<ArtifactRecord>` to the CLI. The CLI writes both files after all agents complete. This preserves the system's "no shared mutable state" principle.

---

## File Locations

```
tpm-agents/
└── logs/
    ├── runs.jsonl        ← append-only, one JSON object per line
    └── artifacts.csv     ← append-only, one CSV row per generated file
```

Both files live in `logs/` (not `outputs/`) — they are infrastructure, not deliverables.

---

## File 1 — `logs/runs.jsonl`

**Format:** JSON Lines — one JSON object per line, no surrounding array.

**Purpose:** Operational log. What ran, when, outcome, how long, what it produced.

### Schema

| Field | Type | Description |
|-------|------|-------------|
| `run_id` | string | Unique run identifier. Format: `YYYY-MM-DD.R##` — sequential per day |
| `timestamp` | string | ISO-8601 start time of the run: `YYYY-MM-DDTHH:MM:SS-06:00` |
| `agent` | string | Agent ID (`agent-01`, `agent-03`, `all`) |
| `project` | string | Project name from `data/<project>/project.toml` |
| `trigger` | string | `manual` \| `scheduled` \| `cross_agent` \| `validate` |
| `tasks` | array | Task IDs executed: `["project-status", "risk-alert"]` |
| `status` | string | `ok` \| `error` \| `partial` \| `threat_detected` |
| `duration_ms` | number | Wall time in milliseconds |
| `artifacts` | array | IDX codes of all artifacts produced: `["2026-02-19.G03-001", ...]` |
| `error` | string \| null | Error message when `status != ok` |

### Example Records

```jsonl
{"run_id":"2026-02-19.R01","timestamp":"2026-02-19T09:15:22-06:00","agent":"agent-03","project":"medium_project","trigger":"manual","tasks":["project-status","risk-alert","exec-brief"],"status":"ok","duration_ms":142,"artifacts":["2026-02-19.G03-001","2026-02-19.G03-002","2026-02-19.G03-003"],"error":null}
{"run_id":"2026-02-19.R02","timestamp":"2026-02-19T09:15:22-06:00","agent":"agent-04","project":"medium_project","trigger":"manual","tasks":["project-status","vendor-followup"],"status":"ok","duration_ms":98,"artifacts":["2026-02-19.G04-001","2026-02-19.G04-002"],"error":null}
{"run_id":"2026-02-19.R03","timestamp":"2026-02-19T09:15:23-06:00","agent":"agent-02","project":"medium_project","trigger":"manual","tasks":["project-status"],"status":"threat_detected","duration_ms":12,"artifacts":[],"error":"SanitizedString: injection pattern detected in vendors.toml field [vendor_name]"}
```

### run_id Assignment

Format: `YYYY-MM-DD.R##`

- Counter resets to `R01` each calendar day
- When `tpm run-all` is invoked: each agent in the parallel batch shares the **same `run_id`** (it's one logical run)
- When `tpm run <agent>` is invoked: single `run_id` issued for that agent's execution

---

## File 2 — `logs/artifacts.csv`

**Format:** RFC 4180 CSV with header row.

**Purpose:** Queryable flat catalog of every artifact ever generated. One row per file.

### Schema

```csv
idx,timestamp,run_id,agent,project,cat,k1,k2,k3,conf,file_path
```

| Column | Type | Description |
|--------|------|-------------|
| `idx` | string | Artifact IDX code — see namespace below |
| `timestamp` | string | ISO-8601 generation timestamp |
| `run_id` | string | FK → `runs.jsonl` `run_id` |
| `agent` | string | Agent that produced the artifact |
| `project` | string | Project name |
| `cat` | string | Primary category code from 0–8 taxonomy |
| `k1` | string | First canonical keyword (artifact type) |
| `k2` | string | Second canonical keyword (domain) |
| `k3` | string | Third canonical keyword (scope/qualifier) |
| `conf` | float | Always `0.99` for agent-generated artifacts |
| `file_path` | string | Path relative to project root |

### Example Rows

```csv
idx,timestamp,run_id,agent,project,cat,k1,k2,k3,conf,file_path
2026-02-19.G03-001,2026-02-19T09:15:22-06:00,2026-02-19.R01,agent-03,medium_project,5_TECHNOLOGY,project-status,cloud-migration,medium-scale,0.99,outputs/medium_project/2026-02-19_project_status.md
2026-02-19.G03-002,2026-02-19T09:15:22-06:00,2026-02-19.R01,agent-03,medium_project,0_MISSION,risk-alert,cloud-migration,high-risk,0.99,outputs/medium_project/2026-02-19_risk_alert.md
2026-02-19.G03-003,2026-02-19T09:15:22-06:00,2026-02-19.R01,agent-03,medium_project,7_OPERATIONS,stakeholder-brief,cloud-migration,executive-tier,0.99,outputs/medium_project/2026-02-19_exec_brief.md
```

---

## IDX Namespace — Agent-Generated Artifacts

Design docs use `YYYY-MM-DD.C##` (human-curated, sequential, in the IDX registry).

Agent-generated artifacts use a **separate namespace** to avoid collision during parallel execution:

```
YYYY-MM-DD.G<AGENT_ID>-<SEQ>
```

| Part | Meaning |
|------|---------|
| `G` | Generated — distinguishes from design docs (`C`) and runs (`R`) |
| `AGENT_ID` | Two-digit agent number: `00`–`05`. `AL` for `tpm run-all` orchestration artifacts |
| `SEQ` | Three-digit sequence, zero-padded, resets per agent per day |

**Examples:**
- `2026-02-19.G03-001` — first artifact from agent-03 today
- `2026-02-19.G03-002` — second artifact from agent-03 today
- `2026-02-19.G01-001` — first artifact from agent-01 today

**Collision-free:** Each agent owns its namespace. No mutex needed. Agents run in parallel without contention.

### Agent ID Map

| Agent | ID Code |
|-------|---------|
| agent-00 (generalist) | `G00` |
| agent-01 (physical security) | `G01` |
| agent-02 (crm) | `G02` |
| agent-03 (cloud migration) | `G03` |
| agent-04 (erp) | `G04` |
| agent-05 (infrastructure) | `G05` |
| generalist projects (any) | `G<project_hash_2digit>` |

---

## IDX Block in Generated Output Files

Every generated `.md` file receives an IDX block at the top, injected by the agent:

```markdown
[IDX]  2026-02-19.G03-001
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-19T09:15:22-06:00
[3K]   project-status | cloud-migration | medium-scale
[CONF] 0.99
[REVIEW] false

---

# Cloud Migration — Project Status Report
```

The `[3K]` keywords for generated artifacts follow the pattern:
- `k1`: report type (`project-status`, `risk-alert`, `vendor-followup`, `exec-brief`, `budget-report`, `threat-alert`, etc.)
- `k2`: project name or domain
- `k3`: qualifier (`high-risk`, `executive-tier`, `overdue`, `q1-2026`, etc.)

---

## Query Examples

**All artifacts from the last 7 days:**
```bash
grep "2026-02-1[3-9]" logs/artifacts.csv
```

**All risk alerts ever generated:**
```bash
grep "risk-alert" logs/artifacts.csv
```

**All runs by agent-03:**
```bash
grep '"agent":"agent-03"' logs/runs.jsonl
```

**Runs that ended with threat_detected:**
```bash
grep '"status":"threat_detected"' logs/runs.jsonl
```

**All artifacts for medium_project:**
```bash
grep ",medium_project," logs/artifacts.csv
```

**With DuckDB (advanced):**
```sql
-- Join runs to artifacts for a full picture
SELECT r.run_id, r.timestamp, r.agent, r.status, a.file_path
FROM read_json_auto('logs/runs.jsonl') r
JOIN read_csv_auto('logs/artifacts.csv') a ON r.run_id = a.run_id
WHERE r.status != 'ok'
ORDER BY r.timestamp DESC;
```

---

## Append Rules

1. **Never overwrite** — only append. Both files grow indefinitely.
2. **Never delete rows** — if an artifact is superseded, add a note in a new run, not a deletion.
3. **Write atomically** — the CLI writes both files after ALL agents complete. Partial run results are not written mid-flight.
4. **On threat detection** — still write the run record with `status: threat_detected`. Write zero artifacts. The threat alert `.md` itself is written to `outputs/` but gets no IDX code (it is not a normal deliverable).
5. **Git commit both files** after each `tpm run` — this creates an immutable, timestamped audit trail.

---

## Relationship to IDX Registry

| Registry | Format | Owner | Covers |
|----------|--------|-------|--------|
| `docs/system/idx-registry.md` | Markdown | Human | Design docs, specs, agent profiles, architecture |
| `logs/artifacts.csv` | CSV | Agent (CLI writes) | Every runtime-generated output artifact |
| `logs/runs.jsonl` | JSONL | Agent (CLI writes) | Every agent invocation |

They are complementary, not redundant. Different audiences, different artifact types.

---

*Last updated: 2026-02-19*
*Owner: System*
*Status: Active v1.0*
