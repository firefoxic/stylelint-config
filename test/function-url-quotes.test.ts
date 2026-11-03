import { testRule } from "../utils/testRule.ts"

let rule = `function-url-quotes`

testRule({
	description: `"url()" function must always have quotes around its argument`,
	rule,
	cases: [
		{
			description: `accepts a quoted url() argument in an import`,
			code: `@import url("foo.css");`,
		},
		{
			description: `accepts a single-quoted url() argument in a declaration`,
			code: `a { background: url('x.jpg') }`,
		},
		{
			description: `accepts a quoted url() argument in a font-face declaration`,
			code: `@font-face { font-family: foo; src: url("foo.ttf") }`,
		},
		{
			description: `rejects an unquoted url() argument in an import`,
			code: `@import url(foo.css);`,
			expectedWarnings: [
				{
					line: 2,
					column: 13,
					endLine: 2,
					endColumn: 20,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected quotes around "url" function argument (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects an unquoted url() argument in a font-face declaration`,
			code: `@font-face { font-family: foo; src: url(foo.ttf) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 41,
					endLine: 2,
					endColumn: 48,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected quotes around "url" function argument (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
