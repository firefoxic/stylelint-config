import { testRule } from "../utils/testRule.ts"

let rule = `function-url-quotes`

testRule({
	description: `"url()" function must always have quotes around its argument`,
	rule,
	cases: [
		{
			description: `accepts quoted url() arguments`,
			code: `
				@import url("foo.css");
				a { background: url('x.jpg') }
				@font-face { font-family: foo; src: url("foo.ttf") }
			`,
		},
		{
			description: `rejects unquoted url() arguments`,
			code: `
				@import url(foo.css);
				@font-face { font-family: foo; src: url(foo.ttf) }
			`,
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
				{
					line: 3,
					column: 41,
					endLine: 3,
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
