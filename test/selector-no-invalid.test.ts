import { testRule } from "../utils/testRule.ts"

let rule = `selector-no-invalid`

testRule({
	description: `Selectors must not be invalid`,
	rule,
	cases: [
		{
			description: `accepts a valid descendant selector`,
			code: `a b {}`,
		},
		{
			description: `accepts a valid :nth-child() selector`,
			code: `:nth-child(2n+1) {}`,
		},
		{
			description: `accepts a valid attribute selector`,
			code: `[foo] {}`,
		},
		{
			description: `accepts a valid :dir() selector`,
			code: `:dir(ltr) {}`,
		},
		{
			description: `rejects an unexpected closing parenthesis`,
			code: `a ) b {}`,
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
			],
		},
		{
			description: `rejects an invalid :nth-child() formula`,
			code: `:nth-child(2n+) {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 15,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Invalid selector ":nth-child(2n+)", integer is expected (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects an invalid attribute selector name`,
			code: `[0foo] {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 2,
					endLine: 2,
					endColumn: 3,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Invalid selector "[0foo]", identifier is expected (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects an unsupported :dir() value`,
			code: `:dir(foo) {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
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
