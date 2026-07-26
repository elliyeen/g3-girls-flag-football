# Ship to Any Project — Implementation Checklist
_Seal Agent Team Sprint Plan_
_Created: 2026-02-21_

---

## Status

| Blocker | Status |
|---|---|
| `forge init` | ❌ Not implemented |
| `forge setup-credentials` | ❌ Not implemented |
| `forge run-project <any>` | ✅ Exists — needs hardcoded ID fix + task coverage |
| Agent generalization (project_id) | ⚠️ Partially working — `project_id()` still hardcoded |
| `--tasks kanban-board` | ❌ TaskId enum missing 4 tasks |
| Seal shows all 15 agents | ❌ Hardcoded to 7 |
| Seal new project wizard | ❌ Not implemented |

---

## Sprint 1 — `forge init` (Scaffolding)

Goal: one command to create a fully runnable project from scratch.

### 1.1 — Add `Init` to CLI

**File:** `src/cli.rs`

Add to `Commands` enum:

```rust
/// Scaffold a new project with default TOML files
Init {
    /// Folder name for the new project (e.g. "acme_crm")
    #[arg(value_name = "PROJECT_ID")]
    project_id: String,

    #[arg(long)] sponsor: Option<String>,
    #[arg(long)] pm:      Option<String>,
    #[arg(long)] budget:  Option<u64>,
    #[arg(long, value_name = "YYYY-MM-DD")] start_date: Option<String>,
    #[arg(long, value_name = "YYYY-MM-DD")] end_date:   Option<String>,
    #[arg(long)] description: Option<String>,
    #[arg(long)] category:    Option<String>,
    #[arg(long)] phase:       Option<String>,
}
```

- [ ] Add `Init { ... }` variant to `Commands` in `src/cli.rs`

---

### 1.2 — Create `src/init/mod.rs`

New module. Responsibilities:

- Accept all init args or use sensible defaults
- Create `data/<project_id>/` directory
- Write `project.toml` — complete with one placeholder milestone and one phase
- Write `risks.toml` — one placeholder risk
- Write `vendors.toml` — one placeholder vendor
- Write `stakeholders.toml` — one placeholder stakeholder (Executive detail)
- Print green success message with next steps
- Do NOT overwrite if directory already exists (error with hint)

**TOML defaults to generate:**

```toml
# project.toml defaults
overall_status   = "on_track"
current_phase    = "Phase 1: Discovery"
budget_total_usd = 50000
budget_spent_usd = 0

[compliance]
controls_total       = 10
controls_implemented = 0
open_findings        = 0
required_level       = 0
```

- [ ] Create `src/init/mod.rs`
- [ ] Declare module in `src/main.rs` (`mod init;`)
- [ ] Wire `Commands::Init` dispatch in `src/main.rs`
- [ ] Run `SanitizedString::validate()` on all user-supplied strings before writing
- [ ] Validate that `project_id` is alphanumeric + underscores only (path-safe)
- [ ] Print: `✓ Created data/<project_id>/ — run with: forge run-project <project_id>`

---

### 1.3 — Acceptance Criteria

```sh
forge init acme_crm --sponsor "Jane Doe" --pm "Bob Smith" --budget 75000 \
  --start-date 2026-03-01 --end-date 2026-09-30
# → Creates data/acme_crm/{project,risks,vendors,stakeholders}.toml
# → forge run-project acme_crm succeeds immediately after

forge init acme_crm   # second run
# → Error: data/acme_crm/ already exists. Use a different project ID.
```

---

## Sprint 2 — `forge setup-credentials`

Goal: one command that validates all env vars and tests each channel.

### 2.1 — Add `SetupCredentials` to CLI

**File:** `src/cli.rs`

```rust
/// Validate API credentials and test each configured channel
SetupCredentials {
    /// Send a real test message to every configured channel
    #[arg(long)]
    test_send: bool,
}
```

- [ ] Add `SetupCredentials { test_send: bool }` to `Commands` in `src/cli.rs`

---

### 2.2 — Create `src/setup/mod.rs`

**Checks to implement (in order):**

| Credential | Env Var | Channel |
|---|---|---|
| LLM (Claude) | `CLAUDE_API_KEY` | `forge ask` |
| LLM (OpenAI) | `OPENAI_API_KEY` | `forge ask` (fallback) |
| Email | `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_HOST` | `--send` |
| Slack | `SLACK_BOT_TOKEN` | comms dispatch |
| Twilio (SMS) | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` | comms dispatch |
| Telegram | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | comms dispatch |
| WhatsApp | `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID` | comms dispatch |
| Signal | `SIGNAL_CLI_PATH` | comms dispatch |

**Output format:**

```
forge setup-credentials

  Credential Check
  ─────────────────────────────────────────────
  ✓ CLAUDE_API_KEY         set (sk-ant-...Xyz)
  ✓ SMTP_USER              set
  ✓ SMTP_PASSWORD          set
  ✗ SLACK_BOT_TOKEN        missing
  ✗ TWILIO_ACCOUNT_SID     missing
  ─────────────────────────────────────────────
  3 credentials configured, 2 missing.

  To configure: set the missing env vars, then re-run forge setup-credentials.
