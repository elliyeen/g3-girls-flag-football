[IDX]  2026-02-19.C21
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   architecture | memory-system | agent-state
[CONF] 0.91
[REVIEW] false

---

# TPM Agent System — Memory Architecture

> Three layers of persistent memory enabling agents to learn, know, and act at the right time.
> No ML frameworks. No neural networks. Pure Rust arithmetic — weighted scoring, frequency analysis, confidence updating.
> All memory is file-based TOML. Human-readable. TPM-editable. SHA-256 protected. Append-only audit trail.

---

## The Three Layers

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MEMORY ARCHITECTURE                              │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  LAYER 3 — PROCEDURAL MEMORY                                 │  │
│  │  "What sequence of actions produces the best outcome"        │  │
│  │  → Learned rules with confidence scores                      │  │
│  │  → Drives proactive action at the right time                 │  │
│  │  → Per-agent + shared across team                           │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                          ▲ reads + updates                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  LAYER 2 — SEMANTIC MEMORY                                   │  │
│  │  "What patterns hold across all projects and clients"        │  │
│  │  → Vendor reliability scores                                 │  │
│  │  → Risk materialization rates by category                   │  │
│  │  → Industry-specific timing patterns                         │  │
│  │  → Shared across all five agents                            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                          ▲ reads + updates                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  LAYER 1 — EPISODIC MEMORY                                   │  │
│  │  "What happened this sprint, this project"                   │  │
│  │  → Per-run snapshots: signals fired, risks detected          │  │
│  │  → Change detection: what is different from last time        │  │
│  │  → Source data for semantic pattern extraction               │  │
│  │  → Per-agent, rolling 90-day window                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Memory File Structure

```
memory/
│
├── shared/                              ← Shared across all five agents
│   ├── semantic_patterns.toml          ← Cross-project learned patterns
│   ├── shared_procedures.toml          ← Team-level learned rules
│   └── lessons_learned.toml            ← Human-readable lessons (TPM editable)
│
├── physical_security/                   ← Agent 01 private memory
│   ├── episodes.toml                   ← Run history (episodic)
│   ├── procedures.toml                 ← Agent-specific learned rules
│   └── vendor_memory.toml              ← Per-vendor reliability history
│
├── crm/                                 ← Agent 02 private memory
│   ├── episodes.toml
│   ├── procedures.toml
│   └── stakeholder_memory.toml         ← Per-stakeholder engagement history
│
├── cloud_migration/                     ← Agent 03 private memory
│   ├── episodes.toml
│   ├── procedures.toml
│   └── wave_memory.toml                ← Per-wave outcome history
│
├── erp/                                 ← Agent 04 private memory
│   ├── episodes.toml
│   ├── procedures.toml
│   └── module_memory.toml              ← Per-module delivery history
│
└── infrastructure/                      ← Agent 05 private memory
    ├── episodes.toml
    ├── procedures.toml
    └── hardware_memory.toml             ← Per-vendor hardware delivery history
```

---

## Learning Cycle (Every Run)

```
BEFORE AGENT RUNS
──────────────────────────────────────────────────────────────────────
  1. Read episodic memory       → Compare current state to last run
                                  Detect: new risks, resolved signals,
                                  milestone slippage, vendor changes
  2. Read semantic patterns     → Adjust alert thresholds based on
                                  learned patterns for this client type,
                                  vendor, risk category
  3. Read procedural memory     → Identify proactive actions to take
                                  before the TPM even asks
                                  (e.g. auto-generate steering brief
                                  because ERP risk always escalates
                                  before Q-end)

AGENT RUNS — generates reports, fires signals

AFTER AGENT RUNS
──────────────────────────────────────────────────────────────────────
  4. Write new episode          → Snapshot of current state: what was
                                  detected, what was generated
  5. Update domain memory       → Vendor delivered on time? Update
                                  reliability score. Risk resolved?
                                  Record resolution type and time.
  6. Propose pattern updates    → Pass frequency data to Orchestrator

ORCHESTRATOR POST-FLIGHT
──────────────────────────────────────────────────────────────────────
  7. Extract patterns           → Aggregate episode data across all agents
  8. Update semantic patterns   → Weighted moving average update
  9. Update shared procedures   → Confidence score adjustment based
                                  on resolution outcomes
 10. Write lessons_learned.toml → Human-readable summary of what
                                  the team learned this cycle
```

