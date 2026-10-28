import { testRule } from "../utils/testRule.ts"

let rule = `font-weight-notation`

testRule({
	description: `Font weights must use numeric notation`,
	rule,
	cases: [
		{
			description: `accepts a numeric font weight`,
			code: `a { font-weight: 700; }`,
		},
		{
			description: `rejects a named font weight`,
			code: `a { font-weight: bold; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 18,
					endLine: 2,
					endColumn: 22,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "bold" to be "700" (${rule})`,
				},
			],
		},
	],
})
