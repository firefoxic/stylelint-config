import { testRule } from "../utils/testRule.ts"

let rule = `function-name-case`

testRule({
	description: `Function names must be lowercase`,
	rule,
	cases: [
		{
			description: `accepts lowercase function names`,
			code: `
				a { width: calc(5% - 10em) }
				a { background: -webkit-radial-gradient(red, green, blue) }
			`,
		},
		{
			description: `rejects uppercase function names`,
			code: `
				a { width: Calc(5% - 10em) }
				a { width: cAlC(5% - 10em) }
				a { width: CALC(5% - 10em) }
				a { background: -WEBKIT-RADIAL-GRADIENT(red, green, blue) }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "Calc" to be "calc" (${rule})`,
					url: undefined,
				},
				{
					line: 3,
					column: 12,
					endLine: 3,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "cAlC" to be "calc" (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 12,
					endLine: 4,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "CALC" to be "calc" (${rule})`,
					url: undefined,
				},
				{
					line: 5,
					column: 17,
					endLine: 5,
					endColumn: 40,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "-WEBKIT-RADIAL-GRADIENT" to be "-webkit-radial-gradient" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
