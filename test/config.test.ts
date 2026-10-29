import stylelint from "stylelint"
import { describe, expect, it } from "vitest"

import config from "../src/stylelint.config.ts"
import stylistic from "../src/stylistic.ts"
import syntactic from "../src/syntactic.ts"

/** A stylesheet that touches every opinion the config holds, spelled the way the config wants it. */
const CANONICAL = `@import url("./reset.css");

@custom-media --wide (width >= 60em);

@keyframes --fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

:root {
	--brand-color: rgb(0 128 255 / 1);
	--gap: 1rem;
	--container-name: --card;
}

.card {
	display: block flow;
	inline-size: 100%;
	container-name: var(--container-name);
	margin-block: var(--gap);
	border-inline-start: 1px solid var(--brand-color);
	padding-inline: calc(var(--gap) * 2);
	background-image: url("./card.svg");
	color: var(--brand-color);
	font-family: Fira Sans, sans-serif;
	font-weight: 400;
	transition: color 0.3s ease;
}

.card:hover {
	color: rgb(0 0 0 / 0.5);
}

.card::before {
	display: block flow;
	block-size: 2px;
	content: "";
}

.layout {
	display: block grid;
	grid-template-areas:
		"logo  menu"
		"main  main";
	gap: var(--gap);
}

@media (--wide) {
	.layout {
		grid-template-areas: "logo  menu  main";
	}
}

@media (width >= 40em) {
	.card {
		padding-inline: calc(var(--gap) * 3);
	}
}
`

/** Messy stylesheets the fixer must bring to a standstill in a single pass. */
const SAMPLES = {
	"nested at-rule with blank lines": `@media (width>=30em){\n.a,.b{margin :0 auto;padding:0.5em 1em;\ncolor:rgb(0 0 0 / 50%)}\n\n\n\n.c{grid-template-areas:"a b"\n"cc d";transition:color .3s}}\n`,
}

/** Core Stylelint rules the config does not set yet; compare this list against `stylelint.rules` below. */
const UNCONFIGURED_CORE_RULES: Record<Exclude<keyof typeof stylelint.rules, keyof typeof config.rules>, true> = {
	"at-rule-allowed-list": true,
	"at-rule-disallowed-list": true,
	"at-rule-property-required-list": true,
	"color-hex-alpha": true,
	"color-hex-length": true,
	"color-no-invalid-hex": true,
	"comment-pattern": true,
	"comment-word-disallowed-list": true,
	"declaration-property-custom-property-allowed-list": true,
	"declaration-property-max-values": true,
	"declaration-property-unit-disallowed-list": true,
	"declaration-property-value-allowed-list": true,
	"declaration-property-value-disallowed-list": true,
	"function-allowed-list": true,
	"function-disallowed-list": true,
	"function-url-scheme-allowed-list": true,
	"function-url-scheme-disallowed-list": true,
	"length-zero-no-unit": true,
	"media-feature-name-allowed-list": true,
	"media-feature-name-disallowed-list": true,
	"media-feature-name-unit-allowed-list": true,
	"media-feature-name-value-allowed-list": true,
	"number-max-precision": true,
	"property-allowed-list": true,
	"property-disallowed-list": true,
	"rule-nesting-at-rule-required-list": true,
	"rule-selector-property-disallowed-list": true,
	"selector-attribute-name-disallowed-list": true,
	"selector-attribute-operator-allowed-list": true,
	"selector-attribute-operator-disallowed-list": true,
	"selector-combinator-allowed-list": true,
	"selector-combinator-disallowed-list": true,
	"selector-disallowed-list": true,
	"selector-id-pattern": true,
	"selector-max-attribute": true,
	"selector-max-class": true,
	"selector-max-combinators": true,
	"selector-max-pseudo-class": true,
	"selector-max-specificity": true,
	"selector-max-type": true,
	"selector-nested-pattern": true,
	"selector-no-qualifying-type": true,
	"selector-pseudo-class-allowed-list": true,
	"selector-pseudo-class-disallowed-list": true,
	"selector-pseudo-element-allowed-list": true,
	"selector-pseudo-element-disallowed-list": true,
	"time-min-milliseconds": true,
	"unit-allowed-list": true,
	"unit-disallowed-list": true,
	"value-type-custom-property-required-list": true,
}

