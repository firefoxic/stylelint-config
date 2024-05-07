import { testRule } from "../utils/testRule.js"

let rule = `font-family-name-quotes`

let code = `
/* The correct code */
.valid-1 {
	font: 1em arial, sans-serif;
}

.valid-2 {
	font-family: times new roman, times, serif;
}

.valid-3 {
	font-family: "Hawaii 5-0";
}

.invalid-1 {
	font: 1em "Arial", sans-serif;
}

.invalid-2 {
	font-family: "Times New Roman", Times, serif;
}
`

testRule({
	description: `The font name must be quoted unless it is just a valid CSS identifier`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 16,
			column: 12,
			endLine: 16,
			endColumn: 19,
			rule,
			severity: `error`,
			text: `Unexpected quotes around "Arial" (${rule})`,
		},
		{
			line: 20,
			column: 15,
			endLine: 20,
			endColumn: 32,
			rule,
			severity: `error`,
			text: `Unexpected quotes around "Times New Roman" (${rule})`,
		},
	],
})
