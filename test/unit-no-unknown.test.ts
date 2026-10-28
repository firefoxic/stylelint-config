import { testRule } from "../utils/testRule.ts"

let rule = `unit-no-unknown`

testRule({
	description: `Units must be known`,
	rule,
	cases: [
		{
			description: `accepts a known unit`,
			code: `width: 1px;`,
		},
		{
			description: `rejects an unknown unit`,
			code: `width: 1quux;`,
			expectedWarnings: [
				{
					line: 2,
					column: 9,
					endLine: 2,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Unknown unit "quux" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
