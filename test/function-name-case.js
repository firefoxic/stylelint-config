import { testRule } from "../utils/testRule.js"

let rule = `function-name-case`

let code = `
/* Valid */
a { width: calc(5% - 10em) }
a { background: -webkit-radial-gradient(red, green, blue) }

/* Invalid */
a { width: Calc(5% - 10em) }
a { width: cAlC(5% - 10em) }
a { width: CALC(5% - 10em) }
a { background: -WEBKIT-RADIAL-GRADIENT(red, green, blue) }
`

testRule({
	description: `Function names must be lowercase`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 7,
			column: 12,
			endLine: 7,
			endColumn: 16,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected "Calc" to be "calc" (${rule})`,
			url: undefined,
		},
		{
			line: 8,
			column: 12,
			endLine: 8,
			endColumn: 16,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected "cAlC" to be "calc" (${rule})`,
			url: undefined,
		},
		{
			line: 9,
			column: 12,
			endLine: 9,
			endColumn: 16,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected "CALC" to be "calc" (${rule})`,
			url: undefined,
		},
		{
			line: 10,
			column: 17,
			endLine: 10,
			endColumn: 40,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected "-WEBKIT-RADIAL-GRADIENT" to be "-webkit-radial-gradient" (${rule})`,
			url: undefined,
		},
	],
})
