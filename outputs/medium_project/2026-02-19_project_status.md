# Project Status Report
**Project:** Office Relocation — Single Floor
**Date:** 2026-02-19
**PM:** Alex Torres | **Sponsor:** Sandra Wu, COO
**Phase:** Phase 1 — Planning & Design (60% complete)
**Scale:** `medium` | **Type:** `mixed`

---

```toml
[report.metadata]
project_id    = "medium_project"
project_scale = "medium"
project_type  = "mixed"
report_type   = "project_status"
date          = "2026-02-19"
phase         = "phase_1_planning_design"
rag_status    = "amber"
domain        = "facilities.office_relocation"

[report.taxonomy]
risk_categories_active    = ["resource", "compliance", "budget"]
milestone_categories      = ["space_planning", "it_infrastructure", "procurement", "build_out",
                             "change_management", "legal", "closeout"]
signals_emitted           = ["blocker"]
signals_received          = []
```

---

## Overall Status — 🟡 AMBER

Phase 1 is 60% complete and broadly on schedule. However, the IT Lead role is unfilled and owns three milestones — including one due tomorrow. This is a live escalation item. A **BLOCKER signal has been emitted** to the cross-agent coordination log. Sandra Wu (COO) owns the resolution.

---

## 🚨 BLOCKER Signal Emitted

```
SIGNAL    : BLOCKER
SOURCE    : medium_project
DATE      : 2026-02-19
RISK      : RISK-002 — IT Lead Role Unfilled (escalation_required = true)
BLOCKING  : MS-003 (due 2026-02-20), MS-008 (due 2026-03-14),
            MS-012 (due 2026-05-08), MS-014 (due 2026-05-13)
OWNER     : Sandra Wu, COO
RESOLVE   : Designate IT Lead by 2026-02-20 or cascade delay begins
```

---

## Phase Summary

| Phase | Dates | Status | Complete |
|---|---|---|---|
| Phase 1: Planning & Design | Feb 1 – Feb 28 | 🟡 In Progress | 60% |
| Phase 2: Vendor Contracting & Procurement | Mar 1 – Mar 31 | Not Started | 0% |
| Phase 3: Build-Out & IT Infrastructure | Apr 1 – May 15 | Not Started | 0% |
| *(Move Day + Close)* | Jun 5 – Jun 13 | Not Started | — |

---

## Milestone Table

| ID | Milestone | Category | Owner | Due | Status | Note |
|---|---|---|---|---|---|---|
| MS-001 | Space Needs Assessment Complete | `space_planning` | Sandra Wu | Feb 6 | ✅ Complete | On time |
| MS-002 | Floor Plan and Layout Approved | `space_planning` | Alex Torres | Feb 13 | ✅ Complete | On time |
| MS-003 | IT Infrastructure Requirements Documented | `it_infrastructure` | IT Lead (TBD) | **Feb 20** | 🔴 AT RISK | Due tomorrow; role unfilled — BLOCKER |
| MS-004 | RFP Issued to Contractors and Furniture Vendors | `procurement` | Alex Torres | Feb 27 | 🟡 AT RISK | Blocked by MS-003; 8 days |
| MS-005 | Budget Baseline Approved by Finance | `procurement` | Sandra Wu | Feb 28 | 🟡 AT RISK | Cascade-blocked by MS-004; 9 days |
| MS-006 | General Contractor Selected and Contracted | `procurement` | Alex Torres | Mar 10 | ⬜ Not Started | Depends on MS-004 |
| MS-007 | Furniture and Fixtures Order Placed | `procurement` | Alex Torres | Mar 14 | ⬜ Not Started | Depends on MS-005, MS-006 |
| MS-008 | IT Hardware and Cabling Vendor Contracted | `it_infrastructure` | IT Lead (TBD) | Mar 14 | 🔴 BLOCKED | Role unfilled — BLOCKER |
| MS-009 | Moving Company Booked | `logistics` | Alex Torres | Mar 20 | ⬜ Not Started | No blockers |
| MS-010 | Permits and Access Confirmed | `compliance` | Alex Torres | Mar 31 | ⬜ Not Started | Depends on MS-006 |
| MS-011 | Construction and Build-Out Complete | `build_out` | General Contractor | Apr 30 | ⬜ Not Started | Depends on MS-006, MS-010 |
| MS-012 | IT Cabling and Network Infrastructure Installed | `it_infrastructure` | IT Lead (TBD) | May 8 | 🔴 BLOCKED | Role unfilled — BLOCKER |
| MS-013 | Furniture Delivery and Installation Complete | `logistics` | Alex Torres | May 10 | ⬜ Not Started | Depends on MS-007, MS-011 |
| MS-014 | IT Systems Tested and Signed Off | `it_infrastructure` | IT Lead (TBD) | May 13 | 🔴 BLOCKED | Role unfilled — BLOCKER |
| MS-015 | Move Day Complete — All Staff Relocated | `closeout` | Alex Torres | Jun 5 | ⬜ Not Started | Depends on MS-009, MS-013, MS-014 |
| MS-016 | Post-Move Issues Resolved — Project Close | `closeout` | Sandra Wu | Jun 13 | ⬜ Not Started | Depends on MS-015 |

