[IDX]  2026-02-19.C14
[CAT]  5_TECHNOLOGY
[TIME] 2026-02-18T00:00:00-06:00
[3K]   architecture | data-model | toml-schema
[CONF] 0.93
[REVIEW] false

---

# TPM Agent System — Data Model

> All data models are Rust structs serialized/deserialized from TOML using `serde`.

---

## Entity Relationship Map

```
ProjectState
├── Project
│   ├── Vec<Phase>
│   └── Vec<Milestone>
│       └── dependencies: Vec<MilestoneId>
├── Vec<Risk>
├── Vec<Vendor>
│   ├── Vec<VendorDeliverable>
│   └── Vec<FollowUp>
├── Vec<Stakeholder>
└── SecurityContext
    ├── SecurityLevel (u8)
    ├── Vec<ComplianceFramework>
    └── Vec<SecurityFinding>
```

---

## Core Types

### Project
```rust
struct Project {
    id: String,                    // "cloud_migration"
    name: String,
    sponsor: String,
    pm: String,
    start_date: NaiveDate,
    target_end_date: NaiveDate,
    current_phase: String,
    overall_status: ProjectStatus, // OnTrack | AtRisk | OffTrack | OnHold | Completed
    budget_total_usd: u64,
    budget_spent_usd: u64,
    phases: Vec<Phase>,
    milestones: Vec<Milestone>,
}
```

### Milestone
```rust
struct Milestone {
    id: String,                    // "MS-003"
    name: String,
    owner: String,
    due_date: NaiveDate,
    completed_date: Option<NaiveDate>,
    status: MilestoneStatus,       // NotStarted | InProgress | Complete | Overdue | Blocked
    dependencies: Vec<String>,     // IDs of blocking milestones
}

// Key methods (pure, no side effects)
impl Milestone {
    fn days_variance(&self, today: NaiveDate) -> i64     // + overdue, - remaining
    fn is_overdue(&self, today: NaiveDate) -> bool
    fn is_at_risk(&self, today: NaiveDate, days: i64) -> bool
}
```

### Risk
```rust
struct Risk {
    id: String,                    // "RISK-007"
    category: RiskCategory,        // Technical | Schedule | Budget | Resource | Vendor | Compliance | Org
    probability: RiskLevel,        // Low(1) | Medium(2) | High(3)
    impact: RiskLevel,
    status: RiskStatus,            // Open | Mitigating | Accepted | Closed | Escalated
    owner: String,
    last_reviewed: NaiveDate,
    mitigation_plan: String,
    escalation_required: bool,
}

impl Risk {
    fn score(&self) -> u8 { self.probability.value() * self.impact.value() }  // 1–9
    fn is_critical(&self) -> bool { self.score() >= 6 || self.escalation_required }
    fn is_stale(&self, today: NaiveDate, days: i64) -> bool
}
```

### Vendor
```rust
struct Vendor {
    id: String,
    name: String,
    primary_contact: Contact,
    status: VendorStatus,          // Onboarding | Active | Delayed | Disputed | Complete
    deliverables: Vec<VendorDeliverable>,
    follow_ups: Vec<FollowUp>,
    security_attestation: Option<SecurityAttestation>,
}

struct SecurityAttestation {
    framework: String,             // "SOC 2 Type II", "FedRAMP Moderate"
    issued_date: NaiveDate,
    expiry_date: NaiveDate,
    is_current: bool,
}
```

### SecurityContext (Math Model)
```rust
struct SecurityContext {
    agent_clearance: u8,           // 0–10 scalar (see security-model.md)
    required_frameworks: Vec<ComplianceFramework>,
    open_findings: Vec<SecurityFinding>,
    compliance_controls_total: u32,
    compliance_controls_implemented: u32,
}

impl SecurityContext {
    // Compliance posture as a percentage — pure math, no branching
    fn compliance_pct(&self) -> f32 {
        self.compliance_controls_implemented as f32
            / self.compliance_controls_total as f32
            * 100.0
    }

    // Gap score: 0.0 = fully compliant, 1.0 = nothing implemented
    fn gap_score(&self) -> f32 {
        1.0 - (self.compliance_controls_implemented as f32
               / self.compliance_controls_total as f32)
    }
}
```

---

## TOML File Structure (per project)

### project.toml
```toml
id = "cloud_migration"
name = "Cloud Migration"
sponsor = "Sarah Kim, CTO"
pm = "Alex Torres"
start_date = "2025-09-01"
target_end_date = "2026-09-30"
current_phase = "Phase 2: Pilot Wave Execution"
overall_status = "at_risk"
budget_total_usd = 850000
budget_spent_usd = 520000

[[phases]]
name = "Phase 1: Assessment"
start_date = "2025-09-01"
end_date = "2025-12-31"
status = "complete"
completion_pct = 100

[[milestones]]
id = "MS-003"
name = "Wave 2 Migration Complete"
owner = "Dana Patel"
due_date = "2026-03-15"
status = "in_progress"
dependencies = ["MS-002"]
```

### risks.toml
```toml
[[risks]]
id = "RISK-001"
title = "Telecom Circuit Delay"
category = "vendor"
probability = "high"
impact = "high"
status = "open"
owner = "Alex Torres"
identified_date = "2026-01-20"
last_reviewed = "2026-02-10"
mitigation_plan = "Procure temporary VPN as bridge solution."
escalation_required = true
```

### vendors.toml
```toml
[[vendors]]
id = "VEN-001"
name = "Acme Telecom"
status = "delayed"

[vendors.primary_contact]
name = "Jane Smith"
email = "jsmith@acmetelecom.com"
role = "Account Manager"

[vendors.security_attestation]
framework = "SOC 2 Type II"
issued_date = "2025-06-01"
expiry_date = "2026-06-01"
is_current = true

[[vendors.follow_ups]]
id = "FU-001"
subject = "Circuit delivery ETA confirmation"
due_date = "2026-02-20"
completed = false
priority = "critical"
```

### stakeholders.toml
```toml
[[stakeholders]]
id = "STK-001"
name = "Sarah Kim"
title = "CTO"
email = "skim@client.com"
role = "executive_sponsor"
update_frequency = "weekly"
detail_level = "executive"
focus_areas = ["budget", "timeline", "risk"]
```
