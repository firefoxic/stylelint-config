import { testRule } from "../utils/testRule.ts"

let rule = `selector-no-invalid`

testRule({
	description: `Selectors must not be invalid`,
	rule,
	cases: [
		{
			description: `accepts valid selectors`,
			code: `
				a b {}
				:nth-child(2n+1) {}
				[foo] {}
				:dir(ltr) {}
			`,
		},
		{
			description: `rejects invalid selectors`,
			code: `
				a ) b {}
				:nth-child(2n+) {}
				[0foo] {}
				:dir(foo) {}
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 3,
					endLine: 2,
					endColumn: 4,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Invalid selector "a ) b", unexpected input (${rule})`,
					url: undefined,
				},
				{
					line: 3,
					column: 15,
					endLine: 3,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Invalid selector ":nth-child(2n+)", integer is expected (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 3,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Invalid selector "[0foo]", identifier is expected (${rule})`,
					url: undefined,
				},
				{
					line: 5,
					column: 1,
					endLine: 5,
					endColumn: 10,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Invalid selector ":dir(foo)", expected "ltr" or "rtl" within ":dir()" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
