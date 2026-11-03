import { testRule } from "../utils/testRule.ts"

let rule = `font-family-no-duplicate-names`

testRule({
	description: `The font family should not be duplicated, except for the monospace keyword`,
	rule,
	cases: [
		{
			description: `accepts a font family without duplicate names`,
			code: `a { font-family: vollkorn, serif; }`,
		},
		{
			description: `accepts duplicate monospace keywords`,
			code: `a { font-family: monospace, monospace; }`,
		},
		{
			description: `accepts duplicate monospace keywords after another font name`,
			code: `a { font-family: fira-code, monospace, monospace; }`,
		},
		{
			description: `rejects a duplicate font-family name`,
			code: `
				a {
					font-family: "Arial", Arial, sans-serif;
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
			],
		},
		{
			description: `rejects a duplicate generic family in a font shorthand`,
			code: `
				a {
					font: 1em system-ui, sans-serif, sans-serif;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 35,
					endLine: 3,
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
