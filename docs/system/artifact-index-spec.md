[IDX]  2026-02-19.C05
[CAT]  8_KAIZEN
[TIME] 2026-02-19T09:00:00-06:00
[3K]   artifact-index | metadata-spec | governance
[CONF] 0.99
[REVIEW] false

---

# Artifact Index Specification

> Every document, output, and design artifact in this workspace carries a six-field index block.
> Machine-readable. Human-readable. Router-compatible. Governance-ready.

---

## The Six Fields

```
[IDX]    YYYY-MM-DD.C##
[CAT]    #_CATEGORY
[TIME]   YYYY-MM-DDTHH:MM:SS-06:00
[3K]     keyword1 | keyword2 | keyword3
[CONF]   0.##
[REVIEW] true | false
```

---

## Field Definitions

### [IDX] — Artifact Identifier

Format: `YYYY-MM-DD.C##`

| Part | Meaning |
|------|---------|
| `YYYY-MM-DD` | Date the artifact was first indexed (not necessarily created) |
| `.C` | Catalog entry separator — literal |
| `##` | Zero-padded sequential counter, unique within that date, globally across all artifacts |

The IDX code is **permanent** — it does not change when content is updated. It identifies the artifact, not the version.

**Examples:**
- `2026-02-19.C01` — first artifact indexed on 2026-02-19
- `2026-02-19.C23` — twenty-third artifact indexed on 2026-02-19
- `2026-03-01.C01` — first artifact indexed on a new day (counter resets per day)

**Assignment:** Consult `idx-registry.md` before assigning. Take the next available number for the current date.

---

### [CAT] — Primary Category

Exactly one primary category. No exceptions. Use the 0–8 enterprise taxonomy.

| Code | Label | Covers |
|------|-------|--------|
| `0_MISSION` | MISSION | Why the org exists — purpose, values, governance, compliance, ethics |
| `1_PEOPLE` | PEOPLE | Everyone inside — health, safety, DEI, benefits, culture |
| `2_CUSTOMERS` | CUSTOMERS | Everyone served — relationships, community, brand, presence |
| `3_PRODUCT` | PRODUCT | What is sold or delivered — product, service, UX, roadmap, launch |
| `4_INTELLIGENCE` | INTELLIGENCE | What the org knows — capabilities, training, R&D, IP, data |
| `5_TECHNOLOGY` | TECHNOLOGY | Every system and platform the org uses to operate and deliver |
| `6_FINANCE` | FINANCE | All financial activity — revenue, costs, budget, funding, reporting |
| `7_OPERATIONS` | OPERATIONS | How the org runs — process, delivery, supply chain, legal, HR, admin |
| `8_KAIZEN` | KAIZEN | How the org improves — strategy, audits, KPIs, innovation, measurement |

**Disambiguation rules:**
- A document about *how agents work* → `5_TECHNOLOGY`
- A document about *how the team delivers* → `7_OPERATIONS`
- A document about *security policy or compliance* → `0_MISSION`
- A document about *improving or governing the system itself* → `8_KAIZEN`
- Index files, registries, specs → `8_KAIZEN`

If two categories are equally valid, use the one with the higher CONF score. If still tied, set `[REVIEW] true` and pick the narrower category.

---

### [TIME] — ISO-8601 Timestamp

Format: `YYYY-MM-DDTHH:MM:SS-06:00` (CST, UTC-6)

- For **design artifacts** (docs, specs, agent profiles): use the "Last updated" date from the document footer, at `T00:00:00-06:00`
- For **agent-generated outputs** (reports, alerts): use the exact generation timestamp from the agent runtime
- For **new artifacts** with no prior date: use the current date and approximate time

The timestamp is informational — it anchors the artifact in time for audit purposes.

---

### [3K] — Three Canonical Keywords

Format: `keyword1 | keyword2 | keyword3`

Rules:
- Lowercase, hyphenated (no spaces, no underscores)
- Exactly three keywords — no more, no fewer
- Controlled vocabulary: prefer reuse of existing keywords over coining new ones
- Order: most-specific first, most-general last

**Recommended keyword vocabulary:**

