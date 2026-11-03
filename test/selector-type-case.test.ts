import { testRule } from "../utils/testRule.ts"

let rule = `selector-type-case`

testRule({
	description: `Type selectors must be lowercase`,
	rule,
	cases: [
		{
			description: `accepts a lowercase type selector`,
			code: `article {}`,
		},
		{
			description: `rejects an uppercase type selector`,
			code: `ARTICLE {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 8,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "ARTICLE" to be "article" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
