[IDX]  2026-02-19.C20
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   architecture | project-scales | scale-gating
[CONF] 0.93
[REVIEW] false

---

# TPM Agent System — Project Scales

> **Purpose:** Define the four project scale levels that govern agent behavior, report activation, and task gating
> **Single source of truth:** `project_scale` field in `data/<project>/project.toml`

---

## Scale Overview

| | Hello World | Small | Medium | Enterprise |
|---|---|---|---|---|
| Tasks (max) | 5 | 20 | 100 | Unlimited |
| Stakeholders | 1–3 | 2–8 | 5–20 | 20+ |
| Vendors | 0–1 | 1–3 | 3–10 | 10+ |
| Risks | 0–2 | 2–5 | 5–20 | 20+ |
| Phases | 1 | 1–2 | 2–5 | 5+ |
| Budget | None / trivial | < $10K | $10K–$500K | $500K+ |
| Reports active | Status only | Status + Risk | Full suite | Full + Compliance |
| Cross-agent signals | None | None | BLOCKER, DEPENDENCY_DONE | All 10 signal types |
| Stakeholder tiers | 1 | 1 | 3 (exec / mgmt / ops) | 3 + board |
| Compliance | None | None | Basic | Full (IL-based) |
| Sprint support | Overdue check | Standup + sprint scope | Full sprint ceremonies | Full + program-level |

---

## Scale 1 — Hello World

### Definition
A standalone, low-stakes deliverable that a single person could complete in under 2 weeks. No budget, no vendor dependencies, minimal stakeholders. Validates the system end-to-end with the smallest possible dataset.

### Trigger Criteria
Set `project_scale = "hello_world"` in `project.toml` when:
- Total task count <= 5
- Timeline <= 14 calendar days
- No vendor contracts or purchases involved
- No formal compliance requirements
- Single owner or 2–3 collaborators

### Required TOML Files
- `project.toml` (required)
- `stakeholders.toml` (required)
- `vendors.toml` (not required — no vendors)
- `risks.toml` (not required — assumed negligible)
- `agent_config.toml` (required — specifies task list)

### Activated Tasks
| Task ID | Description |
|---|---|
| `project_status_report` | RAG status, milestone table, plain narrative |
| `overdue_check` | Flags any milestone past its due date |

### Reports Generated
| Report | Filename |
|---|---|
| Project Status | `YYYY-MM-DD_project_status.md` |

### What Is NOT Activated
- Risk alerts (no risk register required)
- Vendor follow-up (no vendors required)
- Budget burn (no budget declared)
- Stakeholder briefs (replaced by status report)
- Compliance checks (not applicable)
- Cross-agent signals (not applicable)

### Sample Use Cases
- New hire welcome kit (1-page doc, checklist, email template)
- Team process document update
- Single-page internal announcement
- Kickoff meeting agenda and slide deck
- Proof-of-concept investigation with a written summary

---

## Scale 2 — Small

### Definition
A bounded, single-phase project with modest scope. Involves a small team, light vendor involvement, and real but manageable risks. Deliverable in 1–3 months.

### Trigger Criteria
Set `project_scale = "small"` in `project.toml` when:
- Total task count: 6–20
- Timeline: 2 weeks – 3 months
- Budget: $0 – $10,000
- Vendors: 1–3
- Risks: 2–5 identified
- No multi-phase dependency chain

### Required TOML Files
- `project.toml` (required)
- `stakeholders.toml` (required)
- `vendors.toml` (required if any vendors exist)
- `risks.toml` (required)
- `agent_config.toml` (required)

### Activated Tasks (includes all Hello World tasks)
| Task ID | Description |
|---|---|
| `project_status_report` | RAG status, milestone table, narrative |
| `overdue_check` | Flags overdue milestones |
| `risk_summary` | Flags risks scored >= 6 or escalation-required |
| `vendor_followup` | Overdue deliverable detection + action item generation |
| `stakeholder_brief_mgmt` | Single management-level stakeholder brief |
| `sprint_standup` | One-line status per open milestone + changes since last run |
| `sprint_scope` | Sprint scope summary: milestones targeted, vendors active, risks needing mitigation |

### Reports Generated
| Report | Trigger | Filename |
|---|---|---|
| Project Status | Every run | `YYYY-MM-DD_project_status.md` |
| Risk Alert | Critical risks exist | `YYYY-MM-DD_risk_alert.md` |
| Vendor Follow-Up | Overdue items exist | `YYYY-MM-DD_vendor_followup.md` |
| Management Brief | Scheduled | `YYYY-MM-DD_mgmt_brief.md` |

