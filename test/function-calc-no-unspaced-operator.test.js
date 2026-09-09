import { testRule } from "../utils/testRule.js"

let rule = `function-calc-no-unspaced-operator`

let code = `
/* Valid */
a { top: calc(1px + 2px) }
a { top: calc(calc(1em * 2) / 3) }
a { top: calc(calc(1em*2)/3) }
a {
  top: calc(var(--foo) +
    var(--bar))
}
a {
  top: calc(var(--foo)
    + var(--bar))
}

/* Invalid */
a { top: calc(1px+2px) }
a { top: calc(1px+ 2px) }
a { transform: rotate(atan(-2+1)) }
`

testRule({
	description: `Math functions must not contain invalid unspaced operators`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 16,
			column: 18,
			endLine: 16,
			endColumn: 19,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected single space after "+" operator (${rule})`,
			url: undefined,
		},
		{
			line: 16,
			column: 18,
			endLine: 16,
			endColumn: 19,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected single space before "+" operator (${rule})`,
			url: undefined,
		},
		{
			line: 17,
			column: 18,
			endLine: 17,
			endColumn: 19,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected single space before "+" operator (${rule})`,
			url: undefined,
		},
		{
			line: 18,
			column: 30,
			endLine: 18,
			endColumn: 31,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected single space after "+" operator (${rule})`,
			url: undefined,
		},
		{
			line: 18,
			column: 30,
			endLine: 18,
			endColumn: 31,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected single space before "+" operator (${rule})`,
			url: undefined,
		},
	],
})
