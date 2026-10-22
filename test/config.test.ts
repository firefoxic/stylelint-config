import stylelint from "stylelint"
import { describe, expect, it } from "vitest"

import config from "../stylelint.config.ts"

/** A stylesheet that touches every opinion the config holds, spelled the way the config wants it. */
const CANONICAL = `
@import "./reset.css";

@custom-media --wide (width >= 60em);

:root {
	--brand-color: rgb(0 128 255 / 100%);
	--gap: 1rem;
}

.card {
	display: block flow;
	inline-size: 100%;
	margin-block: var(--gap);
	border-inline-start: 1px solid var(--brand-color);
	padding-inline: calc(var(--gap) * 2);
	background-image: url("./card.svg");
	color: var(--brand-color);
	font-family: Fira Sans, sans-serif;
	transition: color 0.3s ease;
}

.card:hover {
	color: rgb(0 0 0 / 50%);
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

	it(`ships the rule set the snapshot records`, async () => {
		await expect(`${JSON.stringify(config, null, `\t`)}\n`).toMatchFileSnapshot(`./__snapshots__/config.json`)
	})

	for (let [name, input] of Object.entries(SAMPLES)) {
		// The mark comes off when the fixer converges: `@stylistic/indentation` reaches its fixed
		// point only on a second pass, and the rules of `@stylistic/stylelint-plugin` learn to read
		// each other's settings in 6.0.0. Marked this way on purpose — once the plugin lands the
		// fix, this test starts passing, and Vitest reports a passing `.fails` test as a failure.
		it.fails(`reaches a fixed point in one pass: ${name}`, async () => {
			let { code: once } = await stylelint.lint({ code: input, config, fix: true })
			let { code: twice } = await stylelint.lint({ code: once, config, fix: true })

			expect(twice).toBe(once)
		})
	}
})
