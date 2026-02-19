# Executive Brief
**Project:** Company-Wide ERP Rollout
**Date:** 2026-02-19 | **For:** CEO · CFO · CTO · COO
**Classification:** Executive Confidential

---

```toml
[report.metadata]
project_id   = "enterprise_project"
report_type  = "exec_brief"
date         = "2026-02-19"
audience     = ["executive_sponsor", "executive"]
rag_status   = "red"
```

---

## Program is 🔴 RED — Three Executive Actions Required This Week

This is not a routine status update. Three issues require executive decision or direct intervention before Feb 28. Without action, Wave 1 (Jun 15 go-live, Finance + HR) is at risk.

---

## Action 1 — CISO + CEO: Legal exposure from compliance breaches
**Window: This week (action required before Feb 28)**

The company has two active compliance violations:

**ISO 27001:** DataBridge (our Wave 1 data migration vendor) let its ISO 27001 certification expire on Feb 1. We identified this Feb 10. All DataBridge data work has been suspended. DataBridge must submit its renewal to the certification body by Feb 28 — CISO to track directly.

**GDPR:** 4 of 12 vendor DPAs are unsigned. Personal data is flowing to vendors without legal agreements in place. This is a GDPR Art. 28 violation. LegalEdge is identifying the 4 vendors by Feb 24 and executing DPAs by Feb 28.

**Compounding issue:** The ERP pilot went live Feb 14, but the GDPR Data Processing Impact Assessment (DPIA) wasn't complete until Feb 28 (deadline). Personal data was processed for 14 days without a signed DPIA. Legal and CISO must assess whether this triggers a mandatory 72-hour breach notification under GDPR Art. 33. If it does, the notification window has already passed — this requires immediate legal review.

**What we need from you:**
- CEO: Be briefed by CISO today. Understand the legal exposure position.
- CISO: Issue written hold on DataBridge (verbal hold does not satisfy compliance documentation requirements). Escalate GDPR Art. 33 review to external counsel if needed.

---

## Action 2 — CFO: Budget re-baseline before Wave 1 contracts are signed
**Window: Before Wave 1 contracts committed (~Mar)**

The project is running over budget. Here are the numbers:

| | Value |
|---|---|
| Original budget (BAC) | $2,100,000 |
| Current forecast to complete (EAC) | ~$2,625,000 |
| Projected overrun | **+$525,000** |
| Contingency reserve | $150,000 |
| Contingency shortfall | **−$375,000** |

The Phase 2 pilot ran at 160% of its estimated budget ($505K spent vs. ~$315K planned). The cost driver was the data migration delay (12 days late, data quality issues) combined with additional compliance consulting that wasn't originally scoped.

Wave 1 represents the largest single spend block: ~$500K in vendor contracts (OmniERP consulting alone is ~$280K). Signing Wave 1 contracts at the current cost trajectory without a re-baseline would commit the company to a program that will finish at approximately $2.6M against a $2.1M approval.

**What we need from you:**
- CFO: Schedule a re-baseline review before Wave 1 vendor contracts are executed. The project manager will bring updated Phase 3 scope and actuals.
- Scope freeze: Any change requests over $25K require CEO sign-off (per existing mitigation plan). This gate must be held.

---

## Action 3 — CEO or COO: OmniERP Wave 1 resource confirmation
**Window: Before Feb 28**

OmniERP has not confirmed the 4 consultants needed for Wave 1 (Apr–Jun engagement, ~$280K). This has been an open follow-up item (FU-001) since it was identified. If Wave 1 resources are not locked in the next 9 days, the Apr start date — and therefore the Jun 15 go-live — is at risk.

For a $280K+ engagement, this should have been contractually locked at Phase 1 close. It was not. We are now at risk of a resource gap at the opening of Wave 1.

**What we need from you:**
- CEO or COO: Engage OmniERP's Client Success Director directly if the PM's escalation does not result in confirmed names and dates by Feb 28. This is a supplier performance issue at executive level.

---

## Program Snapshot

| | |
|---|---|
| Phase | Phase 2 — Pilot Deployment (55% complete) |
| Phase 2 gate | Mar 31 (MS-010) — currently on track |
| Wave 1 go-live | Jun 15 (MS-014) — Finance + HR modules |
| Wave 2 go-live | Sep 15 (MS-018) — Operations + Logistics |
| Project close | Dec 31 (MS-023) |
| Schedule performance (SPI) | 0.57 — behind planned value |
| Cost performance (CPI) | 0.80 — spending $1.25 per $1 earned |
| SOC 2 observation | Active since Jan 1 · Audit draft due Nov 30 · Clean to date |

---

## What Is Going Well

- Pilot go-live (MS-007, Feb 14) completed. ERP system is live in pilot environment.
- Phase 1 finished 2 days early (all 3 milestones). Vendor relationships with OmniERP and ClearPath are strong.
- SOC 2 observation period is clean — no control exceptions reported by auditor Claire Nguyen (SecureAudit).
- Executive sponsorship engagement is rated 1/10 (highest) — CEO and COO direct involvement is credited as a program stabilizing factor.

---

## Decision Log — For Your Records

| Decision | Owner | Due | Status |
|---|---|---|---|
| CISO issues written DataBridge hold | CISO | Today | Pending |
| GDPR Art. 33 breach notification assessment | Legal + CISO | Immediate | Not started |
| CFO re-baseline review | CFO + PM | Before Wave 1 contracts | Not scheduled |
| CEO/COO engages OmniERP on Wave 1 resources | CEO or COO | Feb 28 | Pending |

---

## Knowledge Base

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-ENT-018"
category    = "org"
pattern     = "executive_decision_log_as_accountability_tool"
observation = "Three of the four critical program decisions required in this reporting period require executive action — not project manager action. The PM can escalate and report, but cannot compel a CFO budget review, a CEO supplier call, or a legal counsel engagement. At enterprise scale, the exec brief must include a decision log that makes outstanding executive commitments visible and attributable."
action      = "The executive brief must include a decision log section listing every executive-owned action: the decision required, the owner, the deadline, and the current status. This log should persist across runs and show the history of executive decisions through the program lifecycle."
severity    = "medium"
phase       = "execution"
scale_applicable = ["enterprise"]

[kb.ontology]
[[kb.ontology.patterns]]
id          = "pattern.exec.decision_log"
name        = "Executive Decision Log"
description = "A persistent record of decisions that can only be made at executive level. Distinct from action items (operational). Each entry is attributable to a specific executive owner, has a deadline, and a status. The log is a program governance artifact — not a meeting minutes extract."
signal      = "program_escalation"
mitigation  = "exec_brief includes decision_log section. Outstanding executive decisions are flagged as PROGRAM_ESCALATION signals when past due."

[[kb.ontology.vocabulary]]
domain = "governance.executive"
terms  = [
    "executive_brief", "decision_log", "executive_sponsor", "board_visibility",
    "escalation_path", "program_escalation", "governance_artifact",
    "change_request_threshold", "re_baseline", "executive_owned_action",
]
```

---

*Generated by: TPM Agent — Enterprise Project | tpm run enterprise_project*
