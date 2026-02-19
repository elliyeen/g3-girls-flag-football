[IDX]  2026-02-19.C15
[CAT]  0_MISSION
[TIME] 2026-02-18T00:00:00-06:00
[3K]   architecture | security-model | clearance-levels
[CONF] 0.91
[REVIEW] false

---

# TPM Agent System — Security Model (Math-Based)

> Security levels are **scalar integers**. All access checks, risk scoring, and compliance calculations are **arithmetic expressions** — no if/then chains, no long match arms.

---

## Security Level Scale

```
 0    1    2    3    4    5    6    7    8    9    10
 │    │    │    │    │    │    │    │    │    │    │
 └────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
Pub  CUI  SOC2 FedL  CMMC  FedM  IL4  FedH  IL5   IL6
                           L2                     (S)
```

| Level | u8 Value | Framework Equivalent |
|---|---|---|
| Public / Unclassified | 0 | All commercial, open |
| CUI | 1 | NIST 800-171, CMMC L1 |
| SOC 2 | 2 | Commercial SaaS baseline |
| FedRAMP Low | 3 | Low-impact federal |
| CMMC Level 2 | 4 | DoD contractors with CUI |
| FedRAMP Moderate | 5 | Standard federal cloud |
| IL4 | 6 | DoD mission-critical |
| FedRAMP High | 7 | Law enforcement, financial, emergency |
| IL5 | 8 | National Security Systems |
| CMMC Level 3 | 9 | Expert — critical DoD programs |
| IL6 / Secret | 10 | Classified SECRET |

---

## Rust Implementation

```rust
/// Security level as a plain scalar — no enum variants, no match arms.
/// All comparisons are integer arithmetic.
#[derive(Debug, Clone, Copy, PartialEq, PartialOrd, serde::Deserialize, serde::Serialize)]
pub struct SecurityLevel(pub u8);

impl SecurityLevel {
    // Framework constants — define once, use everywhere
    pub const PUBLIC:          SecurityLevel = SecurityLevel(0);
    pub const CUI:             SecurityLevel = SecurityLevel(1);
    pub const SOC2:            SecurityLevel = SecurityLevel(2);
    pub const FEDRAMP_LOW:     SecurityLevel = SecurityLevel(3);
    pub const CMMC_L2:         SecurityLevel = SecurityLevel(4);
    pub const FEDRAMP_MODERATE:SecurityLevel = SecurityLevel(5);
    pub const IL4:             SecurityLevel = SecurityLevel(6);
    pub const FEDRAMP_HIGH:    SecurityLevel = SecurityLevel(7);
    pub const IL5:             SecurityLevel = SecurityLevel(8);
    pub const CMMC_L3:         SecurityLevel = SecurityLevel(9);
    pub const IL6_SECRET:      SecurityLevel = SecurityLevel(10);

    /// Can this agent access data at the required level?
    /// Single comparison — no branching.
    pub fn can_access(self, required: SecurityLevel) -> bool {
        self.0 >= required.0
    }

    /// Normalized clearance score (0.0–1.0) for math operations
    pub fn normalized(self) -> f32 {
        self.0 as f32 / 10.0
    }

    /// Delta between agent clearance and required — negative means insufficient
    pub fn delta(self, required: SecurityLevel) -> i8 {
        self.0 as i8 - required.0 as i8
    }
}
```

---

## Risk Scoring (Math Only)

```rust
/// Risk score = probability × impact
/// Both are 1–3 ordinal values → score range 1–9
/// No if/then — pure multiplication.

#[derive(Clone, Copy)]
pub struct RiskLevel(pub u8); // 1 = Low, 2 = Medium, 3 = High

pub fn risk_score(probability: RiskLevel, impact: RiskLevel) -> u8 {
    probability.0 * impact.0  // range: 1–9
}

/// Normalize risk score to 0.0–1.0
pub fn risk_normalized(score: u8) -> f32 {
    score as f32 / 9.0
}

/// Alert threshold check — single expression, no branching
/// Returns true if risk score meets or exceeds threshold
pub fn risk_exceeds(score: u8, threshold: u8) -> bool {
    score >= threshold
}

// Usage:
// let score = risk_score(RiskLevel(3), RiskLevel(3)); // = 9 (max)
// let critical = risk_exceeds(score, 6);              // = true
// let normalized = risk_normalized(score);            // = 1.0
```

---

