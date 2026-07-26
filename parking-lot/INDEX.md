[IDX]  2026-02-19.C23
[CAT]  8_KAIZEN
[TIME] 2026-02-18T00:00:00-06:00
[3K]   parking-lot | backlog | deferred-items
[CONF] 0.95
[REVIEW] false

---

# Parking Lot

Items that have been scoped, discussed, or started but are not actively being worked on. Picked up in priority order when capacity is available.

---

## Parked Items

| ID | Title | Category | Added | Notes |
|----|-------|----------|-------|-------|
| PLO-001 | Personal / Life Folder Indexing | Life | 2026-02-17 | Mirror the enterprise 0–7 category system for personal use. Covers: faith & scripture, personal wellbeing, family & relationships, personal skills & learning, personal tech & tools, personal finance, personal work & side projects, personal reviews & journals. Defer until enterprise index is complete and proven. |

---

## How to Promote a Parked Item

1. Move the row from this table to the relevant category backlog or project intake.
2. Open a `00-intake.md` in the correct category folder.
3. Delete the row here once promoted.

---

## Backlog (Unscheduled but Committed)

| ID | Title | Category | Priority | Notes |
|----|-------|----------|----------|-------|
| BL-001 | Build Orchestrator Agent | 4-tools | High | Routes inbound requests to the right TPM agent based on category classification. Knows full 15-agent roster. |
| BL-002 | Build BA (Business Analyst) Agent | 4-tools | High | Full requirements gathering, user advocacy, question protocol. Must reach complete understanding before handoff. |
| BL-003 | Build Architect Agent | 4-tools | High | High-level technical and business architecture design. Produces ADRs and system diagrams before build begins. |
| BL-004 | Build UX Agent | 4-tools | Medium | User experience flows, usability criteria, prototype specs. |
| BL-005 | Build QA / Test Agent | 4-tools | Medium | Test planning, test execution, results reporting. |
| BL-006 | Build UAT Coordinator Agent | 4-tools | Medium | UAT scenario design, stakeholder sign-off, go/no-go gate. |
| BL-007 | Build DevOps / Deploy Agent | 4-tools | Medium | Deployment planning, execution, go-live notice. |
| BL-008 | Build Monitor / SRE Agent | 4-tools | Medium | Post-launch monitoring config, alerting, SLA tracking. |
| BL-009 | Implement Project Folder Standard | 7-kaizen | Medium | Enforce phases 00–08 folder structure for every project. Orchestrator creates the scaffold on intake. |
| BL-010 | Definition of Done — Formal Approval | 7-kaizen | Medium | Draft v0.1 produced. Needs user review and sign-off before agents enforce it. |
| BL-011 | Human Approval Gate Config | 4-tools | Low | Allow per-project toggle: auto-advance through phases vs. require explicit human sign-off at each gate. |
| BL-012 | Implement Generation Log — `logs/runs.jsonl` | 5-technology | High | Append-only JSONL run log. One record per `tpm run` invocation. Fields: run_id, timestamp, agent, project, trigger, tasks, status, duration_ms, artifacts, error. Written by CLI after all agents complete. See: docs/system/generation-log-spec.md |
| BL-013 | Implement Generation Log — `logs/artifacts.csv` | 5-technology | High | Append-only CSV artifact catalog. One row per generated .md file. Fields: idx, timestamp, run_id, agent, project, cat, k1, k2, k3, conf, file_path. Queryable with grep, DuckDB, Excel. Header written only on first row. See: docs/system/generation-log-spec.md |
| BL-014 | Add `AgentResult` return type to all agents | 5-technology | High | Agents return `AgentResult { run_record, artifact_records, reports }` instead of writing logs directly. CLI collects results and writes both log files after all parallel agents complete. Preserves no-shared-mutable-state principle. See: docs/architecture/08-generation-log.md |

---

← [Root Index](../INDEX.md)
