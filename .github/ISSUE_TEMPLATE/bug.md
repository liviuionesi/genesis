---
name: Bug
about: Something is broken, with a known or suspected reproduction
title: '[BUG] '
labels: bug
---

<!-- Before opening this issue:
     Short sentences, plain words, facts and numbers. No filler.
     Labels: one type (set by this template) and one priority, P0-critical
     to P3-low. Assign the issue. The sprint is the milestone: sprint-N
     labels are retired, do not add one.
     Project board: set Status, Priority, Size, Estimate, Start date and
     Target date. Size and Estimate come from the points or hours below. -->

## Bug
<!-- What is broken and how to see it: reproduction steps, a command, or a
     log excerpt. Say whether it is confirmed live or only suspected. -->

## Root Cause
<!-- Fill in once known. Delete this section while still investigating. -->

## Severity vs. Priority
<!-- Two axes, set independently. A low-severity bug can be P0 when it
     blocks a release. A Blocker-severity bug in dead code can be P3.

     The priority written here and the P0-critical to P3-low label on the
     issue must agree. -->
**Severity (technical impact):** Blocker / Critical / Major / Minor
**Priority (business urgency):** P0 / P1 / P2 / P3

## Acceptance Criteria
<!-- At most 5, each independently checkable, each naming the test or
     command that proves it. A date is not a proof.

     Two more rules for a Bug specifically:
     "Fixed and verified live" means you drove the broken path and watched
     it work, not that the diff looks right. If the bug is in generated
     code, verify against the golden-project build, not a template unit
     test alone.
     The regression test is the criterion most often ticked without the
     test existing. Name it, and break the fix once to watch it fail. -->
- [ ] Fixed, and the fixed path verified through the layer the bug was in
      (`<test or command>`)
- [ ] Regression test added, seen failing before it passed (`<test name>`)

## Notes
<!-- Decisions, rescopes, follow-up issue numbers. Delete if there are
     none. Not a running log.

     Bugs sit outside the Epic to Story to Task hierarchy, so there is no
     parent section here by design. -->
