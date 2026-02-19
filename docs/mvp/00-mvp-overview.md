[IDX]  2026-02-19.C22
[CAT]  7_OPERATIONS
[TIME] 2026-02-18T00:00:00-06:00
[3K]   mvp | product-scope | launch-criteria
[CONF] 0.92
[REVIEW] false

---

# TPM Agent System — 10 MVP Projects

> Three dimensions: Client Types · System Features · Use Case Scenarios
> These 10 MVPs define what the agents must handle before the system is considered launch-ready.

---

## Part 1 — 10 Client Project Types

Industries and engagement types the agents must be deployable to — any environment, simple instructions, working as a team.

---

### MVP 01 — Manufacturing & Distribution
**Current client. Technology modernization of a legacy operation.**

| | |
|---|---|
| Industry | Manufacturing / Distribution |
| Security Level | SOC 2 / ISO 27001 (commercial baseline) |
| Initiatives | Physical Security, CRM, Cloud, ERP, Infrastructure |
| Agents Active | All five |
| Key Complexity | Deeply tenured workforce, distributed locations, no prior PMO |
| Special Needs | Change management reporting, vendor coordination at scale |

---

### MVP 02 — Hospital / Healthcare System
**EHR migration and infrastructure modernization under HIPAA.**

| | |
|---|---|
| Industry | Healthcare |
| Security Level | HIPAA / HITECH, HITRUST CSF |
| Initiatives | EHR platform migration, network segmentation, endpoint management, patient data migration |
| Agents Active | Cloud Migration, ERP (EHR = clinical ERP), Infrastructure |
| Key Complexity | PHI data classification, uptime requirements (24/7), clinical workflow disruption risk |
| Special Needs | HIPAA compliance calendar, PHI boundary alerts, clinical stakeholder briefs |

---

### MVP 03 — DoD Contractor
**CMMC Level 2/3 compliance program + classified project delivery.**

| | |
|---|---|
| Industry | Defense / Aerospace |
| Security Level | CMMC L2–L3, NIST 800-171, IL4–IL5 |
| Initiatives | CMMC compliance implementation, CUI boundary enforcement, network segmentation, SIEM deployment |
| Agents Active | All five (security inspector leads) |
| Key Complexity | 110 NIST 800-171 practices, POA&M tracking, government auditor coordination |
| Special Needs | POA&M milestone tracking, CUI boundary violation alerts, assessor-ready evidence packages |

---

### MVP 04 — SaaS Startup
**Product delivery, agile PM, SOC 2 readiness for first enterprise sale.**

| | |
|---|---|
| Industry | Technology / SaaS |
| Security Level | SOC 2 Type II, GDPR, CCPA |
| Initiatives | SOC 2 readiness program, product sprint delivery, infrastructure build-out |
| Agents Active | CRM, Cloud Migration, Infrastructure |
| Key Complexity | Fast pace, small team, no prior compliance posture, investor pressure |
| Special Needs | SOC 2 control gap tracker, sprint velocity reporting, compliance readiness countdown |

---

### MVP 05 — State / Local Government
**Legacy modernization and StateRAMP cloud migration.**

| | |
|---|---|
| Industry | State / Local Government |
| Security Level | StateRAMP, FedRAMP Moderate, FISMA |
| Initiatives | Cloud migration, permitting system modernization, network refresh |
| Agents Active | Cloud Migration, ERP, Infrastructure |
| Key Complexity | Procurement rules (RFP/bid cycles), public records requirements, legislative deadline pressure |
| Special Needs | StateRAMP compliance tracking, public stakeholder reporting, procurement milestone tracking |

---

### MVP 06 — Financial Services
**Core banking modernization and PCI DSS / SOC 1 compliance.**

| | |
|---|---|
| Industry | Banking / Financial Services |
| Security Level | PCI DSS v4, SOC 1 Type II, SOC 2, GLBA |
| Initiatives | Core banking platform migration, payment infrastructure upgrade, data center consolidation |
| Agents Active | ERP (core banking = financial ERP), Cloud Migration, Infrastructure |
| Key Complexity | Zero-downtime migration, regulatory exam coordination, cardholder data environment scoping |
| Special Needs | PCI DSS control tracking, regulatory exam readiness brief, financial audit evidence package |

