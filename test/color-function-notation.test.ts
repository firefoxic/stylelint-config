import { testRule } from "../utils/testRule.ts"

let rule = `color-function-notation`

testRule({
	description: `The color function must be in modern notation`,
	rule,
	cases: [
		{
			description: `accepts modern rgb() notation`,
			code: `a { color: rgb(0 0 0) }`,
		},
		{
			description: `accepts modern rgb() notation with alpha`,
			code: `a { color: rgb(12 122 231 / 0.2) }`,
		},
		{
			description: `accepts modern hsl() notation with alpha`,
			code: `a { color: hsl(270 60% 50% / 15%) }`,
		},
		{
			description: `accepts modern hsl() notation with turns`,
			code: `a { color: hsl(.75turn 60% 70%) }`,
		},
		{
			description: `rejects legacy rgb() notation`,
			code: `a { color: rgb(0, 0, 0) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 24,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected modern color-function notation (${rule})`,
				},
			],
		},
		{
			description: `rejects legacy rgba() notation`,
			code: `a { color: rgba(12, 122, 231, 0.2) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 35,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected modern color-function notation (${rule})`,
				},
			],
		},
		{
			description: `rejects legacy hsla() notation`,
			code: `a { color: hsla(270, 60%, 50%, 15%) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 36,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected modern color-function notation (${rule})`,
				},
			],
		},
		{
			description: `rejects legacy hsl() notation`,
			code: `a { color: hsl(.75turn, 60%, 70%) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 34,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected modern color-function notation (${rule})`,
				},
			],
		},
	],
})
