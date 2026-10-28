import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-descriptor-value-no-unknown`

testRule({
	description: `At-rule descriptor values must be known`,
	rule,
	cases: [
		{
			description: `accepts a valid @font-face descriptor value`,
			code: `@font-face { font-style: italic; }`,
		},
		{
			description: `rejects an invalid @font-face descriptor value`,
			code: `@font-face { font-style: 10px; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 26,
					endLine: 2,
					endColumn: 30,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown value "10px" for descriptor "font-style" (${rule})`,
				},
			],
		},
	],
})
