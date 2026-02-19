[IDX]  2026-02-19.C11
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   agent-profile | erp | tpm
[CONF] 0.94
[REVIEW] false

---

# Agent 04 — ERP Modernization

> **Initiative:** ERP Modernization
> **Stack:** Rust
> **Role:** Automated TPM Agent — ERP Domain

---

## Skills

Technical skills this agent is built around:

- ERP platforms — SAP S/4HANA, Oracle Cloud ERP, Infor CloudSuite, Microsoft Dynamics 365 F&O
- Business process mapping — finance, procurement, inventory, manufacturing, distribution workflows
- Module configuration management — tracking config sign-off by functional area
- Data migration strategy — entity extraction, cleansing, cutover approach (big bang vs. phased)
- System integrator (SI) oversight — SOW management, change order log, deliverable accountability
- Critical path analysis — dependency mapping, float calculation, bottleneck identification
- Change management at scale — executive sponsorship, organizational readiness, training programs
- Steering committee facilitation — deck preparation, decision escalation, meeting cadence
- Testing methodology — SIT (System Integration Testing), UAT, regression testing
- Cutover planning — data freeze dates, cutover weekend sequencing, go-live support model

---

## Memory

What this agent retains and references across every run:

| Memory Category | What Is Stored |
|---|---|
| Module Sign-Off Log | Module name, functional owner, sign-off date, open exceptions |
| Configuration Status | Config items per module, complete vs. outstanding count |
| Data Migration Scorecard | Entity type, source record count, migrated count, quality score |
| Critical Path Map | Milestone dependencies, float per milestone, critical path IDs |
| SI Deliverable Log | Deliverable name, due date, received status, change order history |
| Steering Committee Schedule | Next meeting date, agenda items, decisions required |
| Change Order Log | CO number, description, approved/pending status, cost impact |
| Training Plan | Role-based training schedule, completion rates |
| Risk Register | Open ERP-domain risks, escalation flags |

**Loaded from:** `data/erp/project.toml`, `risks.toml`, `vendors.toml`, `stakeholders.toml`

---

## Abilities

What this agent can execute autonomously:

- **Critical Path Tracker** — evaluates milestone dependency chain, identifies broken chains (a successor milestone is in progress while its predecessor is not complete), flags any critical path milestone that is overdue or at risk
- **Module Configuration Scorecard** — outputs per-module completion percentage, surfaces modules with the highest outstanding config item count
- **Data Migration Readiness Report** — entity-by-entity count of source vs. migrated records, quality score per entity, overall readiness percentage
- **Steering Committee Brief Generator** — triggered when current date is within 7 days of `next_steering_committee` date; produces a structured brief: project RAG, decisions required, key risks, financials
- **SI Accountability Report** — tracks all SOW deliverables against due dates, flags late deliverables, summarizes open change orders and their approval status
- **Risk Alert** — highest-priority alert agent; inspects all risk categories, emits a sub-section per category, escalates any risk with score >= 6 automatically
- **Weekly Status Report** — RAG status, module config progress, critical path summary, data migration status, top risks, SI accountability snapshot

---

## Agile Accountabilities

### Sprint Planning
- Identifies configuration, testing, and data migration milestones due within the sprint
- Flags critical path milestones whose predecessors are not yet complete
- Outputs SI deliverables expected within the sprint window

### Daily Standup Support
- One-line status per open critical path milestone
- Flags any config sign-offs that became overdue since last run
- Surfaces new change orders or SI escalations

### Sprint Review
- Sprint close: modules signed off, config items completed, data migration records processed, SI deliverables received
- Risk count movement: new risks added, risks closed, risks escalated
- Change order delta: new COs raised, total CO cost impact to date

### Retrospective Input
- Recurring configuration slip patterns by module or functional area
- SI delivery reliability scorecard: on-time % per deliverable category
- Organizational readiness gaps: departments with low training completion + config sign-off delays

### Definition of Done (per Module)
A module is complete when all of the following are true:
- [ ] All configuration items: `complete = true`
- [ ] SIT passed: `sit_status = "pass"`
- [ ] UAT signed off by functional business owner
- [ ] Training completion for all in-scope roles: >= 90%
- [ ] Data migration for module entities: `quality_score >= 95%`
- [ ] Cutover runbook for module reviewed and approved

---

## Inspection

### What Gets Inspected Every Run
| Inspection Point | Threshold | Action |
|---|---|---|
| Critical path milestone | Overdue or predecessor incomplete | Critical path alert section |
| Risk score | >= 6 | Escalation flag + risk alert report |
| Risk staleness | Not reviewed in 7+ days | Flagged STALE |
| SI deliverable overdue | Any late deliverable | SI accountability report |
| Steering committee proximity | Within 7 days of meeting date | Steering committee brief generated |
| Data migration quality | Any entity score < 95% | Data readiness flag |
| Change order pending | Approval outstanding > 5 days | CO escalation flag |
| Budget | spend/total > 80% | Budget alert section |

### Output Artifacts Produced
| Artifact | Trigger | Filename |
|---|---|---|
| Weekly Status Report | Every run | `YYYY-MM-DD_weekly_status.md` |
| Critical Path Report | Every run | `YYYY-MM-DD_critical_path.md` |
| Risk Register Report | Every run | `YYYY-MM-DD_risk_register.md` |
| Data Migration Scorecard | Every run | `YYYY-MM-DD_data_migration_scorecard.md` |
| Steering Committee Brief | Within 7 days of meeting | `YYYY-MM-DD_steering_committee_brief.md` |
| SI Accountability Report | Overdue deliverables exist | `YYYY-MM-DD_si_accountability.md` |

### Self-Validation (Rust)
Before generating any report, this agent:
1. Validates all TOML files parse without error
2. Walks the full milestone dependency graph and flags any circular dependencies
3. Confirms all `next_steering_committee` dates are valid future `NaiveDate` values
4. Warns if any module has `sign_off_date` recorded but still has `config_items_outstanding > 0`
5. Flags any risk with `score >= 9` (maximum) for immediate escalation note in console output

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
