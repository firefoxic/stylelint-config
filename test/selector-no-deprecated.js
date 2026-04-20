import { testRule } from "../utils/testRule.js"

let rule = `selector-no-deprecated`

let code = `
/* Valid */
abbr {}
a:focus-visible {}

/* Invalid */
acronym {}
a:focus-ring {}
.foo::shadow a {}
`

testRule({
	description: `Selectors must not be deprecated`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 7,
			column: 1,
			endLine: 7,
			endColumn: 8,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Deprecated selector "acronym" (${rule})`,
			url: undefined,
		},
		{
			line: 8,
			column: 2,
			endLine: 8,
			endColumn: 13,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected ":focus-ring" to be ":focus-visible" (${rule})`,
			url: undefined,
		},
		{
			line: 9,
			column: 5,
			endLine: 9,
			endColumn: 13,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Deprecated selector "::shadow" (${rule})`,
			url: undefined,
		},
	],
})
