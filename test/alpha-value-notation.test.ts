import { testRule } from "../utils/testRule.ts"

let rule = `alpha-value-notation`

testRule({
	description: `Alpha values must use number notation`,
	rule,
	cases: [
		{
			description: `accepts a number`,
			code: `a { color: rgb(0 0 0 / 0.5) }`,
		},
		{
			description: `rejects percentage notation`,
			code: `a { color: rgb(0 0 0 / 50%) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 24,
					endLine: 2,
					endColumn: 27,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "50%" to be "0.5" (${rule})`,
				},
			],
		},
	],
})
