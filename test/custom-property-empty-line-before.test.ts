import { testRule } from "../utils/testRule.ts"

let rule = `custom-property-empty-line-before`

testRule({
	description: `Custom properties must be preceded by an empty line`,
	rule,
	cases: [
		{
			description: `accepts a custom property at the start of a block`,
			code: `a { --color: red; }`,
		},
		{
			description: `rejects a custom property after a declaration without an empty line`,
			code: `
				a {
					color: red;
					--color: blue;
				}
			`,
			expectedWarnings: [
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 16,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before custom property (${rule})`,
				},
			],
		},
	],
})
