import { testRule } from "../utils/testRule.js"

let rule = `custom-property-no-missing-var-function`

let code = `
:root { --valid-1: red }
a { color: var(--valid-1) }

@property --valid-2 {}
a { color: var(--valid-2) }

@property --valid-3 {}
a { transition-property: --valid-3 }

:root { --invalid-1: red }
a { color: --invalid-1 }

@property --invalid-2 {}
a { color: --invalid-2 }
`

testRule({
	description: `Custom properties must not be used without the "var()" function.`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 12,
			column: 12,
			endLine: 12,
			endColumn: 23,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected missing var function for "--invalid-1" (${rule})`,
		},
		{
			line: 15,
			column: 12,
			endLine: 15,
			endColumn: 23,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected missing var function for "--invalid-2" (${rule})`,
		},
	],
})
