import { testRule } from "../utils/testRule.ts"

let rule = `color-no-hex`

testRule({
	description: `The color must not be in hex format`,
	rule,
	cases: [
		{
			description: `accepts non-hex colors`,
			code: `
				a { color: black; }
				a { color: rgb(0 0 0) }
				a { color: rgb(0 0 0 / 0) }
			`,
		},
		{
			description: `rejects hex colors`,
			code: `
				a { color: #000 }
				a { color: #fff1aa }
				a { color: #123456aa }
				a { color: #foobar }
				a { color: #0000000000000000 }
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
					text: `Disallowed hex color "#000" (${rule})`,
				},
				{
					line: 3,
					column: 12,
					endLine: 3,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed hex color "#fff1aa" (${rule})`,
				},
				{
					line: 4,
					column: 12,
					endLine: 4,
					endColumn: 21,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed hex color "#123456aa" (${rule})`,
				},
				{
					line: 5,
					column: 12,
					endLine: 5,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed hex color "#foobar" (${rule})`,
				},
				{
					line: 6,
					column: 12,
					endLine: 6,
					endColumn: 29,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed hex color "#0000000000000000" (${rule})`,
				},
			],
		},
	],
})
