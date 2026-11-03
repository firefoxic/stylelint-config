import { testRule } from "../utils/testRule.ts"

let rule = `selector-pseudo-element-no-unknown`

testRule({
	description: `Pseudo-elements must be known`,
	rule,
	cases: [
		{
			description: `accepts a known pseudo-element`,
			code: `a::before {}`,
		},
		{
			description: `rejects an unknown pseudo-element`,
			code: `a::unknown {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 2,
					endLine: 2,
					endColumn: 11,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Unknown pseudo-element selector "::unknown" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
