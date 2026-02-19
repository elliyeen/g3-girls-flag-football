# Management Brief
**Project:** Company-Wide ERP Rollout
**Date:** 2026-02-19 | **For:** Management Tier
**Audience:** ERP Project Manager · Data Migration Lead · Training Lead · IT Infra Lead · OCM Lead · CISO · Finance Lead · HR Lead · Integration Lead

---

```toml
[report.metadata]
project_id   = "enterprise_project"
report_type  = "mgmt_brief"
date         = "2026-02-19"
audience     = ["program_manager", "workstream_lead"]
rag_status   = "red"
```

---

## Program Status — 🔴 RED | Phase 2: Pilot Deployment (55% complete)

| Area | Status | Your Action? |
|---|---|---|
| Schedule | 🟡 AMBER | Phase 2 gate Mar 31 on track; MS-005 slipped 12d (data migration) |
| Budget | 🔴 RED | CPI 0.80 — Phase 2 ran 160% of phase budget. CFO review scheduled. |
| Compliance | 🔴 RED | 2 active breaches — DataBridge ISO expired, GDPR DPA gap |
| Risk | 🔴 RED | 13 of 20 risks alerted; 2 critical escalated |
| Vendors | 🟡 AMBER | DataBridge suspended; OmniERP Wave 1 headcount unconfirmed |
| Adoption | 🟡 AMBER | Finance team resistance tracked; OCM active |

---

## By Workstream — What You Need to Know

### Data Migration Lead (DataBridge / Internal)
**Status: 🔴 BLOCKED**

DataBridge's ISO 27001 cert expired Feb 1. All DataBridge data-handling work is **suspended by CISO order** until the renewed certificate is received.

- FU-002: DataBridge must submit renewal to certification body by **Feb 28** — confirm with Alex Torres directly
- RISK-016 (data quality validation, Wave 1) has not been updated in **35 days** — status required this week
- MS-005 root cause (12-day slip, data quality issues in pilot) must be documented as a lessons-learned entry before Wave 1 migration planning begins
- Wave 1 migration (MS-012, ~Apr) cannot be planned until cert is cleared and DataBridge resource plan is confirmed

---

### Training Lead (ClearPath / Internal)
**Status: 🟡 AMBER**

- MS-013 (ClearPath Wave 1 training, ~May) not started — training materials review should begin 6 weeks before Wave 1 go-live
- Finance team resistance is the highest-visibility adoption risk. OCM (Horizon) is engaged. Training design must account for resistance pattern — consider role-based training split for Finance vs. other depts
- ClearPath: confirm Wave 1 training delivery plan and materials review timeline by **Mar 15**
- RISK-011: training materials review not yet initiated — flag to ClearPath at next vendor touchpoint

---

### IT Infrastructure Lead (SkyNet / Apex Telecom)
**Status: 🟡 AMBER**

- DEL-014 (production environment hardening, SkyNet) due **Mar 31** — not started. This is a Phase 2 gate dependency and a SOC 2 evidence item.
- DEL-027 (network upgrade, Apex Telecom) also due **Mar 31** — not started.
- Both items must be underway by **Feb 28** to land by Mar 31. Escalate to vendor contacts today if work plans are not in place.
- RISK-017 (legacy system decommission sequencing) has not been updated in **49 days** — update required immediately
- OmniERP SOC 2 cert expires **Apr 1** (41 days). Notify OmniERP to begin renewal process now.

---

### CISO / Security (CyberShield / SecureAudit)
**Status: 🟡 AMBER**

- **DataBridge written hold:** Verbal hold is insufficient for compliance documentation. Issue written CISO hold before end of day.
- **Pen test (DEL-023, CyberShield):** Due Apr 30. Scope confirmation from CyberShield (FU-003) due **Feb 28**. Delay to pen test scope = SOC 2 evidence gap. Follow up this week.
- **VEN-009, VEN-011, VEN-012** (GDPR Consultants, Horizon OCM, LegalEdge): No security attestation on file. CISO to determine whether attestation is required given data handled. Document decision either way.
- SOC 2 observation period active (Jan 1 – Dec 2026). All in-scope ERP controls must remain operative. No control failures are current.

---

### Finance Lead
**Status: 🔴 RED — CFO Review Required**

- CPI is 0.80. Phase 2 ran ~160% of estimated budget ($505K vs. ~$315K planned).
- EAC is ~$2.625M vs. BAC of $2.1M — projected $525K overrun. Contingency ($150K) does not cover this.
- **CFO review must occur before Wave 1 vendor contracts are signed.** Do not commit to Wave 1 expenditures (~$500K+) without re-baseline approval.
- All change requests over $25K require CEO approval per RISK-004 mitigation plan. Finance Lead to enforce this gate.

