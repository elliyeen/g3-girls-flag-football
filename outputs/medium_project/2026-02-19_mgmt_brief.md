# Management Brief
**Project:** Office Relocation — Single Floor
**Date:** 2026-02-19
**Audience:** Department Heads, Finance, HR, Legal, Building Management
**Prepared by:** Alex Torres, PM

---

```toml
[report.metadata]
project_id   = "medium_project"
report_type  = "stakeholder_brief_mgmt"
date         = "2026-02-19"
audience     = ["impacted_stakeholder", "budget_approver", "change_management_lead",
                "contract_reviewer", "external_partner"]
rag_status   = "amber"
```

---

## Project Status — 🟡 AMBER

The project is in Phase 1 (Planning & Design), 60% complete. Two milestones are closed on time. Three milestones are at risk this sprint due to an IT Lead vacancy. Budget is healthy. Your area-specific updates are below.

---

## Milestone Summary

| Milestone | Due | Status |
|---|---|---|
| Space Needs Assessment | Feb 6 | ✅ Complete |
| Floor Plan Approved | Feb 13 | ✅ Complete |
| IT Infrastructure Requirements | **Feb 20** | 🔴 At Risk — IT Lead role unfilled |
| RFP Issued | Feb 27 | 🟡 At Risk — depends on Feb 20 |
| Budget Baseline Approved | Feb 28 | 🟡 At Risk — depends on RFP |

---

## By Audience

### Finance Team
Your approval of the budget baseline (MS-005) is due **Feb 28**. Alex Torres will schedule a review session this week. The RFP will be issued Feb 27 — vendor bids will come in by Mar 5, giving approximately 5 days for Finance to review before GC contracting begins Mar 10.

**Budget is GREEN:** $9,800 spent of $85,000 (11.5%). Contingency reserve ($8,000) is intact.

### Legal Team
Lease amendment drafting must begin **Feb 21 (in 2 days)**. Target execution is Mar 15. Contractor work cannot begin until the lease is executed. Diane Foster at ClearLease Legal is your contact. If drafting cannot start by Feb 21, please flag immediately — this is on the critical path.

### HR Team
Two actions this sprint:
1. Coordinate with Sandra Wu on IT Lead designation (needed today)
2. Run two staff feedback sessions on the floor plan layout by **Feb 28** (RISK-005 mitigation). Seating FAQ to be drafted and distributed concurrently.

### Department Heads
No action required from you this sprint. Move date target remains **June 5**. You will receive a seating plan for your department's review in Phase 2 (March). HR will be in touch about the floor plan feedback sessions this week.

### Building Management
The permit application checklist and processing timeline confirmation (FU-003) is due **Feb 28**. Alex Torres will follow up directly. Contractor access to the floor will not begin before the permit is approved (target Mar 25) and the lease amendment is executed (Mar 15).

---

## Sprint Close — Retrospective Input

Two milestones completed on time in Phase 1 (MS-001, MS-002). No issues. Velocity is clean where roles are filled.

**Recurring pattern flagged:** The IT workstream has no designated lead at Day 18 of the project. This is the second sprint in which IT milestones are unresolvable. If this pattern continues into Phase 2 (procurement), the IT vendor contracting timeline (MS-008, Mar 14) will slip.

---

## Knowledge Base

```toml
[kb.lessons_learned]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-011"
category    = "org"
pattern     = "change_management_delayed_start"
observation = "HR feedback sessions on the floor plan are not scheduled yet (due Feb 28). Change management activities for a physical relocation should begin in parallel with space planning, not at the end of the planning phase. Staff resistance (RISK-005) becomes harder to manage the later it is addressed."
action      = "For any project with significant staff impact (relocation, new system, process change), start change management activities at the same time as planning activities — not after planning is complete."
severity    = "medium"
phase       = "planning"
project_type_applicable = ["non_technical", "mixed"]
scale_applicable        = ["medium", "enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-012"
category    = "resource"
pattern     = "key_role_gap_second_sprint"
observation = "The IT Lead vacancy was identified on project day 1 (RISK-002, identified Feb 1). The role is still unfilled on day 18. A risk that requires executive action and has been open for 18 days without resolution indicates the escalation mechanism is not working."
action      = "Executive-owned blockers should have a daily check-in escalation (not weekly). If an executive-owned blocker persists more than 5 business days without resolution, it should be escalated to the next level."
severity    = "high"
phase       = "execution"
project_type_applicable = ["technical", "mixed"]
scale_applicable        = ["medium", "enterprise"]

[kb.ontology]

[[kb.ontology.patterns]]
id          = "pattern.change_management.parallel_start"
name        = "Change Management Parallel Start"
description = "Change management activities (staff communications, feedback sessions, change champion identification) should begin at project kickoff, in parallel with planning activities — not sequentially after planning is complete. Late start of change management is one of the most common causes of adoption failure."
signal      = "none"
related_risk_categories = ["org"]
mitigation  = "Include change management kickoff as a Phase 1 milestone. HR/OCM lead must be named and active from Day 1."
```

---

*Generated by: TPM Agent — Medium Project | tpm run medium_project*
