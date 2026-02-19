[IDX]  2026-02-19.C13
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   architecture | system-overview | tpm-agents
[CONF] 0.94
[REVIEW] false

---

# TPM Agent System — High-Level Architecture Overview

> **Stack:** Rust
> **Purpose:** Autonomous TPM automation agents for any client engagement
> **Clearance:** Unclassified through IL6 / FedRAMP High

---

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        TPM COMMAND CENTER                           │
│                    (Technical Project Manager)                      │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                ┌───────────────▼────────────────────┐
                │      GENERALIST AGENT LAYER        │
                │  (any project, any scale, any      │
                │   industry — config-driven)        │
                │                                    │
                │  Domain agents 01–05 are pre-baked │
                │  instances of this same layer.     │
                │  New projects: tpm new <name>      │
                └───────────────┬────────────────────┘
                                │
                ┌───────────────▼───────────────┐
                │         tpm CLI (Rust)         │
                │  run · run-all · new · status  │
                │  overdue · validate            │
                └──┬────┬────┬────┬────┬─────────┘
                   │    │    │    │    │
        ┌──────────┘    │    │    │    └──────────────┐
        │          ┌────┘    │    └────┐              │
        ▼          ▼         ▼         ▼              ▼
  ┌──────────┐ ┌──────┐ ┌───────┐ ┌──────┐ ┌──────────────┐
  │ AGENT 01 │ │AGENT │ │AGENT  │ │AGENT │ │  AGENT 05    │
  │Physical  │ │  02  │ │  03   │ │  04  │ │Infrastructure│
  │Security  │ │ CRM  │ │Cloud  │ │ ERP  │ │  Portfolio   │
  └────┬─────┘ └──┬───┘ └───┬───┘ └──┬───┘ └──────┬───────┘
       │          │         │         │             │
       └──────────┴─────────┴─────────┴─────────────┘
                            │
              ┌─────────────▼──────────────┐
              │        SHARED ENGINE        │
              ├────────────────────────────┤
              │  status_report.rs          │
              │  risk_tracker.rs           │
              │  milestone_tracker.rs      │
              │  vendor_followup.rs        │
              │  stakeholder_update.rs     │
              │  security_inspector.rs     │
              └─────────────┬──────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
  ┌─────────────┐   ┌──────────────┐   ┌─────────────┐
  │ DATA LAYER  │   │SECURITY LAYER│   │OUTPUT LAYER │
  │  (TOML)     │   │  (Math Model)│   │  (Markdown) │
  ├─────────────┤   ├──────────────┤   ├─────────────┤
  │project.toml │   │SecurityLevel │   │weekly_status│
  │risks.toml   │   │  u8 (0–10)   │   │risk_alert   │
  │vendors.toml │   │RiskScore     │   │vendor_fup   │
  │stakeholders │   │  prob × imp  │   │milestone_rpt│
  │  .toml      │   │CompliancePct │   │exec_summary │
  └─────────────┘   └──────────────┘   └─────────────┘
```

---

## Component Descriptions

### TPM Command Center
The human operator — the Technical Project Manager. Interacts exclusively through the CLI. Reviews generated markdown reports and acts on them (vendor outreach, stakeholder emails, escalations).

### tpm CLI (Rust / Clap)
The single entrypoint. Parses commands and dispatches to one or all agents. Runs agents concurrently via `tokio::spawn` when `run-all` is invoked.

### Generalist Agent Layer
Any project — technical or non-technical, any industry — can be run as a `GeneralistAgent`. Its identity, task set, and behavior are entirely config-driven from `data/<project>/agent_config.toml`. No code changes required to onboard a new engagement. The `tpm new` command scaffolds TOML stubs for any scale.

### Five Domain Agents (Pre-Baked Generalist Instances)
The five domain agents (Physical Security, CRM, Cloud Migration, ERP, Infrastructure) are pre-configured `GeneralistAgent` instances with domain-specific task sets baked into their `agent_config.toml` files. They are not deprecated — they remain the canonical agents for the manufacturing engagement. Each agent:
- Loads its own project state from TOML files
- Runs a set of domain-specific + shared tasks (gated by `project_scale`)
- Returns a `Vec<Report>` of generated reports
- Writes reports to `outputs/<project>/`

Agents run **fully in parallel** with no shared mutable state. `tpm run-all` discovers all projects automatically — both domain and generalist — by scanning `data/`.

### Shared Engine
Reusable task functions used by all five agents. Every function is a **pure function**: takes `&ProjectState`, returns `Report` or `Option<Report>`. No side effects. Fully testable.

### Security Layer
Math-based security model. No if/then chains. Security clearance level is a `u8` scalar (0–10). All access checks, risk scoring, and compliance gap calculations are arithmetic expressions. See `02-security-model.md`.

### Data Layer
Human-editable TOML files. The TPM updates these files as projects evolve. Agents re-read on every run — no caching, always current.

### Output Layer
Typed `Report` structs rendered to markdown. Files are timestamped and written to `outputs/<project>/`. All outputs are append-only (no file is overwritten — each run produces new dated files).

---

## User Journey

```
MONDAY MORNING
──────────────────────────────────────────────────────────────

  TPM opens terminal
       │
       ▼
  $ tpm run-all
       │
       ├──► Agent 01 (Physical Security) ──► loads data ──► reports
       ├──► Agent 02 (CRM)               ──► loads data ──► reports
       ├──► Agent 03 (Cloud Migration)   ──► loads data ──► reports
       ├──► Agent 04 (ERP)               ──► loads data ──► reports
       ├──► Agent 05 (Infrastructure)    ──► loads data ──► reports
       ├──► hello_world_test             ──► loads data ──► 1 report
       ├──► small_project                ──► loads data ──► 2 reports
       ├──► medium_project               ──► loads data ──► reports
       └──► enterprise_project           ──► loads data ──► reports
                    │ (ALL projects run in parallel via tokio)
                    │ (domain agents and generalist projects alike)
                    ▼
         Console summary printed:
         ✓ Physical Security  — 3 reports written
         ✓ CRM               — 4 reports written
         ⚠ Cloud Migration   — RISK ALERT: budget burn >80%
         ✓ ERP               — 5 reports written
         ✓ Infrastructure    — resource contention detected
         ✓ hello_world_test  — 1 report written
         ✓ small_project     — 2 reports written
         ⚠ medium_project    — RISK ALERT: IT Lead role unfilled
         ⚠ enterprise_project — RISK ALERT: DPA compliance exposure


