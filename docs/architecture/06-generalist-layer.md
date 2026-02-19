[IDX]  2026-02-19.C19
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   architecture | generalist-layer | config-driven
[CONF] 0.93
[REVIEW] false

---

# TPM Agent System — Generalist Layer

> **Purpose:** Enable any project, any industry, any scale — with zero code changes
> **Key Principle:** Domain knowledge lives in TOML config, not in Rust code

---

## What the Generalist Layer Is

The generalist layer is a config-driven agent model where a single `GeneralistAgent` Rust struct handles any project by reading its identity, task set, and behavior from TOML files. The existing five domain agents (01–05) are **not replaced** — they are pre-configured instances of this same structure with domain-specific task sets baked into their `agent_config.toml` files.

Before the generalist layer, onboarding a new engagement required writing new Rust code. After the generalist layer, onboarding a new project requires only creating TOML files.

---

## System Diagram

```
                ┌──────────────────────────────────────┐
                │       GENERALIST AGENT LAYER         │
                │  (any project, any scale, any        │
                │   industry — config-driven)          │
                └──────────────────┬───────────────────┘
                                   │
                ┌──────────────────▼───────────────────┐
                │          tpm CLI (Rust / Clap)        │
                │  run · run-all · new · status         │
                │  overdue · validate                   │
                └──┬────┬────┬────┬────┬────────────────┘
                   │    │    │    │    │
        ┌──────────┘    │    │    │    └───────────────┐
        │          ┌────┘    │    └────┐               │
        ▼          ▼         ▼         ▼               ▼
  ┌──────────┐ ┌──────┐ ┌───────┐ ┌──────┐ ┌──────────────┐
  │ AGENT 01 │ │AGENT │ │AGENT  │ │AGENT │ │  AGENT 05    │
  │Physical  │ │  02  │ │  03   │ │  04  │ │Infrastructure│
  │Security  │ │ CRM  │ │Cloud  │ │ ERP  │ │  Portfolio   │
  │          │ │      │ │       │ │      │ │              │
  │(pre-baked│ │(pre- │ │(pre-  │ │(pre- │ │(pre-baked    │
  │generalist│ │baked)│ │baked) │ │baked)│ │ generalist)  │
  └──────────┘ └──────┘ └───────┘ └──────┘ └──────────────┘

  + any number of GeneralistAgent instances for other projects
  (hello_world_test, small_project, medium_project, enterprise_project, ...)
```

---

## Rust Design

### The `Agent` Trait (Unchanged)

```rust
trait Agent {
    fn name(&self) -> &str;
    fn run(&self, state: &ProjectState) -> Vec<Report>;
    fn validate(&self, state: &ProjectState) -> Result<(), Vec<ValidationError>>;
}
```

### `GeneralistAgent` Struct

```rust
struct GeneralistAgent {
    project_dir: PathBuf,         // data/<project>/
    config: AgentConfig,          // loaded from agent_config.toml
    scale: ProjectScale,          // HelloWorld | Small | Medium | Enterprise
    project_type: ProjectType,    // Technical | NonTechnical | Mixed
}

impl Agent for GeneralistAgent {
    fn run(&self, state: &ProjectState) -> Vec<Report> {
        self.config.tasks
            .iter()
            .filter(|task| task.is_active_at(self.scale))
            .filter_map(|task| task.execute(state))
            .collect()
    }
}
```

### `ProjectScale` Enum

```rust
#[derive(Deserialize, PartialEq, PartialOrd)]
enum ProjectScale {
    HelloWorld,
    Small,
    Medium,
    Enterprise,
}

impl ProjectScale {
    fn allows_task(&self, task: &TaskId) -> bool {
        TASK_SCALE_MAP[task] <= *self
    }
}
```

Task gating is a pure comparison — `scale >= task_minimum_scale`. No hidden conditionals, no feature flags, no runtime switches.

---

## `agent_config.toml` Structure

Every project has an `agent_config.toml` file. Domain agents (01–05) ship with their config pre-populated. Generalist projects create this file via `tpm new` or manually.

