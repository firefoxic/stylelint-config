import { testRule } from "../utils/testRule.js"

let rule = `function-linear-gradient-no-nonstandard-direction`

let code = `
/* Valid */
a { background: linear-gradient(to top, #fff, #000) }
a { background: linear-gradient(to bottom right, #fff, #000) }
a { background: linear-gradient(45deg, #fff, #000) }
a { background: linear-gradient(1.57rad, #fff, #000) }
a { background: linear-gradient(#fff, #000) } /* Direction defaults to "to bottom" */

/* Invalid */
a { background: linear-gradient(top, #fff, #000) }
a { background: linear-gradient(bottom, #fff, #000) }
a { background: linear-gradient(left, #fff, #000) }
a { background: linear-gradient(45, #fff, #000) }
a { background: linear-gradient(to top top, #fff, #000) }
`

testRule({
	description: `Linear gradients must not contain non-standard direction keywords`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 10,
			column: 33,
			endLine: 10,
			endColumn: 36,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Unexpected nonstandard direction (${rule})`,
			url: undefined,
		},
		{
			line: 11,
			column: 33,
			endLine: 11,
			endColumn: 39,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Unexpected nonstandard direction (${rule})`,
			url: undefined,
		},
		{
			line: 12,
			column: 33,
			endLine: 12,
			endColumn: 37,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Unexpected nonstandard direction (${rule})`,
			url: undefined,
		},
		{
			line: 13,
			column: 33,
			endLine: 13,
			endColumn: 35,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Unexpected nonstandard direction (${rule})`,
			url: undefined,
		},
		{
			line: 14,
			column: 33,
			endLine: 14,
			endColumn: 43,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Unexpected nonstandard direction (${rule})`,
			url: undefined,
		},
	],
})
