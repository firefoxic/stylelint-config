import { testRule } from "../utils/testRule.ts"

let rule = `media-query-no-invalid`

testRule({
	description: `Media queries should be valid`,
	rule,
	cases: [
		{
			description: `accepts a valid media query`,
			code: `@media screen and (width >= 40rem) { a { color: red; } }`,
		},
		{
			description: `rejects an invalid media query`,
			code: `@media (width >) { a { color: red; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 8,
					endLine: 2,
					endColumn: 17,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Invalid media query "(width >)" (${rule})`,
				},
			],
		},
	],
})