### Sample Use Cases
- Quarterly department all-hands event planning
- Office equipment procurement and deployment
- Vendor onboarding for a new SaaS tool
- Internal process audit and remediation
- Small website refresh
- Team training program rollout (single cohort)

---

## Scale 3 — Medium

### Definition
A multi-phase project involving multiple workstreams, a diverse stakeholder group, meaningful budget exposure, and real compliance considerations. Delivers over 3–12 months.

### Trigger Criteria
Set `project_scale = "medium"` in `project.toml` when:
- Total task count: 21–100
- Timeline: 3 months – 1 year
- Budget: $10,000 – $500,000
- Vendors: 3–10
- Risks: 5–20
- 2–5 phases with dependency chains
- Multiple stakeholder tiers required (exec, management, operations)

### Required TOML Files
- `project.toml` (required — phases section required)
- `stakeholders.toml` (required — multiple tiers)
- `vendors.toml` (required)
- `risks.toml` (required)
- `agent_config.toml` (required)

### Activated Tasks (includes all Small tasks)
| Task ID | Description |
|---|---|
| `stakeholder_brief_exec` | One-page executive brief: RAG + 3 bullets |
| `stakeholder_brief_ops` | Full operational detail: tasks, vendors, all risks |
| `budget_burn_report` | Burn rate, forecast-to-complete, contingency status |
| `milestone_dependency_check` | Validates dependency chain; flags blocked items |
| `compliance_deadline_monitor` | Alerts 30 days before any compliance deadline |
| `sprint_review` | Velocity, planned vs. delivered, risk resolutions |
| `retrospective_input` | Recurring delay patterns, lessons-learned section |
| `signal_emit_blocker` | Emits BLOCKER signal to other agents |
| `signal_emit_dependency_done` | Emits DEPENDENCY_DONE signal to other agents |

### Reports Generated
| Report | Trigger | Filename |
|---|---|---|
| Project Status | Every run | `YYYY-MM-DD_project_status.md` |
| Risk Alert | Critical risks exist | `YYYY-MM-DD_risk_alert.md` |
| Vendor Follow-Up | Overdue items exist | `YYYY-MM-DD_vendor_followup.md` |
| Budget Burn | Every run | `YYYY-MM-DD_budget_burn.md` |
| Executive Brief | Scheduled | `YYYY-MM-DD_exec_brief.md` |
| Management Brief | Scheduled | `YYYY-MM-DD_mgmt_brief.md` |
| Operational Brief | On demand | `YYYY-MM-DD_ops_brief.md` |
| Compliance Alert | Deadline within 30 days | `YYYY-MM-DD_compliance_alert.md` |
| Sprint Report | Sprint close | `YYYY-MM-DD_sprint_report.md` |

### Sample Use Cases
- Office relocation (single floor or small building)
- CRM deployment for a single department
- Data center hardware refresh
- Product launch with cross-functional coordination
- Compliance certification preparation (SOC 2, ISO 27001)
- Hiring and onboarding ramp for a new team
- Large-scale event with vendor coordination (conference, summit)

---

## Scale 4 — Enterprise

### Definition
A multi-phase program with multiple workstreams running in parallel, board-level visibility, full compliance requirements, and significant vendor ecosystem complexity. Runs 12+ months.

### Trigger Criteria
Set `project_scale = "enterprise"` in `project.toml` when:
- Total task count: 100+
- Timeline: 12+ months
- Budget: $500,000+
- Vendors: 10+
- Risks: 20+
- 5+ phases, multiple concurrent workstreams
- Board-level reporting required
- Formal compliance framework required (e.g., SOC 2, FedRAMP, HIPAA, CMMC)

### Required TOML Files
- `project.toml` (required — multi-phase, multi-workstream)
- `stakeholders.toml` (required — exec, mgmt, ops, and board tiers)
- `vendors.toml` (required — security attestation fields required per vendor)
- `risks.toml` (required — compliance category risks included)
- `agent_config.toml` (required — full task list)

### Activated Tasks (includes all Medium tasks)
| Task ID | Description |
|---|---|
| `exec_dashboard` | One-page board-level summary with EVM metrics (SPI, CPI, EAC) |
| `compliance_posture_report` | Full framework gap analysis, POA&M tracking |
| `program_risk_report` | Cross-workstream risk aggregation |
| `vendor_security_audit` | Attestation expiry tracking across all vendors |
| `change_impact_assessment` | Scope change effect on schedule and budget |
| `signal_all` | All 10 cross-agent signal types active |

