import { testRule } from "../utils/testRule.ts"

let rule = `font-family-name-quotes`

testRule({
	description: `The font name must be quoted unless it is just a valid CSS identifier`,
	rule,
	cases: [
		{
			description: `accepts font names with the expected quoting`,
			code: `
				.valid-1 {
					font: 1em arial, sans-serif;
				}

				.valid-2 {
					font-family: times new roman, times, serif;
				}

				.valid-3 {
					font-family: "Hawaii 5-0";
				}
			`,
		},
		{
			description: `rejects quoted font names that are valid identifiers`,
			code: `
				.invalid-1 {
					font: 1em "Arial", sans-serif;
				}

				.invalid-2 {
					font-family: "Times New Roman", Times, serif;
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
				{
					line: 7,
					column: 15,
					endLine: 7,
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
