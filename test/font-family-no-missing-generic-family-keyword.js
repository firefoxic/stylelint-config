import { testRule } from "../utils/testRule.js"

let rule = `font-family-no-missing-generic-family-keyword`

let code = `
.valid { font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif }
.valid { font: 1em/1.3 Times, serif, Apple Color Emoji }
.valid { font: inherit }
.valid { font: caption }
.valid { font-family: var(--font-family-common) }
.valid { font-family: Helvetica, var(--font-family-common) }

.invalid { font-family: Helvetica, Arial, Verdana, Tahoma }
.invalid { font: 1em/1.3 Times }
`

testRule({
	description: `The font family must not be missing a generic family keyword`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 9,
			column: 52,
			endLine: 9,
			endColumn: 58,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected missing generic font family (${rule})`,
		},
		{
			line: 10,
			column: 26,
			endLine: 10,
			endColumn: 31,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected missing generic font family (${rule})`,
		},
	],
})
