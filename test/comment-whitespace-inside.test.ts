import { testRule } from "../utils/testRule.ts"

let rule = `comment-whitespace-inside`

testRule({
	description: `Comments must have whitespace inside`,
	rule,
	cases: [
		{
			description: `accepts whitespace inside a comment`,
			code: `/* comment */`,
		},
		{
			description: `rejects a comment without inner whitespace`,
			code: `/*comment*/`,
			expectedWarnings: [
				{
					line: 2,
					column: 3,
					endLine: 2,
					endColumn: 4,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected whitespace after "/*" (${rule})`,
				},
				{
					line: 2,
					column: 9,
					endLine: 2,
					endColumn: 10,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected whitespace before "*/" (${rule})`,
				},
			],
		},
	],
})
