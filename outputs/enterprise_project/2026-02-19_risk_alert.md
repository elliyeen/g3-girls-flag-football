# Risk Alert
**Project:** Company-Wide ERP Rollout
**Date:** 2026-02-19 | **Threshold:** Score ≥ 4 (enterprise override)

**13 of 20 risks alerted. 2 critical with escalation required. 2 stale.**

---

```toml
[report.metadata]
project_id  = "enterprise_project"
report_type = "risk_alert"
date        = "2026-02-19"
rag_status  = "red"

[report.taxonomy]
risk_categories_alerted = ["compliance", "schedule", "budget", "resource",
                           "vendor", "technical", "org"]
signals_emitted         = ["blocker", "compliance_breach", "program_escalation"]
stale_risks             = ["RISK-016", "RISK-017"]
```

---

## 🔴 CRITICAL — Escalation Required

### RISK-001 · DataBridge ISO 27001 Certification Expired
**Score: 9** (High × High) | **Category:** `compliance` | **Status:** `escalated`
**Owner:** Alex Torres | **Last Reviewed:** 2026-02-17

ISO 27001 expired **2026-02-01 — 18 days ago.** DataBridge cannot legally perform any controlled-data work. MS-012 (Wave 1 data migration) is formally blocked. CISO must approve any work continuation. BLOCKER + COMPLIANCE_BREACH signals emitted.

**Required actions:**
- [ ] Alex Torres: confirm DataBridge renewal submission by Feb 28
- [ ] CISO: issue written hold on all DataBridge data-handling work until cert received
- [ ] LegalEdge: confirm ISO 27001 renewal is a condition of DataBridge's DPA
- [ ] Update RISK-001 status to `mitigating` once renewal evidence received

---

### RISK-002 · Data Processing Agreements Incomplete — GDPR Exposure
**Score: 9** (High × High) | **Category:** `compliance` | **Status:** `open`
**Owner:** Legal Team | **Last Reviewed:** 2026-02-17

4 of 12 vendors have no executed DPA. Personal data **cannot legally flow** to those vendors under GDPR. BLOCKER + COMPLIANCE_BREACH signals emitted.

**Required actions:**
- [ ] LegalEdge FU-005: deliver status of 4 outstanding DPAs by **Feb 24** (5 days)
- [ ] Legal Team: identify which 4 vendors are outstanding — halt any data flows to them now
- [ ] DEL-032 (all DPAs): full execution by Feb 28
- [ ] Update `last_reviewed` once DPA status confirmed

---

## 🟠 HIGH — Alerted (Score ≥ 4)

| ID | Title | Category | Score | Status | Owner | Action Due |
|---|---|---|---|---|---|---|
| RISK-003 | Phase 2 Gate Delay | `schedule` | 6 | open | Alex Torres | Mar 31 |
| RISK-004 | Budget Overrun Phase 3 | `budget` | 6 | open | Alex Torres | Wave 1 scope freeze |
| RISK-005 | Low User Adoption — Finance | `org` | 6 | **mitigating** | Change Mgmt Lead | Ongoing |
| RISK-006 | PayLink API Delayed | `vendor` | 6 | open | Alex Torres | Mar 15 |
| RISK-007 | Legacy System Decommission | `technical` | 4 | open | CTO | Wave 2 design |
| RISK-008 | OmniERP Resource Unavailability | `resource` | 6 | open | Alex Torres | **Feb 28** |
| RISK-011 | LogiTrack API Instability | `technical` | 4 | open | IT Infra Lead | Feb 28 |
| RISK-012 | Change Fatigue | `org` | 4 | open | Change Mgmt Lead | Q2 |
| RISK-013 | Data Quality Mid-Migration | `technical` | 6 | **mitigating** | Data Gov Owner | Ongoing |
| RISK-018 | Training Completion < 90% | `org` | 4 | open | Training Lead | Wave 1 |
| RISK-020 | Cross-Workstream Dep Failures | `schedule` | 6 | open | Alex Torres | Each gate |

**Near-term actions required this sprint (by Feb 28):**

**RISK-008 — OmniERP Resources:** FU-001 confirms 4 Wave 1 consultants Apr–Jun. If not confirmed by Feb 28, escalate to Rachel Huang (rhuang@omnierp.com). This is the single vendor dependency that could collapse the entire Wave 1 timeline if it slips.

**RISK-006 — PayLink API:** Test environment must be live by Mar 15 or payroll bridge activates. Confirm DEL-016 status with Dana Wu (dwu@paylink.com) this week.

**RISK-011 — LogiTrack:** Integration design doc review (DEL-018) due Feb 28. FU-004 due Feb 24. Sam Okonkwo (sokonkwo@logitrack.com).

---

## ⬜ Below Threshold (Monitoring)

| ID | Title | Category | Score | Status |
|---|---|---|---|---|
| RISK-009 | Pen Test Findings Block Go-Live | `technical` | 3 | open |
| RISK-010 | SOC 2 Control Failures | `compliance` | 3 | open |
| RISK-014 | Network Bandwidth Insufficient | `technical` | 3 | mitigating |
| RISK-015 | Data Migration Lead Attrition | `resource` | 3 | open |
| RISK-019 | DR Environment Not Tested | `technical` | 3 | open |

---

## ☠ Stale Risk Register Entries

| ID | Title | Last Reviewed | Days Stale | Owner | Action |
|---|---|---|---|---|---|
| RISK-016 | Regulatory Change Affects Config | 2026-01-15 | **35 days** | Legal Team | Review now |
| RISK-017 | ERP Vendor Financial Instability | 2026-01-01 | **49 days** | CEO | Annual review due |

RISK-017 is `accepted` status — CEO accepted this risk at project inception. Annual review required per mitigation plan. Update `last_reviewed` after review.

---

## Knowledge Base

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-ENT-004"
category    = "compliance"
pattern     = "compliance_breach_discovered_post_fact"
observation = "ISO 27001 expired Feb 1; not surfaced as a risk alert until Feb 10 (RISK-001 identified date) and still open Feb 19 (18 days after expiry). The breach was discoverable from vendors.toml data (expiry_date field) but was not being actively monitored."
action      = "Vendor cert expiry monitoring must run on every agent execution — not just when a human notices. The vendor_security_audit task should auto-generate a COMPLIANCE_BREACH signal for any is_current=false field."
severity    = "critical"
phase       = "execution"

[[kb.lessons_learned.candidates]]
id          = "LL-ENT-005"
category    = "compliance"
pattern     = "risk_staleness_in_high_velocity_program"
observation = "RISK-016 and RISK-017 are 35 and 49 days stale respectively on an 18-month enterprise program. In a high-stakes program, stale risks are invisible risks — they may have materialised and no one is tracking them."
action      = "Enterprise programs should enforce a 21-day maximum staleness window for all risks regardless of score. Stale risks below threshold should surface in the ops brief, not just the risk alert."
severity    = "medium"
phase       = "execution"

[kb.ontology]
[[kb.ontology.patterns]]
id          = "pattern.compliance.realtime_cert_monitoring"
name        = "Realtime Vendor Cert Monitoring"
description = "Vendor security attestations must be monitored on every agent run. A cert that passes expiry without automatic detection creates an invisible compliance breach. The field is_current=false in vendors.toml is the trigger."
signal      = "compliance_breach"
mitigation  = "vendor_security_audit task runs on every enterprise agent execution. Any is_current=false vendor is immediately flagged and COMPLIANCE_BREACH signal emitted."
```

---

*Generated by: TPM Agent — Enterprise Project | tpm run enterprise_project*
