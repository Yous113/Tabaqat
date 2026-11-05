# Islamic history: period lineage trees

Implementation plan agreed through the grill-with-docs interview on 2026-10-30. This document describes future implementation; no application or historical data changes have been made as part of planning.

## Agreed experience

- The home page title is **Islamic history**. It has exactly three clickable, softly rounded square cards, in this order: **Rashidun**, **Umayyad**, **Abbasid**.
- Each card opens a period lineage tree. Connections continue to mean father → child, never succession. Names and caliph badges remain readable at the initial zoom.
- Rashidun includes Abū Bakr, ʿOmar, ʿUthmān, ʿAlī, and Al-Ḥasan, as already defined in the glossary. Its initial focus is Abū Bakr.
- Umayyad covers the Damascus caliphate, initially focused on Muʿāwiyah. Córdoba is outside this version.
- Abbasid covers the Baghdad caliphate, initially focused on its first caliph. Later Cairo Abbasids are outside this version.
- Include every caliph within these boundaries. Research and approve missing names, roles, reigns, and connecting lineage before adding historical facts.
- Include the caliphs, ancestors needed to connect their branches, and relevant relatives already recorded within those branches. Do not expand research into every additional relative.
- Initial focus does not determine membership. In particular, the Umayyad view must include both the Muʿāwiyah and Marwān branches; the Abbasid view must include relevant sibling branches rather than only descendants of the first caliph.
- A person card shows the name and a period-specific caliph badge when applicable. Each period has a distinct color, supported by text labels rather than color alone.
- Tapping a person opens details: a bottom sheet on phones and a side panel on iPad. Show existing names, aliases, honorifics and applicable roles, plus verified caliph reigns in Hijri (AH) and Common Era (CE). Mark uncertainty explicitly.
- Support drag to pan, pinch zoom, Reset view, Fit all, and a visible **Islamic history** home link. Reset restores the selected period's initial focus; Fit all includes that period's entire tree.
- Each period has a direct URL. Refresh, bookmarks, sharing, and browser Back work.
- The supplied picture is a historical-content reference only. It is not a visual template. Use the agreed simple cream background, rounded shapes, and period colors.

## Existing code and constraints

- `src/App.tsx` currently lays out the complete dataset and focuses on Muhammad. It has no routes, landing page, or person details UI.
- `src/data/types.ts` defines people and father connections. `src/data/lineage.ts` loads `src/data/people.json`.
- `src/graph/createLineageGraph.ts` lays out the supplied people and connections using Dagre. Keep period selection separate from layout.
- `src/graph/PersonCard.tsx` currently recognizes prophet and Rashidun caliph roles. Cards currently measure 240 × 96; verify space for names, aliases, and badges rather than assuming these dimensions still suffice.
- React Flow already supplies the canvas and zoom controls. Preserve it unless a demonstrated requirement cannot be met.
- Respect ADR-0001 (strict father-to-child trees) and ADR-0002 (stable, lineage-based person IDs). Preserve all existing historical facts unless the user explicitly approves a correction.
- There is no selected hosting provider. Clean direct URLs need a production fallback to the application entry point; document and verify this when hosting is chosen.

## Historical approval gate

The reference picture is saved at `docs/references/caliph-lineage-reference.jpg`. Its original attachment name is `PHOTO-2026-10-12-16-51-39.jpg`. MarkItDown returned no extracted text; small names and dates must be checked visually and independently verified.

Create `docs/research/caliph-data-proposal.md` before changing historical facts. For each proposed person or change, record:

- Canonical name, existing ID or proposed stable ID, aliases only when supported, and period/caliph designation.
- Each reign interval, with AH and CE dates at the precision actually supported by the sources. Allow multiple reigns and distinguish uncertain dates from missing dates. Do not invent exact calendar conversions.
- Father and any missing ancestors required to connect the person to the existing tree. Every proposed relationship needs supporting evidence.
- Source links or bibliographic locators for the claims, disagreements between sources, and any unreadable image detail.
- Whether the item already exists, needs new metadata, adds a person/connection, or proposes a correction.

Research with high-trust historical sources, preferring primary material or scholarly editions where accessible, and reputable scholarly references for chronology. The picture can suggest entries; it does not resolve unsupported or conflicting claims. Reconcile the list against the agreed boundaries and show omissions or disputed inclusion explicitly.

Present the concrete proposal to the user and obtain approval before entering its new historical facts into `src/data/`. General permission to research or use the picture is not approval of individual extracted facts. If any required fact remains unresolved, report the gap and do not claim the complete dataset is finished.

## Approved parallel implementation split (2026-10-30)

The user approved research proposal R1 for implementation for now, including qualified claimants, the collision-safe ID extension and the separate Abū Bakr correction. All three test seams below are explicitly approved. The user requested three implementation leads across the remaining plan, replacing the earlier one-step-per-invocation pacing for this run.

