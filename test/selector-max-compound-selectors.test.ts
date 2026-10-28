import { testRule } from "../utils/testRule.ts"

let rule = `selector-max-compound-selectors`

testRule({
	description: `Selectors must not exceed the maximum number of compound selectors`,
	rule,
	cases: [
		{
			description: `accepts three compound selectors`,
			code: `a b c {}`,
		},
		{
			description: `rejects four compound selectors`,
			code: `a b c d {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 8,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Too many compound selectors in "a b c d", maximum 3 (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
