import { testRule } from "../utils/testRule.js"

let rule = `declaration-no-important`

let code = `
/* Valid */
a { gap: 0 }

/* Invalid */
a { gap: 0 !important }
a { gap: 0 ! important }
a { gap: 0!important }
`

testRule({
	description: `Declarations must not contain "!important"`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 6,
			column: 12,
			endLine: 6,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected !important (${rule})`,
		},
		{
			line: 7,
			column: 12,
			endLine: 7,
			endColumn: 23,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected !important (${rule})`,
		},
		{
			line: 8,
			column: 11,
			endLine: 8,
			endColumn: 21,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected !important (${rule})`,
		},
	],
})
