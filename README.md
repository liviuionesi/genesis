# Genesis — Spring Service Generator

[![CI](https://github.com/liviuionesi/genesis/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/liviuionesi/genesis/actions/workflows/ci.yml)
[![Java 25](https://img.shields.io/badge/Java-25-orange.svg)](https://openjdk.org/projects/jdk/25/)
[![Spring Boot 4.1.1](https://img.shields.io/badge/Spring%20Boot-4.1.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6.svg)](https://www.typescriptlang.org/)
[![VS Code Engine](https://img.shields.io/badge/VS%20Code-%5E1.90-007ACC.svg)](https://code.visualstudio.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status: Early Development](https://img.shields.io/badge/Status-Early%20Development-lightgrey.svg)](https://github.com/liviuionesi/genesis/milestones)

**Genesis** generates a complete Spring Boot 4.1.1 / Java 25 service —
entity through REST layer through tests — from a model, straight from VS
Code. Define the model in a webview form, point Genesis at Java classes
you already have, or hand it a YAML file; it writes back a full vertical
slice matching real production conventions (`ApiResponse<T>` envelopes,
MapStruct mappers, `@Cacheable(sync = true)` read-through caching,
functional-style validation) instead of a bare-tutorial shape. Built by
**[Liviu Ionesi](https://liviuionesi.com)**
([LinkedIn](https://www.linkedin.com/in/liviuionesi/)), sibling project to
[lmdb.dev](https://github.com/liviuionesi/lmdb.dev) — the microservices
platform whose real, running services are the templates' ground truth.

📦 **Repo:** [github.com/liviuionesi/genesis](https://github.com/liviuionesi/genesis)
👤 **Portfolio:** [liviuionesi.com](https://liviuionesi.com) · [LinkedIn](https://www.linkedin.com/in/liviuionesi/)
🔗 **Sibling project:** [lmdb.dev](https://github.com/liviuionesi/lmdb.dev)

> **Status: early development.** Epic 1 (this repo's own scaffolding) is
> done and CI-verified. Epics 2 onward — the codegen engine itself — are
> open, seeded issues, not yet built. Everything below marked *(planned)*
> describes the backlog's destination, not today's behavior. See
> [§1 Executive Overview](#1-executive-overview) for exactly what that
> split means, and [§11 Roadmap](#11-roadmap--documentation-index) for
> what's tracked where.

---

## Table of Contents

1. [Executive Overview](#1-executive-overview)
2. [Feature Catalog](#2-feature-catalog)
3. [SDLC: How This Is Being Built](#3-sdlc-how-this-is-being-built)
4. [Architecture & Data Flow](#4-architecture--data-flow)
5. [Codebase Layout](#5-codebase-layout)
6. [Testing Strategy](#6-testing-strategy)
7. [Deployment](#7-deployment)
8. [CI/CD](#8-cicd)
9. [Local Quick Start](#9-local-quick-start)
10. [Contributing](#10-contributing)
11. [Roadmap & Documentation Index](#11-roadmap--documentation-index)

---

## 1. Executive Overview

Spring Initializr gets you a new, empty project. Genesis is for the step
after that: you already have a service (or a monorepo full of them), and
you need *one more* model turned into a fully-tested REST resource. Every
template it writes is a direct port of patterns pulled from real, running
Spring Boot 4.1 services (`lmdb.dev`'s `actor-service`/`movie-service`),
not an invented "best practice" sketch — see
[§3](#3-sdlc-how-this-is-being-built) for exactly how that provenance
chain works.

**What exists today (Epic 1, closed, CI-verified):** the repo itself —
process, backlog, a buildable extension skeleton that activates and
registers one placeholder command.

**What's next (Epic 2, open):** the actual codegen engine — the first
target is one working JPA entity template, end to end, proven by a
generated project that really compiles.

---

## 2. Feature Catalog

| Feature Area | Epic | Status | Details |
|---|---|---|---|
| **Model Input** | [Epic 4](https://github.com/liviuionesi/genesis/issues/4) | Planned | Webview form, existing Java class/package parsing, or a `genesis.model.yaml` file — all normalize to one `ModelSpec`. |
| **Codegen Engine** | [Epic 2](https://github.com/liviuionesi/genesis/issues/2) | In progress | Entity, DTO, repository, MapStruct mapper, service, controller, `GlobalExceptionHandler` — Handlebars templates ported from `spring41-*`. |
| **Extension Shell** | [Epic 3](https://github.com/liviuionesi/genesis/issues/3) | Planned | `genesis.newService` command, multi-step QuickPick wizard, settings. |
| **Test Generation** | [Epic 5](https://github.com/liviuionesi/genesis/issues/5) | Planned | Mockito unit tests, `@DataJpaTest`/`@DataMongoTest` + Testcontainers, `@WebMvcTest`, generated in the same pass as the production code. |
| **AWS Config** | [Epic 6](https://github.com/liviuionesi/genesis/issues/6) | Planned | Secrets-Manager-backed config properties, one toggle for v1. |
| **Build Verification** | [Epic 7](https://github.com/liviuionesi/genesis/issues/7) | Planned | A golden-project CI job — generated code must actually compile and its own tests must pass. |
| **Marketplace Publish** | [Epic 8](https://github.com/liviuionesi/genesis/issues/8) | Planned | `@vscode/vsce` + Open VSX Registry publish. |
| **Docs & Launch** | [Epic 9](https://github.com/liviuionesi/genesis/issues/9) | Planned | README as the real Marketplace listing, `docs/guides/`, community launch. |
| **AWS Deploy** | [Epic 10](https://github.com/liviuionesi/genesis/issues/10) | Planned | Dockerfile + Terraform + manually-dispatched deploy workflow, $0-budget by default ([ADR-001](docs/architecture/adr/001-zero-budget-aws-deploy.md)). |

---

## 3. SDLC: How This Is Being Built

Genesis runs the same Scrum discipline as `lmdb.dev`: a formal Product
Goal, User Stories with Given/When/Then acceptance criteria, Definition of
Ready/Done gates, and a numbered ADR for every real architectural
decision. See [`docs/process/`](docs/process/) for the standing
definitions and [`docs/architecture/adr/`](docs/architecture/adr/) for
ADRs — full index at [§11](#11-roadmap--documentation-index).

The provenance chain that keeps the generated Java honest:
`lmdb.dev`'s real services (`actor-service`, `movie-service`) → five
personal Claude Code skills (`~/.claude/skills/spring41-*`, outside this
repo) that document the pattern → this repo's `templates/`, a direct
TypeScript-templated port of them. Nothing here is invented Spring
"best practice" — it's a port of what's actually running.

---

## 4. Architecture & Data Flow

```
[VS Code command: genesis.newService]
              │
              ▼
      Two-tier wizard (Epic 3)
  ┌───────────┴────────────┐
  │                         │
Service-level          Model input (Epic 4)
QuickPick/InputBox      ┌────────┼─────────┐
(name, package,         │        │         │
persistence, toggles) Webview  Java     YAML file
                       form    source   (genesis.model.yaml)
  │                     └────────┼─────────┘
  │                              ▼
  │                         ModelSpec
  │                              │
  └──────────────┬───────────────┘
                 ▼
        Codegen engine (Epic 2)
   Handlebars templates, ported from
   spring41-{package-structure,jpa-entity,
   jpa-repository,service,rest-api}
                 │
                 ▼
          Output writer
   entity · dto · repository · mapper ·
   service · controller · tests · build.gradle
                 │
                 ▼
     Golden-project CI gate (Epic 7)
   ./gradlew test on the generated output —
   the proof it actually compiles and passes
```

Full picture, as it's actually built: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md).

---

## 5. Codebase Layout

`lmdb.dev` is a microservices monorepo, so its top-level split is
`backend/` (nine services) / `frontend/` / `infrastructure/`. Genesis is
one product, not a fleet of services, so that split doesn't transfer
literally — here's the honest mapping instead:

| lmdb.dev concept | Genesis equivalent |
|---|---|
| `backend/<service>/src/main` | [`src/`](src/) — the extension itself |
| `backend/<service>/src/test` | [`src/test/`](src/test/) |
| (no direct equivalent — lmdb.dev *writes* services) | [`templates/`](templates/) — what Genesis generates *other* services from |
| `infrastructure/terraform`, `infrastructure/kubernetes` | *(planned, Epic 10)* — Terraform templates Genesis generates for the AWS deploy toggle, not infrastructure for Genesis itself |
| `docs/` | [`docs/`](docs/) — same subfolder shape: `architecture/adr/`, `process/`, `guides/`, `reports/`, `security/` |
| `.github/` | [`.github/`](.github/) — same shape: issue templates, PR template, `dependabot.yml`, `BRANCH_PROTECTION.md`, `workflows/` |
| `examples/` (no lmdb.dev equivalent) | [`examples/`](examples/) — the checked-in "golden project" CI builds to prove templates compile |

---

## 6. Testing Strategy

- **Extension tests**: `@vscode/test-electron` driving a real Extension
  Development Host, run under Xvfb in CI (`src/test/`).
- **Template tests** *(planned, Epic 2/5)*: given a fixed `ModelSpec`,
  snapshot-assert each generated file.
- **Golden-project build** *(planned, Epic 7)*: the load-bearing one — a
  service generated into `examples/` must actually compile and its own
  generated tests must pass. Template unit tests alone don't prove that;
  this gate does. See `docs/process/DEFINITION_OF_DONE.md`.

## 7. Deployment

*(Planned, Epic 10 — nothing to deploy yet.)* The generated AWS deploy
path defaults to the zero-budget shape in
[ADR-001](docs/architecture/adr/001-zero-budget-aws-deploy.md): single-node
k3s on EC2, `ghcr.io`, NodePort, a billing alarm as the first Terraform
resource, everything ephemeral and manually dispatched — never
deploy-on-merge. Genesis (the extension) itself needs nothing deployed;
this is about what it generates for the services *it* creates.

## 8. CI/CD

`.github/workflows/ci.yml`: lint, compile, the real extension test suite
under Xvfb, `npm audit`. A `golden-project-build` job exists, disabled
until Epic 7 lands something in `examples/` to build.
`.github/workflows/publish-marketplace.yml`: manually dispatched, disabled
until Epic 8 has publisher secrets and something worth publishing.

## 9. Local Quick Start

```bash
git clone https://github.com/liviuionesi/genesis.git
cd genesis
npm install
git config core.hooksPath .githooks
npm run compile
```

Press `F5` in VS Code to launch an Extension Development Host with Genesis
loaded. Today that gets you exactly one command
(`Genesis: New Spring Service`) that tells you it's still being built —
see [§1](#1-executive-overview).

## 10. Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`AGENTS.md`](AGENTS.md) (the
full work contract). `gh issue list --repo liviuionesi/genesis --state
open` is the live backlog.

## 11. Roadmap & Documentation Index

Ten Epics to v1 — full descriptions on the issues themselves:
[#1](https://github.com/liviuionesi/genesis/issues/1) Repo & Process Scaffolding (closed) ·
[#2](https://github.com/liviuionesi/genesis/issues/2) Codegen Engine Core ·
[#3](https://github.com/liviuionesi/genesis/issues/3) Extension Shell ·
[#4](https://github.com/liviuionesi/genesis/issues/4) Model Input Sources ·
[#5](https://github.com/liviuionesi/genesis/issues/5) Test Generation ·
[#6](https://github.com/liviuionesi/genesis/issues/6) Optional Add-ons ·
[#7](https://github.com/liviuionesi/genesis/issues/7) Build Verification ·
[#8](https://github.com/liviuionesi/genesis/issues/8) Packaging & Marketplace Publish ·
[#9](https://github.com/liviuionesi/genesis/issues/9) Documentation & Launch ·
[#10](https://github.com/liviuionesi/genesis/issues/10) Deploy to AWS.

Documentation:
- [`AGENTS.md`](AGENTS.md) — the work contract (`CLAUDE.md` symlinks to it)
- [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) — how it's actually built, updated as it grows
- [`docs/architecture/adr/`](docs/architecture/adr/) — one file per real decision
- [`docs/process/`](docs/process/) — Methodology, Definition of Ready/Done, NFRs, Product Goal, Scrum Events
- [`docs/guides/`](docs/guides/) — user-facing guide *(placeholder until Epic 9)*
- [`docs/security/SECURITY.md`](docs/security/SECURITY.md) — vulnerability reporting
- [`docs/reports/PROJECT_METRICS.md`](docs/reports/PROJECT_METRICS.md) — *(placeholder until there's something to measure)*

## License

MIT — see [`LICENSE`](LICENSE).
