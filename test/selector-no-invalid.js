import { testRule } from "../utils/testRule.js"

let rule = `selector-no-invalid`

let code = `
/* Valid */
a b {}
:nth-child(2n+1) {}
[foo] {}
:dir(ltr) {}

/* Invalid */
a ) b {}
:nth-child(2n+) {}
[0foo] {}
:dir(foo) {}
`

testRule({
	description: `Selectors must not be invalid`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 9,
			column: 3,
			endLine: 9,
			endColumn: 4,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Invalid selector "a ) b", unexpected input (${rule})`,
			url: undefined,
		},
		{
			line: 10,
			column: 15,
			endLine: 10,
			endColumn: 16,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Invalid selector ":nth-child(2n+)", integer is expected (${rule})`,
			url: undefined,
		},
		{
			line: 11,
			column: 2,
			endLine: 11,
			endColumn: 3,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Invalid selector "[0foo]", identifier is expected (${rule})`,
			url: undefined,
		},
		{
			line: 12,
			column: 1,
			endLine: 12,
			endColumn: 10,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Invalid selector ":dir(foo)", expected "ltr" or "rtl" (${rule})`,
			url: undefined,
		},
	],
})
