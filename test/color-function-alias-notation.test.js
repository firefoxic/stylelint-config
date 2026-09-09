import { testRule } from "../utils/testRule.js"

let rule = `color-function-alias-notation`

let code = `
/* Valid */
a { color: rgb(0 0 0) }
a { color: hsl(270 60% 50% / 15%) }

/* Invalid */
a { color: rgba(0 0 0) }
a { color: hsla(270 60% 50% / 15%) }
`

testRule({
	description: `The color-functions must always use the without alpha notation`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 7,
			column: 12,
			endLine: 7,
			endColumn: 16,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected "rgba" to be "rgb" (${rule})`,
		},
		{
			line: 8,
			column: 12,
			endLine: 8,
			endColumn: 16,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected "hsla" to be "hsl" (${rule})`,
		},
	],
})
