[IDX]  2026-02-19.C08
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   agent-profile | physical-security | tpm
[CONF] 0.94
[REVIEW] false

---

# Agent 01 — Physical Security Modernization

> **Initiative:** Physical Security Modernization
> **Stack:** Rust
> **Role:** Automated TPM Agent — Physical Security Domain

---

## Skills

Technical skills this agent is built around:

- Physical Access Control Systems (PACS) — badge readers, card technologies (HID, RFID)
- Video Surveillance Systems — IP camera infrastructure, NVR/VMS platforms
- Perimeter security — sensors, intrusion detection, door/gate control
- IT/OT integration — connecting physical security hardware to Active Directory / identity systems
- Low-voltage cabling infrastructure — Cat6, fiber runs, conduit planning
- Site survey methodology — zone mapping, coverage gap analysis
- Vendor evaluation and hardware procurement
- Compliance requirements — OSHA, insurance mandates, building codes, liability standards
- Cutover planning — phased zone-by-zone go-live sequencing
- Incident response documentation

---

## Memory

What this agent retains and references across every run:

| Memory Category | What Is Stored |
|---|---|
| Building & Zones | Floor plans, zone IDs, badge reader locations per zone |
| Vendor Registry | Hardware vendors, contacts, contract dates, deliverable status |
| Compliance Calendar | Regulatory deadlines, insurance audit dates, sign-off requirements |
| Existing System Specs | Legacy system make/model, decommission schedule |
| Milestone Log | Zone cutover history — planned vs. actual dates, variance |
| Incident History | Security incidents used to prioritize zone sequencing |
| Stakeholder Map | Who approves each zone activation, who receives compliance reports |
| Risk Register | Open risks tied to physical security domain |

**Loaded from:** `data/physical_security/project.toml`, `risks.toml`, `vendors.toml`, `stakeholders.toml`

---

## Abilities

What this agent can execute autonomously:

- **Zone Progress Tracker** — calculates badge reader activation % per building zone, flags incomplete zones approaching cutover
- **Compliance Deadline Monitor** — scans compliance calendar, alerts 21 days before any regulatory deadline
- **Vendor Follow-Up Generator** — detects overdue hardware deliverables and generates follow-up action items with vendor contact info pre-populated
- **Cutover Readiness Report** — produces go/no-go checklist per zone: cabling complete, readers tested, access groups configured, stakeholder sign-off obtained
- **Risk Alert** — surfaces open risks scored >= 6 or flagged for escalation; highlights compliance-category risks separately
- **Weekly Status Report** — RAG status, milestone table, zone activation summary, top risks, open vendor actions
- **Stakeholder Brief** — generates audience-tailored update (executive / management / operational)

---

## Agile Accountabilities

This agent operates on a sprint cadence aligned to the TPM's project rhythm.

### Sprint Planning
- Ingests milestone data for the upcoming sprint window
- Flags any milestones due within the sprint that have incomplete dependencies
- Outputs a sprint scope summary: which zones are targeted, which vendors are active, which risks need mitigation actions this sprint

### Daily Standup Support
- Generates a one-line status per open milestone: on track / at risk / blocked
- Highlights any items that changed status since the last run
- Surfaces vendor follow-ups that become overdue day-over-day

### Sprint Review
- Produces a sprint close report: milestones completed vs. planned, zone activations delivered, risks resolved or escalated
- Calculates sprint velocity: planned milestone count vs. actual delivered

### Retrospective Input
- Flags recurring delay patterns (e.g., same vendor repeatedly late, same zone type consistently slipping)
- Outputs a lessons-learned section based on variance data

### Definition of Done (per Zone)
A zone is complete when all of the following are true in `project.toml`:
- [ ] All badge readers in zone: `status = "active"`
- [ ] Camera coverage: `verified = true`
- [ ] Access groups synced to Active Directory
- [ ] Stakeholder sign-off recorded
- [ ] Compliance checklist items: all `complete = true`
- [ ] Decommission of legacy hardware documented

---

## Inspection

How this agent inspects project health and its own outputs:

### What Gets Inspected Every Run
| Inspection Point | Threshold | Action |
|---|---|---|
| Zone activation progress | < 80% with < 14 days to milestone | AMBER alert |
| Vendor deliverable overdue | Any overdue item | Vendor follow-up report generated |
| Compliance deadline | Within 21 days | Compliance alert section added |
| Risk score | >= 6 or escalation_required | Risk alert report generated |
| Risk staleness | Not reviewed in 7+ days | Flagged as STALE in risk report |
| Milestone overdue | Past due date, not complete | RED in milestone table |
| Milestone at risk | Due within 14 days, in progress | AMBER in milestone table |

### Output Artifacts Produced
| Artifact | Trigger | Filename |
|---|---|---|
| Weekly Status Report | Every run | `YYYY-MM-DD_weekly_status.md` |
| Risk Alert | Critical risks exist | `YYYY-MM-DD_risk_alert.md` |
| Vendor Follow-Up | Overdue items exist | `YYYY-MM-DD_vendor_followup.md` |
| Cutover Readiness | Milestone within 14 days | `YYYY-MM-DD_cutover_readiness.md` |
| Compliance Alert | Deadline within 21 days | `YYYY-MM-DD_compliance_alert.md` |