| Lead | Ownership | Completion responsibility |
|---|---|---|
| Landing page | Home cards, route shell, responsive global styling, navigation tests, hosting-fallback documentation | All three period links and browser history work accessibly on phone and iPad layouts. |
| Abbasid graph | Approved Abbasid people, father connections, tenures, membership, data/graph tests | Complete regular and qualified-claimant roster with connecting collateral branches and sourced reign metadata. |
| Umayyad graph | Approved Umayyad tenures, membership, data/graph tests | All 14 caliphs, both branches, and contextual relatives without incorrect office designations. |
| Parent integration | Shared types/loader/validation, period selection, Rashidun data, approved identity correction, common canvas/cards/details, integration and final review | One canonical dataset and consistent mobile interactions across all three views. |

Leads edit separate owned files and share the same data interfaces. Parent performs integration, independent review, final checks and commit. No deployment or push is included.

### Implementation status

Implemented 2026-10-30: all three period views, landing/navigation, approved caliph data and identity correction, source details, touch controls, phone bottom sheet and iPad side panel. The canonical dataset contains 139 people and 138 father connections, with 56 regular caliph records and two separately qualified claimants. Historical source cautions remain in the approval ledger and displayed notes.

Verification: build, lint, test-location check and all 31 tests (13 files) passed. Standards review found no hard violations and one source-rendering duplication, which was addressed; Spec review found no issues. Headless Chrome checks passed at 320×720, 390×844, 844×390, 768×1024, 1024×768 and 1280×800: direct routes/refresh, readable initial focus, details, Reset/Fit all, 44px zoom controls and no horizontal page overflow. Emulated touch pinch, pan and tap, keyboard dismissal/focus restoration, Back navigation, selection clearing and enlarged text passed. Physical phone/iPad testing and production route fallback remain unverified until devices/hosting are available.

## Implementation steps

Run one step at a time. Each step should finish with a reviewable result and the checks appropriate to that step. Proposed new filenames below can change if the implementation produces a clearer structure; the behavior is the contract.

### Step 1 — Research and approve the historical additions

1. Inventory existing people and roles without modifying them. Use MarkItDown first when reading supported data and reference formats.
2. Build the proposal described above, including all caliphs in scope, their reigns, connecting lineage, and explicit branch membership for each view.
3. Present it for approval. Record the approved revision and any exceptions in the proposal.

Done when the implementation has an approved, sourced roster and membership specification, with unresolved claims called out. This step does not edit historical data.

### Step 2 — Add period metadata and approved caliph data

1. Extend `src/data/types.ts` and the loading boundary in `src/data/lineage.ts` to represent the three periods, explicit view membership, initial focus IDs, and caliph tenures with source references and uncertainty/precision.
2. Keep one canonical person per identity. Refer to stable IDs from period definitions; do not copy people into three competing datasets. Period membership must not automatically confer caliph status.
3. Represent multiple roles and reign intervals without losing the current prophet or Rashidun designations. Avoid contradictory duplicate caliph metadata; derive display badges from the authoritative designation where practical.
4. Add only the historical facts approved in Step 1. Keep provenance in a durable repository location linked from the data proposal.
5. Validate references and dataset integrity at the data boundary.

Done when all approved caliphs and their required lineage are present, all period/focus IDs resolve, IDs remain stable, and no invented connections are needed to make the graph work.

### Step 3 — Select each period's lineage tree

1. Add a pure selection boundary, for example `src/graph/selectPeriodLineage.ts`, receiving canonical lineage data and a period definition and returning visible people and father connections.
2. Use explicit membership from the approved proposal, then include ancestors needed to preserve the recorded connecting paths. Do not recursively include every descendant of shared ancestors, which would bring unrelated branches back into every view.
3. Keep relatives already approved for the selected family branches. Ancestor context can appear in multiple views without implying that those ancestors were caliphs in those periods.
4. Return only connections whose endpoints are visible. Preserve actual father-to-child edges; do not create shortcut parentage or succession edges.
5. Feed the selected result into the existing `createLineageGraph` boundary before layout. Avoid recalculating the graph when opening or closing person details.

Done when each period produces a connected, understandable view wherever the approved lineage supports one, includes the required sibling/collateral branches, and excludes unrelated branches. Missing lineage must be reported rather than silently invented.

### Step 4 — Add the landing page and direct navigation

