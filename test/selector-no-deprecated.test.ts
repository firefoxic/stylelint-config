import { testRule } from "../utils/testRule.ts"

let rule = `selector-no-deprecated`

testRule({
	description: `Selectors must not be deprecated`,
	rule,
	cases: [
		{
			description: `accepts current selectors`,
			code: `
				abbr {}
				a:focus-visible {}
			`,
		},
		{
			description: `rejects deprecated selectors`,
			code: `
				acronym {}
				a:focus-ring {}
				.foo::shadow a {}
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 8,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Deprecated selector "acronym" (${rule})`,
					url: undefined,
				},
				{
					line: 3,
					column: 2,
					endLine: 3,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected ":focus-ring" to be ":focus-visible" (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 5,
					endLine: 4,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Deprecated selector "::shadow" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
