# Genesis

**Generate a complete Spring Boot 4.1.1 / Java 25 service from a model —
straight from VS Code.**

Define a model — in a form, from Java classes you already have, or from a
YAML file — and Genesis writes the entity, DTO, repository, MapStruct
mapper, service, REST controller, `GlobalExceptionHandler`, and a full test
suite (unit, `@DataJpaTest`/`@DataMongoTest` + Testcontainers, `@WebMvcTest`)
around it. Optionally, it also generates a Dockerfile, a minimal Terraform
module, and a manually-dispatched deploy workflow to run it on AWS for $0.

> **Status: early scaffolding.** The process and backlog are in place; the
> extension itself doesn't do anything yet. This README will grow into the
> real Marketplace listing as the wizard ships — see the roadmap below.

## Why

Spring Initializr gets you a new, empty project. Genesis is for the step
after that: you already have a service (or a monorepo full of them), and
you need *one more* model turned into a fully-tested REST resource,
matching real production conventions instead of a bare tutorial shape —
`ApiResponse<T>` envelopes, MapStruct mappers, `@Cacheable(sync = true)`
read-through caching, composed functional validation, sealed-outcome
pattern matching where it earns its keep. Every template is a direct port
of patterns pulled from real, running Spring Boot 4.1 services, not an
invented "best practice" sketch.

## Roadmap

Tracked as GitHub Issues, Epic → Story → Task (see `AGENTS.md` for the
full contract). Ten Epics get this to v1:

1. Repo & Process Scaffolding — **done**, this commit.
2. Codegen Engine Core
3. VS Code Extension Shell
4. Model Input Sources (webview form / existing Java classes / YAML)
5. Test Generation
6. Optional Add-ons (AWS Secrets Manager config)
7. Build Verification (golden-project CI gate)
8. Packaging & Marketplace Publish
9. Documentation & Launch
10. Deploy to AWS (zero-budget by default — [ADR-001](docs/architecture/adr/001-zero-budget-aws-deploy.md))

Full picture: `docs/architecture/ARCHITECTURE.md`.

## Contributing

See `CONTRIBUTING.md`. This project runs on the same Scrum discipline as
its sibling project [lmdb.dev](https://github.com/liviuionesi/lmdb.dev) —
`docs/process/` has the full ceremony breakdown.

## License

MIT — see `LICENSE`.
