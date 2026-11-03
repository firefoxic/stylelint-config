import { testRule } from "../utils/testRule.ts"

let rule = `selector-pseudo-class-no-unknown`

testRule({
	description: `Pseudo-classes must be known`,
	rule,
	cases: [
		{
			description: `accepts a known pseudo-class`,
			code: `a:hover {}`,
		},
		{
			description: `rejects an unknown pseudo-class`,
			code: `a:unknown {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 2,
					endLine: 2,
					endColumn: 10,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Unknown pseudo-class selector ":unknown" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