```

**With `--test-send`:**
- Send a real test message to every configured channel
- Report: `✓ Slack: test message delivered` or `✗ Slack: 401 Unauthorized`

- [ ] Create `src/setup/mod.rs`
- [ ] Declare module in `src/main.rs`
- [ ] Wire `Commands::SetupCredentials` dispatch in `src/main.rs`
- [ ] For `--test-send`: reuse `comms::dispatcher` with a synthetic `Notification::test` variant
  OR call each channel's send function directly with a canned test payload
- [ ] Mask secrets in output (show first 8 chars + `...`)

---

### 2.3 — Add Notification::TestMessage variant

**File:** `src/comms/notification.rs`

Add:
```rust
TestMessage { channel: String },
```

Used exclusively by `setup-credentials --test-send`. Formatted as a simple ping with timestamp.

- [ ] Add `TestMessage` variant to `Notification` enum
- [ ] Add match arm in `src/comms/dispatcher.rs`

---

### 2.4 — Acceptance Criteria

```sh
forge setup-credentials
# → Shows all env vars: ✓ set / ✗ missing

forge setup-credentials --test-send
# → Sends ping to every configured channel
# → Reports: ✓ delivered / ✗ error per channel
```

---

## Sprint 3 — Generalization (`run-project` hardening + missing TaskIds)

### 3.1 — Fix hardcoded `project_id()` in Agent trait

**The problem:** `Agent::project_id()` returns hardcoded strings (`"crm"`, `"physical_security"`, etc.).
When `forge run-project acme_crm` runs, reports embed `project_id = "crm"` instead of `"acme_crm"`.

**Fix:** The `project_id()` call site in `run_agent()` (`src/main.rs`) should use the resolved `data_subdir`
(which is already the correct project ID) rather than calling `agent.project_id()`.

Check all consumers of `agent.project_id()` in `run_agent()`:

- [ ] Audit every use of `agent.project_id()` in `src/main.rs` — replace with `data_subdir` variable
- [ ] Audit `Report.project_id` field — ensure it's set from `data_subdir`, not `agent.project_id()`
- [ ] Audit `coordination/writer.rs` — ensure coordination messages use runtime project ID
- [ ] Audit `log/writer.rs` — ensure run records use runtime project ID
- [ ] Test: `forge run-project acme_crm` → all output files contain `project_id = "acme_crm"`

---

### 3.2 — Add missing TaskIds

**File:** `src/cli.rs` — `TaskId` enum

Currently missing:
- `KanbanBoard`
- `SprintReport`
- `GoNoGo`
- `RiskRegister`

- [ ] Add the 4 missing variants to `TaskId` enum
- [ ] Wire them in the `--tasks` filter logic in `src/main.rs`
  - Match `TaskId::KanbanBoard` → `tasks::kanban_board::generate(...)`
  - Match `TaskId::SprintReport` → `tasks::sprint_report::generate(...)`
  - Match `TaskId::GoNoGo` → `tasks::go_no_go_gate::generate(...)`
  - Match `TaskId::RiskRegister` → `tasks::risk_register::generate(...)`

---

### 3.3 — `forge list-projects` command

New command: discover all runnable projects in the data dir.

```sh
forge list-projects
# → Scans ./data/ for any subdirectory containing project.toml
# → Prints name, status, PM, last run date
```

- [ ] Add `ListProjects` to `Commands` in `src/cli.rs`
- [ ] Implement: read `data/*/project.toml`, extract name/status/pm
- [ ] Cross-reference `logs/runs.jsonl` to show last run timestamp per project
- [ ] Print clean table using `comfy-table`

---

### 3.4 — Acceptance Criteria

```sh
forge init acme_crm && forge run-project acme_crm
# → Report files contain "acme_crm" not "crm"

forge run acme_crm --tasks kanban-board
# → Kanban board report generated (no "unknown task" error)

forge list-projects
# → Shows all projects found in data/
```

---

## Sprint 4 — Seal UI Updates

### 4.1 — Show all 15 agents

**File:** `forge-gui/src-tauri/src/lib.rs`

`agent_ids()` currently returns 7. Update to all 15:

```rust
fn agent_ids() -> Vec<&'static str> {
    vec![
        "physical_security", "crm", "cloud_migration", "erp", "infrastructure",
        "agile", "risk", "orchestrator", "ba", "architect", "ux", "qa", "uat",
        "devops", "monitor",
    ]
}
```

- [ ] Update `agent_ids()` in `src-tauri/src/lib.rs`
- [ ] Verify `ProjectSummary` struct handles agents with no data dir gracefully (returns empty/default)
- [ ] Update frontend: ensure portfolio grid handles 15 cards without layout break

---

### 4.2 — Dynamic project discovery in Seal

**Problem:** Seal reads from fixed `agent_ids()`. It cannot discover `acme_crm` or other custom projects.

**Fix:** Add a new Tauri command `list_projects(data_dir)` that scans the data dir for any `project.toml`.

- [ ] Add Tauri command `list_projects(data_dir: String) -> Vec<ProjectSummary>`
  - Scan `data_dir/*/project.toml` using `std::fs::read_dir`
  - Return one `ProjectSummary` per discovered project
- [ ] Wire to frontend: portfolio page calls `list_projects` instead of iterating fixed agent IDs
- [ ] Show "no projects found" empty state with "Create your first project" CTA

---

### 4.3 — New Project wizard in Seal

**New screen:** "New Project" — wraps `forge init` args in a UI form.

Fields:
- Project ID (slug, validated: alphanumeric + underscores)
- Project Name (display name)
- Sponsor name
- PM name
- Budget (USD)
- Start date / End date
- Description

On submit: calls Tauri `run_forge(binary, ["init", project_id, "--sponsor", ..., "--pm", ...])`.

- [ ] Create `src/components/NewProjectWizard.tsx`
- [ ] Add route `/new-project` in React Router
- [ ] Add "New Project" button to portfolio page header
- [ ] On success: navigate to the new project's detail page
- [ ] On error: show stderr output from forge init

---

### 4.4 — Credentials settings screen in Seal

**New screen:** "Settings → Credentials" — shows all env var status.

- Calls Tauri command `check_credentials() -> Vec<CredentialStatus>`
- Displays: variable name, status (set/missing), masked value
- "Test All" button: calls `run_forge(binary, ["setup-credentials", "--test-send"])`
- Shows stdout output in a scrollable log panel

- [ ] Add Tauri command `check_credentials() -> Vec<CredentialStatus>`
  - Checks all env vars listed in Sprint 2.2
  - Returns: `{ name: String, set: bool, masked_value: Option<String> }`
- [ ] Create `src/components/CredentialsSettings.tsx`
- [ ] Add route `/settings/credentials`
- [ ] Link from main Settings panel

---

### 4.5 — Acceptance Criteria

```
# Open Seal
# → Portfolio shows all 15 agents + any custom projects

