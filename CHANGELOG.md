<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com), and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]

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

[Unreleased]: https://github.com/firefoxic/stylelint-config/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/firefoxic/stylelint-config/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/firefoxic/stylelint-config/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/firefoxic/stylelint-config/releases/tag/v1.0.0
