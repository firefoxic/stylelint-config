import { testRule } from "../utils/testRule.ts"

let rule = `hue-degree-notation`

testRule({
	description: `Hue values must use angle notation`,
	rule,
	cases: [
		{
			description: `accepts a hue in degrees`,
			code: `a { color: hsl(120deg 50% 50%); }`,
		},
		{
			description: `rejects a unitless hue`,
			code: `a { color: hsl(120 50% 50%); }`,
			expectedWarnings: [
				{
					line: 2,
					column: 16,
					endLine: 2,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "120" to be "120deg" (${rule})`,
				},
			],
		},
	],
})
