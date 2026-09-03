---
name: User Story
about: A vertical slice of user-facing value, the real requirements unit
title: '[STORY] As a <role>, I want <goal> so that <benefit>'
labels: user-story
---

<!-- Before opening this issue:
     Short sentences, plain words, facts and numbers. No filler.
     Labels: one type (set by this template) and one priority, P0-critical
     to P3-low. Assign the issue. The sprint is the milestone: sprint-N
     labels are retired, do not add one.
     Project board: set Status, Priority, Size, Estimate, Start date and
     Target date. Size and Estimate come from the points or hours below. -->

## User Story
**As a** <role>
**I want** <goal>
**So that** <benefit>

<!-- INVEST before this enters the backlog: Independent, Negotiable,
     Valuable, Estimable, Small, Testable. If it fails Small or Estimable,
     split it rather than forcing a sixth criterion. -->

## No parent
<!-- Delete this whole section when the Story has an Epic. The native
     sub-issue link is the parent record; a markdown copy is a second thing
     to keep in sync.

     Keep it only for a deliberate "no parent" decision, replacing this
     comment with the one-line reason.

     Set the parent from the Epic: Sub-issues, Add existing issue. -->

## Acceptance Criteria (Given/When/Then)
<!-- At most 5, each independently checkable.

     Every criterion names the test or command that proves it, in brackets
     at the end:

       - [ ] Given a ModelSpec with one field, when the entity template
             runs, then the output compiles (`entity.template.test.ts`)

     A date is not a proof. Prefer a test CI already runs. A repeatable
     command is acceptable when a test genuinely cannot cover it. If
     nothing can prove it, say so: (manual: exact steps) or (no test:
     reason). One manual criterion per issue at most.

     Do not close with a box unchecked. Check each one against the code,
     not against what this issue used to say. -->
- [ ] Given <context>, when <action>, then <outcome> (`<test or command>`)
- [ ] Given <context>, when <action>, then <outcome> (`<test or command>`)

## Definition of Ready
- [ ] Meets [Definition of Ready](https://github.com/liviuionesi/genesis/blob/develop/docs/process/DEFINITION_OF_READY.md)

## Story Points
**Estimate:** <Fibonacci: 1 / 2 / 3 / 5 / 8 / 13 / 21>
<!-- The sprint is the GitHub Milestone. There is no Sprint section here. -->

## Closing this Story
<!-- Technical Tasks are the native sub-issue links and nothing else, for
     the same reason as the Epic template. Do not close this Story while a
     child Task is open. -->

## Definition of Done
- [ ] Meets [Definition of Done](https://github.com/liviuionesi/genesis/blob/develop/docs/process/DEFINITION_OF_DONE.md)

## Notes
<!-- Decisions, rescopes, follow-up issue numbers. Delete this section if
     there are none. Not a running log. -->