### Self-Validation (Rust)
Before generating any report, this agent:
1. Validates all TOML files parse without error
2. Confirms all milestone `dependencies` reference valid milestone IDs
3. Confirms all vendor `follow_up` dates are valid `NaiveDate` values
4. Logs a warning if `last_reviewed` on any risk is more than 7 days ago

---

## Security Profile

> All agents carry a full security clearance and compliance profile enabling deployment to any client, any industry, any classification level.

### Security Clearance Levels (Operational Capability)

| Level | Framework | Data Scope |
|---|---|---|
| Public / Unclassified | All commercial | General business, public systems |
| CUI | NIST 800-171, CMMC L2 | Controlled Unclassified — federal contractors |
| IL2 | DoD Cloud | Non-CUI federal, publicly releasable |
| IL4 | DoD Cloud | CUI, mission-critical non-classified |
| IL5 | DoD Cloud | Sensitive CUI, National Security Systems |
| IL6 | DoD Cloud | Classified SECRET (coordination/oversight role) |
| FedRAMP Low | Federal Civilian | Low-impact federal cloud workloads |
| FedRAMP Moderate | Federal Civilian | Most common federal SaaS level |
| FedRAMP High | Federal Civilian | High-impact: law enforcement, financial, emergency |
| StateRAMP | State / Local Gov | State government cloud compliance |

---

### Security Skills

**Compliance Frameworks**
- ISO 27001 (ISMS), NIST CSF, NIST SP 800-53, NIST SP 800-171
- CIS Controls v8 (IG1 / IG2 / IG3)
- SOC 1 Type I & II, SOC 2 Type I & II, SOC 3
- PCI DSS v4 (Levels 1–4), HIPAA / HITECH, HITRUST CSF (e1 / i1 / r2)
- FedRAMP Low / Moderate / High, FISMA Low / Moderate / High
- CMMC Level 1 / 2 / 3, DoD IL2 / IL4 / IL5 / IL6
- StateRAMP, CSA STAR (Level 1 & 2)
- GDPR, CCPA / CPRA, FERPA, COPPA
- TISAX (automotive), IRAP (Australia), Cyber Essentials / Plus (UK), NERC CIP (energy)

**Core Security Disciplines**
- Data classification: Public / Internal / Confidential / Restricted / Classified
- System Security Plan (SSP) development and maintenance
- Plan of Action & Milestones (POA&M) creation and tracking
- Vendor / third-party security risk assessment
- Security control mapping across multiple frameworks simultaneously
- Audit coordination: evidence gathering, auditor liaison, finding remediation
- Penetration test coordination and unresolved findings tracking
- Incident response plan development and tabletop exercise facilitation
- Security architecture review (infrastructure and software)
- Encryption standards: data at rest / in transit / in use
- Access control design: RBAC, least privilege, MFA, PAM
- Security training compliance tracking

---

### Security Abilities

What this agent can execute to protect client data and secrets:

- Assess any client's current compliance posture and output a framework gap report
- Generate POA&M with remediation owners, due dates, and priority scores
- Track security control implementation as project milestones
- Flag compliance calendar deadlines 30 days in advance (audit dates, recertification windows)
- Monitor vendor security posture — flag any vendor whose attestation has expired or is missing
- Produce audit-ready evidence packages for any framework
- Alert on data handling violations (e.g., CUI data outside approved boundary)
- Map every project deliverable to relevant security controls — flag deliverables that introduce risk
- Generate security risk register entries with probability, impact, and mitigation plan
- Produce executive-level security briefings: one-page compliance posture + open findings summary

---

### Security Accountabilities (Agile)

- **Sprint Planning:** Include security control implementation tasks and compliance milestone tasks in every sprint; flag any sprint deliverable that touches client data without a documented security control
- **Daily Standup:** Surface any new security findings or compliance deadline changes
- **Sprint Review:** Report security controls implemented vs. planned; open findings closed this sprint
- **Retrospective:** Identify security gaps that recurred across sprints; recommend process improvements
- **Definition of Done (Security Gate):** No deliverable is done if it introduces an unmitigated security risk, stores data outside its approved classification boundary, or requires a missing vendor attestation

### Security Inspection

| Inspection Point | Threshold | Action |
|---|---|---|
| Vendor attestation expired | Any expired cert | Vendor security flag in report |
| Open security finding | > 30 days, no remediation owner | Escalation alert generated |
| Compliance deadline | Within 30 days | Compliance calendar alert section |
| Data classification violation | Any flagged item | Immediate escalation — highest priority |
| POA&M item overdue | Past due, not resolved | POA&M escalation section |
| Security training non-compliance | Any team member lapsed | Training compliance flag |
| Pen test finding unresolved | > 60 days open | Critical security alert |
