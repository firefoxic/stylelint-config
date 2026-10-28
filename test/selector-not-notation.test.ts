import { testRule } from "../utils/testRule.ts"

let rule = `selector-not-notation`

testRule({
	description: `Negation selectors must use complex notation`,
	rule,
	cases: [
		{
			description: `accepts a complex selector in ":not()"`,
			code: `a:not(.link span) {}`,
		},
		{
			description: `rejects multiple simple negations`,
			code: `a:not(.link):not(.visited) {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 13,
					endLine: 2,
					endColumn: 27,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected complex :not() pseudo-class notation (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
