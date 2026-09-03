# Non-Functional Requirements (standing checklist)

Applied where relevant, not restated per issue — a Story/Task only needs to
justify skipping one of these, not repeat all of them every time.

- **Security**: no secrets/tokens in code, commits, or logs; anything the
  extension writes to disk (generated code, AWS credentials handling) never
  embeds a live credential — Secrets Manager references only, never values.
- **Correctness of generated code**: no template ships without a
  golden-project build proving the code it produces actually compiles and
  its own generated tests pass (see `DEFINITION_OF_DONE.md`).
- **Cost**: anything Spring Genesis generates that touches a cloud account
  defaults to the $0-budget framing (ADR-001) unless the issue explicitly
  says otherwise — ephemeral infrastructure, cost-shaped defaults, a
  billing alarm before anything else. Spring Genesis ships to strangers whose
  budgets we know nothing about; this one is non-negotiable, not a
  suggestion.
- **Compatibility**: targets the current VS Code stable API
  (`engines.vscode` in `package.json`) — no reliance on proposed/unstable
  APIs without an explicit ADR justifying it.
- **Documentation**: TSDoc per `AGENTS.md`'s standard; a new architectural
  decision gets its own ADR, not a comment.
