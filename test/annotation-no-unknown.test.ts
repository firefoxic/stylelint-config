import { testRule } from "../utils/testRule.ts"

let rule = `annotation-no-unknown`

testRule({
	description: `Annotations must be known`,
	rule,
	cases: [
		{
			description: `accepts known annotations`,
			code: `
				.valid {
					top: 0;
					gap: 0 !important;
				}
			`,
		},
		{
			description: `rejects unknown annotations`,
			code: `
				.invalid {
					gap: 0 !imprtant;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 9,
					endLine: 3,
					endColumn: 18,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown annotation "!imprtant" (${rule})`,
				},
			],
		},
	],
})
