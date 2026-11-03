import { testRule } from "../utils/testRule.ts"

let rule = `syntax-string-no-invalid`

testRule({
	description: `Syntax strings must be valid`,
	rule,
	cases: [
		{
			description: `accepts a valid registered-property syntax`,
			code: `
				@property --my-color {
					syntax: "<color>";
					inherits: false;
					initial-value: red;
				}
			`,
		},
		{
			description: `rejects an invalid registered-property syntax`,
			code: `
				@property --my-color {
					syntax: "<colour>";
					inherits: false;
					initial-value: red;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 10,
					endLine: 3,
					endColumn: 20,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Invalid syntax string "<colour>" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
