# ADR-001: $0-Budget Default for Generated AWS Deployments

**Status:** Accepted
**Date:** 2026-09-03
**Deciders:** Project owner

## Context

Epic 10 lets Genesis generate a Dockerfile, a Terraform module, and a
GitHub Actions workflow that deploy the generated service to AWS. Genesis
ships to strangers whose AWS accounts and budgets we know nothing about —
unlike a single internal project, a bad default here doesn't cost one team
a surprise bill, it costs every user of the tool one.

This decision directly reuses
[lmdb.dev's ADR-004](https://github.com/liviuionesi/lmdb.dev/blob/develop/docs/architecture/adr/004-zero-budget-cloud-strategy.md)'s
reasoning and free-tier traps (hourly public-IPv4 billing, EKS's ~$73/month
control plane, ACR/ECR-equivalent charges), retargeted from "one project's
own cloud demo" to "a default every generated project inherits."

## Decision

1. **Cost-shaped choices by default**: single-node k3s on EC2 instead of
   EKS; `ghcr.io` for the built image instead of ECR; NodePort on the
   node's public IP instead of a cloud load balancer.
2. **A billing/budget alarm is the first Terraform resource applied**,
   before the compute it's meant to watch.
3. **Ephemeral, never always-on**: the generated GitHub Actions workflow is
   manually dispatched — `terraform apply` to stand it up for a demo,
   `terraform destroy` as a separate dispatch to tear it down. No
   deploy-on-merge, nothing left running unattended by default.
4. **Named up front, not hidden**: the generated `docs/guide/deploy-aws.md`
   states the cost tradeoffs plainly (what's cost-shaped, what a user would
   need to change to run this for real, sustained traffic).

## Consequences

- Easier: a first-time user can `terraform apply` → see it live → `terraform
  destroy` without billing anxiety; the golden-project CI gate (Epic 7) can
  exercise the same path safely.
- Harder: this is a *default*, not a ceiling — Genesis doesn't stop someone
  from hand-editing the generated Terraform for a real production topology,
  and the generated guide says so.
- Revisit: if a Story needs a genuinely different AWS target (EKS, RDS,
  ALB) for a specific use case, that's a new ADR justifying the departure
  from this default, not a silent edit to the template.
