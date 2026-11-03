import { testRule } from "../utils/testRule.ts"

let rule = `property-no-deprecated`

testRule({
	description: `Properties must not be deprecated`,
	rule,
	cases: [
		{
			description: `accepts current properties`,
			code: `overflow-wrap: anywhere;`,
		},
		{
			description: `rejects "word-wrap"`,
			code: `word-wrap: break-word;`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 10,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "word-wrap" to be "overflow-wrap" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
