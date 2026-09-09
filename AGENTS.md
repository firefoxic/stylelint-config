# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What this repository is

A single shareable stylelint config published as `@firefoxic/stylelint-config`. There is no build step and no source directory: [stylelint.config.js](./stylelint.config.js) is both the source and the published artifact — it is the sole entry in `exports` and the sole entry in `files`. Everything else in the repo exists to test and release that one file.

`stylelint` itself is a peer dependency; the two rule plugins the config turns on (`@stylistic/stylelint-plugin`, `stylelint-gamut`) are real dependencies, because consumers get them transitively by extending this config.

## Commands

Tooling runs through `make`; the Makefile puts `node_modules/.bin` on `PATH` and is the source of truth for dev commands, so read it rather than relying on a list here (`make help` prints the targets). Package manager is pnpm, runtime — node, both auto-downloaded via `devEngines` on failure.

The runner is Vitest, configured in [vitest.config.js](./vitest.config.js): `include` names `test/**/*.test.js`, because the files are named after the rules rather than by Vitest's default pattern, and `isolate: false` keeps the whole suite in one warm process. `make test-watch` reruns on change; a single file or a single name:

```shell
pnpm exec vitest run test/color-no-hex.test.js
pnpm exec vitest run --testNamePattern="hex"
```

`pnpm install` also wires `core.hooksPath` to [.githooks/](./.githooks/), whose `pre-commit` stashes untracked/unstaged work and runs `make verify` on the staged tree.

## How the tests work

Each rule the config enables gets one `<rule-name>.test.js` under [test/](./test/); plugin rules live in a directory named after the plugin (`test/gamut/`, `test/@stylistic/`) and spell the prefix in `rule` (`` let rule = `@stylistic/indentation` ``). A file is a single call to `testRule()` from [utils/testRule.js](./utils/testRule.js):

- one `code` string holding both valid and invalid CSS, commented or class-named to mark which is which;
- `expectedWarnings` as a full snapshot of stylelint's warning objects — `line`/`column`/`endLine`/`endColumn`, `text`, `severity`, and the literal `url: undefined, fix: undefined`. Because the assertion is `toStrictEqual`, every field must be present and exact, and line/column numbers shift whenever the `code` string is edited.

The helper builds the config for the run out of the shipped one — its `languageOptions`, its `plugins`, and the options it gives that one rule — so a test asserts against the configuration users get rather than a locally restated one. It throws if `rule` is not a key of `config.rules`, and checks `parseErrors` and `invalidOptionWarnings` before the warnings, so a mistyped rule name or an option stylelint rejects says so instead of showing up as a puzzling diff.

[test/config.test.js](./test/config.test.js) tests the config as a whole, which the one-rule harness cannot see: the canonical stylesheet lints clean under all of it (this is what catches a rule upstream renamed, deprecated or given a stricter option schema — and rules that contradict each other), the same stylesheet is a `--fix` fixed point, and a file snapshot records the shipped rule set so nothing changes it silently. One test there is marked `it.fails`: on a messy stylesheet `--fix` needs a second pass, which is a bug in `@stylistic/stylelint-plugin`, fixed in its upcoming 6.0.0 — when that lands the test passes, Vitest reports the pass as a failure, and the mark comes off.

## Adding or changing a rule

1. Edit `stylelint.config.js`. Rules are grouped in three blocks, alphabetical within each: core stylelint rules, then `gamut/*`, then `@stylistic/*`.
2. Add or update the matching file in `test/`.
3. `make verify`.

Do not hand-write `expectedWarnings` from memory — run the rule and transcribe the real output, including positions.

## Code style

Enforced by oxlint via [.oxlintrc.json](./.oxlintrc.json), which extends `@firefoxic/oxlint-config` (`syntactic` + `stylistic`); [.editorconfig](./.editorconfig) covers whitespace: tabs, LF, final newline, UTF-8 (YAML is the exception, two spaces).

Conventions visible throughout and worth matching:

- ESM only (`"type": "module"`), explicit `.js` extensions in relative imports.
- `let` for variables and `const` only for true constants (top-level, `SCREAM_CASE`), no semicolons, tabs for indentation (see `.editorconfig`).
- Double quotes for import specifiers and object keys; template literals for plain strings (backticks even without interpolation).
- JSDoc on exported helpers.

## Release

Pushing to `release` or `release-*` triggers [.github/workflows/release.yaml](./.github/workflows/release.yaml), which runs `make release` (`@firefoxic/release-it`) with npm provenance (`id-token: write`). [.github/workflows/test.yaml](./.github/workflows/test.yaml) runs `make verify` on `main` and every PR. `pnpm` is the package manager; `devEngines` pins Node ≥ 26.8 and pnpm ≥ 12.3 with `onFail: download`.
