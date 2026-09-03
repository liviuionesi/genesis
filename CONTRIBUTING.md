# Contributing to Spring Genesis

Thanks for considering it. This project is young — the process below is
the same discipline [lmdb.dev](https://github.com/liviuionesi/lmdb.dev)
runs on, so if you've contributed there, this will look familiar.

## Before you start

1. Read `AGENTS.md` — it's the full work contract, not boilerplate.
2. Check `gh issue list --repo liviuionesi/genesis --state open` for
   what's actually in flight, and the current Sprint milestone for what's
   in scope right now.
3. An Epic isn't picked up directly — work its next open Story instead. A
   Story with un-broken-down Tasks gets broken into Tasks first.

## Setup

```bash
git clone https://github.com/liviuionesi/genesis.git
cd genesis
npm install
git config core.hooksPath .githooks   # enforces the commit-message convention below
```

`npm run compile` builds the extension; `npm test` runs the test suite;
`F5` in VS Code launches an Extension Development Host with it loaded.

## Commit conventions

- Subject references a real issue number: `feat: add wizard entry point (#3)`.
- A commit-msg hook rejects a subject without one — install it with the
  `git config` line above.
- Keep the subject under ~72 characters and the body to one line of extra
  context at most; longer explanation belongs in the issue.

## Pull requests

- Branch from `develop`, not `main` — `main` only receives fully-verified,
  Story-complete work.
- Tests travel with the code, not after it.
- Fill in the PR description; link the issue it closes.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
