import { testRule } from "../utils/testRule.ts"

let rule = `function-url-no-scheme-relative`

testRule({
	description: `URL functions must not use scheme-relative URLs`,
	rule,
	cases: [
		{
			description: `accepts an absolute URL`,
			code: `a { background: url("https://example.com/image.png"); }`,
		},
		{
			description: `rejects a scheme-relative URL`,
			code: `a { background: url("//example.com/image.png"); }`,
			expectedWarnings: [
				{
					line: 2,
					column: 21,
					endLine: 2,
					endColumn: 46,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed scheme-relative url (${rule})`,
				},
			],
		},
	],
})
