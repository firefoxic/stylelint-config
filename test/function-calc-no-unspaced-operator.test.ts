import { testRule } from "../utils/testRule.ts"

let rule = `function-calc-no-unspaced-operator`

testRule({
	description: `Math functions must not contain invalid unspaced operators`,
	rule,
	cases: [
		{
			description: `accepts a spaced addition operator`,
			code: `a { top: calc(1px + 2px) }`,
		},
		{
			description: `accepts nested spaced multiplication and division`,
			code: `a { top: calc(calc(1em * 2) / 3) }`,
		},
		{
			description: `accepts unspaced multiplication and division`,
			code: `a { top: calc(calc(1em*2)/3) }`,
		},
		{
			description: `accepts a multiline expression with the operator at the end`,
			code: `
				a {
				  top: calc(var(--foo) +
				    var(--bar))
				}
			`,
		},
		{
			description: `accepts a multiline expression with the operator at the start`,
			code: `
				a {
				  top: calc(var(--foo)
				    + var(--bar))
				}
			`,
		},
		{
			description: `rejects an addition operator without spaces`,
			code: `a { top: calc(1px+2px) }`,
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
			],
		},
		{
			description: `rejects an addition operator without a preceding space`,
			code: `a { top: calc(1px+ 2px) }`,
			expectedWarnings: [
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
			],
		},
		{
			description: `rejects an addition operator in "atan()" without spaces`,
			code: `a { transform: rotate(atan(-2+1)) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 30,
					endLine: 2,
					endColumn: 31,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected single space after "+" operator (${rule})`,
					url: undefined,
				},
				{
					line: 2,
					column: 30,
					endLine: 2,
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
