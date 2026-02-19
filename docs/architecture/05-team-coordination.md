[IDX]  2026-02-19.C18
[CAT]  7_OPERATIONS
[TIME] 2026-02-18T00:00:00-06:00
[3K]   architecture | team-coordination | cross-agent
[CONF] 0.93
[REVIEW] false

---

# TPM Agent System — Team Coordination Architecture

> How the five agents communicate, share state, hand off work, and operate as a unified team.
> No shared mutable state during execution. No database. No network. Fully auditable.
> Stack: Rust + tokio. Security: SHA-256 integrity on all inter-agent signals.

---

## Core Principle

Each agent is **sovereign** — it owns its data and runs independently.
Coordination happens through **signals** — structured messages each agent publishes and others subscribe to.
The **Orchestrator** assembles signals before agent runs and distributes relevant context to each agent.
No agent writes to another agent's data. No agent waits on another agent's computation.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          ORCHESTRATOR                                   │
│                    (runs before + after agents)                         │
│                                                                         │
│  Phase 1 ──► Load all signal files ──► Verify integrity                │
│           ──► Assemble CrossProjectState                                │
│           ──► Distribute relevant signals to each agent                 │
│                                                                         │
│  Phase 3 ──► Collect new signals from all agents                       │
│           ──► Update signal files                                       │
│           ──► Write cross-project summary report                        │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
              Phase 2 — Parallel Agent Execution
                           │
    ┌──────────┬───────────┼───────────┬──────────┐
    │          │           │           │          │
    ▼          ▼           ▼           ▼          ▼
┌───────┐ ┌───────┐ ┌──────────┐ ┌───────┐ ┌──────────┐
│AGENT  │ │AGENT  │ │ AGENT    │ │AGENT  │ │ AGENT    │
│  01   │ │  02   │ │   03     │ │  04   │ │   05     │
│Phys   │ │ CRM   │ │ Cloud    │ │ ERP   │ │  Infra   │
│Sec    │ │       │ │ Migrate  │ │       │ │          │
│       │ │       │ │          │ │       │ │          │
│Reads  │ │Reads  │ │ Reads    │ │Reads  │ │ Reads    │
│signals│ │signals│ │ signals  │ │signals│ │ signals  │
│from   │ │from   │ │ from     │ │from   │ │ from     │
│Infra  │ │Infra  │ │ Infra    │ │Infra  │ │ All      │
│       │ │Cloud  │ │ PhysSec  │ │Cloud  │ │          │
│       │ │ERP    │ │          │ │       │ │          │
└───┬───┘ └───┬───┘ └────┬─────┘ └───┬───┘ └────┬─────┘
    │         │          │           │           │
    └─────────┴──────────┴───────────┴───────────┘
                          │
               Writes new signals to:
               coordination/<agent_id>/signals.toml
```

---

## Coordination File Structure

```
coordination/                          ← Orchestrator-managed directory
│
├── physical_security/
│   └── signals.toml                  ← Agent 01 writes here only
│
├── crm/
│   └── signals.toml                  ← Agent 02 writes here only
│
├── cloud_migration/
│   └── signals.toml                  ← Agent 03 writes here only
│
├── erp/
│   └── signals.toml                  ← Agent 04 writes here only
│
├── infrastructure/
│   └── signals.toml                  ← Agent 05 writes here only
│
└── cross_project_summary.md          ← Orchestrator writes after all agents complete
```

**Rule:** Each agent has **write access to its own signal file only**.
All agents have **read access to all signal files**.
The Orchestrator assembles and distributes. Agents never write to each other directly.

---

## Signal Types

Signals are strongly typed. Every signal has: `id`, `from_agent`, `signal_type`, `severity`, `timestamp`, `message`, `affected_agents`, `checksum`.

```
┌─────────────────────────────────────────────────────────────┐
│                      SIGNAL CATALOG                         │
├──────────────────┬──────────────────────────────────────────┤
│ BLOCKER          │ My work is blocking another agent         │
│ DEPENDENCY_DONE  │ A dependency another agent needs is done  │
│ RISK_ESCALATION  │ Critical risk — all agents should surface │
│ BUDGET_ALERT     │ Budget threshold hit — cross-check yours  │
│ SECURITY_ALERT   │ Security finding crossing project lines   │
│ RESOURCE_CONFLICT│ Shared person/asset double-booked         │
│ AUDIT_ACTIVATION │ Compliance audit — all run security scan  │
│ GO_LIVE_RISK     │ Go-live dependency unresolved             │
│ VENDOR_DISPUTE   │ Vendor in dispute — shared vendor notice  │
│ THREAT_DETECTED  │ Injection/malicious input — all halt      │
└──────────────────┴──────────────────────────────────────────┘
```

### Signal Severity Levels (Math Model)

```
0 = INFO      — informational, no action required
1 = NOTICE    — awareness only, include in cross-project summary
2 = WARNING   — action recommended, surface in weekly reports
3 = CRITICAL  — action required, surface at top of all affected reports
4 = EMERGENCY — halt all affected agents, immediate TPM escalation
```

Severity is a `u8`. Threshold checks are single comparisons:
```
include_in_report  = signal.severity >= 1   // NOTICE and above
surface_at_top     = signal.severity >= 3   // CRITICAL and above
halt_agent         = signal.severity == 4   // EMERGENCY only
```

---

## Subscription Matrix

Which agents read signals from which other agents:

```
         Publisher →
         PhysSec  CRM  Cloud  ERP  Infra
         ───────  ───  ─────  ───  ─────
