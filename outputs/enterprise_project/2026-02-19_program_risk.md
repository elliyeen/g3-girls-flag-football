# Program Risk Report
**Project:** Company-Wide ERP Rollout
**Date:** 2026-02-19 | **Scope:** Cross-Workstream Risk Aggregation
**Risks in register:** 20 | **Alerted:** 13 | **Critical:** 2 | **Stale:** 2

---

```toml
[report.metadata]
project_id   = "enterprise_project"
report_type  = "program_risk"
date         = "2026-02-19"
rag_status   = "red"
audience     = ["executive_sponsor", "program_manager", "workstream_leads"]

[report.taxonomy]
risk_categories_active = ["compliance", "budget", "vendor", "resource", "schedule", "technical", "org"]
signals_emitted        = ["compliance_breach", "blocker", "risk_escalation", "budget_alert"]
```

---

## Program Risk Posture — 🔴 RED

| Tier | Count | Status |
|---|---|---|
| 🔴 Critical (score ≥ 8 or escalated) | 2 | Escalated — action required |
| 🟠 High (score 6–7) | 5 | Alerted |
| 🟡 Medium (score 4–5) | 6 | Alerted |
| 🟢 Low (score ≤ 3) | 5 | Monitoring |
| ⏳ Stale (no update >21 days) | 2 | Requires owner check-in |

---

## Cross-Workstream Risk Map

```
WORKSTREAM          OPEN RISKS   CRITICAL   SIGNALS EMITTED
─────────────────────────────────────────────────────────────
ERP Configuration        3           —        MILESTONE_SLIP, RESOURCE_CONFLICT
Data Migration           4           1        COMPLIANCE_BREACH, BLOCKER, VENDOR_DELAY
Training & Adoption      2           —        MILESTONE_SLIP
IT Infrastructure        3           —        SCHEDULE, VENDOR_DELAY
Legal & Compliance       3           1        COMPLIANCE_BREACH, BLOCKER
OCM                      1           —        ORG_RESISTANCE
Integration              2           —        VENDOR_DELAY, DEPENDENCY
─────────────────────────────────────────────────────────────
PROGRAM TOTAL           18 active   2         7 distinct signals
```

---

## 🔴 Critical Risks — Immediate Action Required

### RISK-001 · Data Migration — DataBridge ISO 27001 Expired
**Score:** 9 (Probability: 3 · Impact: 3) | **Category:** `compliance` + `vendor` | **Status:** `escalated`
**Owner:** Alex Torres (CISO) | **Signal:** `COMPLIANCE_BREACH` + `BLOCKER`

DataBridge ISO 27001 certification expired **2026-02-01** — 18 days ago. All data-handling work by DataBridge is suspended.

**Blocked dependencies:**
- DEL-007 (Wave 1 data migration prep) — cannot begin
- MS-012 (Wave 1 migration start) — gate blocked
- Entire Wave 1 schedule assumes DataBridge availability from Apr 1

**Resolution path:** DataBridge submits renewal to cert body by Feb 28. CISO issues written hold (verbal not sufficient). Conditional work authorization possible if DataBridge provides in-progress attestation.

**Status as of 2026-02-19:** Renewal application not yet confirmed to certification body. FU-002 open.

---

### RISK-002 · Legal & Compliance — GDPR DPA Gap
**Score:** 9 (Probability: 3 · Impact: 3) | **Category:** `compliance` + `vendor` | **Status:** `escalated`
**Owner:** Legal Team | **Signal:** `COMPLIANCE_BREACH` + `BLOCKER`

4 of 12 vendor DPAs unsigned. Personal data cannot legally flow to 4 vendors. GDPR Art. 28 breach is active.

**Compounding factor:** POAM-004 — Pilot go-live occurred Feb 14 while DPIA was incomplete. Personal data was processed without completed DPIA for 14 days. Legal + CISO must assess GDPR Art. 33 reportable incident requirement.

