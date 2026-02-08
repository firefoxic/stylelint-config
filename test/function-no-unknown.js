import { testRule } from "../utils/testRule.js"

let rule = `function-no-unknown`

let code = `
/* Valid */
a { transform: scale(1) }
a { transform: --custom-function(1) }

/* Invalid */
a { transform: unknown(1) }
`

testRule({
	description: `Unknown function names must be disallowed`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 7,
			column: 16,
			endLine: 7,
			endColumn: 23,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Unexpected unknown function "unknown" (${rule})`,
			url: undefined,
		},
	],
})