**Complete:** 2/16 | **At Risk:** 3 | **Blocked (IT Lead):** 4 | **Not Started:** 7

---

## Dependency Check

Critical path items in jeopardy:

```
MS-003 (IT reqs, Feb 20)
  └─► MS-008 (IT vendor, Mar 14)
        └─► MS-012 (cabling, May 8)
              └─► MS-014 (IT sign-off, May 13)
                    └─► MS-015 (move day, Jun 5)
                          └─► MS-016 (close, Jun 13)

MS-003 also blocks MS-004 (RFP, Feb 27)
  └─► MS-005 (budget, Feb 28)
        └─► MS-007 (furniture PO, Mar 14)
```

Every phase of the project has a dependency chain that runs through MS-003. If MS-003 slips, the move date slips.

---

## Sprint Standup — 2026-02-19

```
MS-001  Space Needs Assessment          ✅ COMPLETE    — on time
MS-002  Floor Plan Approved             ✅ COMPLETE    — on time
MS-003  IT Infrastructure Reqs         🔴 AT RISK     — due tomorrow; IT Lead role unfilled
MS-004  RFP Issued                      🟡 AT RISK     — 8 days; cascade-blocked by MS-003
MS-005  Budget Baseline Approved        🟡 AT RISK     — 9 days; cascade-blocked by MS-004
MS-006  GC Selected and Contracted      ⬜ WATCH       — 19 days; blocked by MS-004
MS-007  Furniture PO Placed             ⬜ ON TRACK    — 23 days
MS-008  IT Vendor Contracted            🔴 BLOCKED     — role unfilled
MS-009  Moving Company Booked           ⬜ ON TRACK    — 29 days; no blockers
MS-010  Permits Confirmed               ⬜ ON TRACK    — 40 days
MS-011  Build-Out Complete              ⬜ ON TRACK    — 70 days
MS-012  IT Cabling Installed            🔴 BLOCKED     — role unfilled
MS-013  Furniture Installed             ⬜ ON TRACK    — 80 days
MS-014  IT Systems Signed Off           🔴 BLOCKED     — role unfilled
MS-015  Move Day                        ⬜ ON TRACK    — 106 days (if unblocked)
MS-016  Project Close                   ⬜ ON TRACK    — 114 days (if unblocked)
```

**Status changes since last run:** MS-003 moved to AT RISK (due date crossed into 1-day window). MS-004 and MS-005 moved to AT RISK (cascade). BLOCKER signal emitted for IT Lead gap.

---

## Sprint Scope — Phase 1 Close Sprint (Feb 16 – Feb 28)

**Milestones targeted:**

| Milestone | Category | Owner | Due | Risk |
|---|---|---|---|---|
| MS-003 — IT Infrastructure Requirements | `it_infrastructure` | IT Lead (TBD) | Feb 20 | 🔴 HIGH — unblocking action required today |
| MS-004 — RFP Issued | `procurement` | Alex Torres | Feb 27 | 🟡 MEDIUM — clear MS-003 first |
| MS-005 — Budget Baseline Approved | `procurement` | Sandra Wu | Feb 28 | 🟡 MEDIUM — depends on MS-004 |

**Active vendors this sprint:** VEN-003 NetRun (FU-002 due tomorrow), VEN-005 Permits Office (FU-003 due Feb 28)

**Risks needing mitigation action this sprint:**
- RISK-002 `[resource]` — IT Lead designation: COO action due today
- RISK-001 `[compliance]` — Permit application submission: due Feb 28 (9 days)
- RISK-007 `[compliance]` — Lease amendment drafting start: due Feb 21 (2 days)

---

## Compliance Monitor

Items within the 30-day compliance window:

| Item | Type | Deadline | Days Remaining | Owner | Status |
|---|---|---|---|---|---|
| Permit application submitted | `compliance.regulatory` | Feb 28 | 9 | Alex Torres | Not started |
| Lease amendment drafting begun | `compliance.legal` | Feb 21 | 2 | Legal Team | Not started |
| Contractor work must not begin before lease execution | `compliance.legal` | Mar 15 | 24 | Legal Team | Blocked by above |

