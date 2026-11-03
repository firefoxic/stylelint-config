import { testRule } from "../utils/testRule.ts"

let rule = `rule-empty-line-before`

testRule({
	description: `Rules must be separated by an empty line`,
	rule,
	cases: [
		{
			description: `accepts a first rule`,
			code: `a {}`,
		},
		{
			description: `accepts an empty line before a rule`,
			code: `
				a {}

				b {}
			`,
		},
		{
			description: `rejects a missing empty line before a rule`,
			code: `
				a {}
				b {}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 1,
					endLine: 3,
					endColumn: 5,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected empty line before rule (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `accepts a first nested rule without an empty line`,
			code: `
				a {
					b {}
				}
			`,
		},
	],
})