### All 10 Cross-Agent Signal Types

| Signal | Meaning |
|---|---|
| `BLOCKER` | This project is blocked; depends on another agent's output |
| `DEPENDENCY_DONE` | A dependency this project waited on is now resolved |
| `RISK_ESCALATION` | A risk has crossed the escalation threshold |
| `BUDGET_ALERT` | Budget burn has exceeded 80% of allocation |
| `MILESTONE_SLIP` | A milestone date has moved — dependent projects should re-plan |
| `VENDOR_DELAY` | A vendor has missed a deliverable — downstream projects affected |
| `COMPLIANCE_BREACH` | A compliance control has lapsed or expired |
| `RESOURCE_CONFLICT` | A shared resource is overcommitted across projects |
| `PHASE_GATE_OPEN` | A phase gate has been approved — dependent workstreams can start |
| `PROGRAM_ESCALATION` | Program-level escalation requiring TPM and executive attention |

### Reports Generated
| Report | Trigger | Filename |
|---|---|---|
| Project Status | Every run | `YYYY-MM-DD_project_status.md` |
| Risk Alert | Critical risks exist | `YYYY-MM-DD_risk_alert.md` |
| Vendor Follow-Up | Overdue items exist | `YYYY-MM-DD_vendor_followup.md` |
| Budget Burn | Every run | `YYYY-MM-DD_budget_burn.md` |
| Executive Dashboard | Every run | `YYYY-MM-DD_exec_dashboard.md` |
| Executive Brief | Scheduled | `YYYY-MM-DD_exec_brief.md` |
| Management Brief | Scheduled | `YYYY-MM-DD_mgmt_brief.md` |
| Operational Brief | On demand | `YYYY-MM-DD_ops_brief.md` |
| Compliance Posture | Every run | `YYYY-MM-DD_compliance_posture.md` |
| Compliance Alert | Deadline within 30 days | `YYYY-MM-DD_compliance_alert.md` |
| Program Risk Report | Critical cross-workstream risk | `YYYY-MM-DD_program_risk.md` |
| Sprint Report | Sprint close | `YYYY-MM-DD_sprint_report.md` |

### Sample Use Cases
- Company-wide ERP rollout (any industry)
- Cloud migration program (all workloads, multi-year)
- Federal system deployment (FedRAMP authorization)
- Hospital system integration and compliance certification
- Merger and acquisition technology integration
- National infrastructure deployment
- Multi-site manufacturing system modernization

---

## Scale Selection Guide

```
                  How many tasks?
                        │
              ┌─────────▼──────────┐
              │    5 or fewer?     │
              └──────────┬─────────┘
                   Yes   │   No
                         │
              ┌──────────▼─────────┐
              │  Timeline < 2 wks? │──── Yes ──► HELLO WORLD
              └──────────┬─────────┘
                   No    │
                         │
              ┌──────────▼─────────┐
              │  Budget < $10K?    │
              │  Tasks <= 20?      │──── Yes ──► SMALL
              └──────────┬─────────┘
                   No    │
                         │
              ┌──────────▼─────────┐
              │  Budget < $500K?   │
              │  Tasks <= 100?     │──── Yes ──► MEDIUM
              └──────────┬─────────┘
                   No    │
                         ▼
                     ENTERPRISE
```

**When in doubt, pick the scale up.** A Small project accidentally run at Medium scale produces extra reports — harmless. A Medium project accidentally run at Small scale produces missing reports — a problem.

---

## Scale in TOML

```toml
# data/<project>/project.toml

project_scale = "hello_world"   # hello_world | small | medium | enterprise
```

This single field gates all task activation, all report generation, and all cross-agent signal emission. Changing this field and re-running the agent is the entire upgrade path from one scale to the next.

---

## Validation Rules Per Scale

The `tpm validate <project>` command enforces the following:

| Rule | Hello World | Small | Medium | Enterprise |
|---|---|---|---|---|
| `project.toml` present | Required | Required | Required | Required |
| `stakeholders.toml` present | Required | Required | Required | Required |
| `risks.toml` present | Not required | Required | Required | Required |
| `vendors.toml` present | Not required | If vendors exist | Required | Required |
| `agent_config.toml` present | Required | Required | Required | Required |
| `phases` section in project.toml | Not required | Optional | Required (2+ phases) | Required (5+ phases) |
| Vendor security attestation fields | Not required | Not required | Recommended | Required |
| Compliance frameworks declared | Not required | Not required | Recommended | Required |
| Cross-agent signal config | Not required | Not required | BLOCKER, DEPENDENCY_DONE | All 10 |
