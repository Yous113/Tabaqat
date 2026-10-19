## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues on Yous113/Tabaqat via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The default five-role vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Historical content

Every historical fact in `src/data/` (names, aliases, dates, relationships, biographies) is one the user wrote or approved. Data edits stay within what was asked: restructuring or reformatting existing entries is fine. When a fact seems to belong, suggest it in your reply and let the user decide whether to add it.

## Learning and development

- Build one working feature at a time in small, reviewable steps.
- When introducing an unfamiliar concept, explain what it does, why this project needs it, and where it appears in the code. Keep explanations concise and tied to the current task.

## Verification

Before finishing implementation work, run `npm run build`, `npm run lint`, and any existing tests relevant to the change. If a check fails or cannot run, report the result and any remaining limitation. Documentation-only edits need a content and formatting check.
