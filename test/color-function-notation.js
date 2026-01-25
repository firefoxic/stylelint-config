import { testRule } from "../utils/testRule.js"

let rule = `color-function-notation`

let code = `
/* Valid */
a { color: rgb(0 0 0) }
a { color: rgb(12 122 231 / 0.2) }
a { color: hsl(270 60% 50% / 15%) }
a { color: hsl(.75turn 60% 70%) }

/* Invalid */
a { color: rgb(0, 0, 0) }
a { color: rgba(12, 122, 231, 0.2) }
a { color: hsla(270, 60%, 50%, 15%) }
a { color: hsl(.75turn, 60%, 70%) }
`

testRule({
	description: `The color function must be in modern notation`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 9,
			column: 12,
			endLine: 9,
			endColumn: 24,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected modern color-function notation (${rule})`,
		},
		{
			line: 10,
			column: 12,
			endLine: 10,
			endColumn: 35,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected modern color-function notation (${rule})`,
		},
		{
			line: 11,
			column: 12,
			endLine: 11,
			endColumn: 36,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected modern color-function notation (${rule})`,
		},
		{
			line: 12,
			column: 12,
			endLine: 12,
			endColumn: 34,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected modern color-function notation (${rule})`,
		},
	],
})