Reads ↓
PhysSec    —      —     —     —     ✓
CRM        —      —     —     ✓     ✓
Cloud      ✓      —     —     —     ✓
ERP        —      —     ✓     —     ✓
Infra      ✓      ✓     ✓     ✓     —
```

**Why:**
- **Physical Security** reads Infrastructure (hardware delivery blockers, data center access)
- **CRM** reads Infrastructure (network ready for go-live), ERP (shared data dependencies)
- **Cloud Migration** reads Physical Security (data center readiness), Infrastructure (circuits, hardware)
- **ERP** reads Cloud Migration (if hybrid cloud ERP deployment), Infrastructure (server hardware)
- **Infrastructure** reads all four (it needs to know what it is blocking and what has unblocked)
- **All agents** read EMERGENCY-severity signals from any agent regardless of subscription

---

## Signal File Format (TOML)

```toml
# coordination/infrastructure/signals.toml

agent_id = "infrastructure"
last_updated = "2026-02-16T14:32:00Z"
file_checksum = "a3f8c2d1e9b7..."   # SHA-256 of all signals content

[[signals]]
id            = "SIG-INF-001"
from_agent    = "infrastructure"
signal_type   = "BLOCKER"
severity      = 3
timestamp     = "2026-02-16T08:00:00Z"
message       = "Network hardware PO-112 is 4 days overdue. Cloud Migration Wave 2 depends on this circuit."
affected_agents = ["cloud_migration"]
context.po_number    = "PO-112"
context.vendor       = "Acme Telecom"
context.due_date     = "2026-02-12"
context.days_overdue = 4
context.milestone_blocked = "MS-003"
resolved      = false
resolved_date = ""

[[signals]]
id            = "SIG-INF-002"
from_agent    = "infrastructure"
signal_type   = "RESOURCE_CONFLICT"
severity      = 2
timestamp     = "2026-02-16T08:00:00Z"
message       = "Network engineer J. Davis is assigned to both Network Refresh sprint and Physical Security zone 3 cutover in the same week (Feb 17–21)."
affected_agents = ["physical_security"]
context.engineer      = "J. Davis"
context.conflict_week = "2026-02-17"
context.project_a     = "infrastructure.network_refresh"
context.project_b     = "physical_security.zone_3_cutover"
resolved      = false
resolved_date = ""
```

---

## Orchestrator — Three-Phase Execution Model

```
$ tpm run-all
       │
       ▼
┌─────────────────────────────────────────────┐
│  PHASE 1: PRE-FLIGHT (sequential, ~100ms)   │
├─────────────────────────────────────────────┤
│                                             │
│  For each of 5 signal files:                │
│    1. Read signals.toml                     │
│    2. Verify SHA-256 checksum               │
│       └─ FAIL → THREAT_DETECTED signal      │
│    3. Filter: active (resolved = false)     │
│    4. Filter: not expired (< 7 days old)    │
│                                             │
│  Assemble CrossProjectState:                │
│    - All active signals by type             │
│    - Severity map: agent → max severity     │
│    - Blocker map: which agents are blocked  │
│    - Emergency check: any severity == 4?    │
│      └─ YES → halt all, write alert, exit   │
│                                             │
│  Distribute to each agent:                  │
│    - Each agent receives only signals       │
│      it subscribes to (per matrix above)   │
│    - Plus ALL severity-3+ signals           │
│    - Plus ALL THREAT_DETECTED signals       │
│                                             │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  PHASE 2: PARALLEL EXECUTION                │
│  (all 5 agents run concurrently via tokio)  │
├─────────────────────────────────────────────┤
│                                             │
│  Each agent receives:                       │
│    - Its ProjectState (from data/)          │
│    - Its InboundSignals (from Orchestrator) │
│    - Its Settings slice (from config)       │
│                                             │
│  Each agent:                                │
│    1. Runs threat defense pre-flight        │
│    2. Runs its domain tasks                 │
│    3. Incorporates inbound signals into     │
│       its reports (appended as sections)   │
│    4. Generates new outbound signals        │
│    5. Returns: Vec<Report> + Vec<Signal>    │
│                                             │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  PHASE 3: POST-FLIGHT (sequential, ~200ms)  │
├─────────────────────────────────────────────┤
│                                             │
│  Collect all new signals from agents        │
│                                             │
│  For each agent's new signals:              │
│    1. Append to coordination/<agent>/       │
│       signals.toml                         │
│    2. Recalculate SHA-256 checksum          │
│    3. Write updated file                    │
│                                             │
│  Write all reports to outputs/              │
│                                             │
│  Generate cross_project_summary.md:         │
│    - All active signals by severity         │
│    - Blocked agents list                    │
│    - Critical risks across all projects     │
│    - Shared resource conflicts              │
│    - Security posture for all 5             │
│                                             │
│  Print console summary table                │
│                                             │
└─────────────────────────────────────────────┘
```

---

## How Agents Incorporate Inbound Signals Into Reports

Each agent receives a slice of signals relevant to it. These are rendered as additional sections in the weekly report — automatically, no manual input required.

**Example: Cloud Migration Agent receives SIG-INF-001 (BLOCKER)**

The Cloud Migration weekly status report automatically gains:

```markdown
## Cross-Project Signals

