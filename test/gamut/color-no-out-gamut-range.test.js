import { testRule } from "../../utils/testRule.js"

let plugin = {
	name: `stylelint-gamut`,
	prefix: `gamut/`,
}

let rule = `${plugin.prefix}color-no-out-gamut-range`

let code = `
.valid-1 {
	@media (color-gamut: p3) {
		color: lch(48% 82 283);
	}
}

.valid-2 {
	@media (color-gamut: p3) {
		color: oklch(57.35% 0.23 259.06);
	}
}

.valid-3 {
	@media (color-gamut: rec2020) {
		color: lab(82.2345% 40.1645 59.9971 / .5);
	}
}

.valid-4 {
	@media (color-gamut: rec2020) {
		color: oklab(85.69% 0.1007 0.1191 / .5);
	}
}

.invalid-1 {
	color: lch(48% 82 283);
}

.invalid-2 {
	color: oklch(57.35% 0.23 259.06);
}

.invalid-3 {
	color: lab(82.2345% 40.1645 59.9971 / .5);
}

.invalid-4 {
	color: oklab(85.69% 0.1007 0.1191 / .5);
}
`

testRule({
	description: `Out of gamut colors must be wrapped in the proper media query`,
	rule,
	plugin,
	code,
	expectedWarnings: [
		{
			line: 27,
			column: 9,
			endLine: 27,
			endColumn: 24,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected color out of gamut range "lch(48% 82 283)" (${rule})`,
		},
		{
			line: 31,
			column: 9,
			endLine: 31,
			endColumn: 34,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected color out of gamut range "oklch(57.35% 0.23 259.06)" (${rule})`,
		},
		{
			line: 35,
			column: 9,
			endLine: 35,
			endColumn: 43,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected color out of gamut range "lab(82.2345% 40.1645 59.9971 / .5)" (${rule})`,
		},
		{
			line: 39,
			column: 9,
			endLine: 39,
			endColumn: 41,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected color out of gamut range "oklab(85.69% 0.1007 0.1191 / .5)" (${rule})`,
		},
	],
})
