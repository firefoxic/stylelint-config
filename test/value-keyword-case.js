import { testRule } from "../utils/testRule.js"

let rule = `value-keyword-case`

let code = `
.valid {
	color: currentcolor;
}

.invalid {
	color: currentColor;
}
`

testRule({
	description: `Keywords must be in lower case`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 7,
			column: 9,
			endLine: 7,
			endColumn: 10,
			rule,
			severity: `error`,
			text: `Expected "currentColor" to be "currentcolor" (${rule})`,
		},
	],
})
