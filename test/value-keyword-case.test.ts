import { testRule } from "../utils/testRule.ts"

let rule = `value-keyword-case`

testRule({
	description: `Keywords must be in lower case`,
	rule,
	cases: [
		{
			description: `accepts lowercase keywords`,
			code: `
				.valid {
					color: currentcolor;
				}
			`,
		},
		{
			description: `rejects uppercase keywords`,
			code: `
				.invalid {
					color: currentColor;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 9,
					endLine: 3,
					endColumn: 21,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "currentColor" to be "currentcolor" (${rule})`,
				},
			],
		},
	],
})