---

## Layer 1 — Episodic Memory

**What it is:** A timestamped log of every agent run. Each episode captures the full state snapshot — what was detected, what was generated, what changed from the previous run.

**What it enables:** Change detection. The agent knows the difference between "this risk existed last week too" vs. "this risk is new today." It knows which vendors improved and which got worse. It knows if a milestone has been slipping for 3 consecutive runs.

### Episode Record Format

```toml
# memory/cloud_migration/episodes.toml

[[episodes]]
id               = "EP-CLD-0047"
run_timestamp    = "2026-02-16T08:00:00Z"
project_id       = "cloud_migration"
overall_status   = "at_risk"
budget_burn_pct  = 83.2
phase            = "Phase 2: Pilot Wave Execution"

  [episodes.milestones]
  total        = 8
  complete     = 3
  overdue      = 1
  at_risk      = 2
  overdue_ids  = ["MS-003"]
  at_risk_ids  = ["MS-004", "MS-005"]

  [episodes.risks]
  total        = 6
  critical     = 2
  new_this_run = 1               # Did not exist in EP-CLD-0046
  resolved_this_run = 0
  critical_ids = ["RISK-001", "RISK-002"]
  new_ids      = ["RISK-006"]

  [episodes.signals]
  fired        = ["SIG-CLD-005"]
  received     = ["SIG-INF-001"]
  resolved     = []

  [episodes.vendors]
  total        = 3
  delayed      = 1
  disputed     = 0
  delayed_ids  = ["VEN-001"]

  [episodes.reports_generated]
  count        = 4
  types        = ["weekly_status", "wave_tracker", "budget_alert", "adr_summary"]

  [episodes.security]
  compliance_pct     = 91.0
  open_findings      = 1
  vendor_alerts      = 0
  clearance_level    = 7

  [episodes.changes_from_previous]
  budget_burn_delta   = +3.2         # Up 3.2% from last run
  new_risks           = 1
  risks_resolved      = 0
  milestones_slipped  = 1            # MS-003 moved from at_risk to overdue
  vendor_status_change = "VEN-001: active → delayed"
```

### Consecutive Slip Detection (Math)

The agent reads the last N episodes to detect persistent problems:

```
milestone_slip_count = count of consecutive episodes where MS-003.status == "overdue"

If milestone_slip_count >= 3:
  → escalation_flag = true
  → generate escalation section in report
  → propose new RISK_ESCALATION signal

vendor_late_streak = count of consecutive episodes where VEN-001.status == "delayed"

If vendor_late_streak >= 2:
  → vendor_reliability_score decreases (see semantic memory)
  → vendor_follow_up priority upgrades to "critical"
```

### Episode Retention Policy

```
Active window:   Last 90 days → loaded on every run
Archive window:  90–365 days  → loaded on demand (tpm analyze --history)
Deep archive:    365+ days    → compressed, preserved for audit
```

---

## Layer 2 — Semantic Memory

**What it is:** Cross-project, cross-client patterns extracted from episode data over time. The agent's long-term knowledge base — what is generally true, not just what happened today.

**What it enables:** Smarter thresholds. If the semantic memory shows that Vendor X has a 70% on-time delivery rate, the agent raises the alert threshold for that vendor 2 weeks earlier than the default. If Budget risks in Cloud Migration projects always materialize in Phase 2, the agent starts watching budget more closely the moment Phase 2 begins.

### Semantic Pattern Types

```
┌──────────────────────┬─────────────────────────────────────────────┐
│ Pattern Type         │ What It Captures                            │
├──────────────────────┼─────────────────────────────────────────────┤
│ VendorPattern        │ On-time rate, avg delay days, dispute freq  │
│ RiskPattern          │ Materialization rate by category + phase    │
│ MilestonePattern     │ Slip probability by owner, phase, type      │
│ BudgetPattern        │ Burn rate trajectory by project phase       │
│ StakeholderPattern   │ Engagement frequency, escalation history    │
│ IndustryPattern      │ Timing constraints by client industry       │
│ SignalPattern        │ Which signals consistently precede failures │
└──────────────────────┴─────────────────────────────────────────────┘
```

### Semantic Pattern File Format

