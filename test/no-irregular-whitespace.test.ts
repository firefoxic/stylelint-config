import { testRule } from "../utils/testRule.ts"

let rule = `no-irregular-whitespace`

testRule({
	description: `Whitespace should not be irregular`,
	rule,
	cases: [
		{
			description: `accepts regular spaces`,
			code: `a { color: red; }`,
		},
		{
			description: `rejects a non-breaking space`,
			code: `a { color: red; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 2,
					endLine: 2,
					endColumn: 3,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Irregular whitespace (${rule})`,
				},
			],
		},
	],
})
