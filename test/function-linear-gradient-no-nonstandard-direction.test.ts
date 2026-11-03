import { testRule } from "../utils/testRule.ts"

let rule = `function-linear-gradient-no-nonstandard-direction`

testRule({
	description: `Linear gradients must not contain non-standard direction keywords`,
	rule,
	cases: [
		{
			description: `accepts "to top"`,
			code: `a { background: linear-gradient(to top, #fff, #000) }`,
		},
		{
			description: `accepts "to bottom right"`,
			code: `a { background: linear-gradient(to bottom right, #fff, #000) }`,
		},
		{
			description: `accepts angle directions in degrees`,
			code: `a { background: linear-gradient(45deg, #fff, #000) }`,
		},
		{
			description: `accepts angle directions in radians`,
			code: `a { background: linear-gradient(1.57rad, #fff, #000) }`,
		},
		{
			description: `accepts the default direction`,
			code: `a { background: linear-gradient(#fff, #000) }`,
		},
		{
			description: `rejects "top"`,
			code: `a { background: linear-gradient(top, #fff, #000) }`,
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
			],
		},
		{
			description: `rejects "bottom"`,
			code: `a { background: linear-gradient(bottom, #fff, #000) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 33,
					endLine: 2,
					endColumn: 39,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Nonstandard direction (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "left"`,
			code: `a { background: linear-gradient(left, #fff, #000) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 33,
					endLine: 2,
					endColumn: 37,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Nonstandard direction (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects unitless angle directions`,
			code: `a { background: linear-gradient(45, #fff, #000) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 33,
					endLine: 2,
					endColumn: 35,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Nonstandard direction (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects duplicate "top" direction keywords`,
			code: `a { background: linear-gradient(to top top, #fff, #000) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 33,
					endLine: 2,
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