ONBOARDING A NEW PROJECT
──────────────────────────────────────────────────────────────

  New client engagement arrives
       │
       ▼
  $ tpm new company_offsite --scale small --type non-technical
       │
       ▼
  TOML stubs created in data/company_offsite/
       │
       ▼
  TPM fills in project name, milestones, stakeholders
       │
       ▼
  $ tpm validate company_offsite   ← confirms TOML is valid
       │
       ▼
  $ tpm run company_offsite        ← first reports generated


DURING THE WEEK
──────────────────────────────────────────────────────────────

  Vendor misses a deadline
       │
       ▼
  TPM updates vendors.toml
       │
       ▼
  $ tpm run cloud-migration --tasks vendor-followup
       │
       ▼
  Vendor follow-up report generated with contact + action items
       │
       ▼
  TPM copies into email and sends


  New risk identified
       │
       ▼
  TPM adds entry to risks.toml
       │
       ▼
  $ tpm status erp
       │
       ▼
  Console shows: risk score, overdue milestones, budget burn %,
                 security compliance posture


BEFORE STAKEHOLDER MEETING
──────────────────────────────────────────────────────────────

  $ tpm run erp --tasks stakeholder-update
       │
       ▼
  Three tailored briefs generated:
  ├──► Executive (1-page RAG + 3 bullets)
  ├──► Management (milestones + financials + risk summary)
  └──► Operational (full detail: tasks, vendors, all risks)


FRIDAY CLOSE-OUT
──────────────────────────────────────────────────────────────

  $ tpm overdue
       │
       ▼
  Single view across ALL 5 projects:

  ┌──────────────────┬───────────────────┬──────────┬──────────┐
  │ Project          │ Item              │ Type     │ Days Late│
  ├──────────────────┼───────────────────┼──────────┼──────────┤
  │ Cloud Migration  │ RISK-001          │ Risk     │ 6 days   │
  │ ERP              │ MS-007            │ Milestone│ 2 days   │
  │ Physical Security│ VEN-003 Follow-Up │ Vendor   │ 1 day    │
  │ Infrastructure   │ PO-112 Delivery   │ Hardware │ 4 days   │
  └──────────────────┴───────────────────┴──────────┴──────────┘

  TPM prioritizes outreach and escalations for the week
```

---

## Deployment Model

```
Local Machine (TPM Laptop)
├── tpm binary (compiled Rust)
├── data/
│   ├── physical_security/   ← Domain agent: pre-baked generalist config
│   ├── crm/
│   ├── cloud_migration/
│   ├── erp/
│   └── infrastructure/
│   ├── hello_world_test/    ← Generalist project: hello world scale
│   ├── small_project/       ← Generalist project: small scale
│   ├── medium_project/      ← Generalist project: medium scale
│   └── enterprise_project/  ← Generalist project: enterprise scale
│   └── <any_new_project>/   ← Drop here; tpm run-all picks it up automatically
├── outputs/                 ← Agents write reports here
│   ├── physical_security/
│   ├── crm/
│   ├── cloud_migration/
│   ├── erp/
│   └── infrastructure/
│   ├── hello_world_test/
│   ├── small_project/
│   ├── medium_project/
│   └── enterprise_project/
└── config/
    └── settings.toml        ← Thresholds, agent toggles, scale defaults
```

No server. No database. No cloud dependency. Runs fully offline. The `data/` and `outputs/` directories can be tracked in git for full audit history.

---

## Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Language | Rust | Performance, safety, single binary, no runtime |
| State format | TOML | Human-editable, readable, no tooling required |
| Report format | Markdown | Works in any editor, GitHub, Notion, email |
| Concurrency | tokio::spawn per agent | True parallelism, no shared mutable state |
| Security model | Math (u8 scalar) | No branching logic, easy to audit and tune |
| Output strategy | Append-only, dated files | Full audit trail, nothing overwritten |
| Task functions | Pure functions | Testable, no side effects, composable |
| No database | File system only | Zero dependencies, git-trackable, auditable |
| Generalist layer | Config-driven GeneralistAgent | Any project onboarded with TOML only — zero code changes |
| Scale gating | ProjectScale enum comparison | Pure switch — no hidden conditionals |
| Project discovery | Filesystem scan of data/ | Drop a directory and it runs — no registration needed |
| Domain agents | Pre-baked generalist configs | Backward compatible; no disruption to existing engagement |