```toml
# memory/shared/semantic_patterns.toml

file_checksum = "b7e2a1f9..."
last_updated  = "2026-02-16T09:00:00Z"
episode_count = 147              # Total episodes processed to build these patterns

# ── VENDOR PATTERNS ──────────────────────────────────────────────────

[[vendor_patterns]]
vendor_id          = "VEN-001"
vendor_name        = "Acme Telecom"
deliverable_count  = 12          # Total deliverables tracked across all projects
on_time_count      = 7
late_count         = 5
avg_delay_days     = 8.4
max_delay_days     = 21
dispute_count      = 0
reliability_score  = 0.583       # on_time_count / deliverable_count
trend              = "declining" # Last 3 deliverables all late
recommended_buffer_days = 10    # Add this buffer when scheduling milestones with this vendor
last_updated       = "2026-02-16T09:00:00Z"

# ── RISK PATTERNS ─────────────────────────────────────────────────────

[[risk_patterns]]
category           = "budget"
project_phase      = "phase_2"
materialization_rate = 0.72     # 72% of budget risks in phase 2 actually escalate
avg_days_to_escalate = 18       # From "open" to "escalation_required"
early_warning_days   = 25       # Flag budget risks 25 days earlier in phase 2
sample_size          = 29

[[risk_patterns]]
category           = "vendor"
project_phase      = "any"
materialization_rate = 0.61
avg_days_to_escalate = 12
early_warning_days   = 14
sample_size          = 41

# ── MILESTONE PATTERNS ────────────────────────────────────────────────

[[milestone_patterns]]
milestone_type     = "wave_cutover"
avg_slip_days      = 6.2        # Wave cutover milestones slip an average 6 days
slip_probability   = 0.54       # 54% of wave cutovers slip
leading_indicator  = "network_circuit_delayed"  # This signal precedes slip 83% of the time
sample_size        = 22

[[milestone_patterns]]
milestone_type     = "uat_signoff"
avg_slip_days      = 4.1
slip_probability   = 0.38
leading_indicator  = "defect_count_high"
sample_size        = 31

# ── BUDGET PATTERNS ───────────────────────────────────────────────────

[[budget_patterns]]
project_type       = "cloud_migration"
phase              = "phase_2"
typical_burn_pct   = 71.0       # Typical burn at start of phase 2
alert_trigger_pct  = 78.0       # This project type alerts at 78%, not default 80%
overrun_rate       = 0.41       # 41% of cloud migrations exceed budget
sample_size        = 17

# ── INDUSTRY PATTERNS ─────────────────────────────────────────────────

[[industry_patterns]]
industry           = "retail"
blackout_start     = "11-01"    # Nov 1 — no changes November through January
blackout_end       = "01-31"
cutover_risk_pct   = 0.89       # 89% of cutover attempts during blackout fail
recommended_action = "flag_milestone_if_due_during_blackout"

[[industry_patterns]]
industry           = "healthcare"
typical_go_live_delay = 22      # Healthcare go-lives average 22 days late
change_resistance_rate = 0.67   # 67% encounter significant user resistance
recommended_action = "extend_training_window_by_2_weeks"

# ── SIGNAL PATTERNS ───────────────────────────────────────────────────

[[signal_patterns]]
signal_type         = "BLOCKER"
from_agent          = "infrastructure"
precedes_event      = "milestone_slip"
precedes_rate       = 0.78      # 78% of BLOCKER signals precede a milestone slip
avg_days_before     = 11        # On average 11 days before the slip occurs
recommended_action  = "escalate_milestone_to_amber_immediately"
```

### How Semantic Patterns Adjust Agent Behavior

Patterns feed directly into threshold calculations. No if/then — math only:

```
Default milestone warning days:        14
Vendor reliability score (Acme):       0.583
Reliability adjustment factor:         (1.0 - 0.583) × 14 = +5.8 days

Adjusted warning days for Acme milestones:  14 + 5.8 = ~20 days

Agent automatically warns 20 days ahead for any milestone
involving Acme Telecom — without TPM adjusting any config.
```

```
Default budget alert threshold:        80%
Cloud migration phase 2 adjustment:    alert_trigger_pct from pattern = 78%

Agent uses 78% threshold for this project in phase 2.
Budget alert fires 2% earlier than it would by default.
```

---

## Layer 3 — Procedural Memory

**What it is:** Learned rules that tell each agent what to do, when to do it, and in what order — based on what has worked before. Each rule has a confidence score that grows with successful outcomes and shrinks with false alarms or missed calls.

