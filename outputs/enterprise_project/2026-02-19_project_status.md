# Project Status Report
**Project:** Company-Wide ERP Rollout
**Date:** 2026-02-19 | **PM:** Alex Torres | **Sponsor:** Katherine Reyes, CEO
**Phase:** Phase 2 — Pilot Deployment (55% complete)
**Scale:** `enterprise` | **Type:** `technical`

---

```toml
[report.metadata]
project_id    = "enterprise_project"
project_scale = "enterprise"
project_type  = "technical"
report_type   = "project_status"
date          = "2026-02-19"
phase         = "phase_2_pilot_deployment"
rag_status    = "red"
domain        = "erp.enterprise_rollout"

[report.taxonomy]
risk_categories_active   = ["compliance", "schedule", "budget", "resource",
                            "vendor", "technical", "org"]
signals_emitted          = ["blocker", "compliance_breach", "dependency_done",
                            "budget_alert", "program_escalation"]
compliance_frameworks    = ["SOC 2 Type II", "ISO 27001", "GDPR"]
```

---

## Overall Status — 🔴 RED

Two compliance breaches are active. DataBridge's ISO 27001 certification has been expired for 18 days — all data migration work is legally blocked until renewed. Four vendor GDPR Data Processing Agreements are unsigned — personal data cannot flow to those vendors. Both carry `escalation_required = true`. EVM signals a cost overrun trajectory (CPI 0.80, EAC ~$2.625M vs. $2.1M BAC). The Pilot Hypercare milestone (MS-008) is on track for Mar 16.

**7 signals emitted this run:** 2× BLOCKER · 2× COMPLIANCE_BREACH · 1× DEPENDENCY_DONE · 1× BUDGET_ALERT · 1× PROGRAM_ESCALATION

---

## 🚨 Active Signals

```
SIGNAL             SOURCE RISK   DATE        OWNER             RESOLVE BY
──────────────────────────────────────────────────────────────────────────
BLOCKER            RISK-001      2026-02-19  Alex Torres       2026-02-28
  DataBridge ISO 27001 expired. All data migration work blocked.

BLOCKER            RISK-002      2026-02-19  Legal Team        2026-02-24
  4 of 12 vendor DPAs unsigned. Personal data flows to those vendors blocked.

COMPLIANCE_BREACH  RISK-001      2026-02-19  CISO              Immediate
  ISO 27001 cert expired 2026-02-01 (18 days ago). DataBridge out of compliance.

COMPLIANCE_BREACH  RISK-002      2026-02-19  Legal Team        2026-02-24
  GDPR DPAs incomplete across 4 vendors. Regulatory exposure active.

DEPENDENCY_DONE    MS-007        2026-02-19  All dependents    —
  Pilot Go-Live complete 2026-02-14. Wave 1 planning can proceed in parallel.

BUDGET_ALERT       EVM           2026-02-19  CFO / PM          Next EVM review
  CPI = 0.80. EAC = ~$2,625,000. Forecast overrun ~$525K. Contingency = $150K.

PROGRAM_ESCALATION dual breach   2026-02-19  Katherine Reyes   Immediate
  Dual compliance breach + cost overrun trajectory. Board visibility required.
```

---

## Phase Summary

| Phase | Dates | Status | Complete |
|---|---|---|---|
| Phase 1: Discovery & Design | Jun 1 – Sep 30, 2025 | ✅ Complete | 100% |
| Phase 2: Pilot Deployment | Oct 1, 2025 – Mar 31, 2026 | 🔄 In Progress | 55% |
| Phase 3: Wave 1 Rollout (Finance & HR) | Apr 1 – Jun 30, 2026 | Not Started | 0% |
| Phase 4: Wave 2 Rollout (Ops & Logistics) | Jul 1 – Sep 30, 2026 | Not Started | 0% |
| Phase 5: Stabilization & Hypercare | Oct 1 – Dec 31, 2026 | Not Started | 0% |

---

## Milestone Table

