import { testRule } from "../utils/testRule.js"

let rule = `color-no-hex`

let code = `
/* Valid */
a { color: black; }
a { color: rgb(0 0 0) }
a { color: rgb(0 0 0 / 0) }

/* Invalid */
a { color: #000 }
a { color: #fff1aa }
a { color: #123456aa }
a { color: #foobar }
a { color: #0000000000000000 }
`

testRule({
	description: `The color must not be in hex format`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 8,
			column: 12,
			endLine: 8,
			endColumn: 16,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected hex color "#000" (${rule})`,
		},
		{
			line: 9,
			column: 12,
			endLine: 9,
			endColumn: 19,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected hex color "#fff1aa" (${rule})`,
		},
		{
			line: 10,
			column: 12,
			endLine: 10,
			endColumn: 21,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected hex color "#123456aa" (${rule})`,
		},
		{
			line: 11,
			column: 12,
			endLine: 11,
			endColumn: 19,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected hex color "#foobar" (${rule})`,
		},
		{
			line: 12,
			column: 12,
			endLine: 12,
			endColumn: 29,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected hex color "#0000000000000000" (${rule})`,
		},
	],
})
