# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What this repository is

A single shareable stylelint config published as `@firefoxic/stylelint-config`. [stylelint.config.ts](./stylelint.config.ts) is the source; TypeScript emits the published `dist/stylelint.config.js` and `dist/stylelint.config.d.ts`. The package exports both runtime and type entries, as well as `package.json`.

`stylelint` itself is a peer dependency; the two rule plugins the config turns on (`@stylistic/stylelint-plugin`, `stylelint-gamut`) are real dependencies, because consumers get them transitively by extending this config.

## Commands

Tooling runs through `make`; the Makefile puts `node_modules/.bin` on `PATH` and is the source of truth for dev commands, so read it rather than relying on a list here (`make help` prints the targets). Package manager is pnpm, runtime — node, both auto-downloaded via `devEngines` on failure.

The runner is Vitest, configured in [vitest.config.ts](./vitest.config.ts): `include` names `test/**/*.test.ts`, because the files are named after the rules rather than by Vitest's default pattern, and `isolate: false` keeps the whole suite in one warm process. `make test-watch` reruns on change; a single file or a single name:

```shell
pnpm exec vitest run test/color-no-hex.test.ts
pnpm exec vitest run --testNamePattern="hex"
```

`pnpm install` also wires `core.hooksPath` to [.githooks/](./.githooks/), whose `pre-commit` stashes untracked/unstaged work and runs `make verify` on the staged tree.

## How the tests work

Each rule the config enables gets one `<rule-name>.test.ts` under [test/](./test/); plugin rules live in a directory named after the plugin (`test/gamut/`, `test/@stylistic/`) and spell the prefix in `rule` (`` let rule = `@stylistic/indentation` ``). A file is a single call to `testRule()` from [utils/testRule.ts](./utils/testRule.ts), with each CSS sample in its own case:

- `cases` holds every CSS sample as a separate case, with its own description and optional `expectedWarnings`; keep one-line samples on one line and preserve indentation for multi-line samples;
- `expectedWarnings` is a full snapshot of stylelint's warning objects — `line`/`column`/`endLine`/`endColumn`, `text`, `severity`, and the literal `url: undefined, fix: undefined`. Because the assertion is `toStrictEqual`, every field must be present and exact, and line/column numbers shift whenever a case's `code` is edited.

The helper uses `stripIndent` from `@morev/stylelint-testing-library` to normalize each case's CSS while preserving its boundary newlines, then builds the config for the run out of the shipped one — its `languageOptions`, its `plugins`, and the options it gives that one rule. It throws if `rule` is not a key of `config.rules`, and checks `parseErrors` and `invalidOptionWarnings` before the warnings.

[test/config.test.ts](./test/config.test.ts) tests the config as a whole, which the one-rule harness cannot see: the canonical stylesheet lints clean under all of it (this catches rules upstream renamed, deprecated or given stricter option schemas, as well as rules that contradict each other), the same stylesheet is a `--fix` fixed point, every core Stylelint rule is accounted for, and the expected `extends` and `languageOptions` are set.

## Adding or changing a rule

1. Edit `stylelint.config.ts`. Rules are grouped in three blocks, alphabetical within each: core stylelint rules, then `gamut/*`, then `@stylistic/*`.
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
