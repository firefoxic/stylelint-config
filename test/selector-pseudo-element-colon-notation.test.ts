import { testRule } from "../utils/testRule.ts"

let rule = `selector-pseudo-element-colon-notation`

testRule({
	description: `Pseudo-elements must use double-colon notation`,
	rule,
	cases: [
		{
			description: `accepts double-colon notation`,
			code: `a::before {}`,
		},
		{
			description: `rejects single-colon notation`,
			code: `a:before {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 2,
					endLine: 2,
					endColumn: 3,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected double colon pseudo-element notation (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
