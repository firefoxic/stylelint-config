import { testRule } from "../utils/testRule.ts"

let rule = `color-named`

testRule({
	description: `The color must not be named`,
	rule,
	cases: [
		{
			description: `accepts hex colors`,
			code: `a { color: #000 }`,
		},
		{
			description: `accepts rgb() colors`,
			code: `a { color: rgb(0 0 0) }`,
		},
		{
			description: `accepts custom-property colors`,
			code: `a { color: var(--white) }`,
		},
		{
			description: `rejects black`,
			code: `a { color: black }`,
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
			],
		},
		{
			description: `rejects white`,
			code: `a { color: white }`,
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
					text: `Disallowed named color "white" (${rule})`,
				},
			],
		},
	],
})
