# Genesis — Work Contract

This file governs work on this repo, whichever agent is driving. A
human-driven session can ignore this file, but should still respect the
conventions below.

**One contract, several tools.** `AGENTS.md` is the only real copy.
`CLAUDE.md` is a symlink to it, so every AI coding agent used on this repo
reads byte-identical rules. Edit `AGENTS.md`; never replace the symlink
with a copy.

This process — the backlog shape, the templates, the Scrum discipline — was
cloned from [lmdb.dev](https://github.com/liviuionesi/lmdb.dev), retargeted
from a Java microservices platform to a TypeScript VS Code extension. Where
this file says something differently than lmdb.dev's, it's a deliberate
adaptation to this project's stack, not a drift.

## Backlog structure (Scrum — see `docs/process/METHODOLOGY.md` for why)

- Hierarchy: **Epic → Story → Task**. A Story is the real requirements unit
  (`As a <role>, I want <goal>, so that <benefit>`, Given/When/Then
  acceptance criteria, Story Points, a Sprint milestone). A Task is a
  technical subtask under a Story, hour-estimated. Bugs are their own
  type, outside this hierarchy.
- **Hierarchy lives in GitHub's native sub-issue links, and nowhere else.**
  Set it from the parent: the Sub-issues panel, or the `addSubIssue`
  GraphQL mutation (`gh issue edit` cannot create it). Issue bodies carry
  no parent/child lists — those are markdown copies of facts GitHub
  already holds, and they drift. An issue without a parent (by deliberate
  decision, not oversight) keeps a `## No parent` section with the
  one-line reason.
- **Do not restate in the body what a GitHub field already holds.**

  | Fact | Where it lives |
  |---|---|
  | Parent and children | native sub-issue links |
  | Sprint | Milestone |
  | Type: epic / user-story / task / bug | label |
  | Priority: P0-critical … P3-low | label |
  | Workflow state | Project board `Status` field |
  | Story Points, Hours | the issue body |

  Every issue carries **exactly one** type label and **exactly one**
  priority label, and is assigned to the repo owner. No `sprint-N` labels:
  sprints are milestones. Component labels (`extension`, `codegen`,
  `docs`, `infra`, …) are optional and unlimited.

  When priority isn't obvious: a Bug takes its body's "Priority (business
  urgency)" line, anything else inherits its parent's, and what has
  neither takes `P2-medium`.
- Templates: `.github/ISSUE_TEMPLATE/{epic,user-story,task,bug}.md`. Use
  them for shape, not GitHub's web form.
- Standing definitions, referenced not restated per issue:
  `docs/process/DEFINITION_OF_READY.md`, `docs/process/
  DEFINITION_OF_DONE.md`, `docs/process/NON_FUNCTIONAL_REQUIREMENTS.md`,
  `docs/process/PRODUCT_GOAL.md`.
