import { testRule } from "../utils/testRule.ts"

let rule = `keyframe-selector-notation`

testRule({
	description: `Keyframe selectors should use the configured notation`,
	rule,
	cases: [
		{
			description: `accepts percentages`,
			code: `@keyframes --fade { 0% { opacity: 0; } 100% { opacity: 1; } }`,
		},
		{
			description: `accepts keyword-only selectors`,
			code: `@keyframes --fade { from { opacity: 0; } to { opacity: 1; } }`,
		},
		{
			description: `rejects mixed keyword and percentage selectors`,
			code: `@keyframes --fade { from { opacity: 0; } 100% { opacity: 1; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 21,
					endLine: 2,
					endColumn: 25,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "from" to be "0%" (${rule})`,
				},
			],
		},
	],
})