**What it enables:** Proactive action. The agent doesn't wait for the TPM to ask. It reads the situation, matches it to a known procedure, and executes the right action at the right time — because it has learned that this pattern leads to a good outcome.

### Confidence Score Model (Math)

```
confidence = success_count / (success_count + failure_count)

Weighted toward recency using exponential decay:

confidence_weighted = Σ(outcome_i × decay^(days_ago_i)) / Σ(decay^(days_ago_i))

Where:
  outcome_i  = 1.0 (success) or 0.0 (failure)
  decay      = 0.95 (5% decay per day — recent outcomes matter more)
  days_ago_i = how many days ago episode i occurred

Outcome Types:
  SUCCESS    → TPM acted on report, signal resolved within 7 days      (+1.0)
  PARTIAL    → Signal resolved but took > 7 days                       (+0.5)
  MISS       → Agent did NOT fire, but problem occurred anyway          (-1.0)
  FALSE_ALARM→ Agent fired, TPM marked as not actionable               (-0.5)
  PENDING    → Fired, not yet resolved                                 (0.0, wait)
```

### Procedure File Format

```toml
# memory/shared/shared_procedures.toml

file_checksum = "c9d3e7a2..."
last_updated  = "2026-02-16T09:00:00Z"

[[procedures]]
id              = "PROC-001"
name            = "Early Escalation: Vendor Blocker + Tight Milestone"
trigger_pattern = """
  signal.type == BLOCKER
  AND signal.from_agent == infrastructure
  AND target_milestone.days_remaining <= 14
"""
action_sequence = [
  "upgrade_milestone_to_red",
  "generate_escalation_brief",
  "fire_RISK_ESCALATION_signal",
  "add_vendor_followup_to_top_of_report",
]
confidence        = 0.87
success_count     = 31
failure_count     = 5
false_alarm_count = 2
last_triggered    = "2026-02-09"
last_outcome      = "SUCCESS"
notes             = "Consistently effective. 87% of the time escalating early gets vendor moving within 5 days."

[[procedures]]
id              = "PROC-002"
name            = "Pre-Steering Committee: ERP Risk Surge"
trigger_pattern = """
  agent == erp
  AND steering_committee.days_remaining <= 7
  AND risks.critical_count >= 2
"""
action_sequence = [
  "generate_steering_committee_brief",
  "generate_risk_register",
  "add_executive_risk_summary_to_brief",
  "fire_AUDIT_ACTIVATION_signal_to_all",
]
confidence        = 0.91
success_count     = 22
failure_count     = 2
false_alarm_count = 1
last_triggered    = "2026-02-09"
last_outcome      = "SUCCESS"

[[procedures]]
id              = "PROC-003"
name            = "Go-Live Risk: Infrastructure Dependency Unresolved"
trigger_pattern = """
  agent == crm
  AND go_live.days_remaining <= 14
  AND inbound_signals.contains(BLOCKER, from=infrastructure)
"""
action_sequence = [
  "mark_go_live_readiness_as_AT_RISK",
  "surface_blocker_at_top_of_go_live_report",
  "generate_escalation_brief_for_sponsor",
  "fire_GO_LIVE_RISK_signal",
]
confidence        = 0.79
success_count     = 14
failure_count     = 4
false_alarm_count = 3
last_triggered    = "2026-01-12"
last_outcome      = "PARTIAL"
notes             = "Confidence dropped from 0.84 — 3 recent cases where infra resolved itself before go-live."

[[procedures]]
id              = "PROC-004"
name            = "Security Audit Activation: All Agents"
trigger_pattern = """
  any_agent.compliance_deadline.days_remaining <= 30
  OR inbound_signals.contains(AUDIT_ACTIVATION)
"""
action_sequence = [
  "run_security_inspector_task",
  "generate_compliance_posture_report",
  "generate_poam_update",
  "fire_AUDIT_ACTIVATION_signal_to_all_if_not_already_fired",
]
confidence        = 0.94
success_count     = 47
failure_count     = 3
false_alarm_count = 1
last_triggered    = "2026-02-16"
last_outcome      = "PENDING"

[[procedures]]
id              = "PROC-005"
name            = "Budget Burn: Cross-Project Check"
trigger_pattern = """
  agent.budget_burn_pct >= semantic_pattern.budget_alert_trigger_pct
  AND project.phase == "phase_2"
"""
action_sequence = [
  "generate_budget_alert",
  "fire_BUDGET_ALERT_signal",
  "cross_project_budget_summary_requested",
]
confidence        = 0.82
success_count     = 18
failure_count     = 4
false_alarm_count = 2
last_triggered    = "2026-02-16"
last_outcome      = "PENDING"

[[procedures]]
id              = "PROC-006"
name            = "Milestone Consecutive Slip: Escalate"
trigger_pattern = """
  milestone.consecutive_overdue_runs >= 3
  AND milestone.owner == same_owner_across_runs
"""
action_sequence = [
  "escalate_milestone_flag_to_critical",
  "generate_owner_accountability_note",
  "fire_RISK_ESCALATION_signal",
  "add_to_steering_committee_brief_if_within_7_days",
]
confidence        = 0.76
success_count     = 12
failure_count     = 4
false_alarm_count = 4
last_triggered    = "2026-01-26"
last_outcome      = "SUCCESS"
notes             = "Some false alarms when owner was on approved leave. Consider adding leave calendar."
```