*Artifact type (first position):*
`agent-profile` | `architecture` | `master-index` | `docs-index` | `system-index` | `category-taxonomy` | `artifact-index` | `idx-registry` | `mvp` | `parking-lot` | `project-status` | `risk-alert` | `vendor-followup` | `stakeholder-brief` | `budget-report` | `threat-alert`

*Domain / topic (second position):*
`physical-security` | `crm` | `cloud-migration` | `erp` | `infrastructure` | `generalist-tpm` | `data-model` | `security-model` | `threat-defense` | `team-coordination` | `generalist-layer` | `project-scales` | `memory-system` | `workspace-navigation` | `documentation` | `reference-standards` | `backlog`

*Scope / qualifier (third position):*
`tpm-system` | `tpm` | `governance` | `config-driven` | `cross-agent` | `toml-schema` | `routing` | `clearance-levels` | `scale-gating` | `agent-state` | `launch-criteria` | `deferred-items` | `file-layout` | `security`

---

### [CONF] — Router Confidence Score

A float from `0.00` to `1.00` indicating how confident the classifier is in the assigned CAT.

| Range | Meaning |
|-------|---------|
| `0.95–1.00` | Definitive — no ambiguity. Single possible category. |
| `0.90–0.94` | High confidence — primary category clear, secondary faintly present. |
| `0.75–0.89` | Moderate confidence — another category could be argued. |
| `0.60–0.74` | Low confidence — dual-category tension. Set `[REVIEW] true`. |
| Below `0.60` | Flag for manual review — do not publish without human sign-off. |

CONF is set at indexing time by the classifier (human or agent). It does not change unless the artifact is re-classified.

---

### [REVIEW] — Governance Flag

`true` or `false`.

Set `[REVIEW] true` when any of the following apply:
- Content is in draft state (not yet approved)
- CONF score is below 0.90
- The artifact contradicts or overlaps with another indexed artifact
- The artifact is pending stakeholder sign-off
- The artifact has not been reviewed in more than 30 days (for living documents)

Set `[REVIEW] false` when:
- Content is approved and stable
- CONF is 0.90 or above
- No governance flags are open

---

## Placement in Files

The IDX block is the **first content** in every indexed `.md` file, before the document title.

```markdown
[IDX]  2026-02-19.C01
[CAT]  7_KAIZEN
[TIME] 2026-02-18T00:00:00-06:00
[3K]   master-index | workspace-navigation | tpm-system
[CONF] 0.97
[REVIEW] false

---

# Document Title Here
```

The `---` horizontal rule separates the index block from the document body.

---

## What Gets Indexed

| Artifact Type | Indexed? | IDX Assigned By |
|--------------|----------|-----------------|
| Design docs (`.md` in `docs/`) | Yes | Human at creation |
| Index files (`INDEX.md`) | Yes | Human at creation |
| Agent profiles | Yes | Human at creation |
| Agent-generated output reports | Yes | Agent at generation time |
| Architecture documents | Yes | Human at creation |
| Specs and registries | Yes | Human at creation |
| TOML data files | **No** | Machine-readable only |
| TOML config files | **No** | Machine-readable only |
| Rust source files | **No** | Source code, not artifacts |

---

## Assignment Process

1. Open `docs/system/idx-registry.md`
2. Find the current date row
3. Take the next available `C##` number
4. Add the new entry to the registry
5. Add the IDX block to the artifact
6. Save both files

**Never reuse an IDX code.** If an artifact is deleted, its IDX code is retired — not reassigned.

---

## Agent-Generated Output IDX

When an agent generates an output report, it must:
1. Query the IDX registry (or a runtime counter) for the next available code for the current date
2. Inject the IDX block at the top of the output file
3. Append its IDX entry to the registry

**Runtime IDX block format for agent outputs:**

```
[IDX]  {date}.C{nn}
[CAT]  {category_of_generating_agent}
[TIME] {exact_generation_timestamp}
[3K]   {report_type} | {project_name} | {trigger_condition}
[CONF] 0.99
[REVIEW] false
```

The CONF for agent-generated outputs is always `0.99` — the agent knows exactly what it generated and why.

---

*Last updated: 2026-02-19*
*Owner: System*
*Status: Active v1.0*
