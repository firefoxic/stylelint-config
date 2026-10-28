import { testRule } from "../utils/testRule.ts"

let rule = `no-invalid-double-slash-comments`

testRule({
	description: `CSS comments should use valid comment delimiters`,
	rule,
	cases: [
		{
			description: `accepts a valid CSS comment`,
			code: `/* a comment */ a { color: red; }`,
		},
		{
			description: `rejects a double-slash comment in a declaration block`,
			code: `
				a {
					//color: pink;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 2,
					endLine: 3,
					endColumn: 16,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Invalid double-slash CSS comment (${rule})`,
				},
			],
		},
	],
})
