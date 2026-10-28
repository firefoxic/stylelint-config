import { testRule } from "../utils/testRule.ts"

let rule = `function-no-unknown`

testRule({
	description: `Unknown function names must be disallowed`,
	rule,
	cases: [
		{
			description: `accepts known functions`,
			code: `a { transform: scale(1) }`,
		},
		{
			description: `accepts custom functions`,
			code: `a { transform: --custom-function(1) }`,
		},
		{
			description: `rejects unknown functions`,
			code: `
				a { transform: unknown(1) }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 16,
					endLine: 2,
					endColumn: 23,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Unknown function "unknown" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
