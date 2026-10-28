import { testRule } from "../utils/testRule.ts"

let rule = `selector-max-universal`

testRule({
	description: `Selectors must not exceed the maximum number of universal selectors`,
	rule,
	cases: [
		{
			description: `accepts two universal selectors`,
			code: `* * {}`,
		},
		{
			description: `rejects three universal selectors`,
			code: `* * * {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 6,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Too many universal selectors in "* * *", maximum 2 (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
