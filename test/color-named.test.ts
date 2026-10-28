import { testRule } from "../utils/testRule.ts"

let rule = `color-named`

testRule({
	description: `The color must not be named`,
	rule,
	cases: [
		{
			description: `accepts non-named colors`,
			code: `
				a { color: #000 }
				a { color: rgb(0 0 0) }
				a { color: var(--white) }
			`,
		},
		{
			description: `rejects named colors`,
			code: `
				a { color: black }
				a { color: white }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 17,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed named color "black" (${rule})`,
				},
				{
					line: 3,
					column: 12,
					endLine: 3,
					endColumn: 17,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed named color "white" (${rule})`,
				},
			],
		},
	],
})
