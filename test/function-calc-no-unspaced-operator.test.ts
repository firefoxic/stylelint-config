import { testRule } from "../utils/testRule.ts"

let rule = `function-calc-no-unspaced-operator`

testRule({
	description: `Math functions must not contain invalid unspaced operators`,
	rule,
	cases: [
		{
			description: `accepts correctly spaced math operators`,
			code: `
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
			`,
		},
		{
			description: `rejects unspaced math operators`,
			code: `
				a { top: calc(1px+2px) }
				a { top: calc(1px+ 2px) }
				a { transform: rotate(atan(-2+1)) }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 18,
					endLine: 2,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected single space after "+" operator (${rule})`,
					url: undefined,
				},
				{
					line: 2,
					column: 18,
					endLine: 2,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected single space before "+" operator (${rule})`,
					url: undefined,
				},
				{
					line: 3,
					column: 18,
					endLine: 3,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected single space before "+" operator (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 30,
					endLine: 4,
					endColumn: 31,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected single space after "+" operator (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 30,
					endLine: 4,
					endColumn: 31,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected single space before "+" operator (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