- Sprints are real GitHub Milestones (roughly one week each). A Story
  isn't picked up unless it's in the current open Sprint milestone (or
  pull it in first, if it's high-priority Product Backlog work).

## Source of truth for remaining work

- GitHub Issues on `liviuionesi/genesis` are the backlog.
- Architecture reference: `docs/architecture/ARCHITECTURE.md` plus
  `docs/architecture/adr/` (one file per decision — add a new ADR for any
  new architectural decision, don't bury it in an issue comment).
- The five Claude Code skills at `~/.claude/skills/spring41-*` (personal,
  outside this repo) are the **canonical spec** for every Java template
  this extension generates — port them, don't re-derive Spring/Java best
  practice from scratch. `lmdb.dev`'s `actor-service`/`movie-service` are
  the ground truth behind those skills, if a template decision needs
  re-checking against real code.

## Picking the next task

1. Run `gh issue list --repo liviuionesi/genesis --state open`.
2. Run `git log --oneline` on `develop` and check which issue numbers are
   already referenced in recent commit subjects. If the most recent commit
   is prefixed `WIP:`, finish that issue before starting a new one.
3. If an issue has 2 or more `WIP:` commits already in its history without
   closing, don't auto-retry it again — leave it alone and post a comment
   flagging it as stuck instead.
4. Otherwise pick the highest-priority open issue (`P0-critical` >
   `P1-high` > ...) in the current Sprint milestone, not yet referenced in
   the history.
5. If it's an Epic, work its next unfinished child Story instead of the
   epic itself. If it's a Story with un-broken-down Technical Tasks, break
   it into Task issues first (or work it directly if it's small enough not
   to need that).

## The work loop, per issue

1. Implement the code and its tests together.
2. Run the tests for anything touched (`npm test`) — fix immediately if
   red, don't proceed on red tests.
3. Run linting (ESLint + Prettier), coverage, and `npm audit`. Fix anything
   these flag before moving on.
4. If the change touches a codegen template: run the golden-project build
   gate (generate into `examples/`, `./gradlew test` against the output) —
   see `docs/process/DEFINITION_OF_DONE.md`.
5. Code review: a second, independent pass — a subagent, or a separate
   agent run. For large diffs, or anything touching the codegen engine or
   the AWS deploy templates, run a second independent review pass too.
6. Test review — would the tests actually catch it if the implementation
   were subtly wrong? A second pass checks this specifically.
7. If anything in steps 2–6 is wrong, fix it and re-run the relevant
   step(s) — up to 3 rounds in this session. If still not resolved, stop,
   commit what's genuinely working as `WIP:` with a precise note of what's
   blocking.
8. Resync the issue to match real implementation state and close it if
   genuinely done — see "Issue hygiene" below.
9. Commit (see "Commit conventions") and push to `develop`.
10. Move to the next issue. Repeat until the Sprint's issues are done.

## Merging to `main` — Story Closure & Sprint Review

- `develop` is where all task work happens and gets pushed.
- `main` only ever receives fully-verified work: when a **Story** closes
  (every child Task completed, the Story genuinely meets Definition of
  Done), immediately merge `develop` → `main`.
- At the end of a Sprint, perform the Sprint Review + Sprint Retrospective
  events (`docs/process/SCRUM_EVENTS.md`) — mandatory, not optional
  polish.
- Never merge un-verified Stories into `main`.

## Issue hygiene (mandatory)

- After finishing implementation work on an issue, before moving on:
  re-read the issue, verify every acceptance-criteria box against real
  evidence, and rewrite the body to match the templates.
- **Cascading closure check & story focus (mandatory):** when closing a
  **Task**, check if its parent **Story** has other open child Tasks — if
  so, work those next. If all Tasks under a Story are done and verified,
  close the Story and check it off in its parent Epic. After closing a
  Story, check if its parent Epic has any open Stories remaining; if none,
  close the Epic.
- Never close an issue with an unchecked acceptance-criteria box. Never
  verify "done" through a shortcut that skips the layer the issue is
  about. If a later decision superseded the work, rescope the criterion in
  one line and name the ADR or issue that replaced it.
- **Keep `## Notes` short.** Decisions, rescopes, known gaps, follow-up
  issue numbers — not a running log of build/test output.

## Code documentation standard (mandatory)

- Every exported class/interface/function gets a TSDoc block: what it is,
  its role, params, return, thrown errors.
- Inline comments explain WHY and non-obvious steps, not the self-evident.
- Test files are not exempt: describe the scenario under test and why the
  asserted behavior is correct, not a restatement of the `it()`/`describe()`
  title.
- Generated Java (the extension's output) follows the documentation
  standard already encoded in the `spring41-*` skills — Javadoc on every
  class and method, numbered inline comments for multi-step logic.

## Commit conventions

- Commit subject references the issue: `feat: add wizard entry point (#3)`.
- A commit-msg hook (`.githooks/commit-msg`, wired via `git config
  core.hooksPath .githooks`) rejects any commit whose subject doesn't
  reference a real issue number.
- Keep the subject short (~72 characters) and the body short — one line of
  extra context at most.
- End commit messages with:
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`
- Never commit secrets or credentials, even ones covered by `.gitignore`.
- If you must stop mid-issue, leave `develop` buildable and fully
  committed — no uncommitted work, no broken build. Prefix the commit
  subject with `WIP:` and note exactly what's left.

## Observability

- Post a short comment on the issue after each work session touching it —
  what was done, what was verified, what's left. This is also this
  project's Daily Scrum (`docs/process/SCRUM_EVENTS.md`).

## Scope discipline

- One issue (or one clearly-bounded chunk of a large issue) per run. Don't
  jump between unrelated issues in the same run.
- Don't touch issues you didn't pick.
- Don't edit CI/CD workflows, branch protection, or repo settings without
  the issue being specifically about that.
- Don't add dependencies or upgrade framework/API versions unless the
  issue specifically calls for it.