1. Move the existing canvas into a focused tree-view component. Keep `App.tsx` responsible for the home/period navigation shell.
2. Use `/` for home and `/periods/rashidun`, `/periods/umayyad`, `/periods/abbasid` for period views. Use actual links and browser history, with a helpful recovery path for unknown period URLs.
3. Build the **Islamic history** landing page with three rounded square cards. Allow the grid to reflow from a single column on narrow phones to multiple columns when the cards remain readable. Avoid page-level horizontal scrolling.
4. On each period route, show its title, an **Islamic history** home link, the selected graph, and period-specific initial focus and Reset behavior. Clear the previous period's selected person when navigating.
5. Document the production route-fallback requirement. Test direct loading locally; verify production refresh when a host is available.

Done when all three landing cards lead to the correct view, direct routes survive refresh in the configured environment, and browser Back works without stale graph or selection state.

### Step 5 — Distinguish caliphs and open person details

1. Extend `PersonCard.tsx` with readable Rashidun, Umayyad, and Abbasid caliph badges and distinct colors. Ordinary relatives and ancestor context must not receive a caliph badge through membership alone.
2. Preserve prophet emphasis and multiple applicable roles. Adjust layout dimensions and spacing if the longest real names and badges overflow.
3. Make person activation work by tap, click, and keyboard without accidentally triggering on a pan gesture. The current canvas disables node selection/focus; enable an accessible activation path deliberately.
4. Add one details component that renders as a phone bottom sheet or iPad side panel. Show all applicable caliph tenures with AH/CE labels, supported precision, uncertainty, and source references.
5. Support a clear close button, Escape, sensible focus placement/restoration, and appropriate dialog/panel semantics. Define focus trapping according to whether the presentation is modal.

Done when any visible person can be opened accessibly, caliphs are recognizable without color, and all displayed historical details come from approved data.

### Step 6 — Finish touch layout and complete verification

1. Verify phone portrait/landscape and iPad portrait/landscape, including a narrow 320px viewport. Check safe areas, dynamic viewport height, long names, and enlarged text.
2. Keep interactive controls at least 44 × 44 CSS pixels. Ensure headings, home navigation, canvas controls, and details controls do not overlap.
3. Check pinch zoom, pan, tap-to-open, Reset, and Fit all. Verify readable initial focus rather than automatically fitting a large tree to an unreadable scale.
4. Check the real complete dataset for card overlap, clipped badges, responsiveness, and unnecessary relayout. Optimize based on an observed problem.
5. Run all required checks, review the exact task diff, and address findings before committing under the implementation skill's workflow.

Done when the agreed desktop and touch journeys work, all automated checks pass, and any production-routing or physical-device testing limitation is explicitly reported.

## Test seams for approval before implementation tests

The TDD skill requires approval of test seams before writing tests. Accepting this plan for implementation should explicitly include these proposed seams:

1. **Loaded historical dataset / period definitions** — catches duplicate IDs, unresolved references, invalid father relationships/cycles, unsupported period references, missing approved caliphs or reign metadata, and disagreement with the approved roster. Does not prove that historical sources are correct; human review covers that. Put tests under `tests/data/`.
2. **Period selection through graph output** — catches omitted sibling branches, leaked unrelated branches, missing ancestor paths, dangling edges, and focus IDs absent from the selected view. Preserve and extend existing layout checks through `createLineageGraph` as needed. Does not prove visual clarity at every zoom. Put tests under `tests/graph/`.
3. **User navigation and person details** — catches wrong destinations, broken direct routes/Back behavior, stale selection, missing badges/reign details, and keyboard open/close behavior. Choose the smallest suitable integration setup; current Vitest tests do not include browser/DOM tooling. Does not prove physical pinch behavior or iPad ergonomics. Put all test files under top-level `tests/`, mirroring the relevant `src/` directories.

Use one failing behavior test, then the minimum implementation to pass, at a time. Do not bulk-write tests of private helpers or CSS classes. Cover real touch gestures and responsive appearance with manual/device checks and disclose when only emulation was available.

For implementation, run typechecking/build and relevant tests during work. Before finishing, run `npm run build`, `npm run lint`, `npm run check:test-location`, and `npm test`. Review documentation for content, formatting, and working relative links.

## Running this plan

Start with:

```text
$implement docs/plans/islamic-history-period-trees.md — Step 1 only.
```

After approving the historical proposal and the test seams, continue with:

```text
$implement docs/plans/islamic-history-period-trees.md — Step 2 only; use the approved historical proposal and the three test seams in this plan.
```

Repeat for Steps 3–6, one step per invocation. Before each implementation step, capture the starting commit, working-tree status, and relevant initial contents/diffs. Keep pre-existing changes outside the task. Follow the implementation skill's review and commit workflow; do not push or deploy unless requested. If a later correction changes the agreed scope, update this plan and the affected tests before continuing.

## Outside this version

Succession edges or a separate succession chart; Córdoba Umayyads; Cairo Abbasids; additional periods or landing cards; exhaustive research into non-caliph relatives; search; user accounts; visual imitation of the reference picture; hosting-provider selection and deployment.
