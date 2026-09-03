# Pull Request

## Description
<!-- Brief description of changes -->

## Related Issue
Closes #<!-- issue number -->

## Type of Change
<!-- Mark with 'x' -->
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🔧 Configuration change
- [ ] ♻️ Refactoring (no functional changes)
- [ ] ✅ Test improvement

## Area(s) Affected
- [ ] Extension Shell (activation, commands, wizard UI)
- [ ] Model Input (webview form / Java source parser / YAML)
- [ ] Codegen Engine (templates, output writer)
- [ ] Generated Tests (unit / Testcontainers / WebMvc templates)
- [ ] AWS Add-ons (Secrets Manager config / deploy)
- [ ] CI/CD
- [ ] Documentation

## Changes Made
<!-- Detailed list of changes -->
- Change 1
- Change 2
- Change 3

## Testing Performed
- [ ] Unit tests added/updated (`npm test`)
- [ ] Golden-project build checked, if a codegen template changed (see `docs/process/DEFINITION_OF_DONE.md`)
- [ ] Manual testing completed (`F5` Extension Development Host)
- [ ] All tests passing locally

## Code Quality Checklist
- [ ] Code follows the project style guide (ESLint + Prettier clean)
- [ ] Self-review of code completed
- [ ] TSDoc added per `AGENTS.md`'s documentation standard
- [ ] No stray `console.log()` left in code
- [ ] No hardcoded values (use `vscode.workspace.getConfiguration` / settings)
- [ ] Error handling implemented properly

## Documentation Checklist
- [ ] README updated (if needed)
- [ ] `docs/architecture/ARCHITECTURE.md` updated (if this changed a decision)
- [ ] New architectural decision gets its own ADR under `docs/architecture/adr/`
- [ ] `docs/guides/` updated (if user-facing behavior changed)

## Security Checklist
- [ ] No sensitive data exposed (tokens, credentials) in code or generated output
- [ ] `npm audit` clean for any new/changed dependency
- [ ] If this touches AWS deploy templates: still defaults to the $0-budget shape ([ADR-001](../docs/architecture/adr/001-zero-budget-aws-deploy.md))

## Checklist Before Merge
- [ ] CI passing
- [ ] All review comments addressed
- [ ] Branch is up to date with `develop`
- [ ] No merge conflicts
- [ ] Issue resynced to match real implementation state (`docs/process/DEFINITION_OF_DONE.md`)

## Additional Notes
<!-- Any other information reviewers should know -->