---

### HR Lead
**Status: 🟡 AMBER**

- Finance team ERP resistance is active. Horizon OCM is engaged. HR should stay in the loop on adoption tracking cadence.
- HR module (Wave 1, MS-014 Jun 15) is on current schedule. No blockers at this time.
- Ensure the HR workstream's GDPR data flows are covered by the DPA audit (FU-005, LegalEdge, due Feb 24). HR handles sensitive personal data — DPA status must be confirmed.

---

### Integration Lead (LogiTrack / PayLink)
**Status: 🟡 AMBER**

- **LogiTrack (FU-004):** WMS-ERP integration design doc review timeline must be confirmed by **Feb 24** (5 days). DEL-018 (design doc approval) is due Feb 28. If FU-004 slips, there is no buffer.
- **PayLink (DEL-016):** Test environment must be ready by **Mar 15**. Not started. Escalate to PayLink contact today.
- RISK-012 (PayLink test env) is alerted. Integration testing window for Wave 1 (Finance + HR) is Apr–Jun. Mar 15 test env is a hard dependency.

---

### OCM Lead (Horizon OCM)
**Status: 🟡 AMBER**

- RISK-013: Stakeholder engagement below target in Operations workstream. Resolve before Wave 2 planning begins (Sep 15 target).
- Finance team resistance is the highest active adoption risk. Provide PM with fortnightly resistance tracking update.
- Pilot hypercare (MS-008) runs to Mar 16. Hypercare observations should feed directly into Wave 1 OCM plan.
- POAM-003 / POAM-004: GDPR DPIA completion is led by GDPR Consultants — but OCM materials and training content must align with approved data handling procedures once DPIA is finalized.

---

## Shared Actions — All Workstream Leads

| Action | Due | Owner |
|---|---|---|
| Update any risk you own that hasn't been touched in 21+ days | **Today** | RISK-016 (Data Mgr), RISK-017 (IT Infra) |
| Confirm all personal data flows covered in DPA audit | **Feb 24** | All leads |
| Confirm Wave 1 deliverable timelines to PM | **Feb 28** | All leads |
| Attend Phase 2 gate review (MS-010) | **Mar 31** | All leads |

---

## Upcoming Milestones — Next 45 Days

| Date | Milestone | Owner | Gate? |
|---|---|---|---|
| Feb 24 | LegalEdge confirms 4 outstanding DPAs (FU-005) | Legal Team | — |
| Feb 24 | LogiTrack confirms integration doc review timeline (FU-004) | Integration Lead | — |
| Feb 28 | All 12 vendor DPAs executed (DEL-032) | LegalEdge | — |
| Feb 28 | DataBridge ISO 27001 renewal submitted (FU-002) | DataBridge / CISO | — |
| Feb 28 | GDPR DPIA complete (DEL-025) | GDPR Consultants | — |
| Feb 28 | OmniERP Wave 1 resource confirmation (FU-001) | OmniERP / PM | — |
| Mar 15 | PayLink test environment ready (DEL-016) | PayLink / Integration | — |
| Mar 16 | Pilot Hypercare complete (MS-008) | All | — |
| Mar 31 | Phase 2 Go/No-Go Gate — Wave 1 (MS-010) | PM / Exec Sponsor | ✅ GATE |

---

## Knowledge Base

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-ENT-017"
category    = "resource"
pattern     = "workstream_lead_risk_staleness"
observation = "Two risks (RISK-016, RISK-017) exceeded the 21-day stale threshold. Both are owned by operationally focused leads (Data Migration, IT Infra Lead) who are managing day-to-day delivery alongside risk tracking. At enterprise scale, risk register maintenance falls behind when workstream leads have no automated prompt to update their items."
action      = "Each workstream lead should receive a weekly automated risk-update prompt (generated by the agent) listing their open risks, last-update age, and a simple status update request. The agent should block the program risk report if any stale risk has no owner comment."
severity    = "medium"
phase       = "execution"
scale_applicable = ["medium", "enterprise"]

[kb.ontology]
[[kb.ontology.patterns]]
id          = "pattern.mgmt.workstream_brief_by_role"
name        = "Workstream-Split Management Brief"
description = "Management briefs at enterprise scale must be personalized by workstream role — not distributed as a single generic status update. Each workstream lead receives only what is relevant to their domain, their open risks, their vendor items, and their required actions. Global items (budget, compliance posture) are included as context-only."
signal      = "none"
mitigation  = "mgmt_brief report generates workstream sections dynamically based on stakeholder tier=management and role tags in stakeholders.toml."
```

---

*Generated by: TPM Agent — Enterprise Project | tpm run enterprise_project*
