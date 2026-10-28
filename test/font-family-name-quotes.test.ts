import { testRule } from "../utils/testRule.ts"

let rule = `font-family-name-quotes`

testRule({
	description: `The font name must be quoted unless it is just a valid CSS identifier`,
	rule,
	cases: [
		{
			description: `accepts an unquoted font name that is a valid identifier`,
			code: `a { font: 1em arial, sans-serif; }`,
		},
		{
			description: `accepts a multi-word font name without quotes when it is a valid identifier sequence`,
			code: `a { font-family: times new roman, times, serif; }`,
		},
		{
			description: `accepts a quoted font name that is not a valid identifier`,
			code: `a { font-family: "Hawaii 5-0"; }`,
		},
		{
			description: `rejects quotes around a font name that is a valid identifier`,
			code: `
				a {
					font: 1em "Arial", sans-serif;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 12,
					endLine: 3,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected no quotes around "Arial" (${rule})`,
				},
			],
		},
		{
			description: `rejects quotes around a multi-word font name`,
			code: `
				a {
					font-family: "Times New Roman", Times, serif;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 15,
					endLine: 3,
					endColumn: 32,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected no quotes around "Times New Roman" (${rule})`,
				},
			],
		},
	],
})