---

### MVP 07 — Retail / E-Commerce
**ERP implementation, OMS rollout, omnichannel integration.**

| | |
|---|---|
| Industry | Retail / E-Commerce |
| Security Level | PCI DSS, CCPA, SOC 2 |
| Initiatives | ERP implementation, Order Management System (OMS), loyalty platform integration, store network refresh |
| Agents Active | ERP, CRM, Infrastructure |
| Key Complexity | Peak season blackout windows (no changes Nov–Jan), high SKU data volume, franchise location diversity |
| Special Needs | Seasonal blackout calendar alerts, SKU migration data readiness, franchise stakeholder briefs |

---

### MVP 08 — Energy / Utilities
**SCADA modernization and NERC CIP compliance.**

| | |
|---|---|
| Industry | Energy / Utilities |
| Security Level | NERC CIP, ICS/SCADA security (NIST 800-82) |
| Initiatives | SCADA platform modernization, OT/IT network segmentation, physical security upgrade |
| Agents Active | Physical Security, Infrastructure, Cloud Migration |
| Key Complexity | Operational technology (OT) environments, safety-critical systems, NERC CIP audit cycles |
| Special Needs | NERC CIP compliance calendar, OT/IT boundary alerts, reliability coordinator reporting |

---

### MVP 09 — Higher Education
**Campus network modernization and student systems migration under FERPA.**

| | |
|---|---|
| Industry | Higher Education |
| Security Level | FERPA, GLBA (financial aid), CMMC L1 (if research contracts) |
| Initiatives | Student Information System (SIS) migration, campus network refresh, Identity & Access Management |
| Agents Active | ERP (SIS = academic ERP), Infrastructure, CRM (alumni/enrollment) |
| Key Complexity | Academic calendar constraints (no changes during finals/registration), faculty governance, research data |
| Special Needs | Academic calendar blackout alerts, FERPA data boundary monitoring, faculty/staff stakeholder briefs |

---

### MVP 10 — Federal Civilian Agency
**Full FedRAMP High cloud migration and FISMA compliance program.**

| | |
|---|---|
| Industry | Federal Government |
| Security Level | FedRAMP High, FISMA High, NIST 800-53 |
| Initiatives | Cloud migration to FedRAMP High environment, Zero Trust Architecture implementation, ATO (Authority to Operate) program |
| Agents Active | All five |
| Key Complexity | ATO process (SSP, SAP, SAR, POA&M), FedRAMP continuous monitoring, congressional budget cycles |
| Special Needs | ATO milestone tracking, POA&M automated management, ISSO/ISSM stakeholder briefs, continuous monitoring reports |

---

## Part 2 — 10 Agent System MVP Features

Capabilities the system must have before it is considered launch-ready. These are the 10 things that must work before any client deployment.

---

### Feature 01 — Weekly Status Report Generation
Every agent generates a weekly status report on demand. RAG status, milestone table, risk summary, budget utilization. Works for all 10 client types above.

**Done when:** `tpm run <agent>` produces a dated `.md` report with no errors for any valid project data.

---

### Feature 02 — Risk Tracking and Math-Based Alerting
Risk score = probability × impact (1–9). Alert threshold configurable in `settings.toml`. No if/then chains. Works at any security level.

**Done when:** Risks scoring >= threshold automatically appear in a risk alert report. Stale risks (not reviewed in N days) flagged separately.

---

### Feature 03 — Milestone Monitoring with RAG
Every milestone has a RED / AMBER / GREEN status calculated from days remaining and dependencies. Table sorted by urgency.

**Done when:** Overdue milestones show RED, at-risk milestones show AMBER, a milestone with an incomplete dependency shows BLOCKED regardless of date.

---

### Feature 04 — Vendor Follow-Up Automation
Overdue deliverables and past-due follow-ups trigger a vendor follow-up report with contact info pre-populated. TPM can copy directly into email.

**Done when:** `tpm run <agent> --tasks vendor-followup` produces an action item list with vendor name, contact email, item description, and days overdue.

---

### Feature 05 — Stakeholder Brief Generation (Tiered)
Three tiers: Executive (1-page RAG + 3 bullets), Management (milestones + financials), Operational (full detail). Audience determined by `detail_level` in `stakeholders.toml`.

