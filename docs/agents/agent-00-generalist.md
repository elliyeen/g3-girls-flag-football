[IDX]  2026-02-19.C07
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   agent-profile | generalist-tpm | config-driven
[CONF] 0.92
[REVIEW] false

---

# Agent 00 — Generalist TPM

> **Initiative:** Any project, any industry, any scale
> **Stack:** Rust
> **Role:** Automated TPM Agent — Config-Driven, Domain-Agnostic

---

## Overview

Agent 00 is the generalist layer. It is not hardcoded to any domain, industry, or engagement. Its identity, task set, and behavior are entirely determined by the TOML configuration files in `data/<project>/`. The five domain agents (01–05) are pre-baked instances of this same agent structure with domain-specific task configs built in.

Any new project — technical or non-technical — can be onboarded with zero code changes. Only TOML files need to be created.

---

## Skills

Full TPM skill set spanning both technical and non-technical disciplines:

### Project Management Methodology
- Waterfall, Agile (Scrum/Kanban), hybrid, and program-level frameworks
- Work breakdown structure (WBS) and milestone decomposition
- Critical path analysis and schedule compression techniques
- Earned value management (EVM): SPI, CPI, EAC, TCPI
- Dependency mapping: finish-to-start, start-to-start, float analysis
- Phase-gate reviews and go/no-go decision frameworks

### Stakeholder Management
- RACI matrix construction and stakeholder influence mapping
- Executive communication: one-page briefs, board-level presentations
- Audience-tailored reporting: executive / management / operational tiers
- Escalation path design and escalation trigger documentation
- Change champion networks and adoption tracking

### Risk Management
- Probability × impact scoring and risk heat maps
- Risk register creation, maintenance, and staleness detection
- Mitigation plan development with owner assignment and due dates
- Monte Carlo scenario awareness and schedule risk reserves
- Escalation triggers at configurable risk score thresholds

### Vendor and Procurement Management
- Vendor onboarding, deliverable tracking, and follow-up generation
- RFP/RFQ process support and vendor evaluation criteria
- Contract milestone tracking and SLA compliance monitoring
- Third-party security posture assessment and attestation tracking
- Vendor dependency mapping and single-source-of-failure risk

### Budget and Financial Management
- Budget baseline, burn rate tracking, and forecast-to-complete
- Contingency reserve management and re-baseline triggers
- Earned value: budget at completion (BAC), estimate at completion (EAC)
- Executive financial summaries: spent vs. budget, runway remaining

### Change Management
- Impact assessment for scope changes on schedule and budget
- Change log maintenance and change control board (CCB) facilitation
- Organizational readiness and adoption readiness scoring
- Training plan tracking and go-live readiness gates

### Communications Management
- Cadence-based reporting (daily standup, weekly status, monthly exec summary)
- Sprint planning, sprint review, and retrospective facilitation support
- Lessons-learned capture and knowledge transfer documentation
- Meeting action item tracking and follow-through monitoring

### Technical Project Skills (activated by `project_type = "technical"` or `"mixed"`)
- Infrastructure and platform delivery tracking
- Software release management and deployment gate tracking
- Integration testing milestone gates
- IT compliance milestones (security controls, penetration test findings)
- Vendor API/SLA integration dependency tracking

---

## Memory

Memory is fully configurable — no hardcoded assumptions. All categories are loaded from `data/<project>/agent_config.toml`.

| Memory Category | What Is Stored | Required At Scale |
|---|---|---|
| Project Identity | Name, sponsor, PM, industry, type, scale | All scales |
| Phase Registry | Phase names, dates, completion % | Small and above |
| Milestone Log | Planned vs. actual dates, variance, dependencies | All scales |
| Stakeholder Map | Who receives which report tier, at what cadence | All scales |
| Risk Register | Open risks, scores, owners, last-reviewed dates | Small and above |
| Vendor Registry | Vendors, contacts, deliverables, follow-ups | Small and above |
| Budget Tracker | Total, spent, forecast, contingency consumed | Small and above |
| Compliance Calendar | Regulatory deadlines, audit dates, recertification windows | Medium and above |
| Security Findings | Open findings, remediation owners, due dates | Medium and above |
| Cross-Agent Signals | Incoming and outgoing coordination signals | Medium and above |
| Agent Config | Task list, enabled reports, scale overrides | All scales |

**Loaded from:** `data/<project>/project.toml`, `risks.toml`, `vendors.toml`, `stakeholders.toml`, `agent_config.toml`

Files are optional based on scale — the agent only requires the files relevant to its configured scale. Missing optional files at a lower scale are not errors; they are expected.

---

## Abilities

All abilities are gated by `project_scale` in `project.toml`. The agent only activates tasks appropriate for its scale.

### HelloWorld Scale
- **Project Status Report** — RAG status, milestone table (up to 5 tasks), plain narrative
- **Overdue Item Check** — flags any milestone past its due date

### Small Scale (includes all HelloWorld abilities)
- **Risk Summary** — scans risk register; flags risks scored >= 6 or escalation-required
- **Vendor Follow-Up Generator** — detects overdue vendor deliverables; outputs action items
- **Basic Stakeholder Update** — single-tier brief (management level)
- **Sprint Support** — daily standup summary, sprint scope summary

### Medium Scale (includes all Small abilities)
- **Full Stakeholder Update** — three-tier briefs (executive / management / operational)
- **Budget Burn Report** — burn rate, forecast-to-complete, contingency status
- **Milestone Dependency Checker** — validates dependency chain; flags blocked items
- **Compliance Deadline Monitor** — alerts 30 days before any compliance deadline
- **Sprint Review Report** — velocity, planned vs. delivered, risk resolution
- **Retrospective Input** — recurring delay patterns, lessons-learned section
- **Cross-Agent Signal Emission** — emits BLOCKER and DEPENDENCY_DONE signals

