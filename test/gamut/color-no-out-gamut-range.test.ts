import { testRule } from "../../utils/testRule.ts"

let rule = `gamut/color-no-out-gamut-range`

testRule({
	description: `Out of gamut colors must be wrapped in the proper media query`,
	rule,
	cases: [
		{
			description: `accepts an lch() color in a p3 media query`,
			code: `
				a {
					@media (color-gamut: p3) {
						color: lch(48% 82 283);
					}
				}
			`,
		},
		{
			description: `accepts an oklch() color in a p3 media query`,
			code: `
				a {
					@media (color-gamut: p3) {
						color: oklch(57.35% 0.23 259.06);
					}
				}
			`,
		},
		{
			description: `accepts a lab() color in a rec2020 media query`,
			code: `
				a {
					@media (color-gamut: rec2020) {
						color: lab(82.2345% 40.1645 59.9971 / .5);
					}
				}
			`,
		},
		{
			description: `accepts an oklab() color in a rec2020 media query`,
			code: `
				a {
					@media (color-gamut: rec2020) {
						color: oklab(85.69% 0.1007 0.1191 / .5);
					}
				}
			`,
		},
		{
			description: `rejects an unwrapped out-of-gamut lch() color`,
			code: `
				a {
					color: lch(48% 82 283);
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 9,
					endLine: 3,
					endColumn: 24,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unexpected color out of gamut range "lch(48% 82 283)" (${rule})`,
				},
			],
		},
		{
			description: `rejects an unwrapped out-of-gamut oklch() color`,
			code: `
				a {
					color: oklch(57.35% 0.23 259.06);
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 9,
					endLine: 3,
					endColumn: 34,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unexpected color out of gamut range "oklch(57.35% 0.23 259.06)" (${rule})`,
				},
			],
		},
		{
			description: `rejects an unwrapped out-of-gamut lab() color`,
			code: `
				a {
					color: lab(82.2345% 40.1645 59.9971 / .5);
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 9,
					endLine: 3,
					endColumn: 43,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unexpected color out of gamut range "lab(82.2345% 40.1645 59.9971 / .5)" (${rule})`,
				},
			],
		},
		{
			description: `rejects an unwrapped out-of-gamut oklab() color`,
			code: `
				a {
					color: oklab(85.69% 0.1007 0.1191 / .5);
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 9,
					endLine: 3,
					endColumn: 41,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unexpected color out of gamut range "oklab(85.69% 0.1007 0.1191 / .5)" (${rule})`,
				},
			],
		},
	],
})
