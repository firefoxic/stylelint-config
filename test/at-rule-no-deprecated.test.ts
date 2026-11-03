import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-no-deprecated`

testRule({
	description: `Deprecated at-rules must not be used`,
	rule,
	cases: [
		{
			description: `accepts @keyframes`,
			code: `@keyframes --fade { from { opacity: 0; } }`,
		},
		{
			description: `rejects the deprecated @viewport at-rule`,
			code: `@viewport {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 10,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Deprecated at-rule "@viewport" (${rule})`,
				},
			],
		},
	],
})