| ID | Milestone | Category | Owner | Due | Status | Variance |
|---|---|---|---|---|---|---|
| MS-001 | BRD Approved | `planning` | Katherine Reyes | 2025-07-31 | ✅ Complete | +3d early |
| MS-002 | ERP Vendor Contracted | `procurement` | Alex Torres | 2025-08-31 | ✅ Complete | +2d early |
| MS-003 | Architecture Design Approved | `technical` | ERP Vendor Architect | 2025-09-30 | ✅ Complete | On time |
| MS-004 | Pilot Environment Validated | `technical` | ERP Vendor Impl Lead | 2025-11-30 | ✅ Complete | +2d early |
| MS-005 | Pilot Data Migration Complete | `data_migration` | Data Migration Lead | 2025-12-31 | ✅ Complete | **-12d late** |
| MS-006 | Pilot Training — Finance | `training` | Training Lead | 2026-01-31 | ✅ Complete | +1d early |
| MS-007 | Pilot Go-Live — Finance Module | `go_live` | Alex Torres | 2026-02-14 | ✅ Complete | On time |
| MS-008 | Pilot Hypercare — 30 Days | `stabilization` | ERP Vendor Support | 2026-03-16 | 🔄 In Progress | 25d remaining |
| MS-009 | Pilot Lessons Learned | `planning` | Alex Torres | 2026-03-31 | ⬜ Not Started | Dep: MS-008 |
| MS-010 | Phase 2 Gate — Go/No-Go Wave 1 | `phase_gate` | Katherine Reyes | 2026-03-31 | ⬜ Not Started | Dep: MS-009 |
| MS-011 | Wave 1 Environments Provisioned | `technical` | ERP Vendor Impl Lead | 2026-04-15 | ⬜ Not Started | Dep: MS-010 |
| MS-012 | Wave 1 Data Migration | `data_migration` | Data Migration Lead | 2026-05-15 | ⬜ Not Started | **BLOCKED** — ISO 27001 |
| MS-013 | Wave 1 Training — Finance & HR | `training` | Training Lead | 2026-05-31 | ⬜ Not Started | Dep: MS-011 |
| MS-014 | Wave 1 Go-Live — Finance & HR | `go_live` | Alex Torres | 2026-06-15 | ⬜ Not Started | Dep: MS-012, MS-013 |
| MS-015 | Phase 3 Gate — Go/No-Go Wave 2 | `phase_gate` | Katherine Reyes | 2026-06-30 | ⬜ Not Started | Dep: MS-014 |
| MS-016 | Wave 2 Environments Provisioned | `technical` | ERP Vendor Impl Lead | 2026-07-15 | ⬜ Not Started | Dep: MS-015 |
| MS-017 | Wave 2 Data Migration | `data_migration` | Data Migration Lead | 2026-08-15 | ⬜ Not Started | Dep: MS-016 |
| MS-018 | Wave 2 Go-Live — Ops & Logistics | `go_live` | Alex Torres | 2026-09-15 | ⬜ Not Started | Dep: MS-017 |
| MS-019 | Phase 4 Gate — Go/No-Go Hypercare | `phase_gate` | Katherine Reyes | 2026-09-30 | ⬜ Not Started | Dep: MS-018 |
| MS-020 | Hypercare — All Modules Stable | `stabilization` | ERP Vendor Support | 2026-11-30 | ⬜ Not Started | Dep: MS-019 |
| MS-021 | Legacy System Decommission | `decommission` | CTO | 2026-12-15 | ⬜ Not Started | Dep: MS-020 |
| MS-022 | SOC 2 Audit — ERP Scope Complete | `compliance` | Alex Torres | 2026-12-20 | ⬜ Not Started | Dep: MS-020 |
| MS-023 | Project Close — Executive Sign-Off | `closeout` | Katherine Reyes | 2026-12-31 | ⬜ Not Started | Dep: MS-021, MS-022 |

**Complete:** 7/23 | **In Progress:** 1 | **Blocked:** 1 (MS-012) | **Not Started:** 14

---

## Dependency Bottleneck Map

```
Phase 2 Gate (MS-010, Mar 31) ── blocks all of Phase 3, 4, 5
  └─► MS-011 ─► MS-012 [BLOCKED: ISO 27001 expired]
              └─► MS-014 (Wave 1 Go-Live, Jun 15)
                    └─► MS-015 ─► MS-016 ─► MS-018 ─► MS-019
                                                  └─► MS-020
                                                        └─► MS-021, MS-022 ─► MS-023

MS-012 (data migration) is the single most exposed milestone:
  blocked by ISO 27001 breach AND dependent on Phase 2 gate.
```

---

## Sprint Standup — 2026-02-19

```
MS-008  Pilot Hypercare 30-Day      🔄 ON TRACK    — 25 days remaining; ERP vendor active
MS-009  Pilot Lessons Learned       ⬜ NOT STARTED  — waits on MS-008 (Mar 16)
MS-010  Phase 2 Gate Review         ⬜ NOT STARTED  — waits on MS-009
─────────────────────────────────────────────────────────────
MS-012  Wave 1 Data Migration       🔴 BLOCKED      — DataBridge ISO 27001 expired
All others: dependent on Phase 2 gate; not yet in execution window
```

**Changes since last run:** RISK-001 moved to `escalated`. RISK-002 opened Feb 17 (new). COMPLIANCE_BREACH signals emitted for first time this program. MS-007 DEPENDENCY_DONE emitted (Feb 14 completion).

---

## Sprint Scope — Phase 2 Close (Feb 16 – Mar 31)

