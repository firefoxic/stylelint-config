import { testRule } from "../utils/testRule.ts"

let rule = `color-function-alias-notation`

testRule({
	description: `The color-functions must always use the without alpha notation`,
	rule,
	cases: [
		{
			description: `accepts color functions with or without alpha`,
			code: `
				a { color: rgb(0 0 0) }
				a { color: hsl(270 60% 50% / 15%) }
			`,
		},
		{
			description: `rejects alpha aliases`,
			code: `
				a { color: rgba(0 0 0) }
				a { color: hsla(270 60% 50% / 15%) }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 16,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "rgba" to be "rgb" (${rule})`,
				},
				{
					line: 3,
					column: 12,
					endLine: 3,
					endColumn: 16,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "hsla" to be "hsl" (${rule})`,
				},
			],
		},
	],
})
