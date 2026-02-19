# Vendor Follow-Up Report
**Project:** Company-Wide ERP Rollout
**Date:** 2026-02-19 | **Warn Window:** 5 days (items due by 2026-02-24)

**0 overdue · 2 in warn window · 6 critical upcoming (all by Feb 28)**

---

```toml
[report.metadata]
project_id  = "enterprise_project"
report_type = "vendor_followup"
date        = "2026-02-19"

[report.taxonomy]
vendor_categories_active = ["erp_implementation", "data_migration", "it_infrastructure",
                            "legal", "compliance.gdpr", "integration_partner"]
security_flags           = ["VEN-002 ISO 27001 expired"]
```

---

## 🟡 DUE IN WARN WINDOW (by Feb 24)

### FU-004 · LogiTrack WMS — Integration Design Doc Review
**Vendor:** VEN-006 LogiTrack WMS | **Contact:** Sam Okonkwo — sokonkwo@logitrack.com
**Due:** 2026-02-24 (5 days) | **Priority:** High | **Category:** `integration_partner`

LogiTrack must confirm the integration design doc review timeline. DEL-018 (design doc approval) is due Feb 28 — just 4 days after this follow-up. If FU-004 is not closed by Feb 24 there is no time to resolve review issues before the Feb 28 DEL-018 deadline.

> **Suggested message:**
> "Hi Sam — following up on the WMS-ERP integration design doc review (FU-004). We need your review timeline confirmed by Feb 24 so we can ensure DEL-018 is approved by Feb 28. Can you confirm your availability and any outstanding questions on the design doc? Thanks, Alex"

---

### FU-005 · LegalEdge — DPA Status: 4 of 12 Vendors Outstanding
**Vendor:** VEN-012 LegalEdge | **Contact:** Oliver Grant — ogrant@legaledge.com
**Due:** 2026-02-24 (5 days) | **Priority:** CRITICAL | **Category:** `legal`

This is directly linked to RISK-002 (GDPR COMPLIANCE BREACH). 4 vendors have no executed DPA. Personal data cannot legally flow to these vendors. LegalEdge must identify the 4 vendors, confirm their current status, and provide a close-out plan by Feb 24.

> **Suggested message:**
> "Hi Oliver — urgent follow-up on FU-005. We have an active GDPR compliance flag: 4 of 12 vendor DPAs are unsigned. We need the list of outstanding vendors and a close-out plan by Feb 24. All data flows to these vendors are currently blocked. DEL-032 deadline is Feb 28 — we need all DPAs executed by then. Please treat this as your highest priority item. Thanks, Alex"

---

## 🔴 CRITICAL UPCOMING — All Due Feb 28

| ID | Vendor | Item | Category | Priority |
|---|---|---|---|---|
| FU-001 | OmniERP Solutions | Wave 1 consultant allocation (4 people, Apr–Jun) | `erp_implementation` | **Critical** |
| FU-002 | DataBridge Migration | ISO 27001 renewal evidence submitted | `compliance` | **Critical** |
| FU-003 | SkyNet Infrastructure | Pen test scope confirmation for prod env | `security` | High |
| DEL-018 | LogiTrack WMS | WMS-ERP integration design doc approved | `integration` | High |
| DEL-025 | GDPR Consultants | DPIA for ERP scope complete | `compliance.gdpr` | High |
| DEL-032 | LegalEdge | All 12 vendor DPAs executed | `compliance.legal` | **Critical** |

**Note on FU-002 (DataBridge):** The ISO 27001 renewal is not just a follow-up item — it is the resolution condition for RISK-001 (active COMPLIANCE_BREACH). Until the renewed certificate is in hand, DataBridge may not touch any production or Wave 1 data. The follow-up must confirm that the renewal has been **submitted to the certification body** — not merely initiated internally.

---

## Vendor Security Attestation Status

| Vendor | Framework | Expiry | Status |
|---|---|---|---|
| VEN-001 OmniERP | SOC 2 Type II | 2026-04-01 | ✅ Current — **expires in 41 days** |
| VEN-002 DataBridge | ISO 27001 | 2026-02-01 | 🔴 **EXPIRED 18 days ago** |
| VEN-003 ClearPath Training | SOC 2 Type I | 2026-09-01 | ✅ Current |
| VEN-004 SkyNet Infra | SOC 2 Type II | 2026-07-01 | ✅ Current |
| VEN-005 PayLink | SOC 2 Type II | 2026-10-01 | ✅ Current |
| VEN-006 LogiTrack | SOC 2 Type II | 2026-08-01 | ✅ Current |
| VEN-007 SecureAudit | — | — | ⬜ No attestation (auditor — exempt) |
| VEN-008 CyberShield | CREST Certified | 2026-06-01 | ✅ Current |
| VEN-009 GDPR Consultants | — | — | ⬜ **No attestation on file** |
| VEN-010 Apex Telecom | SOC 2 Type I | 2026-05-01 | ✅ Current |
| VEN-011 Horizon OCM | — | — | ⬜ **No attestation on file** |
| VEN-012 LegalEdge | — | — | ⬜ **No attestation on file** |

**Action required:** VEN-009, VEN-011, VEN-012 have no attestation on file. CISO to determine whether attestations are required for these vendors given the data they handle.

**Watch:** VEN-001 OmniERP SOC 2 expires Apr 1 (41 days). Renewal should be initiated now.

---

## Knowledge Base

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-ENT-006"
category    = "vendor"
pattern     = "critical_vendor_no_attestation"
observation = "3 active vendors (GDPR Consultants, Horizon OCM, LegalEdge) have no security attestation on file. These vendors handle sensitive engagement data (GDPR advice, OCM materials, legal contracts). Their absence from the attestation registry was not detected until the enterprise-scale vendor_security_audit task ran."
action      = "All vendors must have an attestation status determination at onboarding: either (a) a filed attestation, (b) a documented exemption with CISO approval, or (c) a remediation timeline. 'No attestation on file' is not an acceptable ongoing state."
severity    = "medium"
phase       = "procurement"

[[kb.lessons_learned.candidates]]
id          = "LL-ENT-007"
category    = "vendor"
pattern     = "attestation_expiry_renewal_lag"
observation = "OmniERP SOC 2 expires in 41 days (Apr 1). At enterprise scale, SOC 2 renewals take 4–6 weeks minimum. If OmniERP does not begin renewal now, the cert will lapse before the Wave 1 Go-Live (Jun 15). The vendor_followup task only flags items within the warn window — a 45-day compliance alert window is required for cert renewals."
action      = "Security attestation renewals must trigger at 90 days (not 45). For enterprise programs, certifications must not be allowed to approach their annual renewal window without a confirmed renewal timeline."
severity    = "medium"
phase       = "execution"

[kb.ontology]
[[kb.ontology.patterns]]
id          = "pattern.vendor.attestation_registry"
name        = "Vendor Attestation Registry"
description = "Every vendor in an enterprise program must have a security attestation status on file: current cert, documented exemption, or remediation plan. The registry must be checked on every agent run. Missing entries are treated as compliance risks, not administrative oversights."
signal      = "compliance_breach"
mitigation  = "vendor_security_audit runs on every enterprise agent execution. Missing attestations generate a CISO action item. Expired certs generate COMPLIANCE_BREACH."
```

---

*Generated by: TPM Agent — Enterprise Project | tpm run enterprise_project*
