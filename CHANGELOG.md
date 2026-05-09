<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com), and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]

### Changed

- The config now requires `stylelint` version `17.11.0` or higher.

## [7.0.0] — 2026–04–22

### Changed

- The `relative-selector-nesting-notation` rule has been added with the `implicit` option. This means that optional nesting selectors (`&`) must be omitted.
- The `selector-no-deprecated` rule has been added. This rule flags selectors that were removed or deprecated after being in the CSS specifications, including Editor Drafts, and were either:
	- shipped in a release browser version;
	- shipped in a pre-release browser version;
	- shipped but behind feature flags;
	- polyfilled with some adoption before any browser shipped;
	- given an MDN page.

## [6.0.2] — 2026–03–19

### Fixed

- The dependencies have now been updated to versions that include security fixes.

## [6.0.1] — 2026–02–24

### Fixed

- Peer dependencies are no longer broken.

## [6.0.0] — 2026–01–30

### Changed

- The plugin now requires:
	- `stylelint` version `17.1.0` or higher,
	- `node.js` version `20.19.0` or higher.
- Hex colors are no longer allowed.
- Color function names with alpha are no longer allowed.

### Added

- Empty blocks with comments inside them are no longer considered problems.

### Fixed

- The `display` property now not only disallows legacy and short notation, but also automatically fixes it to the full modern notation.

## [5.0.0] — 2024–10–30

### Changed

- The minimum required `stylelint` version has been increased to `16.10.0`.
- The minimum required `node.js` version has been increased to `20.12.0`, except for version `21`.

## [4.0.0] — 2024–08–14

### Changed

- The minimum required version of `stylelint` has been increased to `16.8.1`.

### Added

- Restrictions on the maximum precision of numbers have been removed.

### Fixed

- False positives of `declaration-property-value-no-unknown` rule for `oklch()`.

## [3.0.0] — 2024–06–07

### Changed

- The legacy single-value syntax for the `display` property is now disallowed.
- Physical properties, values and units are now disallowed. Use logical ones instead.
- Out of gamut colors should now be wrapped in the proper media query.

## [2.0.0] — 2024–05–17

### Changed

- The custom media queries should now be defined within the same source.
- The grid area names in the `grid-template-areas` property values should now be aligned.

### Fixed

- Zero length value no longer requires no units in all cases.

## [1.0.0] — 2024–05–07

### Added

- Base config for `stylelint`.

[Unreleased]: https://github.com/firefoxic/stylelint-config/compare/v7.0.0...HEAD
[7.0.0]: https://github.com/firefoxic/stylelint-config/compare/v6.0.2...v7.0.0
[6.0.2]: https://github.com/firefoxic/stylelint-config/compare/v6.0.1...v6.0.2
[6.0.1]: https://github.com/firefoxic/stylelint-config/compare/v6.0.0...v6.0.1
[6.0.0]: https://github.com/firefoxic/stylelint-config/compare/v5.0.0...v6.0.0
[5.0.0]: https://github.com/firefoxic/stylelint-config/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/firefoxic/stylelint-config/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/firefoxic/stylelint-config/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/firefoxic/stylelint-config/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/firefoxic/stylelint-config/releases/tag/v1.0.0
