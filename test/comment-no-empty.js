import { testRule } from "../utils/testRule.js"

let rule = `comment-no-empty`

let code = `
/* comment */

/*
 * Multi-line Comment
**/

/**/

/* */

/*

 */
`

testRule({
	description: `The comment must not be empty`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 8,
			column: 1,
			endLine: 8,
			endColumn: 5,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected empty comment (${rule})`,
		},
		{
			line: 10,
			column: 1,
			endLine: 10,
			endColumn: 6,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected empty comment (${rule})`,
		},
		{
			line: 12,
			column: 1,
			endLine: 14,
			endColumn: 4,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected empty comment (${rule})`,
		},
	],
})
