import { testRule } from "../utils/testRule.ts"

let rule = `selector-no-unmatchable`

testRule({
	description: `Selectors must be matchable`,
	rule,
	cases: [
		{
			description: `accepts a matchable selector`,
			code: `a > b {}`,
		},
		{
			description: `rejects an element selected as its own descendant`,
			code: `a:required {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 11,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Unmatchable selector "a:required", ":required" never matches "a" elements (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
