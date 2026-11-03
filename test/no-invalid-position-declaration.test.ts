import { testRule } from "../utils/testRule.ts"

let rule = `no-invalid-position-declaration`

testRule({
	description: `Declarations should be in valid positions`,
	rule,
	cases: [
		{
			description: `accepts a declaration inside a rule`,
			code: `a { color: red; }`,
		},
		{
			description: `rejects a declaration at the root`,
			code: `color: red;`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 12,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Invalid position for declaration (${rule})`,
				},
			],
		},
	],
})
