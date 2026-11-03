import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-descriptor-no-unknown`

testRule({
	description: `At-rule descriptors must be known`,
	rule,
	cases: [
		{
			description: `accepts a known @font-face descriptor`,
			code: `@font-face { font-family: Example; }`,
		},
		{
			description: `rejects an unknown @font-face descriptor`,
			code: `@font-face { unknown-descriptor: value; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 32,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown descriptor "unknown-descriptor" for at-rule "@font-face" (${rule})`,
				},
			],
		},
	],
})
