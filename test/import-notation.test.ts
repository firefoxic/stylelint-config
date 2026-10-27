import { testRule } from "../utils/testRule.ts"

let rule = `import-notation`

let code = `
@import url("valid.css");
@import "invalid.css";
`

testRule({
	description: `The import notation must be a string`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 3,
			column: 9,
			endLine: 3,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected ""invalid.css"" to be "url("invalid.css")" (${rule})`,
		},
	],
})
