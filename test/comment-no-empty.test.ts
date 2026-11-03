import { testRule } from "../utils/testRule.ts"

let rule = `comment-no-empty`

testRule({
	description: `The comment must not be empty`,
	rule,
	cases: [
		{
			description: `accepts non-empty comments`,
			code: `
				/* comment */

				/*
				 * Multi-line Comment
				**/
			`,
		},
		{
			description: `rejects empty comments`,
			code: `
				/**/

				/* */

				/*

				 */
			`,
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
				{
					line: 4,
					column: 1,
					endLine: 4,
					endColumn: 6,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty comment (${rule})`,
				},
				{
					line: 6,
					column: 1,
					endLine: 8,
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
