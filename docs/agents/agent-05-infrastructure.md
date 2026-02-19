[IDX]  2026-02-19.C12
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   agent-profile | infrastructure | tpm
[CONF] 0.94
[REVIEW] false

---

# Agent 05 — Supporting Infrastructure

> **Initiative:** Supporting Infrastructure Projects
> **Stack:** Rust
> **Role:** Automated TPM Agent — Infrastructure Portfolio Domain

---

## Skills

Technical skills this agent is built around:

- Network infrastructure — LAN/WAN refresh, switching, routing, SD-WAN, firewall replacement
- Server and storage hardware — rack servers, SAN/NAS refresh, hypervisor upgrades (VMware, Hyper-V)
- Endpoint management — MDM platforms, imaging, patching, device lifecycle
- Backup and disaster recovery — modernizing backup infrastructure, retention policy, offsite/cloud backup
- Hardware procurement — purchase order tracking, vendor lead times, receiving and asset tagging
- Project portfolio management — managing multiple parallel sub-projects under one program umbrella
- Resource planning — shared resource allocation across concurrent sub-projects
- Cross-project dependency mapping — identifying where infrastructure work blocks other initiatives
- Change management for infrastructure — maintenance windows, change advisory board (CAB) coordination
- Vendor and supplier management — hardware OEMs, VARs (Value-Added Resellers), ISPs

---

## Memory

What this agent retains and references across every run:

| Memory Category | What Is Stored |
|---|---|
| Sub-Project Registry | Sub-project name, owner, status, percent complete, next milestone |
| Hardware PO Log | PO number, vendor, item, order date, expected delivery, received status |
| Resource Assignment Map | Engineer name, role, which sub-projects they are assigned to, sprint weeks |
| Cross-Project Dependencies | This sub-project blocks which other initiative, nature of dependency |
| Asset Inventory | Ordered hardware vs. received vs. deployed counts |
| Vendor Registry | Hardware OEM, VAR, ISP contacts and deliverable status |
| Risk Register | Open infrastructure-domain risks across all sub-projects |
| Change Log | CAB-approved changes, maintenance windows scheduled |

**Loaded from:** `data/infrastructure/project.toml`, `risks.toml`, `vendors.toml`, `stakeholders.toml`

---

## Abilities

What this agent can execute autonomously:

- **Portfolio Summary Report** — single-table view across all sub-projects: name, owner, status (RAG), percent complete, next milestone, days to next milestone
- **Resource Contention Alert** — identifies weeks where multiple sub-projects have milestones due simultaneously and flags shared resources (e.g., same network engineer assigned to two parallel tasks); generates a resource conflict notice
- **Hardware PO Tracker** — compares expected delivery date to today for all open POs; flags overdue deliveries; generates vendor follow-up with PO number and item detail pre-populated
- **Cross-Project Dependency Report** — outputs a dependency map showing which infrastructure sub-projects are blocking other initiatives (e.g., "Network Refresh Wave 2 blocks Cloud Migration Wave 3"), flags any blocker that is at risk
- **Risk Alert** — grouped by sub-project for clarity; surfaces risks across all sub-projects in one report
- **Vendor Follow-Up** — hardware delivery tracking across all OEM and VAR vendors
- **Weekly Portfolio Status Report** — full portfolio table, resource contention summary, top risks, open POs summary

---

## Agile Accountabilities

### Sprint Planning
- Across all sub-projects, identifies milestones due within the sprint window
- Flags resource conflicts: same person, same sprint, multiple sub-projects
- Outputs hardware deliveries expected within the sprint (so the team can plan receiving and deployment work)
- Highlights cross-project blockers due this sprint — infrastructure work that unblocks another initiative

### Daily Standup Support
- Sub-project roll-up: one-line status per sub-project
- Flags any POs that became overdue since last run
- Surfaces newly identified resource conflicts

### Sprint Review
- Sprint close across portfolio: milestones delivered per sub-project, hardware received vs. expected, cross-project blockers resolved
- Resource utilization summary: planned vs. actual engineer time across sub-projects

### Retrospective Input
- Sub-projects consistently lagging — root cause patterns (procurement delays, resource unavailability, scope changes)
- Hardware vendors with repeated late deliveries
- Resource bottlenecks: which engineers are over-allocated most frequently

### Definition of Done (per Sub-Project)
A sub-project is complete when all of the following are true:
- [ ] All milestones: `status = "complete"`
- [ ] All hardware POs: `received = true`
- [ ] All assets: `deployed = true` and recorded in asset management system
- [ ] Cross-project dependency delivered and confirmed by dependent initiative owner
- [ ] Hypercare/monitoring period complete
- [ ] Documentation (runbooks, network diagrams, configs) updated and stored

---

## Inspection

### What Gets Inspected Every Run
| Inspection Point | Threshold | Action |
|---|---|---|
| Sub-project milestone | Overdue or within 7 days | RAG flag in portfolio table |
| Resource conflict | Same engineer, overlapping milestones, same sprint week | Resource contention alert |
| Hardware PO overdue | Past expected delivery date | PO follow-up report generated |
| Cross-project blocker at risk | Blocker milestone is AMBER or RED | Dependency risk flag |
| Risk score | >= 6 | Risk alert report generated |
| Risk staleness | Not reviewed in 7+ days | Flagged STALE |
| Vendor deliverable overdue | Any overdue item | Vendor follow-up report generated |

### Output Artifacts Produced
| Artifact | Trigger | Filename |
|---|---|---|
| Portfolio Status Report | Every run | `YYYY-MM-DD_portfolio_status.md` |
| Risk Alert | Critical risks across any sub-project | `YYYY-MM-DD_risk_alert.md` |
| Resource Contention Alert | Conflicting milestones detected | `YYYY-MM-DD_resource_contention.md` |
| Vendor Follow-Up | Overdue POs or deliverables | `YYYY-MM-DD_vendor_followup.md` |
| Cross-Project Dependency Report | Every run | `YYYY-MM-DD_cross_project_dependencies.md` |

### Self-Validation (Rust)
Before generating any report, this agent:
1. Validates all TOML files parse without error
2. Confirms every sub-project in the `sub_projects` array has a valid `owner` field
3. Checks that `blocks_project` references in sub-projects match valid project IDs across the full system
4. Warns if any PO has `expected_delivery` in the past and `received = false`
5. Flags if any sub-project has `percent_complete = 100` but still has milestones with `status != "complete"`

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
