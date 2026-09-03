# Genesis — Architecture

**Status:** Early scaffolding (Epic 1 just landed). This document tracks
design as it's actually built, not an aspirational sketch — expect it to
grow with Epic 2 onward.

## What Genesis is

A VS Code extension that generates a complete Spring Boot 4.1.1 / Java 25
service — model through REST layer through tests — from a model
definition, with an optional AWS deployment path. No dependency on Claude
Code or any AI tool at runtime: it must work for anyone with plain VS Code.

## Shape

```
genesis/
├── src/                # extension TypeScript source (activation, commands, wizard)
├── templates/           # Handlebars templates — ported from the spring41-* skills
├── test/                  # extension tests (@vscode/test-electron)
└── examples/                # a checked-in "golden" generated project, built by CI
```

## Two-tier wizard

1. **Service-level** — native multi-step QuickPick/InputBox: service name,
   base package, persistence (JPA/Postgres or MongoDB), option toggles
   (AWS Secrets Manager config, AWS deploy, OpenAPI/springdoc, Javadoc
   enforcement, test scope, functional-style intensity).
2. **Model input** — three sources, one internal shape:
   - a **Webview** field-builder form,
   - **existing Java model source** (one class or a package), parsed rather
     than hand-described,
   - or a **`genesis.model.yaml`** file, with a JSON Schema for editor
     autocomplete.

   All three normalize into one `ModelSpec` before the codegen engine ever
   sees them.

## Codegen engine

A Handlebars template set, direct TypeScript-templated ports of the Java
already written in `~/.claude/skills/spring41-{package-structure,
jpa-entity,jpa-repository,service,rest-api}/` — themselves grounded in
`lmdb.dev`'s `actor-service`/`movie-service`. Entity, DTO, repository,
mapper, service, controller, `GlobalExceptionHandler`, and the matching
test files for each layer, laid out per `spring41-package-structure`'s
layered-plus-vertical-slice convention.

## Output writer

Given a target workspace folder + a `ModelSpec`, writes the generated
package tree and a `build.gradle` (Groovy, matching `lmdb.dev`'s real
build files) with Spring Boot 4's split starters
(`spring-boot-starter-webmvc` + `spring-boot-starter-restclient`, not the
old combined `-web`), the chosen persistence starter, MapStruct, Lombok,
and Testcontainers.

## AWS deploy (Epic 10)

Dockerfile + a minimal Terraform module + a manually-dispatched GitHub
Actions workflow, all defaulting to the $0-budget shape in
[ADR-001](adr/001-zero-budget-aws-deploy.md).

## Verification

- **Template unit tests**: given a fixed `ModelSpec`, snapshot-assert each
  generated file.
- **Golden-project CI** (Epic 7): generate a real sample service into
  `examples/`, run `./gradlew test` against it — the only test that proves
  generated code compiles and its own tests pass.
- **Extension integration tests**: `@vscode/test-electron` driving the
  command + webview flow.