**Done when:** One command produces three differently-scoped output files for the same project.

---

### Feature 06 — Security Compliance Posture Report
Math-based gap score. Compliance % = implemented controls / total controls. Urgency score = gap × required security level. Works for all frameworks from SOC 2 to FedRAMP High to CMMC L3.

**Done when:** Security section appears in every weekly report with compliance %, open findings count, and vendor attestation status.

---

### Feature 07 — Cross-Agent Team Coordination
Agents share information through a coordination bus (read-only shared state file). Infrastructure Agent can flag a blocker that Cloud Migration Agent reads and incorporates into its own report.

**Done when:** `tpm run-all` produces a cross-project dependency report showing which agents are blocking which, with shared risk flags surfaced in all relevant agent reports.

---

### Feature 08 — Full CLI Interface
`run`, `run-all`, `status`, `overdue`, `validate`, `--dry-run`, `--format`, `--data-dir`, `--output-dir`, `--verbose`. Simple instructions — one command does the right thing.

**Done when:** All commands work, help text is clear, errors produce actionable messages (not Rust panics).

---

### Feature 09 — Math-Based Security Level Gating
Agent clearance level (`u8 0–10`) checked against project required level before any data is processed. No access = no report generated, access denied file written instead.

**Done when:** Setting `clearance = 3` in settings and loading a project with `required_level = 7` produces an `access_denied.md` file and exits cleanly.

---

### Feature 10 — Audit-Ready Report Archive
All reports are timestamped and append-only. Nothing is overwritten. The `outputs/` directory is a complete audit trail. Can be committed to git for immutable history.

**Done when:** Running `tpm run-all` twice on the same day produces two sets of dated files, both preserved. `git log outputs/` shows full change history.

---

## Part 3 — 10 Use Case Scenarios

Real-world situations where agents detect a problem, coordinate as a team, and produce the right output — with simple instructions from the TPM.

---

### Scenario 01 — Vendor Misses Hardware Delivery
**Who:** Infrastructure Agent detects → signals Cloud Migration Agent

A network hardware vendor misses a delivery date. Infrastructure Agent flags the PO as overdue. Cloud Migration Agent reads the cross-project dependency and sees its Wave 2 is now blocked.

**What happens:**
- Infrastructure Agent: generates `vendor_followup.md` with PO details
- Infrastructure Agent: writes cross-project dependency flag to shared coordination state
- Cloud Migration Agent: reads shared state, adds "BLOCKED — network hardware pending" to its wave tracker
- Both agents: include the blocking item in their weekly status reports
- TPM instruction: `tpm run-all`

---

### Scenario 02 — Budget Burn Alert
**Who:** Cloud Migration Agent detects → ERP Agent cross-checks

Cloud Migration hits 83% budget burn at 60% project completion. ERP Agent, on seeing the shared alert, checks its own burn rate.

**What happens:**
- Cloud Migration Agent: generates `budget_alert.md`
- Writes budget concern to shared coordination state
- ERP Agent: reads shared state, runs its own budget check, adds comparative note to its weekly report
- Combined executive summary: both projects' budget positions shown side-by-side
- TPM instruction: `tpm run-all`

---

### Scenario 03 — Security Audit Incoming
**Who:** All five agents activate simultaneously

Client receives notice of an audit (SOC 2, FedRAMP assessment, or CMMC assessment) in 30 days. TPM updates the compliance deadline in `settings.toml`.

**What happens:**
- All five agents: detect compliance deadline within 30-day threshold
- Each agent: runs `security_inspector` task — generates its own compliance posture report
- Coordination layer: aggregates all five into one `consolidated_audit_package.md`
- TPM instruction: `tpm run-all --tasks security-inspector`

---

### Scenario 04 — Go-Live Cutover Weekend
**Who:** CRM Agent leads → Infrastructure Agent confirms dependencies

CRM go-live is 14 days away. CRM Agent generates go-live readiness checklist. But the CRM system depends on Infrastructure Agent's network refresh being complete.

**What happens:**
- CRM Agent: generates `go_live_readiness.md` — includes a "dependency check" section
- CRM Agent: reads shared state from Infrastructure Agent — network refresh status: AMBER
- CRM Agent: flags go-live readiness as AT RISK due to unresolved infrastructure dependency
- Infrastructure Agent: milestone for network refresh is escalated to the top of its report
- TPM instruction: `tpm status` to see the joint picture, then `tpm run crm --tasks milestone-tracker`