### BLOCKER — from Infrastructure Agent
**Severity:** CRITICAL
**Signal:** SIG-INF-001
Network hardware PO-112 is 4 days overdue.
Cloud Migration Wave 2 (MS-003) depends on this circuit.

| Detail | Value |
|---|---|
| PO Number | PO-112 |
| Vendor | Acme Telecom |
| Original Due | 2026-02-12 |
| Days Overdue | 4 |
| Blocked Milestone | MS-003 — Wave 2 Migration Complete |

**Required Action:** Escalate with Infrastructure Agent lead.
Contact: TPM to follow up on PO-112 with Acme Telecom.
```

The TPM sees this without running any extra commands. It's in the report automatically.

---

## Signal Lifecycle

```
Signal created by agent
       │
       ▼
Written to coordination/<agent>/signals.toml
resolved = false
       │
       ▼
Orchestrator picks it up on next run
       │
       ├──► Distributes to subscribed agents
       │
       ▼
TPM resolves the issue
       │
       ▼
TPM updates signals.toml: resolved = true, resolved_date = "2026-02-20"
       │
       ▼
Orchestrator filters it out (resolved = true)
Signal no longer distributed
       │
       ▼
Signal remains in file permanently (append-only audit trail)
```

---

## Agent Team Roles

Beyond their domain specialization, each agent has a defined team role:

```
┌──────────────────────┬────────────────────────────────────────────────────┐
│ Agent                │ Team Role                                          │
├──────────────────────┼────────────────────────────────────────────────────┤
│ 01 Physical Security │ GUARDIAN — monitors physical access and safety      │
│                      │ across all project sites; alerts others if site     │
│                      │ access is blocked or a cutover affects shared space │
├──────────────────────┼────────────────────────────────────────────────────┤
│ 02 CRM               │ COMMUNICATOR — owns stakeholder data and user       │
│                      │ readiness; signals go-live risk to all agents       │
│                      │ when user adoption or training is at risk           │
├──────────────────────┼────────────────────────────────────────────────────┤
│ 03 Cloud Migration   │ NAVIGATOR — owns the migration roadmap and          │
│                      │ architecture decisions; signals when a wave is      │
│                      │ blocked or an ADR needs a decision from another     │
│                      │ project's stakeholders                              │
├──────────────────────┼────────────────────────────────────────────────────┤
│ 04 ERP               │ SENTINEL — highest-risk agent; owns the most        │
│                      │ complex dependency chain; signals critical risks     │
│                      │ and steering committee needs to all other agents    │
├──────────────────────┼────────────────────────────────────────────────────┤
│ 05 Infrastructure    │ FOUNDATION — all other agents depend on it;         │
│                      │ first to run in status checks; signals blockers     │
│                      │ to all four agents; owns the cross-project          │
│                      │ dependency map                                      │
└──────────────────────┴────────────────────────────────────────────────────┘
```

---

## Run-All Execution Timeline

```
T+0ms    TPM runs: $ tpm run-all
T+10ms   Orchestrator reads 5 signal files, verifies checksums
T+50ms   CrossProjectState assembled, signals distributed
T+60ms   All 5 agents spawned (tokio::spawn) — run in parallel
T+60ms   Agent 05 (Foundation) gets first priority in signal reads
T+200ms  Agents complete threat defense pre-flight
T+400ms  Agents complete data loading (async TOML reads)
T+600ms  Agents complete task execution (pure functions, CPU-bound)
T+800ms  Agents complete report writing (async file I/O)
T+850ms  Orchestrator collects new signals, updates signal files
T+900ms  Orchestrator writes cross_project_summary.md
T+920ms  Console summary table printed

