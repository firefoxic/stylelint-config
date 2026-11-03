import { testRule } from "../utils/testRule.ts"

let rule = `value-no-invalid`

testRule({
	description: `Values must be valid`,
	rule,
	cases: [
		{
			description: `accepts a valid declaration value`,
			code: `color: red;`,
		},
		{
			description: `rejects an invalid math expression`,
			code: `width: calc(1px + 1);`,
			expectedWarnings: [
				{
					line: 2,
					column: 13,
					endLine: 2,
					endColumn: 20,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Invalid value "1px + 1", a number and a dimension or percentage cannot be added (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
