import { testRule } from "../utils/testRule.ts"

let rule = `string-no-newline`

testRule({
	description: `Strings must not contain newlines`,
	rule,
	cases: [
		{
			description: `accepts a string on one line`,
			code: `a { content: "hello"; }`,
		},
		{
			description: `rejects a newline in a string`,
			code: `
				a {
					content: "hello\\\\
						world";
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 11,
					endLine: 3,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Newline in string (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
