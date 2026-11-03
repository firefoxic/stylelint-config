import { testRule } from "../utils/testRule.ts"

let rule = `media-feature-range-notation`

testRule({
	description: `Media feature ranges should use context notation`,
	rule,
	cases: [
		{
			description: `accepts context notation`,
			code: `@media (width >= 40rem) { a { color: red; } }`,
		},
		{
			description: `rejects prefix notation`,
			code: `@media (min-width: 40rem) { a { color: red; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 8,
					endLine: 2,
					endColumn: 26,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "context" media feature range notation (${rule})`,
				},
			],
		},
	],
})