## Compliance Gap Scoring (Math Only)

```rust
/// Compliance posture as a ratio — no branching.
/// 1.0 = fully compliant, 0.0 = nothing implemented

pub struct ComplianceState {
    pub controls_total: u32,
    pub controls_implemented: u32,
}

impl ComplianceState {
    /// Percentage of controls implemented (0–100)
    pub fn posture_pct(&self) -> f32 {
        (self.controls_implemented as f32 / self.controls_total as f32) * 100.0
    }

    /// Gap score: how far from full compliance (0.0 = done, 1.0 = nothing done)
    pub fn gap_score(&self) -> f32 {
        1.0 - (self.controls_implemented as f32 / self.controls_total as f32)
    }

    /// Weighted risk: gap × security level required
    /// Higher clearance requirement + larger gap = higher urgency score
    pub fn urgency_score(&self, required_level: SecurityLevel) -> f32 {
        self.gap_score() * required_level.normalized()
    }
}

// Example:
// 70/100 controls implemented, FedRAMP High required (level 7):
// gap_score   = 1.0 - 0.70 = 0.30
// urgency     = 0.30 × 0.70 = 0.21
// If urgency > 0.20 → generate compliance alert section
```

---

## Vendor Security Validation (Math Only)

```rust
/// Days until vendor attestation expires — negative means already expired
pub fn attestation_days_remaining(expiry: NaiveDate, today: NaiveDate) -> i64 {
    (expiry - today).num_days()
}

/// Vendor security score: 1.0 = current valid attestation, 0.0 = expired
/// Continuous — not binary. Decays as expiry approaches.
pub fn vendor_security_score(expiry: NaiveDate, today: NaiveDate) -> f32 {
    let days = attestation_days_remaining(expiry, today);
    // Clamp to 0.0–1.0: score starts decaying 90 days before expiry
    (days as f32 / 90.0).clamp(0.0, 1.0)
}

// Examples:
// 90+ days remaining → score = 1.0 (fully current)
// 45 days remaining  → score = 0.5 (approaching renewal)
// 0 days remaining   → score = 0.0 (expired — block vendor onboarding)
// -30 days           → score = 0.0 (expired — escalate)
```

---

## Alert Threshold Table (All Math)

All alert decisions are single arithmetic comparisons against named constants:

```rust
// Thresholds — set in config/settings.toml, loaded as constants
const RISK_CRITICAL_THRESHOLD:      u8  = 6;     // risk_score >= 6 → alert
const BUDGET_BURN_THRESHOLD:        f32 = 0.80;  // spent/total >= 0.80 → alert
const COMPLIANCE_GAP_THRESHOLD:     f32 = 0.20;  // gap_score >= 0.20 → alert
const VENDOR_SCORE_THRESHOLD:       f32 = 0.50;  // vendor_score < 0.50 → flag
const MILESTONE_WARNING_DAYS:       i64 = 14;    // days_remaining <= 14 → amber
const RISK_STALE_DAYS:              i64 = 7;     // last_reviewed gap > 7 → stale
const COMPLIANCE_DEADLINE_DAYS:     i64 = 30;    // deadline within 30 days → alert

// All checks — one expression each:
let risk_alert      = risk_score >= RISK_CRITICAL_THRESHOLD;
let budget_alert    = spent as f32 / total as f32 >= BUDGET_BURN_THRESHOLD;
let compliance_flag = gap_score >= COMPLIANCE_GAP_THRESHOLD;
let vendor_flag     = vendor_security_score(expiry, today) < VENDOR_SCORE_THRESHOLD;
let milestone_amber = days_remaining <= MILESTONE_WARNING_DAYS && days_remaining > 0;
let milestone_red   = days_remaining <= 0;
let risk_stale      = (today - last_reviewed).num_days() > RISK_STALE_DAYS;
let deadline_alert  = (deadline - today).num_days() <= COMPLIANCE_DEADLINE_DAYS;
```

---

## Agent Security Access Check Flow

```
Client engagement loaded
        │
        ▼
settings.toml → agent_clearance: u8
        │
        ▼
project.toml  → required_level: u8
        │
        ▼
can_access = agent_clearance >= required_level   ← single comparison
        │
   ┌────┴────┐
  Yes        No
   │          │
   ▼          ▼
Proceed    Write access_denied.md
           Log to console (RED)
           Do not process project data
```

No match arms. No if/else chains. One integer comparison.