Total wall time: ~1 second for all 5 agents
```

---

## Cross-Project Summary Report

Generated after every `run-all`. The TPM's single view across all five agents.

```markdown
# Cross-Project Summary — 2026-02-16

## Team Status

| Agent | Project | Status | Open Signals | Critical Risks | Reports |
|---|---|---|---|---|---|
| Foundation | Infrastructure | AT RISK | 2 | 0 | 5 |
| Sentinel | ERP | ON TRACK | 0 | 1 | 5 |
| Navigator | Cloud Migration | AT RISK | 1 | 1 | 4 |
| Guardian | Physical Security | ON TRACK | 0 | 0 | 3 |
| Communicator | CRM | ON TRACK | 0 | 0 | 4 |

## Active Blockers

| Signal | From | Blocks | Severity | Days Active |
|---|---|---|---|---|
| SIG-INF-001 | Infrastructure | Cloud Migration | CRITICAL | 4 |
| SIG-INF-002 | Infrastructure | Physical Security | WARNING | 1 |

## Critical Risks (All Projects)

| Risk | Project | Score | Owner | Escalation |
|---|---|---|---|---|
| RISK-ERP-009 | ERP | 9/9 | Dana Patel | REQUIRED |
| RISK-CLD-001 | Cloud Migration | 6/9 | Alex Torres | Yes |

## Security Posture (All Projects)

| Project | Clearance | Compliance % | Open Findings | Vendor Alerts |
|---|---|---|---|---|
| Infrastructure | IL4 (6) | 88% | 2 | 0 |
| ERP | FedRAMP Mod (5) | 79% | 3 | 1 |
| Cloud Migration | FedRAMP High (7) | 91% | 1 | 0 |
| Physical Security | FedRAMP High (7) | 95% | 0 | 0 |
| CRM | FedRAMP Mod (5) | 82% | 2 | 0 |

## Required Actions for TPM

1. [CRITICAL] Follow up on PO-112 with Acme Telecom — blocking Cloud Migration Wave 2
2. [CRITICAL] Escalate RISK-ERP-009 to executive sponsor — score 9/9
3. [WARNING] Resolve J. Davis resource conflict week of Feb 17
4. [WARNING] ERP vendor attestation expiring in 22 days — initiate renewal
```

---

## Conflict Resolution

When two agents publish conflicting signals (e.g., Infrastructure says "network ready", Cloud Migration says "network blocked"):

**Rule:** The **more severe signal wins**. The Orchestrator surfaces both signals in the cross-project summary with a `CONFLICT` flag.

```
Infrastructure: SIG-INF-010 — network_circuit: READY (severity 1)
Cloud Migration: SIG-CLD-005 — network_circuit: BLOCKED (severity 3)
                                        │
                              Orchestrator detects conflict:
                              same context key, different values
                                        │
                              CONFLICT flag written to summary
                              Higher severity (3) surfaces in all reports
                              TPM must manually resolve and update signals
```

---

## Emergency Protocol (Severity 4 — HALT)

When any agent publishes a severity-4 EMERGENCY signal (threat detected, classified data exposure, etc.):

```
EMERGENCY signal detected by Orchestrator (Phase 1)
       │
       ▼
All agent spawns CANCELLED before Phase 2 begins
       │
       ▼
THREAT_ALERT written to all 5 output directories
       │
       ▼
Cross-project emergency notice written to:
coordination/EMERGENCY_<timestamp>.md
       │
       ▼
CLI exits with code 2 (distinguishable from normal error)
       │
       ▼
Console output:
┌─────────────────────────────────────────┐
│  ⛔ EMERGENCY HALT                      │
│  Agent: infrastructure                  │
│  Signal: THREAT_DETECTED                │
│  Detail: Injection pattern in vendors   │
│  All agents stopped. No reports written.│
│  Review: coordination/EMERGENCY_*.md    │
└─────────────────────────────────────────┘
```

---

## Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Signal storage | Per-agent TOML files | No write conflicts during parallel execution |
| Coordination timing | Pre-flight + post-flight | Agents run clean with context already injected |
| Signal format | TOML with typed fields | Human-readable, TPM can manually inspect and resolve |
| Integrity | SHA-256 per signal file | Tamper-evident, verifiable without a database |
| Conflict resolution | Higher severity wins | Conservative — never suppress a warning to honor a clearance |
| Emergency protocol | Cancel all before Phase 2 | No partial runs, no half-written reports |
| Append-only signals | resolved flag, not deletion | Full audit trail — all signals preserved |
| No direct agent-to-agent writes | Publisher owns its file only | Eliminates race conditions, clear ownership |
