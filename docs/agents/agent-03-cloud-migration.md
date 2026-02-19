[IDX]  2026-02-19.C10
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   agent-profile | cloud-migration | tpm
[CONF] 0.94
[REVIEW] false

---

# Agent 03 — Cloud Migration

> **Initiative:** Cloud Migration
> **Stack:** Rust
> **Role:** Automated TPM Agent — Cloud Migration Domain

---

## Skills

Technical skills this agent is built around:

- Cloud platforms — AWS, Microsoft Azure, Google Cloud Platform
- Migration methodologies — lift-and-shift (rehost), re-platform, re-architect
- Landing zone design — AWS Control Tower, Azure Landing Zones, IAM, guardrails
- Wave-based migration planning — application dependency mapping, wave sequencing
- Hybrid networking — SD-WAN, MPLS, AWS Site-to-Site VPN, Azure ExpressRoute
- Workload assessment — application portfolio analysis, migration readiness scoring
- Disaster recovery design — RTO/RPO targets, failover testing
- Cloud cost management — FinOps principles, cost anomaly detection, right-sizing
- Architecture Decision Records (ADRs) — structured decision documentation
- Managed services oversight — cloud MSP and TAM engagement
- Security and compliance in cloud — CIS benchmarks, cloud security posture

---

## Memory

What this agent retains and references across every run:

| Memory Category | What Is Stored |
|---|---|
| Wave Schedule | Wave number, application list, planned migration date, outcome |
| Application Inventory | App name, owner, complexity tier, current migration status |
| Landing Zone Status | Build-out phase, security review status, approval date |
| Architecture Decisions | ADR ID, title, options, decision needed by date, status |
| Budget Ledger | Total budget, amount spent, projected final cost |
| Networking Status | Circuit vendor, order date, expected delivery, current status |
| DR Test Results | Test date, RTO achieved, RPO achieved, issues found |
| Vendor Registry | Cloud TAM, MSP partner, networking vendor contacts and deliverables |
| Risk Register | Open cloud-domain risks |

**Loaded from:** `data/cloud_migration/project.toml`, `risks.toml`, `vendors.toml`, `stakeholders.toml`

---

## Abilities

What this agent can execute autonomously:

- **Wave Progress Tracker** — shows each wave's application count, migration date, outcome (success / issues / rolled back), flags waves scheduled within 21 days
- **Budget Burn Monitor** — calculates `budget_spent / budget_total`, generates a budget alert section when burn rate exceeds 80%
- **ADR Summary** — outputs all pending architecture decisions with decision-needed-by date and options, sorted by urgency
- **Networking Dependency Alert** — flags any wave blocked by an outstanding circuit delivery or connectivity dependency
- **DR Readiness Report** — tracks DR failover test milestone, compares achieved RTO/RPO against targets
- **Vendor Follow-Up** — detects overdue MSP, TAM, and networking vendor deliverables; generates follow-up actions
- **Risk Alert** — surfaces Technical and Budget category risks; triggers budget burn alert when threshold exceeded
- **Weekly Status Report** — RAG status, wave progress table, budget utilization, ADRs pending, top risks

---

## Agile Accountabilities

### Sprint Planning
- Maps upcoming migration waves to the sprint window
- Identifies pre-wave dependencies that must be resolved (networking, landing zone approvals, ADRs)
- Outputs a sprint-level wave readiness checklist

### Daily Standup Support
- One-line status per active wave: on track / at risk / blocked
- Flags any networking or vendor blockers that emerged since last run
- Budget burn delta: spend change since last report

### Sprint Review
- Sprint close: waves completed vs. planned, applications migrated count, budget delta
- ADRs resolved vs. pending
- DR test outcomes if applicable this sprint

### Retrospective Input
- Patterns in wave slippage (which wave components repeatedly delay)
- Networking vendor reliability scorecard
- Budget variance root cause flags (egress cost spikes, unexpected licensing, etc.)

### Definition of Done (per Wave)
A migration wave is complete when all of the following are true:
- [ ] All applications in wave: `migration_status = "complete"`
- [ ] Post-migration validation tests: `status = "pass"`
- [ ] Application owner sign-off recorded
- [ ] DR failover tested for wave workloads (if in scope)
- [ ] Cost baseline established in cloud cost management tool
- [ ] Legacy environment decommission ticket opened

---

## Inspection

### What Gets Inspected Every Run
| Inspection Point | Threshold | Action |
|---|---|---|
| Budget burn rate | > 80% of total budget | Budget alert section added |
| Wave within 21 days | Any wave due in 21 days | Wave readiness checklist generated |
| Pending ADRs | Decision date within 14 days | ADR urgency flag added |
| Networking blocker | Circuit not delivered, wave depends on it | Networking alert section |
| Risk score | >= 6 or escalation_required | Risk alert report generated |
| Risk staleness | Not reviewed in 7+ days | Flagged STALE in risk report |
| Vendor overdue | Any overdue deliverable | Vendor follow-up report generated |

### Output Artifacts Produced
| Artifact | Trigger | Filename |
|---|---|---|
| Weekly Status Report | Every run | `YYYY-MM-DD_weekly_status.md` |
| Wave Tracker | Every run | `YYYY-MM-DD_wave_tracker.md` |
| ADR Summary | Every run | `YYYY-MM-DD_adr_summary.md` |
| Budget Alert | Burn rate > 80% | `YYYY-MM-DD_budget_alert.md` |
| Risk Alert | Critical risks exist | `YYYY-MM-DD_risk_alert.md` |
| Vendor Follow-Up | Overdue items exist | `YYYY-MM-DD_vendor_followup.md` |

### Self-Validation (Rust)
Before generating any report, this agent:
1. Validates all TOML files parse without error
2. Confirms `budget_spent_usd` does not exceed `budget_total_usd` (flags if it does)
3. Confirms each wave's `migration_date` is a valid `NaiveDate`
4. Warns if any ADR has `decision_needed_by` in the past with `status != "decided"`
5. Confirms wave dependencies reference valid wave IDs

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
