import { testRule } from "../utils/testRule.ts"

let rule = `comment-empty-line-before`

testRule({
	description: `Comments must be preceded by an empty line`,
	rule,
	cases: [
		{
			description: `accepts a comment after an empty line`,
			code: `
				a { color: red; }

				/* comment */
			`,
		},
		{
			description: `rejects a comment without an empty line`,
			code: `
				a { color: red; }
				/* comment */
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 1,
					endLine: 3,
					endColumn: 14,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before comment (${rule})`,
				},
			],
		},
	],
})
