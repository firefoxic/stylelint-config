# @firefoxic/stylelint-config

[![Test Status][test-image]][test-url]
[![License: MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]

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

## Useful links

- [Changelog](CHANGELOG.md)

[test-url]: https://github.com/firefoxic/stylelint-config/actions
[test-image]: https://github.com/firefoxic/stylelint-config/actions/workflows/test.yml/badge.svg?branch=main

[npm-url]: https://npmjs.org/package/firefoxic/stylelint-config
[npm-image]: https://badge.fury.io/js/@firefoxic%2Fstylelint-config.svg

[license-url]: https://github.com/firefoxic/stylelint-config/blob/main/LICENSE.md
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg
