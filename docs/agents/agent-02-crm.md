[IDX]  2026-02-19.C09
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   agent-profile | crm | tpm
[CONF] 0.94
[REVIEW] false

---

# Agent 02 — CRM Implementation

> **Initiative:** CRM Implementation
> **Stack:** Rust
> **Role:** Automated TPM Agent — CRM Domain

---

## Skills

Technical skills this agent is built around:

- CRM platforms — Salesforce, Microsoft Dynamics 365, HubSpot
- Data migration — legacy CRM extraction, field mapping, data quality scoring, deduplication
- System integration — API connectors, middleware, ERP-to-CRM data sync
- User adoption strategy — role-based training planning, adoption metric tracking
- Change management — stakeholder resistance identification, communication planning
- User Acceptance Testing (UAT) — test case management, sign-off workflows
- System integrator (SI) oversight — SOW management, deliverable tracking, escalation
- License and provisioning management
- Go-live planning — cutover strategy, rollback planning, hypercare period
- Support ticket SLA monitoring during hypercare

---

## Memory

What this agent retains and references across every run:

| Memory Category | What Is Stored |
|---|---|
| Department Training Schedule | Dept name, training date, trainer, completion status, attendee count |
| Adoption Metrics | Active users / total licensed users per department, week-over-week |
| Legacy Data Schema | Source system fields, migration mapping, record counts by entity |
| Open Defects | Defect ID, severity, owner, date opened, date resolved |
| Go-Live Criteria | Checklist of go-live gates with owner and status |
| SI Engagement Status | Deliverable log, change orders, escalation contacts |
| UAT Sign-Offs | Module name, business owner, sign-off date, open exceptions |
| Stakeholder Map | Roles, update frequency, detail level preference |
| Risk Register | Open CRM-domain risks |

**Loaded from:** `data/crm/project.toml`, `risks.toml`, `vendors.toml`, `stakeholders.toml`

---

## Abilities

What this agent can execute autonomously:

- **Adoption Rate Tracker** — calculates active user % per department, week-over-week trend, flags departments below 60% adoption threshold
- **Training Milestone Monitor** — groups milestones by department owner, shows per-department training completion table, flags untrained departments within 7 days of go-live
- **UAT Progress Report** — tracks UAT sign-offs by module, surfaces open exceptions blocking sign-off
- **Go-Live Readiness Brief** — triggered within 30 days of `target_end_date`; produces a readiness checklist across: data quality, training, UAT sign-off, infrastructure, rollback plan
- **Open Defect Summary** — counts defects by severity (Critical / High / Medium / Low), flags any Critical open defects
- **Vendor/SI Follow-Up** — detects overdue SI deliverables, change orders awaiting approval, SLA breaches
- **Risk Alert** — surfaces Organizational and Resource category risks; highlights risks not reviewed in 7+ days
- **Weekly Status Report** — RAG status, adoption summary, milestone table, open defect count, top risks

---

## Agile Accountabilities

### Sprint Planning
- Identifies training milestones and UAT sign-offs due within the sprint window
- Flags departments not yet scheduled for training that have a sprint dependency
- Outputs SI deliverables expected within the sprint for accountability

### Daily Standup Support
- One-line status for each open milestone: on track / at risk / blocked
- Surfaces any defects opened or escalated since last run
- Flags adoption rate changes (department dropped below threshold)

### Sprint Review
- Sprint close report: training sessions delivered, UAT modules signed off, defects resolved, adoption rate movement
- SI deliverable scorecard: delivered on time vs. late vs. outstanding

### Retrospective Input
- Identifies departments consistently lagging in adoption or training attendance
- Flags SI delivery patterns — which deliverables repeatedly slip
- Outputs change resistance indicators: departments with low adoption + high defect volume

### Definition of Done (per Module)
A CRM module is complete when all of the following are true:
- [ ] UAT sign-off recorded with business owner name and date
- [ ] All Critical and High defects: `resolved = true`
- [ ] Training completion for all users in scope: `complete = true`
- [ ] Data migration records validated: `quality_score >= 95`
- [ ] Integration tests passing: `status = "pass"`
- [ ] Rollback plan documented and reviewed

---

## Inspection

### What Gets Inspected Every Run
| Inspection Point | Threshold | Action |
|---|---|---|
| User adoption rate | < 60% for any department | Adoption alert added to report |
| Training completion | Dept untrained, go-live < 7 days | Critical flag in training table |
| Open Critical defects | Any open Critical defect | Defect escalation section generated |
| UAT sign-off gaps | Module unsigned, go-live < 14 days | UAT alert section generated |
| Go-live proximity | target_end_date within 30 days | Go-live readiness report generated |
| SI deliverable overdue | Any overdue deliverable | Vendor follow-up report generated |
| Risk staleness | Not reviewed in 7+ days | Flagged STALE in risk report |

### Output Artifacts Produced
| Artifact | Trigger | Filename |
|---|---|---|
| Weekly Status Report | Every run | `YYYY-MM-DD_weekly_status.md` |
| Training Milestone Report | Every run | `YYYY-MM-DD_training_milestones.md` |
| Risk Alert | Critical/Org/Resource risks | `YYYY-MM-DD_risk_alert.md` |
| Vendor Follow-Up | Overdue SI items | `YYYY-MM-DD_vendor_followup.md` |
| Go-Live Readiness Brief | Within 30 days of go-live | `YYYY-MM-DD_go_live_readiness.md` |

### Self-Validation (Rust)
Before generating any report, this agent:
1. Validates all TOML files parse without error
2. Confirms `adoption_pct` values are between 0 and 100
3. Confirms all defect severity values match the enum: `Critical | High | Medium | Low`
4. Warns if go-live date is within 30 days and any go-live gate has `complete = false`

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