### Enterprise Scale (includes all Medium abilities)
- **Executive Dashboard** — one-page board-level summary with EVM metrics
- **Compliance Posture Report** — full framework gap analysis, POA&M tracking
- **Program-Level Risk Report** — cross-workstream risk aggregation
- **Vendor Security Audit Summary** — attestation expiry tracking across all vendors
- **Change Impact Assessment** — scope change effect on schedule and budget
- **Full Signal Suite** — all 10 cross-agent signal types active

---

## Agile Accountabilities

### Sprint Planning
- Reads milestone data for the upcoming sprint window
- Flags milestones due within the sprint with incomplete dependencies
- At Medium/Enterprise scale: outputs multi-workstream sprint scope with cross-agent dependencies highlighted

### Daily Standup Support
- Generates one-line status per open milestone: on track / at risk / blocked
- Highlights status changes since last run
- At Small and above: includes vendor deliverable overdue flags

### Sprint Review
- Produces sprint close report: milestones completed vs. planned, velocity score
- At Medium and above: includes risk resolution count, compliance task completions

### Retrospective Input
- Flags recurring delay patterns (vendor, milestone category, resource)
- At Enterprise scale: cross-workstream pattern analysis across all active projects

### Definition of Done

A task or deliverable is complete when all of the following are true:

**All scales:**
- [ ] Milestone `status = "complete"` in `project.toml`
- [ ] `completed_date` recorded

**Small and above:**
- [ ] No open vendor follow-ups blocking the milestone
- [ ] No risks with `escalation_required = true` that are unacknowledged

**Medium and above:**
- [ ] Stakeholder sign-off recorded for phase gates
- [ ] Compliance checklist items for this deliverable: all `complete = true`
- [ ] Budget impact documented if deliverable caused cost variance

**Enterprise:**
- [ ] Security control mapped and implemented for any deliverable touching client data
- [ ] Board-level impact assessed for deliverables exceeding 10% of phase budget

---

## Inspection

Inspection thresholds are pulled from `config/settings.toml`. Only checks appropriate for the configured scale are activated.

### What Gets Inspected Every Run

| Inspection Point | Threshold (default) | Scale Active | Action |
|---|---|---|---|
| Milestone overdue | Past due date | All | RED in milestone table |
| Milestone at risk | Due within 14 days, in-progress | All | AMBER in milestone table |
| Risk score high | >= 6 or escalation_required | Small+ | Risk alert report generated |
| Risk staleness | Not reviewed in 7+ days | Small+ | Flagged as STALE |
| Vendor deliverable overdue | Any overdue item | Small+ | Vendor follow-up report |
| Budget burn | > 80% spent | Small+ | Budget alert section |
| Compliance deadline | Within 30 days | Medium+ | Compliance alert section |
| Vendor attestation expired | Any expired cert | Medium+ | Vendor security flag |
| Security finding stale | > 30 days, no owner | Medium+ | Security escalation |
| Pen test finding open | > 60 days unresolved | Enterprise | Critical security alert |
| POA&M item overdue | Past due, not resolved | Enterprise | POA&M escalation section |
| Cross-agent signal unacknowledged | > 24 hours | Medium+ | Signal escalation |

### Output Artifacts

| Artifact | Trigger | Scale | Filename |
|---|---|---|---|
| Project Status Report | Every run | All | `YYYY-MM-DD_project_status.md` |
| Risk Alert | Critical risks exist | Small+ | `YYYY-MM-DD_risk_alert.md` |
| Vendor Follow-Up | Overdue items exist | Small+ | `YYYY-MM-DD_vendor_followup.md` |
| Budget Burn Report | Every run | Small+ | `YYYY-MM-DD_budget_burn.md` |
| Stakeholder Brief — Executive | Scheduled | Medium+ | `YYYY-MM-DD_exec_brief.md` |
| Stakeholder Brief — Management | Scheduled | Small+ | `YYYY-MM-DD_mgmt_brief.md` |
| Stakeholder Brief — Operational | On demand | Medium+ | `YYYY-MM-DD_ops_brief.md` |
| Compliance Alert | Deadline within 30 days | Medium+ | `YYYY-MM-DD_compliance_alert.md` |
| Sprint Report | Sprint close | All | `YYYY-MM-DD_sprint_report.md` |
| Compliance Posture | Every run | Enterprise | `YYYY-MM-DD_compliance_posture.md` |
| Executive Dashboard | Every run | Enterprise | `YYYY-MM-DD_exec_dashboard.md` |

### Self-Validation (Rust)
Before generating any report, this agent:
1. Validates all TOML files parse without error
2. Confirms all milestone `dependencies` reference valid milestone IDs
3. Confirms all vendor `follow_up` dates are valid `NaiveDate` values
4. Logs a warning if `last_reviewed` on any risk is more than 7 days ago
5. Validates `project_scale` field is a known enum variant
6. Confirms all required files for the declared scale are present
7. Checks `agent_config.toml` task list references only known task IDs

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

---

### Threat Defense (All Agents — Including Generalist)

- `SanitizedString` validator applied to every TOML string field before processing
- Path traversal guard: canonicalize + project root check on every file path
- Behavioral consistency checker: flags impossible state combinations (e.g., `status = "complete"` with no `completed_date`)
- SHA-256 checksum on all cross-agent coordination state files
- Threat alert written to `outputs/<project>/YYYY-MM-DD_threat_alert.md` and agent halts on any detection
- See: `docs/architecture/04-threat-defense.md`