### Per-Agent Procedures

Each agent also has private procedures specific to its domain:

```toml
# memory/erp/procedures.toml

[[procedures]]
id              = "PROC-ERP-001"
name            = "Module Sign-Off Stall: Config Complete But No Sign-Off"
trigger_pattern = """
  module.config_complete == true
  AND module.sign_off_date == null
  AND days_since_config_complete >= 7
"""
action_sequence = [
  "generate_uat_reminder_for_module_owner",
  "add_to_weekly_report_as_action_item",
  "escalate_if_days_since_config_complete >= 14",
]
confidence = 0.88
success_count = 19
failure_count = 2
false_alarm_count = 1

[[procedures]]
id              = "PROC-ERP-002"
name            = "Data Migration Stall: Quality Below Threshold Late in Project"
trigger_pattern = """
  data_migration.quality_score < 0.95
  AND project.target_end_date.days_remaining <= 60
"""
action_sequence = [
  "generate_data_migration_scorecard",
  "fire_RISK_ESCALATION_signal",
  "add_data_remediation_action_items",
  "notify_data_migration_lead_in_report",
]
confidence = 0.91
success_count = 11
failure_count = 1
false_alarm_count = 0
```

---

## How the Three Layers Work Together (Full Flow)

```
$ tpm run cloud-migration

BEFORE AGENT RUNS
─────────────────────────────────────────────────────────
  Agent reads episodes.toml (Layer 1)
       │
       ├── Last episode: budget_burn = 80.0%
       ├── Current state: budget_burn = 83.2%
       └── Change detected: +3.2% — SIGNIFICANT INCREASE

  Agent reads semantic_patterns.toml (Layer 2)
       │
       ├── Cloud migration phase 2 budget alert threshold: 78%
       ├── Already above threshold — confirm alert needed
       ├── Vendor Acme Telecom reliability score: 0.583
       └── Adjust Acme milestone warning to 20 days (not default 14)

  Agent reads shared_procedures.toml (Layer 3)
       │
       ├── PROC-005 matches: budget >= 78% AND phase_2
       │   Confidence: 0.82 → EXECUTE
       │   Actions: generate budget_alert, fire BUDGET_ALERT signal
       │
       └── PROC-001 matches: BLOCKER signal received + MS-003 < 14 days
           Confidence: 0.87 → EXECUTE
           Actions: upgrade milestone to RED, generate escalation brief

AGENT RUNS
─────────────────────────────────────────────────────────
  Executes all tasks + procedure-triggered actions
  Generates: weekly_status, wave_tracker, budget_alert,
             escalation_brief, adr_summary

AFTER AGENT RUNS
─────────────────────────────────────────────────────────
  Write new episode (Layer 1)
       │
       └── budget_burn: 83.2%, MS-003: overdue (run 2),
           signals fired: BUDGET_ALERT + RISK_ESCALATION

  Update wave_memory.toml
       │
       └── MS-003 slip count: 2 consecutive runs

  Propose to Orchestrator (Layer 2 update):
       └── Budget burn +3.2% in one week — update trajectory data

ORCHESTRATOR POST-FLIGHT
─────────────────────────────────────────────────────────
  Updates semantic_patterns.toml:
       └── cloud_migration.phase_2.budget trajectory updated
           (weighted moving average with new data point)

  Checks PROC-005 outcome tracking:
       └── Signal fired — outcome PENDING until resolution recorded

  Writes lessons_learned.toml entry:
       └── "Cloud Migration budget burn accelerating in Phase 2.
            Acme Telecom milestone buffer extended to 20 days.
            PROC-001 and PROC-005 both triggered — high-risk week."
```

