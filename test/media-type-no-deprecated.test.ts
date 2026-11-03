import { testRule } from "../utils/testRule.ts"

let rule = `media-type-no-deprecated`

testRule({
	description: `Media types should not be deprecated`,
	rule,
	cases: [
		{
			description: `accepts a current media type`,
			code: `@media screen { a { color: red; } }`,
		},
		{
			description: `rejects the deprecated speech media type`,
			code: `@media speech { a { color: red; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 8,
					endLine: 2,
					endColumn: 14,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Deprecated media type "speech" (${rule})`,
				},
			],
		},
	],
})
