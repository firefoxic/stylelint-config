import { testRule } from "../utils/testRule.ts"

let rule = `no-empty-source`

testRule({
	description: `The source should not be empty`,
	rule,
	cases: [
		{
			description: `accepts a stylesheet with a rule`,
			code: `a { color: red; }`,
		},
		{
			description: `rejects an empty source`,
			code: ``,
			expectedWarnings: [
				{
					line: 1,
					column: 1,
					endLine: 3,
					endColumn: 2,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty source (${rule})`,
				},
			],
		},
	],
})