---

## Lessons Learned File (Human-Readable Layer)

The TPM can always read and edit this file. It is the human-language distillation of what the agents have learned.

```toml
# memory/shared/lessons_learned.toml

[[lessons]]
id            = "LESSON-031"
date          = "2026-02-16"
source        = "cloud_migration + infrastructure agents"
lesson        = "Acme Telecom has delivered late on 5 of 12 deliverables. Average delay is 8.4 days. Always add 10-day buffer to any milestone with Acme Telecom involvement."
action_taken  = "semantic_pattern vendor_reliability_score updated to 0.583. Milestone warning days adjusted automatically."
tpm_confirmed = true

[[lessons]]
id            = "LESSON-032"
date          = "2026-02-09"
source        = "erp agent"
lesson        = "ERP modules complete configuration but stall on sign-off for an average of 11 days. Proactive reminder generated at 7-day mark now standard."
action_taken  = "PROC-ERP-001 added with confidence 0.88."
tpm_confirmed = true

[[lessons]]
id            = "LESSON-033"
date          = "2026-01-26"
source        = "infrastructure agent"
lesson        = "Resource conflict alerts fired 4 times for engineer on approved leave — false alarms. Consider integrating leave calendar data."
action_taken  = "PROC-006 confidence reduced from 0.81 to 0.76. TPM to evaluate adding leave calendar to data model."
tpm_confirmed = false          # TPM hasn't reviewed this yet — surfaced in weekly report
```

---

## Memory Security

| File | Protection |
|---|---|
| All `*.toml` in `memory/` | SHA-256 checksum verified before read |
| `lessons_learned.toml` | TPM-editable; checksum recalculated after save |
| Procedure confidence scores | Read-only by agents; only Orchestrator writes |
| Episode files | Append-only; past episodes never modified |
| Semantic patterns | Orchestrator-only writes; agents read-only |

If any memory file fails checksum verification → treated as tampered → agent uses default thresholds + logs `MEMORY_INTEGRITY_ALERT` signal.

---

## Memory Integration with Coordination Architecture

```
Coordination Layer          Memory Layer
──────────────────          ────────────────────────────────────
Signal: BLOCKER     ──►     Episodic: record signal received
                            Semantic: update signal_pattern.precedes_rate
                            Procedural: check PROC-001 trigger

Signal resolved     ──►     Episodic: record resolution
                            Procedural: update PROC-001 outcome = SUCCESS
                                        confidence += weighted_delta

Signal = false alarm──►     Episodic: record false alarm
                            Procedural: update PROC outcome = FALSE_ALARM
                                        confidence -= weighted_delta

New client onboarded──►     Semantic: no patterns yet — use defaults
                            Episodic: empty — clean slate
                            Procedural: use shared_procedures only
                                        (agent-specific memory builds over time)
```

---

## Memory CLI Commands

```bash
# View all active lessons learned
tpm memory lessons

# Show semantic patterns for a specific agent
tpm memory patterns cloud-migration

# Show procedure confidence scores
tpm memory procedures

# Show what changed between last two episodes
tpm memory diff cloud-migration

# Show vendor reliability scores across all agents
tpm memory vendors

# Force a memory integrity check (re-verify all checksums)
tpm memory verify

# Archive episodes older than 90 days
tpm memory archive

# Reset a procedure's confidence score (if TPM determines it's wrong)
tpm memory reset-procedure PROC-001
```

---

## Design Summary

| Layer | What It Is | Scope | Updated By | Used For |
|---|---|---|---|---|
| Episodic | Run-by-run snapshots | Per-agent | Each agent after run | Change detection, streak tracking |
| Semantic | Cross-project patterns | Shared | Orchestrator | Threshold adjustment, leading indicator detection |
| Procedural | Learned rules + confidence | Per-agent + shared | Orchestrator (shared), Agent (private) | Proactive action at the right time |

**The learning loop in one sentence:**
Episodes feed patterns. Patterns calibrate procedures. Procedures drive actions. Actions produce outcomes. Outcomes update confidence. Confidence determines when to act next time.
