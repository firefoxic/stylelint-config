import { testRule } from "../utils/testRule.ts"

let rule = `annotation-no-unknown`

testRule({
	description: `Annotations must be known`,
	rule,
	cases: [
		{
			description: `accepts a known declaration`,
			code: `a { gap: 0; }`,
		},
		{
			description: `accepts !important`,
			code: `a { gap: 0 !important; }`,
		},
		{
			description: `rejects unknown annotations`,
			code: `a { gap: 0 !imprtant; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 21,
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
