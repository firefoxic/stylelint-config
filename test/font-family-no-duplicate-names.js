import { testRule } from "../utils/testRule.js"

let rule = `font-family-no-duplicate-names`

let code = `
.valid {
	font-family: vollkorn, serif;
}

.valid {
	font-family: monospace, monospace;
}

.valid {
	font-family: fira-code, monospace, monospace;
}

.invalid {
	font-family: "Arial", Arial, sans-serif;
}

.invalid {
	font: 1em system-ui, sans-serif, sans-serif;
}
`

testRule({
	description: `The font family should not be duplicated, except for the monospace keyword`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 15,
			column: 24,
			endLine: 15,
			endColumn: 29,
			rule,
			severity: `error`,
			text: `Unexpected duplicate name Arial (${rule})`,
		},
		{
			line: 19,
			column: 35,
			endLine: 19,
			endColumn: 45,
			rule,
			severity: `error`,
			text: `Unexpected duplicate name sans-serif (${rule})`,
		},
	],
})
