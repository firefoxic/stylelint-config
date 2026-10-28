import { testRule } from "../utils/testRule.ts"

let rule = `import-notation`

testRule({
	description: `The import notation must be a string`,
	rule,
	cases: [
		{
			description: `accepts url() notation`,
			code: `
				@import url("valid.css");
			`,
		},
		{
			description: `rejects string notation`,
			code: `
				@import "invalid.css";
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 9,
					endLine: 2,
					endColumn: 22,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected ""invalid.css"" to be "url("invalid.css")" (${rule})`,
				},
			],
		},
	],
})
