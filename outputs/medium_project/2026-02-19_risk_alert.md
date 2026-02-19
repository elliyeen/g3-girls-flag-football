# Risk Alert
**Project:** Office Relocation — Single Floor
**Date:** 2026-02-19
**Alert Threshold:** Score ≥ 6 (project override)

3 risks at or above threshold. RISK-002 has `escalation_required = true` — BLOCKER signal emitted.

---

```toml
[report.metadata]
project_id  = "medium_project"
report_type = "risk_alert"
date        = "2026-02-19"
rag_status  = "red"

[report.taxonomy]
risk_categories_alerted = ["resource", "compliance", "budget"]
signals_emitted         = ["blocker"]
```

---

## 🔴 RISK-002 — IT Lead Role Unfilled — Dependency Risk
**Score: 9** (Probability: High × Impact: High) | **Category:** `resource`
**Status:** Open | **Escalation Required:** YES | **Owner:** Sandra Wu, COO
**Last Reviewed:** 2026-02-17 (2 days ago)

**BLOCKER signal emitted.** This risk has `escalation_required = true`. Four milestones are owned by "IT Lead (TBD)" — a role that has not been designated. MS-003 is due tomorrow.

**Affected milestones:**
- MS-003 — IT Infrastructure Requirements Documented (due **Feb 20**)
- MS-008 — IT Hardware and Cabling Vendor Contracted (due Mar 14)
- MS-012 — IT Cabling and Network Infrastructure Installed (due May 8)
- MS-014 — IT Systems Tested and Signed Off (due May 13)

**Affected risk:**
- RISK-008 `[technical]` — Network Downtime at Cutover — owner is also "IT Lead (TBD)"

**Mitigation Plan:**
> COO to designate interim IT Lead by Feb 20. If not filled, escalate to CTO to assign. All IT milestones blocked until role is filled.

**Required actions — today:**
- [ ] Sandra Wu designates IT Lead (interim or permanent) by end of day Feb 19
- [ ] IT Lead named in `project.toml` and `stakeholders.toml` (replace all "IT Lead (TBD)" entries)
- [ ] IT Lead reviews MS-003 scope and confirms delivery by Feb 20 or provides revised date
- [ ] RISK-002 `last_reviewed` updated in TOML on resolution
- [ ] BLOCKER signal cleared in coordination log once IT Lead is named

---

## 🟡 RISK-001 — Construction Permit Delay
**Score: 6** (Probability: Medium × Impact: High) | **Category:** `compliance`
**Status:** Open | **Escalation Required:** No | **Owner:** Alex Torres
**Last Reviewed:** 2026-02-17 (2 days ago)

**Why it matters now:** The permit application must be submitted by Feb 28 (9 days). This is on the critical path — the permit must be approved by Mar 25 (36 days) before contractor work can begin. If the application is not submitted on time, the Mar 25 approval is at risk, which delays the Phase 3 build-out start (Apr 1) and cascades to the move date (Jun 5).

**Mitigation Plan:**
> Submit permit application by Feb 28. Engage expediter if permit not issued by March 10. Maintain 2-week float in Phase 3 schedule.

**Required actions — this sprint:**
- [ ] Confirm permit application checklist with VEN-005 (Permits Office, FU-003 due Feb 28)
- [ ] Alex Torres to begin permit application package no later than Feb 23 (leaves 5 days to complete before submission deadline)
- [ ] Identify expediter contact now — do not wait until Mar 10 to look for one
- [ ] Update RISK-001 `last_reviewed` on next review

---

## 🟡 RISK-004 — Budget Overrun on Construction
**Score: 6** (Probability: Medium × Impact: High) | **Category:** `budget`
**Status:** Open | **Escalation Required:** No | **Owner:** Alex Torres
**Last Reviewed:** 2026-02-17 (2 days ago)

**Why it matters now:** The RFP has not been issued yet (MS-004 due Feb 27). Contractor bids will come in via DEL-001 (Apex GC, due Mar 5). The $45K contractor cap and $8K contingency reserve must be communicated explicitly in the RFP language — not applied after bids are received.

**Mitigation Plan:**
> Cap contractor bid at $45K. Maintain $8K contingency reserve. Require written change order approval from COO for any out-of-scope work >$1K.

**Required actions — before RFP issuance (Feb 27):**
- [ ] Include $45K bid cap language and change order clause in RFP draft
- [ ] Finance Team to formally confirm $8K contingency reserve allocation
- [ ] Confirm with Sandra Wu: is COO sign-off required for change orders >$1K or is PM delegated?

---

## Below Threshold (Monitoring)

| ID | Title | Category | Score | Owner | Note |
|---|---|---|---|---|---|
| RISK-003 | Furniture Lead Time Exceeds Schedule | `vendor` | 4 | Alex Torres | Activate when furniture RFP issued (Mar 5) |
| RISK-005 | Staff Resistance to Open Office | `org` | 4 | HR Team | HR feedback sessions due by Feb 28 |
| RISK-006 | Move Day Disruption | `schedule` | 3 | Alex Torres | Monitor in Phase 3 |
| RISK-007 | Lease Amendment Delayed | `compliance` | 3 | Legal Team | Legal drafting must start by Feb 21 |
| RISK-008 | Network Downtime at Cutover | `technical` | 3 | IT Lead (TBD) | Blocked by RISK-002 — owner unresolved |

---

## Knowledge Base

```toml
[kb.lessons_learned]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-004"
category    = "resource"
pattern     = "key_role_gap_at_project_start"
observation = "When a technical workstream lead is undesignated, risks in that workstream also have no real owner. RISK-008 (network downtime) is owned by 'IT Lead (TBD)' — meaning no one is actually tracking or mitigating it."
action      = "All risks must have a named human owner. 'TBD' is not a valid risk owner. Risk register should be reviewed at kickoff and any 'TBD' owners treated as open risks themselves."
severity    = "high"
phase       = "planning"

[[kb.lessons_learned.candidates]]
id          = "LL-MED-005"
category    = "compliance"
pattern     = "regulatory_dependency_on_critical_path"
observation = "Permit application deadline (Feb 28) falls in the same sprint as RFP issuance (Feb 27). Both require completed Phase 1 work. Compressing two deadline-sensitive compliance/procurement actions into the same week creates execution risk."
action      = "When permit and RFP deadlines coincide, sequence them: permit application first (earlier deadline, regulatory external dependency), then RFP (internal deadline, more controllable)."
severity    = "medium"
phase       = "planning"

[kb.ontology]

[[kb.ontology.patterns]]
id          = "pattern.resource.tbd_risk_owner"
name        = "TBD Risk Owner"
description = "A risk register entry lists 'TBD' or a placeholder as owner. The risk is nominally tracked but has no accountable person. Often surfaces when a key role is unfilled."
signal      = "blocker"
related_risk_categories = ["resource"]
mitigation  = "Risk ownership assignment is a Phase 0 / kickoff gate. No risk may be opened without a named, confirmed owner."

[[kb.ontology.relationships]]
from    = "risk[escalation_required=true]"
to      = "signal[BLOCKER]"
via     = "agent.signal_emit_blocker"
description = "Any risk with escalation_required=true automatically triggers a BLOCKER signal in the cross-agent coordination log. All milestones owned by the affected resource are tagged as blocked."
```

---

*Generated by: TPM Agent — Medium Project | tpm run medium_project*
