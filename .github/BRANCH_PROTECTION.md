# Branch Protection Configuration

## Current status

Not yet applied. The repo is public (branch protection is available on
GitHub Free for public repos), but per `AGENTS.md`'s scope-discipline rule
— "don't edit branch protection... without the issue being specifically
about that" — this documents the intended policy without an agent
flipping repo settings as a side effect of an unrelated change. Apply it
deliberately, as its own Task, when the backlog calls for it.

## Recommended rules for `main`

1. **Require a pull request before merging**
   - ✅ Require approvals: 1 (repo owner can review their own solo work;
     the check exists for once this has other contributors)
   - ✅ Dismiss stale approvals on new commits

2. **Require status checks to pass**
   - ✅ Require branches to be up to date before merging
   - Required check: `build-and-test` (CI, `.github/workflows/ci.yml`) —
     add `golden-project-build` once Epic 7 turns it on

3. **Require conversation resolution before merging** — ✅ enabled

4. **Do not allow force pushes or deletions** on `main`

`develop` stays unprotected — that's where task work happens, per
`AGENTS.md`'s "Merging to main" section.

## To apply

```bash
gh api repos/liviuionesi/genesis/branches/main/protection \
  --method PUT \
  -f required_status_checks='{"strict":true,"contexts":["build-and-test"]}' \
  -f enforce_admins=false \
  -f required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  -f restrictions=null
```
