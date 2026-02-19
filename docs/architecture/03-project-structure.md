[IDX]  2026-02-19.C16
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   architecture | project-structure | file-layout
[CONF] 0.93
[REVIEW] false

---

# TPM Agent System — Full Project Structure

> Rust project: `tpm-agents/`
> Binary name: `tpm`

---

## Directory Tree

```
tpm-agents/
│
├── Cargo.toml                          # Dependencies and binary config
├── Cargo.lock
│
├── config/
│   └── settings.toml                  # Thresholds, agent toggles, output paths
│
├── data/                              # TPM edits these — one folder per initiative
│   ├── physical_security/
│   │   ├── project.toml
│   │   ├── risks.toml
│   │   ├── vendors.toml
│   │   └── stakeholders.toml
│   ├── crm/
│   │   ├── project.toml
│   │   ├── risks.toml
│   │   ├── vendors.toml
│   │   └── stakeholders.toml
│   ├── cloud_migration/
│   │   ├── project.toml
│   │   ├── risks.toml
│   │   ├── vendors.toml
│   │   └── stakeholders.toml
│   ├── erp/
│   │   ├── project.toml
│   │   ├── risks.toml
│   │   ├── vendors.toml
│   │   └── stakeholders.toml
│   └── infrastructure/
│       ├── project.toml
│       ├── risks.toml
│       ├── vendors.toml
│       └── stakeholders.toml
│
├── outputs/                           # Agents write reports here (append-only)
│   ├── physical_security/
│   ├── crm/
│   ├── cloud_migration/
│   ├── erp/
│   └── infrastructure/
│
└── src/
    ├── main.rs                        # CLI entrypoint — tokio::main, agent dispatch
    ├── cli.rs                         # Clap definitions: commands, flags, AgentId enum
    ├── config.rs                      # Settings loader (config/settings.toml)
    │
    ├── models/                        # All data types — shared across agents
    │   ├── mod.rs
    │   ├── project.rs                 # Project, Phase, ProjectStatus
    │   ├── milestone.rs               # Milestone, MilestoneStatus
    │   ├── risk.rs                    # Risk, RiskLevel, RiskCategory, RiskStatus
    │   ├── vendor.rs                  # Vendor, VendorDeliverable, FollowUp
    │   ├── stakeholder.rs             # Stakeholder, DetailLevel, UpdateFrequency
    │   ├── report.rs                  # Report, ReportSection, SectionContent
    │   ├── security.rs                # SecurityLevel (u8), ComplianceState, SecurityFinding
    │   └── errors.rs                  # TpmError (thiserror)
    │
    ├── state/                         # Load TOML files into typed structs
    │   ├── mod.rs
    │   ├── loader.rs                  # async fn load_project_state(path) -> ProjectState
    │   └── project_state.rs           # ProjectState — aggregates all loaded data
    │
    ├── agents/                        # One file per initiative
    │   ├── mod.rs                     # Agent trait definition
    │   ├── physical_security.rs       # Agent 01
    │   ├── crm.rs                     # Agent 02
    │   ├── cloud_migration.rs         # Agent 03
    │   ├── erp.rs                     # Agent 04
    │   └── infrastructure.rs          # Agent 05
    │
    ├── tasks/                         # Pure functions — shared report generation logic
    │   ├── mod.rs
    │   ├── status_report.rs           # Weekly status report builder
    │   ├── risk_tracker.rs            # Risk alert report (math thresholds)
    │   ├── vendor_followup.rs         # Vendor follow-up report
    │   ├── milestone_tracker.rs       # Milestone health table
    │   ├── stakeholder_update.rs      # Audience-tailored briefs
    │   └── security_inspector.rs      # Security compliance posture report
    │
    └── output/                        # Report rendering and file writing
        ├── mod.rs
        ├── markdown.rs                # Render Report → .md string
        ├── plaintext.rs               # Render Report → .txt string
        └── writer.rs                  # Write timestamped files to outputs/
```

---

## Cargo.toml

