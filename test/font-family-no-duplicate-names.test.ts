import { testRule } from "../utils/testRule.ts"

let rule = `font-family-no-duplicate-names`

testRule({
	description: `The font family should not be duplicated, except for the monospace keyword`,
	rule,
	cases: [
		{
			description: `accepts font families without duplicate names`,
			code: `
				.valid {
					font-family: vollkorn, serif;
				}

				.valid {
					font-family: monospace, monospace;
				}

				.valid {
					font-family: fira-code, monospace, monospace;
				}
			`,
		},
		{
			description: `rejects duplicate font-family names`,
			code: `
				.invalid {
					font-family: "Arial", Arial, sans-serif;
				}

				.invalid {
					font: 1em system-ui, sans-serif, sans-serif;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 24,
					endLine: 3,
					endColumn: 29,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate font-family name "Arial" (${rule})`,
				},
				{
					line: 7,
					column: 35,
					endLine: 7,
					endColumn: 45,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate font-family name "sans-serif" (${rule})`,
				},
			],
		},
	],
})
