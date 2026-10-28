import { testRule } from "../utils/testRule.ts"

let rule = `selector-class-pattern`

testRule({
	description: `Class selectors must follow the configured BEM pattern`,
	rule,
	cases: [
		{
			description: `accepts a block class`,
			code: `.button {}`,
		},
		{
			description: `accepts an element and modifier class`,
			code: `.button__label--large {}`,
		},
		{
			description: `rejects a class with uppercase letters`,
			code: `.Button {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 8,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected class selector ".Button" to conform to "two-dashes" BEM notation (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