```toml
[package]
name = "tpm-agents"
version = "0.1.0"
edition = "2021"
description = "TPM automation agents — any client, any industry, any security level"

[[bin]]
name = "tpm"
path = "src/main.rs"

[dependencies]
# Async runtime
tokio        = { version = "1",   features = ["full"] }
async-trait  = "0.1"

# CLI
clap         = { version = "4",   features = ["derive", "color"] }

# Serialization
serde        = { version = "1",   features = ["derive"] }
toml         = "0.8"

# Dates
chrono       = { version = "0.4", features = ["serde"] }

# Error handling
anyhow       = "1"
thiserror    = "2"

# Logging
tracing               = "0.1"
tracing-subscriber    = { version = "0.3", features = ["env-filter"] }

# Terminal output
colored      = "2"
comfy-table  = "7"

[dev-dependencies]
tokio-test   = "0.4"
tempfile     = "3"
```

---

## CLI Commands

```bash
# Run all five agents concurrently
tpm run-all

# Run a single agent (all its tasks)
tpm run physical-security
tpm run crm
tpm run cloud-migration
tpm run erp
tpm run infrastructure

# Run specific tasks for one agent
tpm run erp --tasks risk-alert,milestone-tracker
tpm run crm --tasks stakeholder-update,vendor-followup

# Dry run — print what would be generated, no files written
tpm run-all --dry-run

# Console status summary (no file output)
tpm status
tpm status cloud-migration

# List all overdue items across all projects
tpm overdue

# Validate TOML data files
tpm validate
tpm validate erp

# Output format override
tpm run erp --format plaintext

# Custom data / output directories
tpm run-all --data-dir /path/to/data --output-dir /path/to/reports

# Verbose logging
tpm run cloud-migration --verbose
```

---

## Concurrency Model

```
$ tpm run-all
       │
       ▼
tokio::main (single-threaded scheduler or multi-thread)
       │
       ├── tokio::spawn ──► Agent 01 task
       │                     └── load_project_state() [async I/O]
       │                     └── run tasks [CPU — pure functions]
       │                     └── write_report() x N [async I/O]
       │
       ├── tokio::spawn ──► Agent 02 task  (same pattern)
       ├── tokio::spawn ──► Agent 03 task
       ├── tokio::spawn ──► Agent 04 task
       └── tokio::spawn ──► Agent 05 task
                │
                ▼
         join_all(handles)
                │
                ▼
         Print summary table
         Exit 0 (or 1 if any agent failed)
```

**No shared mutable state between agents.**
Each agent owns its `ProjectState` exclusively.
All I/O is async. All computation is synchronous pure functions.

---

## config/settings.toml

```toml
[thresholds]
risk_critical_score      = 6      # risk_score >= this → alert
budget_burn_pct          = 80     # spent/total >= this → alert
milestone_warning_days   = 14     # days remaining <= this → AMBER
risk_stale_days          = 7      # last_reviewed gap > this → STALE
compliance_gap_threshold = 0.20   # gap_score >= this → compliance alert
vendor_score_threshold   = 0.50   # vendor_security_score < this → flag
compliance_deadline_days = 30     # deadline within this many days → alert
go_live_warning_days     = 30     # days to go-live < this → readiness brief
steering_committee_days  = 7      # days to SC meeting < this → brief generated

[output]
default_format           = "markdown"   # "markdown" | "plaintext"
timestamp_filenames      = true

[agents.physical_security]
enabled      = true
clearance    = 7          # SecurityLevel u8 — FedRAMP High
data_dir     = "data/physical_security"
output_dir   = "outputs/physical_security"

[agents.crm]
enabled      = true
clearance    = 5          # FedRAMP Moderate
data_dir     = "data/crm"
output_dir   = "outputs/crm"

[agents.cloud_migration]
enabled      = true
clearance    = 7
data_dir     = "data/cloud_migration"
output_dir   = "outputs/cloud_migration"

[agents.erp]
enabled      = true
clearance    = 5
data_dir     = "data/erp"
output_dir   = "outputs/erp"

[agents.infrastructure]
enabled      = true
clearance    = 7
data_dir     = "data/infrastructure"
output_dir   = "outputs/infrastructure"
```
