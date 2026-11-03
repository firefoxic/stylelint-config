import { testRule } from "../utils/testRule.ts"

let rule = `shorthand-property-no-redundant-values`

testRule({
	description: `Shorthand properties must not contain redundant values`,
	rule,
	cases: [
		{
			description: `accepts distinct values`,
			code: `margin: 1px 2px;`,
		},
		{
			description: `rejects a repeated second value`,
			code: `margin: 1px 1px;`,
			expectedWarnings: [
				{
					line: 2,
					column: 9,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "1px 1px" to be "1px" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
