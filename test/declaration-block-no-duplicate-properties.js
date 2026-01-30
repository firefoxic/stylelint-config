import { testRule } from "../utils/testRule.js"

let rule = `declaration-block-no-duplicate-properties`

let code = `
/* Valid */
a { color: pink; }
a { color: pink; background: orange; }

/* Invalid */
a { color: pink; color: orange; }
a { color: pink; background: orange; color: orange }
`

testRule({
	description: `Declaration blocks must not contain duplicate properties`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 7,
			column: 5,
			endLine: 7,
			endColumn: 10,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected duplicate "color" (${rule})`,
		},
		{
			line: 8,
			column: 5,
			endLine: 8,
			endColumn: 10,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected duplicate "color" (${rule})`,
		},
	],
})