---

### Scenario 05 — New Regulatory Requirement
**Who:** All five agents re-score compliance

A new regulation is announced (e.g., updated CMMC requirements, new state privacy law). TPM adds the new framework to `settings.toml` and updates control counts in each project's security data.

**What happens:**
- All five agents: detect new framework on next run
- Each agent: recalculates compliance gap score against new control set
- Gap scores updated in all weekly reports
- TPM instruction: `tpm run-all`

---

### Scenario 06 — Steering Committee Preparation
**Who:** ERP Agent leads → all other agents contribute

Monthly steering committee is in 5 days. ERP Agent generates its brief. TPM wants a consolidated view across all five projects.

**What happens:**
- ERP Agent: generates `steering_committee_brief.md`
- TPM runs `tpm run-all --tasks stakeholder-update`
- Coordination layer: each agent generates its executive-tier stakeholder brief
- All five briefs: written to `outputs/` with a combined index file
- TPM assembles the deck from the five markdown files
- TPM instruction: `tpm run-all --tasks stakeholder-update --format markdown`

---

### Scenario 07 — Vendor Dispute
**Who:** Physical Security Agent detects → Escalation generated

A badge reader vendor is in dispute over a change order. TPM marks their status as `disputed` in `vendors.toml`.

**What happens:**
- Physical Security Agent: detects vendor status = disputed
- Agent: generates escalation section in vendor follow-up report with dispute details, contract info, and escalation contact
- Agent: flags affected milestones (zones dependent on that vendor) as AT RISK
- TPM instruction: `tpm run physical-security`

---

### Scenario 08 — Resource Conflict
**Who:** Infrastructure Agent detects → TPM alerted

Two sub-projects both have milestones due the same week, both assigned to the same network engineer.

**What happens:**
- Infrastructure Agent: detects overlapping milestone ownership for the same engineer in the same sprint window
- Agent: generates `resource_contention.md` showing the conflict, both milestones, dates, and impact
- Agent: flags one of the milestones as AT RISK due to resource constraint
- TPM instruction: `tpm run infrastructure`

---

### Scenario 09 — Critical Risk Escalation
**Who:** ERP Agent detects score 9 risk → All agents alerted

ERP Agent identifies a risk with probability = High, impact = High → score = 9 (maximum). Escalation required.

**What happens:**
- ERP Agent: generates `risk_register.md` with CRITICAL ESCALATION section at the top
- ERP Agent: writes critical risk flag to shared coordination state
- All other agents: on next run, read shared state and include a cross-project risk note in their reports
- TPM instruction: `tpm run-all` — every report surfaces the critical ERP risk

---

### Scenario 10 — New Client Onboarding
**Who:** All five agents validate and initialize

TPM receives a new client. They fill in the TOML files for that client's projects. Agents validate everything before generating the first reports.

**What happens:**
- TPM runs `tpm validate` — all five agents check their TOML files for completeness and correctness
- Validation report: lists any missing required fields, invalid dates, broken milestone dependencies, expired vendor attestations
- TPM fixes issues
- TPM runs `tpm run-all` — first weekly reports generated across all five agents
- Outputs committed to git — audit trail begins
- TPM instruction: `tpm validate` then `tpm run-all`

---

## MVP Summary Matrix

| | Mfg | Health | DoD | SaaS | Gov | Finance | Retail | Energy | Edu | Federal |
|---|---|---|---|---|---|---|---|---|---|---|
| Agent 01: Physical Security | ✓ | ✓ | ✓ | | | | | ✓ | ✓ | ✓ |
| Agent 02: CRM | ✓ | | | ✓ | ✓ | | ✓ | | ✓ | |
| Agent 03: Cloud Migration | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | | | | ✓ |
| Agent 04: ERP | ✓ | ✓ | | | ✓ | ✓ | ✓ | | ✓ | ✓ |
| Agent 05: Infrastructure | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Security Level | SOC2 | HIPAA | CMMC L3 | SOC2 | StateRAMP | PCI | PCI | NERC | FERPA | FedRAMP High |
