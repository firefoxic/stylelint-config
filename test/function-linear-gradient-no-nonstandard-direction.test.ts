import { testRule } from "../utils/testRule.ts"

let rule = `function-linear-gradient-no-nonstandard-direction`

testRule({
	description: `Linear gradients must not contain non-standard direction keywords`,
	rule,
	cases: [
		{
			description: `accepts standard gradient directions`,
			code: `
				a { background: linear-gradient(to top, #fff, #000) }
				a { background: linear-gradient(to bottom right, #fff, #000) }
				a { background: linear-gradient(45deg, #fff, #000) }
				a { background: linear-gradient(1.57rad, #fff, #000) }
				a { background: linear-gradient(#fff, #000) } /* Direction defaults to "to bottom" */
			`,
		},
		{
			description: `rejects nonstandard gradient directions`,
			code: `
				a { background: linear-gradient(top, #fff, #000) }
				a { background: linear-gradient(bottom, #fff, #000) }
				a { background: linear-gradient(left, #fff, #000) }
				a { background: linear-gradient(45, #fff, #000) }
				a { background: linear-gradient(to top top, #fff, #000) }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 33,
					endLine: 2,
					endColumn: 36,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Nonstandard direction (${rule})`,
					url: undefined,
				},
				{
					line: 3,
					column: 33,
					endLine: 3,
					endColumn: 39,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Nonstandard direction (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 33,
					endLine: 4,
					endColumn: 37,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Nonstandard direction (${rule})`,
					url: undefined,
				},
				{
					line: 5,
					column: 33,
					endLine: 5,
					endColumn: 35,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Nonstandard direction (${rule})`,
					url: undefined,
				},
				{
					line: 6,
					column: 33,
					endLine: 6,
					endColumn: 43,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Nonstandard direction (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