---

## Open Risks Summary

| ID | Title | Category | Score | Escalate | Status |
|---|---|---|---|---|---|
| RISK-002 | IT Lead Role Unfilled | `resource` | **9** 🔴 | YES | Open — BLOCKER |
| RISK-001 | Construction Permit Delay | `compliance` | 6 🟡 | No | Open |
| RISK-004 | Budget Overrun on Construction | `budget` | 6 🟡 | No | Open |
| RISK-003 | Furniture Lead Time | `vendor` | 4 | No | Monitoring |
| RISK-005 | Staff Resistance to Open Office | `org` | 4 | No | Monitoring |
| RISK-006 | Move Day Disruption | `schedule` | 3 | No | Monitoring |
| RISK-007 | Lease Amendment Delayed | `compliance` | 3 | No | Open |
| RISK-008 | Network Downtime at Cutover | `technical` | 3 | No | Open |

3 risks at or above alert threshold (6). See risk alert report.

---

## Knowledge Base

```toml
[kb.lessons_learned]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-001"
category    = "resource"
pattern     = "key_role_gap_at_project_start"
observation = "IT Lead role undesignated at kickoff; 4 milestones assigned to 'TBD'. Role gap persisted into Phase 1 execution and now blocks the critical path."
action      = "Require all workstream lead roles designated and accepted before project kickoff gate."
severity    = "high"
phase       = "planning"
project_type_applicable = ["technical", "mixed"]
scale_applicable        = ["medium", "enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-002"
category    = "compliance"
pattern     = "regulatory_dependency_on_critical_path"
observation = "Permit timeline not confirmed in Phase 1. Permit application is on the critical path to Phase 2 contractor start. No buffer for regulatory delays was built in at planning."
action      = "In any project requiring regulatory approval (permits, licenses, certifications), confirm the regulatory agency's processing timeline in Phase 1 before issuing Phase 2 contracts."
severity    = "medium"
phase       = "planning"
project_type_applicable = ["mixed", "technical", "non_technical"]
scale_applicable        = ["medium", "enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-003"
category    = "compliance"
pattern     = "legal_instrument_not_started_before_vendor_work"
observation = "Lease amendment drafting has not started as of Feb 19; legal said to begin by Feb 21 but contractor work cannot start until lease is executed (Mar 15). Two-day slip in legal start = cascading risk."
action      = "Any legal instrument that must precede vendor work should be tracked as a project milestone with the legal team named as owner, not left in risk mitigation notes."
severity    = "medium"
phase       = "planning"
project_type_applicable = ["mixed", "non_technical"]
scale_applicable        = ["medium", "enterprise"]

[kb.ontology]

[[kb.ontology.patterns]]
id          = "pattern.resource.workstream_lead_gap"
name        = "Workstream Lead Gap"
description = "A key workstream lead role is undesignated at project start. All milestones owned by that role become implicit blockers. Common in mixed/technical projects at medium+ scale where the PM does not own the technical domain."
signal      = "blocker"
related_risk_categories = ["resource"]
related_milestone_categories = ["it_infrastructure", "technical"]
mitigation  = "Treat workstream lead designation as a Phase 0 / kickoff gate criterion. RACI must be complete before first sprint begins."

[[kb.ontology.patterns]]
id          = "pattern.compliance.permit_on_critical_path"
name        = "Regulatory Dependency on Critical Path"
description = "A regulatory approval (permit, license, certification) sits on the critical path between a planning phase and an execution phase. Delay in the approval propagates forward through all downstream milestones."
signal      = "dependency_done"
related_risk_categories = ["compliance", "schedule"]
related_milestone_categories = ["compliance", "procurement"]
mitigation  = "Confirm regulatory processing timeline in Phase 1. Build a buffer phase or parallel-track permit application with RFP preparation."

[kb.ontology.vocabulary]
domain   = "facilities.office_relocation"
terms    = [
    "space_needs_assessment",
    "floor_plan",
    "rfp",
    "general_contractor",
    "build_out",
    "punch_list",
    "move_day",
    "permit",
    "lease_amendment",
    "cutover",
    "it_infrastructure",
    "cabling",
    "seating_plan",
]
universal_terms = [
    "phase_gate",
    "critical_path",
    "blocker",
    "workstream_lead",
    "compliance_deadline",
    "dependency_chain",
]
```

---

*Generated by: TPM Agent — Medium Project | tpm run medium_project*
