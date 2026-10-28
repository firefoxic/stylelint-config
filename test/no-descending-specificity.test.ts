import { testRule } from "../utils/testRule.ts"

let rule = `no-descending-specificity`

testRule({
	description: `Specificity should not descend between related selectors`,
	rule,
	cases: [
		{
			description: `accepts selectors in ascending specificity order`,
			code: `
				a { color: red; }
				.a { color: blue; }
			`,
		},
		{
			description: `rejects a less specific selector after a more specific one`,
			code: `
				b a { color: red; }
				a { color: blue; }
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 1,
					endLine: 3,
					endColumn: 2,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected selector "a" to come before selector "b a", at line 2 (${rule})`,
				},
			],
		},
	],
})
