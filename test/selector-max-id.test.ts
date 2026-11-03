import { testRule } from "../utils/testRule.ts"

let rule = `selector-max-id`

testRule({
	description: `Selectors must not contain ID selectors`,
	rule,
	cases: [
		{
			description: `accepts a class selector`,
			code: `.content {}`,
		},
		{
			description: `rejects an ID selector`,
			code: `#content {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 9,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Too many ID selectors in "#content", maximum 0 (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