**Resolution path:** LegalEdge identifies outstanding vendors by Feb 24 (FU-005). All DPAs executed by Feb 28 (DEL-032). Data flows to unidentified vendors suspended immediately.

---

## 🟠 High Risks — Alerted

| ID | Workstream | Description | Score | Owner | Due | Status |
|---|---|---|---|---|---|---|
| RISK-003 | ERP Configuration | OmniERP Wave 1 resource allocation unconfirmed (4 consultants, Apr–Jun) | 6 | Alex Torres / OmniERP | Feb 28 | Alerted |
| RISK-004 | Budget | CPI 0.80 — EAC $2.625M vs. BAC $2.1M; $525K overrun trajectory | 6 | CFO / PM | Immediate | Alerted |
| RISK-005 | IT Infrastructure | Production environment (DEL-014) not started — SOC 2 evidence dependency | 6 | SkyNet | Mar 31 | Alerted |
| RISK-006 | Integration | LogiTrack WMS integration design doc review timeline unconfirmed | 6 | Sam Okonkwo / LogiTrack | Feb 24 | Alerted |
| RISK-007 | Training & Adoption | Finance team resistance to ERP adoption; OCM engagement active | 6 | Horizon OCM / HR Lead | Mar 15 | Alerted |

---

## 🟡 Medium Risks — Alerted

| ID | Workstream | Description | Score | Owner | Status |
|---|---|---|---|---|---|
| RISK-008 | ERP Configuration | MS-005 data migration 12 days late — root cause in pilot lessons learned needed | 4 | DataBridge / PM | Monitoring |
| RISK-009 | IT Infrastructure | Network upgrade (DEL-027, Apex Telecom) not started — SOC 2 dependency | 4 | Apex Telecom | Alerted |
| RISK-010 | Legal & Compliance | SOC 2 pen test (DEL-023) not yet scoped — evidence gap risk | 4 | CISO / CyberShield | Alerted |
| RISK-011 | Training & Adoption | ClearPath training materials not yet under review | 4 | ClearPath | Scheduled |
| RISK-012 | Integration | PayLink test environment not started (DEL-016, due Mar 15) | 4 | PayLink | Alerted |
| RISK-013 | OCM | Stakeholder engagement below target in Operations workstream | 4 | Horizon OCM | Active |

---

## 🟢 Low Risks — Monitoring

| ID | Workstream | Description | Score | Notes |
|---|---|---|---|---|
| RISK-014 | ERP Configuration | Minor config gaps flagged in pilot UAT — all under remediation | 3 | Tracked in OmniERP backlog |
| RISK-015 | IT Infrastructure | VEN-001 OmniERP SOC 2 cert expires Apr 1 — renewal due now | 3 | 41 days remaining |
| RISK-018 | Budget | Phase 3 scope not yet baselined — Wave 1 contracts unsigned | 2 | Awaiting re-baseline |
| RISK-019 | Schedule | Pilot hypercare (MS-008, Mar 16) has no dependencies at risk currently | 2 | On track |
| RISK-020 | OCM | Executive sponsorship engagement strong — CEO + COO briefed monthly | 1 | Stable |

---

## ⏳ Stale Risks — Owner Check-In Required

| ID | Workstream | Description | Score | Owner | Last Update | Age |
|---|---|---|---|---|---|---|
| RISK-016 | Data Migration | Historical data quality validation — Wave 1 gap identified in pilot | 4 | DataBridge / Data Governance Owner | 2026-01-15 | **35 days** |
| RISK-017 | IT Infrastructure | Legacy system decommission sequencing not finalized | 3 | IT Infra Lead | 2026-01-01 | **49 days** |

**Action required:** PM to obtain updated status from DataBridge (RISK-016) and IT Infra Lead (RISK-017) this week. Risks with no update after 21 days are flagged; no update after 45 days = force-close or re-open with new evidence.

---

