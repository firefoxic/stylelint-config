import { testRule } from "../utils/testRule.ts"

let rule = `lightness-notation`

testRule({
	description: `Lightness should use number notation`,
	rule,
	cases: [
		{
			description: `accepts a numeric lightness`,
			code: `a { color: hsl(0 0 50); }`,
		},
		{
			description: `rejects percentage lightness`,
			code: `a { color: oklch(85% 0.17 88); }`,
			expectedWarnings: [
				{
					line: 2,
					column: 18,
					endLine: 2,
					endColumn: 21,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "85%" to be "0.85" (${rule})`,
				},
			],
		},
	],
})
