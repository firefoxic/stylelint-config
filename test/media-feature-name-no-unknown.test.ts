import { testRule } from "../utils/testRule.ts"

let rule = `media-feature-name-no-unknown`

testRule({
	description: `Media feature names should be known`,
	rule,
	cases: [
		{
			description: `accepts a known media feature`,
			code: `@media (width >= 40rem) { a { color: red; } }`,
		},
		{
			description: `rejects an unknown media feature`,
			code: `@media (widht >= 40rem) { a { color: red; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 9,
					endLine: 2,
					endColumn: 14,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown media feature name "widht" (${rule})`,
				},
			],
		},
	],
})
