import { testRule } from "../utils/testRule.ts"

let rule = `comment-no-empty`

testRule({
	description: `The comment must not be empty`,
	rule,
	cases: [
		{
			description: `accepts a single-line comment`,
			code: `/* comment */`,
		},
		{
			description: `accepts a multi-line comment`,
			code: `
				/*
				 * Multi-line Comment
				**/
			`,
		},
		{
			description: `rejects an empty comment`,
			code: `/**/`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 5,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty comment (${rule})`,
				},
			],
		},
		{
			description: `rejects a whitespace-only comment`,
			code: `/* */`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 6,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty comment (${rule})`,
				},
			],
		},
		{
			description: `rejects a multi-line empty comment`,
			code: `
				/*

				 */
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 4,
					endColumn: 4,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty comment (${rule})`,
				},
			],
		},
	],
})
