import { testRule } from "../utils/testRule.js"

let rule = `declaration-property-value-no-unknown`

let code = `
.valid-1 { gap: 0 }
.valid-2 { gap: var(--foo) }

.invalid-1 { gap: red }
.invalid-2 { gap: unknown }
.invalid-3 { display: block table-row }
`

testRule({
	description: `The display property value must not be in legacy syntax`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 5,
			column: 19,
			endLine: 5,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected unknown value "red" for property "gap" (${rule})`,
		},
		{
			line: 6,
			column: 19,
			endLine: 6,
			endColumn: 26,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected unknown value "unknown" for property "gap" (${rule})`,
		},
		{
			line: 7,
			column: 29,
			endLine: 7,
			endColumn: 38,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected unknown value "table-row" for property "display" (${rule})`,
		},
	],
})
