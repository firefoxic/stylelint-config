import { testRule } from "../utils/testRule.ts"

let rule = `color-function-notation`

testRule({
	description: `The color function must be in modern notation`,
	rule,
	cases: [
		{
			description: `accepts modern notation`,
			code: `
				a { color: rgb(0 0 0) }
				a { color: rgb(12 122 231 / 0.2) }
				a { color: hsl(270 60% 50% / 15%) }
				a { color: hsl(.75turn 60% 70%) }
			`,
		},
		{
			description: `rejects legacy notation`,
			code: `
				a { color: rgb(0, 0, 0) }
				a { color: rgba(12, 122, 231, 0.2) }
				a { color: hsla(270, 60%, 50%, 15%) }
				a { color: hsl(.75turn, 60%, 70%) }
			`,
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
				{
					line: 3,
					column: 12,
					endLine: 3,
					endColumn: 35,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected modern color-function notation (${rule})`,
				},
				{
					line: 4,
					column: 12,
					endLine: 4,
					endColumn: 36,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected modern color-function notation (${rule})`,
				},
				{
					line: 5,
					column: 12,
					endLine: 5,
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
