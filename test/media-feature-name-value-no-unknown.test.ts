import { testRule } from "../utils/testRule.ts"

let rule = `media-feature-name-value-no-unknown`

testRule({
	description: `Media feature values should be known`,
	rule,
	cases: [
		{
			description: `accepts a known media feature value`,
			code: `@media (orientation: portrait) { a { color: red; } }`,
		},
		{
			description: `rejects an unknown media feature value`,
			code: `@media (orientation: sideways) { a { color: red; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 22,
					endLine: 2,
					endColumn: 30,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown media feature value "sideways" for name "orientation" (${rule})`,
				},
			],
		},
	],
})
