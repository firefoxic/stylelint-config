import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-prelude-no-invalid`

testRule({
	description: `At-rule preludes must be valid`,
	rule,
	cases: [
		{
			description: `accepts a valid media prelude`,
			code: `@media (width > 30em) { a { color: red; } }`,
		},
		{
			description: `rejects a name without the required custom property prefix`,
			code: `@property foo {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 11,
					endLine: 2,
					endColumn: 14,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Invalid prelude "foo" for at-rule "@property" (${rule})`,
				},
			],
		},
	],
})
