import { testRule } from "../utils/testRule.ts"

let rule = `function-name-case`

testRule({
	description: `Function names must be lowercase`,
	rule,
	cases: [
		{
			description: `accepts "calc"`,
			code: `a { width: calc(5% - 10em) }`,
		},
		{
			description: `accepts prefixed lowercase function names`,
			code: `a { background: -webkit-radial-gradient(red, green, blue) }`,
		},
		{
			description: `rejects "Calc"`,
			code: `a { width: Calc(5% - 10em) }`,
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
			],
		},
		{
			description: `rejects mixed-case "cAlC"`,
			code: `a { width: cAlC(5% - 10em) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "cAlC" to be "calc" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects uppercase "CALC"`,
			code: `a { width: CALC(5% - 10em) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "CALC" to be "calc" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects uppercase prefixed function names`,
			code: `a { background: -WEBKIT-RADIAL-GRADIENT(red, green, blue) }`,
			expectedWarnings: [
				{
					line: 2,
					column: 17,
					endLine: 2,
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
