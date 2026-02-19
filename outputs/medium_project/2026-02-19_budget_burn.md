# Budget Burn Report
**Project:** Office Relocation — Single Floor
**Date:** 2026-02-19
**Scale:** `medium` | **Phase:** Phase 1 — Planning & Design

---

```toml
[report.metadata]
project_id  = "medium_project"
report_type = "budget_burn"
date        = "2026-02-19"
rag_status  = "green"

[report.taxonomy]
risk_categories_relevant = ["budget"]
```

---

## Budget Status — 🟢 GREEN

| Metric | Value |
|---|---|
| Total Budget | $85,000 |
| Spent to Date | $9,800 |
| Remaining | $75,200 |
| Burn Rate | **11.5%** |
| Timeline Elapsed | **13.6%** (Day 18 of 132) |
| Contingency Reserve | $8,000 (not yet invoked) |
| Budget Available (ex-contingency) | $67,200 |

Burn rate (11.5%) is running below time elapsed (13.6%). Spending is on pace for a planning phase. No budget concerns at this time.

---

## Spend by Phase (Estimated)

| Phase | Estimated Budget | Spent | Remaining | Status |
|---|---|---|---|---|
| Phase 1: Planning & Design | ~$12,000 | $9,800 | ~$2,200 | 🟢 On pace |
| Phase 2: Vendor Contracting | ~$5,000 | $0 | ~$5,000 | Not started |
| Phase 3: Build-Out & IT | ~$60,000 | $0 | ~$60,000 | Not started |
| Move Day & Close | ~$8,000 | $0 | ~$8,000 | Not started |

*Phase estimates are indicative. Budget baseline (MS-005) to be formally approved by Feb 28.*

---

## Forecast to Complete

| Scenario | EAC | Variance |
|---|---|---|
| On track (current burn rate holds) | $85,000 | $0 — within budget |
| RISK-004 materializes (GC bid over cap) | ~$93,000 | +$8,000 over — consumes full contingency |
| RISK-002 resolution requires consulting IT resource | ~$87,000 | +$2,000 — partially covered by contingency |

**Contingency reserve:** $8,000. RISK-004 (construction overrun) is the primary scenario that would consume it. If both RISK-004 and unexpected IT consulting costs occur, contingency is insufficient — escalation to COO would be required.

---

## Upcoming Budget Commitments

| Item | Category | Estimated Amount | Trigger Milestone |
|---|---|---|---|
| Permit application fees | `compliance.regulatory` | ~$500–$2,000 | MS-010 (Mar 31) |
| General contractor contract | `build_out` | ~$45,000 (cap) | MS-006 (Mar 10) |
| Furniture and fixtures PO | `procurement.furniture` | ~$18,000–$22,000 | MS-007 (Mar 14) |
| IT cabling and infrastructure | `it_infrastructure` | ~$8,000–$12,000 | MS-008 (Mar 14) |
| Moving company | `logistics` | ~$3,000–$5,000 | MS-009 (Mar 20) |
| Lease amendment legal fees | `compliance.legal` | ~$1,500–$3,000 | DEL-012 (Mar 15) |

Largest single commitment is the GC contract. RFP language must include the $45K cap (per RISK-004 mitigation).

---

## Budget Gate: MS-005 — Budget Baseline Approval (Due Feb 28)

The formal budget baseline has not yet been approved by Finance. This is 9 days away and depends on RFP issuance (MS-004, Feb 27). Until MS-005 is closed, the $85,000 total and phase allocation are working estimates.

**Action required:**
- [ ] Alex Torres to include phase-level budget breakdown in RFP package
- [ ] Sandra Wu to schedule budget review with Finance Team for Feb 28

---

## Knowledge Base

```toml
[kb.lessons_learned]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-008"
category    = "budget"
pattern     = "budget_baseline_not_set_before_vendor_commitments"
observation = "The formal budget baseline (MS-005) is due Feb 28 — the same day the RFP closes (MS-004 due Feb 27). Vendor bids will come in before the budget baseline is formally approved, creating a sequencing problem: the baseline should precede vendor commitments, not coincide with them."
action      = "Budget baseline approval (MS-005) should be sequenced before or concurrent with RFP issuance, not after. Move MS-005 due date to Feb 25 or issue the RFP only after the baseline is approved."
severity    = "medium"
phase       = "planning"
project_type_applicable = ["mixed", "non_technical", "technical"]
scale_applicable        = ["medium", "enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-009"
category    = "budget"
pattern     = "contingency_single_risk_consumption"
observation = "A single risk scenario (RISK-004 — GC bid over cap) would consume the entire $8K contingency reserve. Contingency sizing should account for multiple simultaneous risk materializations, not just the largest single scenario."
action      = "For medium-scale projects, contingency reserve should be sized to cover the two highest-probability risks simultaneously. For this project, RISK-004 + IT consulting costs = ~$10K needed; reserve is only $8K."
severity    = "medium"
phase       = "planning"

[kb.ontology]

[[kb.ontology.patterns]]
id          = "pattern.budget.baseline_approval_timing"
name        = "Budget Baseline Sequencing"
description = "The formal budget baseline must precede the first vendor commitment. If the baseline approval milestone is concurrent with or after RFP issuance, vendor bids arrive without an approved ceiling to evaluate them against."
signal      = "dependency_done"
related_risk_categories = ["budget", "vendor"]
mitigation  = "Budget baseline milestone must be a prerequisite (dependency) for RFP issuance, not a peer milestone."

[[kb.ontology.relationships]]
from    = "milestone[budget_baseline_approved]"
to      = "milestone[rfp_issued]"
type    = "must_precede"
description = "Budget baseline approval must precede RFP issuance. Encoding this as a hard dependency prevents vendor commitments being made without an approved ceiling."
```

---

*Generated by: TPM Agent — Medium Project | tpm run medium_project*
