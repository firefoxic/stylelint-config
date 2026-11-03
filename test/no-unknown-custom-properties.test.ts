import { testRule } from "../utils/testRule.ts"

let rule = `no-unknown-custom-properties`

testRule({
	description: `Custom properties should be declared`,
	rule,
	cases: [
		{
			description: `accepts a declared custom property`,
			code: `a { --color: red; color: var(--color); }`,
		},
		{
			description: `rejects an undeclared custom property`,
			code: `a { color: var(--missing); }`,
			expectedWarnings: [
				{
					line: 2,
					column: 16,
					endLine: 2,
					endColumn: 25,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown custom property "--missing" (${rule})`,
				},
			],
		},
	],
})
