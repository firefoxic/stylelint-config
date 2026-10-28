import { testRule } from "../utils/testRule.ts"

let rule = `selector-no-deprecated`

testRule({
	description: `Selectors must not be deprecated`,
	rule,
	cases: [
		{
			description: `accepts the "abbr" element`,
			code: `abbr {}`,
		},
		{
			description: `accepts the ":focus-visible" pseudo-class`,
			code: `a:focus-visible {}`,
		},
		{
			description: `rejects the "acronym" element`,
			code: `acronym {}`,
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
			],
		},
		{
			description: `rejects the ":focus-ring" pseudo-class`,
			code: `a:focus-ring {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 2,
					endLine: 2,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected ":focus-ring" to be ":focus-visible" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects the "::shadow" pseudo-element`,
			code: `.foo::shadow a {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
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