## Risk Trajectory — Phase Comparison

| Phase | Risks Open | Critical | Avg Score | Trend |
|---|---|---|---|---|
| Phase 1 (Complete) | 0 | 0 | — | Closed clean |
| Phase 2 (Current) | 13 alerted | 2 | 5.2 | 🔴 Elevated vs. Phase 1 |
| Phase 3 projection | TBD | — | — | Depends on compliance resolution |

---

## Workstream Risk Heat Map

```
             LOW (1-3)  MED (4-5)  HIGH (6-7)  CRITICAL (8-9)
             ─────────────────────────────────────────────────
ERP Config       1          1           1             —
Data Migr.       —          1           —             1 ●
Training         —          1           1             —
IT Infra         1          2           1             —
Legal/Comp.      —          1           —             1 ●
OCM              1          1           —             —
Integration      —          1           1             —
─────────────────────────────────────────────────────────────
TOTAL            3          7           4             2

● = Escalated signal emitted
```

---

## Knowledge Base

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-ENT-015"
category    = "risk"
pattern     = "stale_risk_no_escalation"
observation = "RISK-016 and RISK-017 are 35 and 49 days without an owner update. On enterprise programs, risk staleness accumulates silently — especially in workstreams where the owner is operationally focused. A 35-day-old data quality risk for Wave 1 migration could represent a Wave 1 date threat that is not yet visible in the schedule."
action      = "Risks must be reviewed by the owner at least every 21 days. Any risk exceeding the stale threshold triggers an automatic escalation to the program manager. The PM must either close the risk, confirm status, or re-scope it. No risk survives 30 days without a status comment."
severity    = "medium"
phase       = "execution"
scale_applicable = ["medium", "enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-ENT-016"
category    = "risk"
pattern     = "cross_workstream_risk_aggregation"
observation = "The 20 risks in this program span 7 workstreams. No single workstream owner can see the full cross-workstream risk picture. RISK-001 (DataBridge ISO expired) is in the Data Migration workstream but it blocks the IT Infrastructure workstream (production env timing) and the Legal/Compliance workstream (all vendor DPAs). The workstream owners saw isolated risks; the program manager sees compound risk."
action      = "Enterprise programs require a program-level risk aggregation run on every agent execution. Workstream risks must be cross-referenced for compound effects (one risk blocking 2+ workstreams). A program risk report is not a roll-up of workstream logs — it is a cross-workstream dependency analysis."
severity    = "high"
phase       = "execution"
scale_applicable = ["enterprise"]

[kb.ontology]
[[kb.ontology.patterns]]
id          = "pattern.risk.compound_workstream_risk"
name        = "Compound Workstream Risk"
description = "A risk that originates in one workstream but blocks multiple downstream workstreams. Standard workstream-level risk registers do not capture compound effects. Only a program-level aggregation view reveals the true blast radius."
signal      = "risk_escalation"
mitigation  = "program_risk report runs on every enterprise agent execution. Cross-workstream dependencies are mapped at program level, not workstream level."

[[kb.ontology.relationships]]
from        = "risk[RISK-001.data_migration]"
to          = "workstream[it_infrastructure, legal_compliance, integration]"
type        = "blocks"
description = "DataBridge ISO 27001 expiry (data migration risk) blocks work in 3 downstream workstreams: IT Infrastructure (Wave 1 timing), Legal/Compliance (vendor clearance), and Integration (data handoff dependencies)."

[[kb.ontology.vocabulary]]
domain = "risk.enterprise_program"
terms  = [
    "workstream_risk", "program_risk", "risk_trajectory", "stale_risk",
    "compound_risk", "risk_heat_map", "escalation_required", "blast_radius",
    "risk_register", "risk_score", "probability_impact_matrix",
    "cross_workstream_dependency", "residual_risk",
]
```

---

*Generated by: TPM Agent — Enterprise Project | tpm run enterprise_project*
