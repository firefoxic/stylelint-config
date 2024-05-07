import { testRule } from "../utils/testRule.js"

let rule = `import-notation`

let code = `
@import "valid.scss";
@import url("invalid.scss");
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
			endColumn: 28,
			rule,
			severity: `error`,
			text: `Expected "url("invalid.scss")" to be ""invalid.scss"" (${rule})`,
		},
	],
})
