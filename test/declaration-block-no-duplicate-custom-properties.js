import { testRule } from "../utils/testRule.js"

let rule = `declaration-block-no-duplicate-custom-properties`

let code = `
/* Valid */
a { --size: 1 }
a { --size: 1; --SIZE: 2 }

/* Invalid */
a { --size: 1; --size: 2 }
a { --size: 1; gap: 0; --size: 2 }
`

testRule({
	description: `Declaration blocks must not contain duplicate custom properties`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 7,
			column: 16,
			endLine: 7,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected duplicate "--size" (${rule})`,
		},
		{
			line: 8,
			column: 24,
			endLine: 8,
			endColumn: 30,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected duplicate "--size" (${rule})`,
		},
	],
})
