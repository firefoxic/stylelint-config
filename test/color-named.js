import { testRule } from "../utils/testRule.js"

let rule = `color-named`

let code = `
/* Valid */
a { color: #000 }
a { color: rgb(0 0 0) }
a { color: var(--white) }

/* Invalid */
a { color: black }
a { color: white }
`

testRule({
	description: `The color must not be named`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 8,
			column: 12,
			endLine: 8,
			endColumn: 17,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected named color "black" (${rule})`,
		},
		{
			line: 9,
			column: 12,
			endLine: 9,
			endColumn: 17,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected named color "white" (${rule})`,
		},
	],
})