| Item | Category | Owner | Due | Priority |
|---|---|---|---|---|
| MS-008 — Pilot Hypercare | `stabilization` | ERP Vendor Support | Mar 16 | Manage |
| FU-002 — DataBridge ISO renewal | `compliance` | DataBridge / Alex Torres | Feb 28 | **Critical** |
| DEL-032 — All-vendor DPAs | `compliance.legal` | LegalEdge | Feb 28 | **Critical** |
| DEL-025 — GDPR DPIA | `compliance.gdpr` | GDPR Consultants | Feb 28 | High |
| FU-001 — OmniERP Wave 1 resource | `resource` | OmniERP / Alex Torres | Feb 28 | **Critical** |
| DEL-014 — Prod env provisioned | `technical` | SkyNet | Mar 31 | Critical |
| MS-009/010 — Lessons learned + gate | `phase_gate` | Alex Torres / CEO | Mar 31 | Critical |

---

## Risk Heatmap

```
Category      CRITICAL  HIGH  MEDIUM  LOW  STALE
──────────────────────────────────────────────────
compliance       2        1      0     1     1
schedule         0        2      0     0     0
budget           0        1      0     0     0
resource         0        1      0     1     0
vendor           0        1      0     1     0
technical        0        2      2     1     0
org              0        1      2     0     0
──────────────────────────────────────────────────
TOTAL            2        9      4     4     1
```

13 of 20 risks at or above alert threshold (score ≥ 4). See risk alert and program risk reports.

---

## Knowledge Base

```toml
[report.metadata]
project_id = "enterprise_project"

[[kb.lessons_learned.candidates]]
id          = "LL-ENT-001"
category    = "compliance"
pattern     = "vendor_cert_expiry_not_tracked_as_milestone"
observation = "DataBridge ISO 27001 expired Feb 1. The expiry was known (cert on file in vendors.toml) but was not surfaced as a project milestone or compliance deadline until the breach had already occurred (18 days after expiry)."
action      = "All vendor security attestation expiry dates must be tracked as compliance milestones in project.toml with a 45-day advance warning milestone and a renewal-required gate before the vendor can perform any controlled-data work."
severity    = "critical"
phase       = "execution"
project_type_applicable = ["technical", "mixed"]
scale_applicable        = ["medium", "enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-ENT-002"
category    = "compliance"
pattern     = "dpa_procurement_not_sequenced_with_vendor_onboarding"
observation = "4 of 12 vendors are operating without executed DPAs. DPAs should be completed at vendor onboarding (before first data handoff), not tracked as a separate project deliverable with a later deadline."
action      = "DPA execution must be a vendor onboarding gate criterion — no vendor receives any data until their DPA is executed. LegalEdge must confirm DPA status at every vendor activation."
severity    = "critical"
phase       = "procurement"
project_type_applicable = ["technical", "mixed"]
scale_applicable        = ["enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-ENT-003"
category    = "budget"
pattern     = "evm_negative_cpi_not_surfaced_until_midpoint"
observation = "CPI is 0.80 at 45% project completion — the project is spending $1.25 for every $1 of value delivered. This trajectory was not surfaced in previous status reports. At this CPI, EAC = ~$2.625M vs. BAC $2.1M — a $525K overrun, well beyond the $150K contingency."
action      = "EVM metrics (CPI, SPI, EAC) must be computed and reported from project inception, not just at midpoint. A CPI below 0.90 should trigger an immediate CFO review and re-baseline assessment."
severity    = "high"
phase       = "execution"
project_type_applicable = ["technical", "mixed"]
scale_applicable        = ["enterprise"]

[kb.ontology]

[[kb.ontology.patterns]]
id          = "pattern.compliance.vendor_cert_lifecycle"
name        = "Vendor Certification Lifecycle"
description = "Security attestations (SOC 2, ISO 27001, FedRAMP) have annual expiry cycles. Failure to track renewal as a project milestone creates compliance gaps that block data flows mid-project."
signal      = "compliance_breach"
related_risk_categories = ["compliance", "vendor"]
mitigation  = "At project kickoff, load all vendor cert expiry dates as compliance milestones with 45-day advance warning and a renewal gate before any controlled-data deliverable."

[[kb.ontology.patterns]]
id          = "pattern.budget.evm_cpi_trajectory"
name        = "CPI Overrun Trajectory"
description = "A CPI below 1.0 at project midpoint is a reliable predictor of final overrun. EAC = BAC / CPI is the best single-number forecast. When EAC exceeds BAC + contingency, re-baselining and executive review are mandatory."
signal      = "budget_alert"
related_risk_categories = ["budget"]
mitigation  = "Report CPI and EAC from sprint 1. Set a CPI < 0.90 trigger for automatic CFO escalation."
```

---

*Generated by: TPM Agent — Enterprise Project | tpm run enterprise_project*
