---
name: Task
about: A technical subtask under a Story, or standalone technical work
title: '[TASK] '
labels: task
---

<!-- Before opening this issue:
     Short sentences, plain words, facts and numbers. No filler.
     Labels: one type (set by this template) and one priority, P0-critical
     to P3-low. Assign the issue. The sprint is the milestone: sprint-N
     labels are retired, do not add one.
     Project board: set Status, Priority, Size, Estimate, Start date and
     Target date. Size and Estimate come from the points or hours below. -->

## Task
<!-- What needs doing, and why, in a few sentences or bullets. -->

## No parent
<!-- Delete this whole section when the Task has a Story. The native
     sub-issue link is the parent record; a markdown copy is a second thing
     to keep in sync.

     Keep it only for a deliberate "no parent" decision, replacing this
     comment with the one-line reason.

     Set the parent from the Story: Sub-issues, Add existing issue. -->

## Scope
<!-- Only when it is not obvious what is excluded. Name the sibling issue
     that owns anything deliberately left out. Delete otherwise. -->

## Acceptance Criteria
<!-- At most 5, each independently checkable, each naming the test or
     command that proves it. A date is not a proof.

       - [ ] `npm run compile` succeeds with the new command registered
             (`extension.activation.test.ts`)

     Prefer a test CI already runs. If nothing can prove it, say so:
     (manual: exact steps) or (no test: reason). One manual criterion per
     issue at most. Do not close with a box unchecked. -->
- [ ] <criterion> (`<test or command>`)
- [ ] <criterion> (`<test or command>`)

## Estimate
**Hours:** <hours, not points. Points size a Story; hours size the work of
implementing one Task inside a sprint.>

## Notes
<!-- Decisions, rescopes, follow-up issue numbers. Delete this section if
     there are none. Not a running log. -->
