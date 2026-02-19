# Compliance Alert
**Project:** Company-Wide ERP Rollout
**Date:** 2026-02-19 | **Alert Window:** 45 days (by 2026-04-05)
**Frameworks in scope:** SOC 2 Type II · ISO 27001 · GDPR

**1 active breach · 6 deadlines within 45 days · 1 SOC 2 observation period active**

---

```toml
[report.metadata]
project_id  = "enterprise_project"
report_type = "compliance_alert"
date        = "2026-02-19"
rag_status  = "red"

[report.taxonomy]
compliance_frameworks    = ["SOC 2 Type II", "ISO 27001", "GDPR"]
signals_emitted          = ["compliance_breach", "blocker"]
```

---

## 🔴 ACTIVE BREACH — ISO 27001 (DataBridge)

DataBridge Migration Services (VEN-002) ISO 27001 certification **expired 2026-02-01** — 18 days ago.

- All DataBridge data-handling work is **immediately suspended**
- CISO must issue written hold — verbal hold is not sufficient for compliance documentation
- DEL-007 (Wave 1 data migration) cannot begin until renewed cert is in hand
- RISK-001 is in `escalated` status — resolution required before MS-012

**Resolution path:**
1. DataBridge submits ISO 27001 renewal application (deadline: Feb 28)
2. Interim: DataBridge provides written attestation of in-progress renewal to CISO
3. CISO reviews and issues conditional work authorization (if applicable)
4. Renewed certificate received → CISO clears hold → RISK-001 closed

---

## 🔴 IMMINENT — GDPR DPA Gap (9 days)

4 of 12 vendor DPAs are unsigned. **Deadline: Feb 28.** GDPR Article 28 requires a Data Processing Agreement before any processor handles personal data. This is not a project risk — it is an active legal exposure.

**Vendors confirmed with executed DPAs:** 8 of 12
**Vendors with outstanding DPAs:** 4 (identity to be confirmed by LegalEdge by Feb 24 — FU-005)

**Resolution path:**
1. LegalEdge identifies the 4 outstanding vendors by Feb 24 (FU-005)
2. Legal Team halts all personal data flows to identified vendors immediately
3. LegalEdge executes all 4 DPAs by Feb 28 (DEL-032)
4. RISK-002 closed — COMPLIANCE_BREACH signal cleared

---

## 📋 Compliance Deadlines Within 45 Days

| Item | Framework | Due | Days | Owner | Status |
|---|---|---|---|---|---|
| GDPR DPIA — ERP scope (DEL-025) | GDPR | Feb 28 | **9** | GDPR Consultants | Not complete |
| All vendor DPAs executed (DEL-032) | GDPR | Feb 28 | **9** | LegalEdge | 4 outstanding |
| DataBridge ISO renewal (FU-002) | ISO 27001 | Feb 28 | **9** | DataBridge | Expired |
| PayLink test env ready (DEL-016) | SOC 2 (control) | Mar 15 | 24 | PayLink | Not started |
| Prod environment hardened (DEL-014) | SOC 2 (control) | Mar 31 | 40 | SkyNet | Not started |
| Network upgrade complete (DEL-027) | SOC 2 (control) | Mar 31 | 40 | Apex Telecom | Not started |

---

## 🟡 SOC 2 Type II — Observation Period Active

- **Observation period began:** Jan 1, 2026
- **Audit report draft due:** Nov 30, 2026
- **Audit report final due:** Dec 20, 2026
- **Auditor:** Claire Nguyen, SecureAudit Partners (cnguyen@secureaudit.com)
- **Status:** CLEAN — no control exceptions reported to date
- **Risk:** RISK-010 (control failure probability: low, score 3) — monitoring only
- **Required:** All in-scope ERP controls must remain operative through Dec 2026

Production environment (DEL-014, due Mar 31) and pen test (DEL-023, due Apr 30) are both SOC 2 evidence points. Delays to either will create evidence gaps in the audit package.

---

## Knowledge Base

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-ENT-010"
category    = "compliance"
pattern     = "dpia_not_completed_before_data_processing_begins"
observation = "The GDPR DPIA for the ERP scope is due Feb 28 — but the Pilot Go-Live occurred Feb 14, meaning personal data has been processed in the ERP system for 5 days without a completed DPIA. A DPIA should be completed before, not concurrent with, the first data processing activity."
action      = "For any project handling personal data, the DPIA must be completed and signed off before the first data processing milestone (go-live, data load, or integration activation). DPIA completion must be a gate criterion for go-live."
severity    = "critical"
phase       = "execution"
project_type_applicable = ["technical", "mixed"]
scale_applicable        = ["medium", "enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-ENT-011"
category    = "compliance"
pattern     = "soc2_evidence_dependent_on_vendor_deliverables"
observation = "Two critical SOC 2 evidence points (production environment hardening and pen test) depend on vendor deliverables (SkyNet DEL-014 and CyberShield DEL-023). If these vendor deliverables slip, the SOC 2 audit evidence package will have gaps — which the auditor may treat as control failures."
action      = "Map every SOC 2 control evidence requirement to the project milestone or vendor deliverable that generates it. If a vendor deliverable is the only source of a required evidence item, treat it as a compliance-critical dependency with escalation path."
severity    = "high"
phase       = "execution"
scale_applicable = ["enterprise"]

[kb.ontology]
[[kb.ontology.patterns]]
id          = "pattern.compliance.dpia_as_go_live_gate"
name        = "DPIA as Go-Live Gate"
description = "A GDPR Data Processing Impact Assessment must be completed before the first data processing activity — not after. DPIA completion is a hard go-live gate criterion for any project processing personal data in the EU or under GDPR scope."
signal      = "blocker"
related_risk_categories = ["compliance"]
mitigation  = "Add DPIA completion as a dependency on the go-live milestone in project.toml."
```

---

*Generated by: TPM Agent — Enterprise Project | tpm run enterprise_project*
