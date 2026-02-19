# Vendor Follow-Up Report
**Project:** Office Relocation — Single Floor
**Date:** 2026-02-19
**Warn Window:** Items due within 3 days (by 2026-02-22)

1 item in the warn window. No overdue items. 4 upcoming items to monitor.

---

```toml
[report.metadata]
project_id  = "medium_project"
report_type = "vendor_followup"
date        = "2026-02-19"

[report.taxonomy]
vendor_categories_active = ["it_services", "regulatory"]
vendor_statuses          = ["onboarding", "active"]
```

---

## 🟡 DUE TOMORROW — NetRun IT Services (VEN-003)

**Contact:** Jasper Tan — jtan@netrunits.com — Solutions Engineer
**Vendor Status:** `onboarding`

---

### FU-002 — Confirm VLAN and Switching Infrastructure Compatibility
**Due:** 2026-02-20 (TOMORROW) | **Priority:** High | **Category:** `it_infrastructure`

**Context:** NetRun needs to confirm their cabling design is compatible with the existing VLAN and switching infrastructure before their scope-of-work document (DEL-007, due Mar 5) can be finalized. This is also contingent on MS-003 (IT Infrastructure Requirements) being completed tomorrow — the IT requirements doc is the input NetRun needs.

**Note:** MS-003 is currently at risk due to the unfilled IT Lead role (RISK-002). If MS-003 is not delivered tomorrow, FU-002 becomes blocked — NetRun cannot confirm compatibility without the requirements document.

**Action required:**
Contact Jasper Tan today to flag the dependency.

> **Suggested message:**
> "Hi Jasper — following up on your VLAN/switching compatibility confirmation (due tomorrow, Feb 20). We are completing our IT infrastructure requirements doc today and will send it over as soon as it's ready. Please confirm that you can turn around the compatibility assessment within 24 hours of receiving it. If there are issues, let us know immediately so we can resolve them before the scope-of-work deadline on Mar 5. Thanks, Alex"

---

## Upcoming — Outside Warn Window (Monitor)

| Vendor | Item | Category | Due | Priority | Note |
|---|---|---|---|---|---|
| VEN-005 City Permits | FU-003: Confirm permit checklist and timeline | `compliance.regulatory` | Feb 28 | High | Submit permit app by Feb 28 |
| VEN-001 Apex GC | FU-001: Confirm Apr–May availability | `procurement.contractor` | Feb 27 | High | RFP not yet issued |
| VEN-001 Apex GC | DEL-001: RFP response — scope and bid | `procurement.contractor` | Mar 5 | Critical | Depends on RFP issuance Feb 27 |
| VEN-002 Meridian | DEL-004: RFP response — furniture quote | `procurement.furniture` | Mar 5 | High | Depends on RFP issuance Feb 27 |
| VEN-003 NetRun | DEL-007: Network cabling scope of work | `it_infrastructure` | Mar 5 | High | Depends on FU-002 + MS-003 |
| VEN-005 City Permits | DEL-011: Construction permit approved | `compliance.regulatory` | Mar 25 | Critical | On critical path for Phase 3 start |
| VEN-006 ClearLease | DEL-012: Lease amendment executed | `compliance.legal` | Mar 15 | High | Legal drafting must start Feb 21 |

---

## Vendor Status Overview

| ID | Vendor | Category | Status | Next Action | Due |
|---|---|---|---|---|---|
| VEN-001 | Apex General Contractors | `contractor` | `onboarding` | Send RFP | Feb 27 |
| VEN-002 | Meridian Office Furniture | `furniture` | `onboarding` | Send RFP | Feb 27 |
| VEN-003 | NetRun IT Services | `it_services` | `onboarding` | FU-002 confirmation | **Feb 20** |
| VEN-004 | Swift Relocation Services | `moving` | `onboarding` | No action needed this sprint | Mar 20 |
| VEN-005 | City Permits Office | `regulatory` | `active` | FU-003: confirm checklist | Feb 28 |
| VEN-006 | ClearLease Legal | `legal` | `active` | Legal to begin amendment draft | Feb 21 |

---

## Knowledge Base

```toml
[kb.lessons_learned]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-006"
category    = "vendor"
pattern     = "vendor_dependency_on_internal_deliverable"
observation = "VEN-003 (NetRun) cannot complete their follow-up (FU-002) until they receive the IT requirements document (MS-003). An internal milestone is an input to a vendor action — creating a hidden dependency that can cascade into vendor delays."
action      = "When a vendor deliverable depends on an internal milestone, make the dependency explicit in both the milestone and vendor TOML records. Treat it as a cross-dependency in sprint planning."
severity    = "medium"
phase       = "planning"
project_type_applicable = ["technical", "mixed"]
scale_applicable        = ["medium", "enterprise"]

[[kb.lessons_learned.candidates]]
id          = "LL-MED-007"
category    = "vendor"
pattern     = "multiple_vendor_rfps_converging_on_same_date"
observation = "Three vendors (Apex GC, Meridian Furniture, NetRun) all have deliverables due Mar 5 — the day after RFPs are issued Feb 27. A 6-day RFP-to-response window is aggressive, especially for a general contractor scope of work."
action      = "Stagger RFP issuance or extend response deadlines for complex vendors (GC, IT) vs. simpler vendors (furniture). GC bids typically require 2–3 weeks minimum."
severity    = "medium"
phase       = "procurement"
project_type_applicable = ["mixed", "technical"]

[kb.ontology]

[[kb.ontology.patterns]]
id          = "pattern.vendor.internal_input_dependency"
name        = "Vendor Input Dependency"
description = "A vendor action or deliverable has an internal project milestone as its input. The vendor cannot proceed until the internal deliverable is complete. This dependency is often undocumented and surfaces as a surprise vendor delay."
signal      = "dependency_done"
related_risk_categories = ["vendor", "resource"]
mitigation  = "At vendor onboarding, explicitly map all internal milestones that are inputs to vendor deliverables. Track these as cross-dependencies in the milestone table."

[kb.ontology.vocabulary]
domain = "facilities.procurement"
terms  = [
    "rfp",
    "scope_of_work",
    "bid",
    "purchase_order",
    "change_order",
    "contractor",
    "subcontractor",
    "punch_list",
    "lead_time",
]
```

---

*Generated by: TPM Agent — Medium Project | tpm run medium_project*
