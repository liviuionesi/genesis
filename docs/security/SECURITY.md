# Security Policy

## Reporting a vulnerability

Open a [GitHub issue](https://github.com/liviuionesi/genesis/issues) using
the Bug template, or email the details privately if it's sensitive enough
not to disclose publicly first. There's no bug bounty — this is a solo
open-source project — but real reports get a real, fast response.

## What "secure" means for a code generator

Two different concerns, both real:

1. **Genesis's own code** — no secrets/tokens in the repo, dependencies
   kept `npm audit`-clean (enforced in CI), no reliance on unstable/
   proposed VS Code APIs.
2. **The code Genesis generates** — never embeds a live AWS credential;
   the Secrets Manager toggle (Epic 6) generates *references*, not values.
   Anything Epic 10 generates for AWS deployment defaults to the
   cost-shaped, ephemeral shape in
   [ADR-001](../architecture/adr/001-zero-budget-aws-deploy.md) — not a
   security control by itself, but the same "don't surprise the user"
   principle applied to their cloud bill instead of their credentials.

See `docs/process/NON_FUNCTIONAL_REQUIREMENTS.md` for the standing
security checklist applied to every change.