```toml
# data/<project>/agent_config.toml

agent_name = "Quarterly All-Hands Event"
agent_version = "1.0.0"
project_type = "non_technical"    # technical | non_technical | mixed
description  = "Plan and execute the Q2 department all-hands meeting"

# Tasks to activate (subset of all available tasks)
# The engine enforces scale gating — tasks above your scale are silently skipped
tasks = [
    "project_status_report",
    "overdue_check",
    "risk_summary",
    "vendor_followup",
    "stakeholder_brief_mgmt",
    "sprint_report",
]

# Optional overrides — override default thresholds from config/settings.toml
[overrides]
risk_alert_threshold       = 6
milestone_at_risk_days     = 10
vendor_followup_warn_days  = 3
compliance_alert_days      = 30
```

Domain agents (01–05) have identical `agent_config.toml` files, pre-populated with their full domain-specific task lists. The domain agents differ from generic generalist projects only in the content of this file — not in the Rust code.

---

## CLI Commands

### Existing Commands (Unchanged)

```
tpm run <project>              Run all tasks for one project
tpm run-all                    Run all projects in parallel (domain + generalist)
tpm status <project>           Print console status summary
tpm overdue                    Show all overdue items across every project
tpm validate <project>         Validate TOML files and agent config
```

### New Command: `tpm new`

Scaffolds a new generalist project with stub TOML files appropriate for the requested scale.

```
tpm new <project-name> --scale <hello-world|small|medium|enterprise>
                        --type  <technical|non-technical|mixed>
```

**What `tpm new` creates:**

| Scale | Files Created |
|---|---|
| `hello-world` | `project.toml`, `stakeholders.toml`, `agent_config.toml` |
| `small` | `project.toml`, `stakeholders.toml`, `vendors.toml`, `risks.toml`, `agent_config.toml` |
| `medium` | all 4 TOML data files + `agent_config.toml` |
| `enterprise` | all 4 TOML data files + `agent_config.toml` |

**Example:**

```
$ tpm new company_offsite --scale small --type non-technical

Created: data/company_offsite/project.toml
Created: data/company_offsite/stakeholders.toml
Created: data/company_offsite/vendors.toml
Created: data/company_offsite/risks.toml
Created: data/company_offsite/agent_config.toml

Next steps:
  1. Edit data/company_offsite/project.toml — fill in name, dates, milestones
  2. Edit data/company_offsite/stakeholders.toml — add stakeholder entries
  3. Run: tpm validate company_offsite
  4. Run: tpm run company_offsite
```

The scaffold includes commented-out example entries so the TPM understands the expected format.

---

## How Domain Agents (01–05) Relate to the Generalist Layer

The five domain agents are not deprecated or removed. They are the canonical pre-configured generalist agents for the manufacturing client's five initiatives. Conceptually:

```
Agent 01 (Physical Security)  =  GeneralistAgent {
    config: AgentConfig::load("data/physical_security/agent_config.toml"),
    scale: ProjectScale::Enterprise,
    project_type: ProjectType::Technical,
}

Agent 02 (CRM)                =  GeneralistAgent {
    config: AgentConfig::load("data/crm/agent_config.toml"),
    scale: ProjectScale::Medium,
    project_type: ProjectType::Technical,
}
// ... and so on for agents 03–05
```

In the Rust implementation, the domain agent structs (`PhysicalSecurityAgent`, `CrmAgent`, etc.) can either:
- Continue to exist as type aliases or thin wrappers around `GeneralistAgent`, or
- Be refactored to `GeneralistAgent` instances during the scaffolding sprint

Both approaches are valid. The doc and data layer does not depend on which Rust approach is chosen.

---

## Project Discovery

`tpm run-all` discovers all projects automatically:

```rust
fn discover_projects(data_dir: &Path) -> Vec<Box<dyn Agent>> {
    // Reads every subdirectory of data/ that contains project.toml
    // Returns GeneralistAgent for each; domain agents are a subset
}
```

This means adding a new project requires only creating `data/<project-name>/` with valid TOML files. No CLI registration, no code changes, no restart required.

---

## Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Agent structure | Same `Agent` trait, config-driven | No new interfaces; domain agents become pre-baked generalist configs |
| Scale driver | `project_scale` in `project.toml` | Single source of truth; changes behavior without code change |
| Task gating | `ProjectScale` comparison per task | Pure switch — no hidden conditionals |
| `tpm new` command | Scaffolds TOML stubs | Zero-friction onboarding for any new project |
| Non-technical support | No code changes needed | The engine is domain-agnostic; domain knowledge only lived in agent docs |
| Project discovery | Filesystem scan of `data/` | Zero config registration; drop a directory and it runs |
| Domain agent preservation | Kept as pre-configured instances | Backward compatibility; no disruption to existing manufacturing engagement |
