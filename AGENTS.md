# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What this repository is

A single shareable stylelint config published as `@firefoxic/stylelint-config`. There is no build step and no source directory: [stylelint.config.js](./stylelint.config.js) is both the source and the published artifact — it is the sole entry in `exports` and the sole entry in `files`. Everything else in the repo exists to test and release that one file.

`stylelint` itself is a peer dependency; the two rule plugins the config turns on (`@stylistic/stylelint-plugin`, `stylelint-gamut`) are real dependencies, because consumers get them transitively by extending this config.

## Commands

Tooling runs through `make`; the Makefile puts `node_modules/.bin` on `PATH` and is the source of truth for dev commands, so read it rather than relying on a list here (`make help` prints the targets). Package manager is pnpm, runtime — node, both auto-downloaded via `devEngines` on failure.

Running one test file (the runner is plain `node:test`, no config):

```shell
node --test test/color-no-hex.js
node --test --test-name-pattern="hex" test/
```

`pnpm install` also wires `core.hooksPath` to [.githooks/](./.githooks/), whose `pre-commit` stashes untracked/unstaged work and runs `make verify` on the staged tree.

## How the tests work

Each rule the config enables gets one file under [test/](./test/), named after the rule; plugin rules live in a directory named after the plugin (`test/gamut/`, `test/@stylistic/`). A file is a single call to `testRule()` from [utils/testRule.js](./utils/testRule.js):

- one `code` string holding both valid and invalid CSS, commented or class-named to mark which is which;
- `expectedWarnings` as a full deep-equal snapshot of stylelint's warning objects — `line`/`column`/`endLine`/`endColumn`, `text`, `severity`, and the literal `url: undefined, fix: undefined`. Because the assertion is `deepEqual`, every field must be present and exact, and line/column numbers shift whenever the `code` string is edited.

The helper reads the rule's options out of `stylelint.config.js` by importing it, so a test asserts against the shipped configuration rather than a locally restated one. For a plugin rule, pass `plugin: { name, prefix }` and build `rule` as `` `${plugin.prefix}rule-name` ``.

Known gap: `testRule()` constructs `{ plugins, rules: { [rule]: … } }` and drops the config's top-level `languageOptions.directionality`. The three `*-layout-mappings` tests therefore assert warning text that the real shipped config never produces. Keep this in mind before trusting those expectations or extending the helper.

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
