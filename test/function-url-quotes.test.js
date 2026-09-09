import { testRule } from "../utils/testRule.js"

let rule = `function-url-quotes`

let code = `
/* Valid */
@import url("foo.css");
a { background: url('x.jpg') }
@font-face { font-family: foo; src: url("foo.ttf") }

/* Invalid */
@import url(foo.css);
@font-face { font-family: foo; src: url(foo.ttf) }
`

testRule({
	description: `"url()" function must always have quotes around its argument`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 8,
			column: 13,
			endLine: 8,
			endColumn: 20,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected quotes around "url" function argument (${rule})`,
			url: undefined,
		},
		{
			line: 9,
			column: 41,
			endLine: 9,
			endColumn: 48,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected quotes around "url" function argument (${rule})`,
			url: undefined,
		},
	],
})
