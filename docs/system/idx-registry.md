[IDX]  2026-02-19.C06
[CAT]  8_KAIZEN
[TIME] 2026-02-19T09:00:00-06:00
[3K]   idx-registry | artifact-catalog | tpm-system
[CONF] 0.99
[REVIEW] false

---

# IDX Registry — Master Artifact Catalog

> Single source of truth for all assigned IDX codes.
> Consult this before assigning a new code. Never reuse a retired code.

---

## How to Use

1. Find the current date section (or add one if it doesn't exist)
2. Take the next `C##` number in sequence for that date
3. Add a row to this table
4. Add the IDX block to the artifact
5. Commit both files together

**Never reuse a retired IDX code.** Retired codes are marked `[RETIRED]`.

---

## Registry

### 2026-02-19

| IDX | File | CAT | 3K | CONF | REVIEW | Status |
|-----|------|-----|----|------|--------|--------|
| 2026-02-19.C01 | `INDEX.md` | 8_KAIZEN | master-index \| workspace-navigation \| tpm-system | 0.97 | false | Active |
| 2026-02-19.C02 | `docs/INDEX.md` | 8_KAIZEN | docs-index \| documentation \| tpm-system | 0.96 | false | Active |
| 2026-02-19.C03 | `docs/system/INDEX.md` | 8_KAIZEN | system-index \| reference-standards \| governance | 0.95 | false | Active |
| 2026-02-19.C04 | `docs/system/categories/INDEX.md` | 8_KAIZEN | category-taxonomy \| classification \| routing | 0.97 | false | Active |
| 2026-02-19.C05 | `docs/system/artifact-index-spec.md` | 8_KAIZEN | artifact-index \| metadata-spec \| governance | 0.99 | false | Active |
| 2026-02-19.C06 | `docs/system/idx-registry.md` | 8_KAIZEN | idx-registry \| artifact-catalog \| tpm-system | 0.99 | false | Active |
| 2026-02-19.C07 | `docs/agents/agent-00-generalist.md` | 5_TECHNOLOGY | agent-profile \| generalist-tpm \| config-driven | 0.92 | false | Active |
| 2026-02-19.C08 | `docs/agents/agent-01-physical-security.md` | 5_TECHNOLOGY | agent-profile \| physical-security \| tpm | 0.94 | false | Active |
| 2026-02-19.C09 | `docs/agents/agent-02-crm.md` | 5_TECHNOLOGY | agent-profile \| crm \| tpm | 0.94 | false | Active |
| 2026-02-19.C10 | `docs/agents/agent-03-cloud-migration.md` | 5_TECHNOLOGY | agent-profile \| cloud-migration \| tpm | 0.94 | false | Active |
| 2026-02-19.C11 | `docs/agents/agent-04-erp.md` | 5_TECHNOLOGY | agent-profile \| erp \| tpm | 0.94 | false | Active |
| 2026-02-19.C12 | `docs/agents/agent-05-infrastructure.md` | 5_TECHNOLOGY | agent-profile \| infrastructure \| tpm | 0.94 | false | Active |
| 2026-02-19.C13 | `docs/architecture/00-overview.md` | 5_TECHNOLOGY | architecture \| system-overview \| tpm-agents | 0.94 | false | Active |
| 2026-02-19.C14 | `docs/architecture/01-data-model.md` | 5_TECHNOLOGY | architecture \| data-model \| toml-schema | 0.93 | false | Active |
| 2026-02-19.C15 | `docs/architecture/02-security-model.md` | 0_MISSION | architecture \| security-model \| clearance-levels | 0.91 | false | Active |
| 2026-02-19.C16 | `docs/architecture/03-project-structure.md` | 5_TECHNOLOGY | architecture \| project-structure \| file-layout | 0.93 | false | Active |
| 2026-02-19.C17 | `docs/architecture/04-threat-defense.md` | 0_MISSION | architecture \| threat-defense \| security | 0.95 | false | Active |
| 2026-02-19.C18 | `docs/architecture/05-team-coordination.md` | 7_OPERATIONS | architecture \| team-coordination \| cross-agent | 0.93 | false | Active |
| 2026-02-19.C19 | `docs/architecture/06-generalist-layer.md` | 5_TECHNOLOGY | architecture \| generalist-layer \| config-driven | 0.93 | false | Active |
| 2026-02-19.C20 | `docs/architecture/07-project-scales.md` | 5_TECHNOLOGY | architecture \| project-scales \| scale-gating | 0.93 | false | Active |
| 2026-02-19.C21 | `docs/memory/00-memory-architecture.md` | 5_TECHNOLOGY | architecture \| memory-system \| agent-state | 0.91 | false | Active |
| 2026-02-19.C22 | `docs/mvp/00-mvp-overview.md` | 7_OPERATIONS | mvp \| product-scope \| launch-criteria | 0.92 | false | Active |
| 2026-02-19.C23 | `parking-lot/INDEX.md` | 8_KAIZEN | parking-lot \| backlog \| deferred-items | 0.95 | false | Active |
| 2026-02-19.C24 | `docs/system/generation-log-spec.md` | 8_KAIZEN | generation-log \| artifact-catalog \| data-engineering | 0.99 | false | Active |
| 2026-02-19.C25 | `docs/architecture/08-generation-log.md` | 5_TECHNOLOGY | architecture \| generation-log \| data-engineering | 0.99 | false | Active |

---

## Date Template

When starting a new date, add this section:

```markdown
### YYYY-MM-DD

| IDX | File | CAT | 3K | CONF | REVIEW | Status |
|-----|------|-----|----|------|--------|--------|
| YYYY-MM-DD.C01 | `path/to/file.md` | #_CATEGORY | keyword1 \| keyword2 \| keyword3 | 0.00 | false | Active |
```

---

## Retired Codes

| IDX | Reason | Retired Date |
|-----|--------|--------------|
| — | No retirements yet | — |

---

*Last updated: 2026-02-19*
*Owner: System*
*Status: Active v1.0*
