import { testRule } from "../utils/testRule.ts"

let rule = `selector-type-no-unknown`

testRule({
	description: `Type selectors must be known`,
	rule,
	cases: [
		{
			description: `accepts a known type selector`,
			code: `article {}`,
		},
		{
			description: `accepts a custom element`,
			code: `my-widget {}`,
		},
		{
			description: `rejects an unknown type selector`,
			code: `notarealelement {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Unknown type selector "notarealelement" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
