import { testRule } from "../utils/testRule.js"

let rule = `annotation-no-unknown`

let code = `
.valid {
	top: 0;
	gap: 0 !important;
}

.invalid {
	gap: 0 !imprtant;
}
`

testRule({
	description: `Annotations must be known`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 8,
			column: 9,
			endLine: 8,
			endColumn: 18,
			rule,
			severity: `error`,
			text: `Unexpected unknown annotation "!imprtant" (${rule})`,
		},
	],
})