# Click "New Project"
# → Fill form → click Create
# → forge init runs → project appears in portfolio

# Click Settings → Credentials
# → Shows env var status
# → "Test All" button sends pings to configured channels
```

---

## Sprint 5 — Client Handoff Polish

### 5.1 — Onboarding README / Quick Start

- [ ] Write `tpm-agents/QUICKSTART.md`:
  ```
  1. forge init <project-name>
  2. forge setup-credentials
  3. forge run-project <project-name>
  ```
- [ ] Document every env var with example values
- [ ] Add `forge list-projects` to README

### 5.2 — Example project template

- [ ] Create `data/_template/` with fully commented TOML files
- [ ] `forge init` copies from this template instead of generating inline
- [ ] Allows the template to be updated without changing Rust code

### 5.3 — Docker quick-start

- [ ] Update `Dockerfile` to:
  - Accept `PROJECT_ID` build arg
  - Run `forge init $PROJECT_ID` on first run if data dir is empty
  - Expose `forge setup-credentials` as a health-check endpoint
- [ ] Update `docker-compose.yml` with env var block showing all credential vars

---

## Priority Order

| Sprint | Unlocks |
|---|---|
| Sprint 1: `forge init` | Every client onboarding; Seal wizard |
| Sprint 2: `setup-credentials` | Comms channels; Seal credentials screen |
| Sprint 3.1: `project_id` fix | Accurate reports for any custom project |
| Sprint 3.2: missing TaskIds | `--tasks kanban-board` and 3 others |
| Sprint 4.1–4.2: Seal 15 agents + discovery | Product-quality portfolio view |
| Sprint 4.3: Seal new project wizard | Zero-touch client onboarding |
| Sprint 4.4: Seal credentials screen | Client self-service setup |
| Sprint 3.3: `list-projects` | Convenience; used by Seal discovery |
| Sprint 5: Polish | Client handoff readiness |

---

## File Change Map

| File | Change |
|---|---|
| `src/cli.rs` | Add `Init`, `SetupCredentials`, `ListProjects` to Commands; add 4 TaskIds |
| `src/main.rs` | Wire new command handlers; fix `project_id()` consumers |
| `src/init/mod.rs` | **New file** — scaffolding logic |
| `src/setup/mod.rs` | **New file** — credential validation + test-send |
| `src/comms/notification.rs` | Add `TestMessage` variant |
| `src/comms/dispatcher.rs` | Add `TestMessage` match arm |
| `forge-gui/src-tauri/src/lib.rs` | Update `agent_ids()` to 15; add `list_projects`, `check_credentials` commands |
| `forge-gui/src/components/NewProjectWizard.tsx` | **New file** |
| `forge-gui/src/components/CredentialsSettings.tsx` | **New file** |
| `tpm-agents/QUICKSTART.md` | **New file** |
| `data/_template/` | **New directory** — TOML templates |
