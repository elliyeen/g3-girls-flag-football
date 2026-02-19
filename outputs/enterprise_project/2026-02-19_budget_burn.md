# Budget Burn Report
**Project:** Company-Wide ERP Rollout
**Date:** 2026-02-19 | **Phase:** Phase 2 — Pilot Deployment

---

```toml
[report.metadata]
project_id  = "enterprise_project"
report_type = "budget_burn"
date        = "2026-02-19"
rag_status  = "red"

[report.taxonomy]
risk_categories_relevant = ["budget"]
signals_emitted          = ["budget_alert"]
```

---

## Budget Status — 🔴 RED (EAC overrun trajectory)

| Metric | Value | Status |
|---|---|---|
| Budget at Completion (BAC) | $2,100,000 | Baseline |
| Actual Cost (AC) | $680,000 | 32.4% spent |
| Timeline Elapsed | 45.4% (Day 263 of 579) | — |
| Burn vs. Elapsed | 32.4% < 45.4% | 🟢 Cash flow OK |
| Contingency Reserve | $150,000 | Intact |
| **CPI (cost performance)** | **0.80** | 🔴 Spending $1.25 per $1 earned |
| **SPI (schedule performance)** | **0.57** | 🔴 Lagging planned value |
| **EAC (forecast at completion)** | **~$2,625,000** | 🔴 +$525K over BAC |
| EAC vs. Contingency | Overrun ~$525K / Contingency $150K | 🔴 Contingency insufficient |

---

## Earned Value Detail

| EVM Metric | Calculation | Value |
|---|---|---|
| Planned Value (PV) | 45.4% × $2,100,000 | ~$953,000 |
| Earned Value (EV) | Phase 1 (100%) ~15% + Phase 2 (55%) ~20% of BAC | ~$546,000 |
| Actual Cost (AC) | Recorded spend | $680,000 |
| Cost Variance (CV) | EV − AC | **−$134,000** |
| Schedule Variance (SV) | EV − PV | **−$407,000** |
| CPI | EV ÷ AC | **0.80** |
| SPI | EV ÷ PV | **0.57** |
| EAC (forecast) | BAC ÷ CPI | **~$2,625,000** |
| Variance at Completion (VAC) | BAC − EAC | **−$525,000** |
| TCPI (to-complete CPI needed) | (BAC − EV) ÷ (BAC − AC) | **1.07** — achievable but requires improvement |

*Phase percentages used in EV calculation are working estimates. Phase cost baselines to be set at MS-005 budget gate (Feb 28 equivalent was approved at project start).*

---

## Spend by Phase

| Phase | Est. Budget | Spent | % of Phase | Status |
|---|---|---|---|---|
| Phase 1: Discovery & Design | ~$175,000 | ~$175,000 | 100% | ✅ Complete |
| Phase 2: Pilot Deployment | ~$315,000 | ~$505,000 | **160%** | 🔴 Over phase budget |
| Phase 3: Wave 1 | ~$700,000 | $0 | 0% | Not started |
| Phase 4: Wave 2 | ~$600,000 | $0 | 0% | Not started |
| Phase 5: Hypercare | ~$310,000 | $0 | 0% | Not started |

**Phase 2 is running ~60% over its estimated budget.** Primary drivers: pilot data migration took longer than planned (MS-005 12 days late), extended ERP vendor engagement hours, and additional compliance consulting not originally scoped.

---

## Forecast Scenarios

| Scenario | EAC | Notes |
|---|---|---|
| Current trajectory (CPI 0.80 holds) | ~$2,625,000 | +$525K over — contingency not sufficient |
| CPI improves to 0.90 in Phases 3–5 | ~$2,450,000 | +$350K over — still exceeds contingency |
| CPI recovers to 1.00 for remaining work | ~$2,283,000 | +$183K over — contingency covers it |
| Scope reduction offsetting overrun | Variable | CEO approval required (>$25K change requests) |

To stay within BAC + contingency ($2,250,000), the project must achieve a TCPI of **1.07** on all remaining work. This means spending $0.93 for every $1 of planned value in Phases 3–5. Achievable with strict scope discipline, but requires immediate CFO review and re-planning.

---

## Upcoming Major Commitments

| Commitment | Category | Estimated | Milestone |
|---|---|---|---|
| OmniERP Wave 1 consulting (4 consultants, 3 months) | `erp_implementation` | ~$280,000 | MS-011–014 |
| DataBridge Wave 1 migration | `data_migration` | ~$120,000 | MS-012 |
| ClearPath Wave 1 training | `training` | ~$85,000 | MS-013 |
| SkyNet production environment | `it_infrastructure` | ~$65,000 | DEL-014 |
| CyberShield pen test | `security` | ~$35,000 | DEL-023 |
| GDPR compliance sign-off | `compliance.gdpr` | ~$25,000 | DEL-026 |

Largest single commitment is Wave 1 ERP consulting. FU-001 (OmniERP resource confirmation, due Feb 28) must be resolved before this commitment can be locked.

---

## Recommended Actions

1. **Immediate:** Schedule CFO review of EVM data — CPI 0.80 and EAC $2.625M require executive visibility before Wave 1 contracts are placed
2. **Before Wave 1 start:** Re-baseline budget with Phase 3 actual scope; update BAC to reflect reality
3. **Scope freeze:** Any Wave 1 change requests >$25K to CEO per RISK-004 mitigation plan
4. **Contingency gate:** $150K contingency should not be drawn down until formal re-baseline is approved

---

## Knowledge Base

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-ENT-008"
category    = "budget"
pattern     = "pilot_phase_cost_overrun_not_reforecast"
observation = "Phase 2 ran ~160% of its estimated budget ($505K vs. ~$315K estimated). This overrun was absorbed without triggering a re-forecast or CFO review. The first time the cost overrun trajectory (CPI 0.80) is visible in reporting is today — at 45% project completion."
action      = "Any phase that finishes more than 110% of its estimated budget must trigger an automatic re-forecast of remaining phases before the next phase begins. Pilot phase overruns are strong predictors of total program overruns."
severity    = "high"
phase       = "execution"
project_type_applicable = ["technical"]
scale_applicable        = ["enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-ENT-009"
category    = "budget"
pattern     = "contingency_undersized_for_enterprise_program"
observation = "The $150K contingency reserve (7.1% of BAC) is insufficient to cover the current EAC overrun trajectory ($525K). Industry standard for enterprise ERP programs is 10–15% contingency reserve. At 7.1%, any single phase overrun consumes the entire reserve."
action      = "For enterprise ERP programs, contingency reserve should be set at 12–15% of BAC at project inception. For a $2.1M program, that is $252K–$315K minimum."
severity    = "high"
phase       = "planning"
scale_applicable = ["enterprise"]

[kb.ontology]
[[kb.ontology.patterns]]
id          = "pattern.budget.pilot_to_program_overrun_signal"
name        = "Pilot Phase Overrun as Program Signal"
description = "A pilot phase that exceeds its budget is a reliable leading indicator of total program cost overrun. The cost inefficiencies established in the pilot (staffing mix, data quality issues, scope creep) tend to scale with each subsequent wave."
signal      = "budget_alert"
related_risk_categories = ["budget", "schedule"]
mitigation  = "Require a formal re-baseline review before any wave starts if the preceding phase exceeded budget by more than 10%."
```

---

*Generated by: TPM Agent — Enterprise Project | tpm run enterprise_project*
