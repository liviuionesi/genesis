# Definition of Done

A Story or Task is only Done when every gate below is genuinely true —
verified against real evidence, never assumed from old notes. Referenced
from every issue's "Definition of Done" checkbox, not restated per issue.
This is the layered, defense-in-depth quality bar — no single check here
guarantees a bug-free change, but a bug has to slip past all of them at
once, which is the actual industry-standard approach, not a promise of
zero bugs.

- [ ] Code implemented, with tests written alongside it (not after, as an
      afterthought).
- [ ] All tests green (`npm test`).
- [ ] Linting/formatting clean (ESLint + Prettier).
- [ ] Test coverage meets the project threshold for touched code (Istanbul/
      `nyc` or the VS Code test runner's coverage output).
- [ ] Dependency/security scan clean for any new or changed dependency
      (`npm audit`).
- [ ] If this Story/Task touches a codegen template: the **golden-project
      build gate** passes — a service generated from the changed template(s)
      actually compiles and its own generated tests pass (`./gradlew test`
      against `examples/`, run in CI). Template unit tests alone are not
      sufficient proof for template changes.
- [ ] Documentation complete — TSDoc on exported functions/classes per this
      repo's standing documentation standard, architecture docs updated if
      this changed a decision.
- [ ] Code reviewed by an independent AI pass (a second, adversarial pass
      for high-risk changes — the codegen engine, the AWS deploy templates,
      anything touching secrets/credentials).
- [ ] Tests reviewed separately from "do they pass" — would they actually
      catch it if the implementation were subtly wrong?
- [ ] Issue body resynced to match real implementation state and closed
      with evidence, not on a technicality.
- [ ] **Cascading closure & story focus verified**: when closing a Task,
      checked if its parent Story has open Tasks remaining (if so, those
      Tasks must be started next; if none remain, close the Story and mark
      it checked in its parent Epic); when closing a Story, verified
      whether its parent Epic is now ready to close.
- [ ] Committed with a message referencing this issue, pushed to `develop`
      (and for a completed Story, merged `develop` → `main`).

Any Non-Functional Requirement that applies to this change (see
[NON_FUNCTIONAL_REQUIREMENTS.md](NON_FUNCTIONAL_REQUIREMENTS.md)) is also
part of Done — not optional polish.