describe(`the shipped config`, () => {
	it(`lints the canonical stylesheet clean`, async () => {
		let [result] = await stylelint.lint({ code: CANONICAL, config }).then((r) => r.results)

		expect(result.parseErrors).toStrictEqual([])
		expect(result.invalidOptionWarnings).toStrictEqual([])
		expect(result.deprecations).toStrictEqual([])
		expect(result.warnings).toStrictEqual([])
	})

	it(`leaves the canonical stylesheet where it is`, async () => {
		let { code } = await stylelint.lint({ code: CANONICAL, config, fix: true })

		expect(code).toBe(CANONICAL)
	})

	it(`applies the configured rules to a stylesheet with violations`, async () => {
		let code = `@font-face {
	font-family: Test;
	src: url("//example.com/test.woff2");
	font-display: bogus;
	unknown: value;
}

@charset UTF-8;

@custom-media --Bad_Name (width > 1px);

@media (color: frog) {}

@media all and (min-width: 1px) junk;

@media (min-width: 10px) {
	.media {
		color: red;
	}
}

@media tv {}

@nest .parent & {
	color: blue;
}

@property --syntax {
	syntax: "1px";
	inherits: false;
	initial-value: 1px;
}

@keyframes fade_name {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@layer Foo.Bar {}

@container Foo (width > 1px) {}

.a .b .c .d {
	color: rgb(0 0 0 / 50%);
	margin: 1px 1px;
	--Bad_prop: value;
	line-height: 1px;
	animation-name: missing;
	color: var(--missing);
	font-weight: bold;
	outline-color: hsl(20 50% 50%);
	background-color: oklch(50% 0.1 20);
	margin-top: 0;
	margin-right: 0;
	margin-bottom: 0;
	margin-left: 0;
	word-wrap: break-word;
	word-break: break-word;
	width: intrinsic;
	height: 1px 2px;
}

& .orphan {
	color: red;
}
/*bad*/
.Bad_name {
	color: red;
}

.parent {
	& {
		color: blue;
	}
}

div:checked {
	color: red;
}

.nest-one {
	.nest-two {
		.nest-three {
			.nest-four {
				.nest-five {
					color: red;
				}
			}
		}
	}
}

@media all and (min-width: 1px) junk;

::-webkit-input-placeholder {
	color: gray;
}

/* intentional-invalid-math */
.invalid-value {
	width: calc(1px + 2);
}

color: red;
`
		let { results } = await stylelint.lint({ code, config })
		let [result] = results
		let rules = result.warnings.map(({ rule }) => rule)

		expect(result.parseErrors).toStrictEqual([])
		expect(result.invalidOptionWarnings).toStrictEqual([])
		expect(rules).toEqual(expect.arrayContaining([
			`alpha-value-notation`,
			`at-charset-rule-no-invalid`,
			`at-rule-descriptor-no-unknown`,
			`at-rule-descriptor-value-no-unknown`,
			`at-rule-no-deprecated`,
			`at-rule-prelude-no-invalid`,
			`block-no-redundant-nested-style-rules`,
			`comment-empty-line-before`,
			`comment-whitespace-inside`,
			`container-name-pattern`,
			`custom-media-pattern`,
			`custom-property-empty-line-before`,
			`custom-property-pattern`,
			`declaration-block-no-redundant-longhand-properties`,
			`declaration-empty-line-before`,
			`declaration-property-unit-allowed-list`,
			`font-weight-notation`,
			`function-url-no-scheme-relative`,
			`hue-degree-notation`,
			`keyframes-name-pattern`,
			`layer-name-pattern`,
			`lightness-notation`,
			`max-nesting-depth`,
			`media-feature-name-value-no-unknown`,
			`media-feature-range-notation`,
			`media-type-no-deprecated`,
			`nesting-selector-no-missing-scoping-root`,
			`no-invalid-position-declaration`,
			`no-unknown-animations`,
			`no-unknown-custom-properties`,
			`declaration-property-value-keyword-no-deprecated`,
			`property-no-deprecated`,
			`selector-class-pattern`,
			`selector-max-compound-selectors`,
			`selector-no-unmatchable`,
			`selector-no-vendor-prefix`,
			`shorthand-property-no-redundant-values`,
			`syntax-string-no-invalid`,
			`value-no-invalid`,
		]))
	})

	it(`accepts BEM names with optional hyphens in every part`, async () => {
		let { results } = await stylelint.lint({
			code: `.block-name__elem-name--mod-name_mod-value {\n\t--test: 1;\n}\n\n.block__elem--mod_value {\n\t--test: 1;\n}\n`,
			config,
		})

		expect(results[0].warnings).toStrictEqual([])
	})

	it(`accounts for every core Stylelint rule`, () => {
		let configured = Object.keys(config.rules ?? {}).filter((name) => name in stylelint.rules)
		let unconfigured = Object.keys(UNCONFIGURED_CORE_RULES)

		expect(configured.filter((name) => name in UNCONFIGURED_CORE_RULES)).toEqual([])
		expect([...configured, ...unconfigured].toSorted()).toEqual(Object.keys(stylelint.rules).toSorted())
	})

	it(`extends the recommended stylistic config`, () => {
		expect(config.extends).toEqual([`@stylistic/stylelint-plugin/recommended`])
		expect(stylistic.extends).toEqual([`@stylistic/stylelint-plugin/recommended`])
	})

	it(`keeps the empty-line-before rules in the stylistic set`, () => {
		let emptyLineBeforeRules = [
			`at-rule-empty-line-before`,
			`comment-empty-line-before`,
			`custom-property-empty-line-before`,
			`declaration-empty-line-before`,
			`rule-empty-line-before`,
		]

		expect(Object.keys(stylistic.rules ?? {}).toSorted()).toEqual(emptyLineBeforeRules.toSorted())
		expect(Object.keys(syntactic.rules ?? {}).filter((rule) => rule.endsWith(`-empty-line-before`))).toEqual([])
	})

	it(`sets the expected language options`, () => {
		expect(config.languageOptions).toEqual({
			directionality: {
				block: `top-to-bottom`,
				inline: `left-to-right`,
			},
		})
	})

	for (let [name, input] of Object.entries(SAMPLES)) {
		it(`reaches a fixed point in one pass: ${name}`, async () => {
			let { code: once } = await stylelint.lint({ code: input, config, fix: true })
			let { code: twice } = await stylelint.lint({ code: once, config, fix: true })

			expect(twice).toBe(once)
		})
	}
})
