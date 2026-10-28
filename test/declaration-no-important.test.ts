import { testRule } from "../utils/testRule.ts"

let rule = `declaration-no-important`

testRule({
	description: `Declarations must not contain "!important"`,
	rule,
	cases: [
		{
			description: `accepts declarations without !important`,
			code: `
				a { gap: 0 }
			`,
		},
		{
			description: `rejects !important in every spacing form`,
			code: `
				a { gap: 0 !important }
				a { gap: 0 ! important }
				a { gap: 0!important }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 22,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed !important (${rule})`,
				},
				{
					line: 3,
					column: 12,
					endLine: 3,
					endColumn: 23,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed !important (${rule})`,
				},
				{
					line: 4,
					column: 11,
					endLine: 4,
					endColumn: 21,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed !important (${rule})`,
				},
			],
		},
	],
})
