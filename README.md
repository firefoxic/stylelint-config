# @firefoxic/stylelint-config

[![License: MIT][license-image]][license-url]
[![Changelog][changelog-image]][changelog-url]
[![NPM version][npm-image]][npm-url]
[![Test Status][test-image]][test-url]

Shared config for stylelint by [firefoxic](https://firefoxic.dev).

To see the rules that this config uses, please read the [config itself](./stylelint.config.js).

## Installation

```shell
pnpm add -D stylelint @firefoxic/stylelint-config
```

## Usage

Set your `stylelint.config.js` to:

```js
export default {
	customSyntax: "postcss-scss", // If your styles syntax is different from CSS (don't forget to install the package)
	extends: "@firefoxic/stylelint-config",
	rules: {
		// Your overrides or additions to rules
	}
}
```

[license-url]: https://github.com/firefoxic/stylelint-config/blob/main/LICENSE.md
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[changelog-url]: https://github.com/firefoxic/stylelint-config/blob/main/CHANGELOG.md
[changelog-image]: https://img.shields.io/badge/CHANGELOG-md-limegreen

[npm-url]: https://npmjs.org/package/@firefoxic/stylelint-config
[npm-image]: https://badge.fury.io/js/@firefoxic%2Fstylelint-config.svg

[test-url]: https://github.com/firefoxic/stylelint-config/actions
[test-image]: https://github.com/firefoxic/stylelint-config/actions/workflows/test.yaml/badge.svg?branch=main
