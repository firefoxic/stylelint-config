import { testRule } from "../utils/testRule.ts"

let rule = `color-no-hex`

testRule({
	description: `The color must not be in hex format`,
	rule,
	cases: [
		{
			description: `accepts named colors`,
			code: `a { color: black; }`,
		},
		{
			description: `accepts rgb() colors`,
			code: `a { color: rgb(0 0 0) }`,
		},
		{
			description: `accepts rgb() colors with alpha`,
			code: `a { color: rgb(0 0 0 / 0) }`,
		},
		{
			description: `rejects short hex colors`,
			code: `a { color: #000 }`,
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
			],
		},
		{
			description: `rejects six-digit hex colors`,
			code: `a { color: #fff1aa }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed hex color "#fff1aa" (${rule})`,
				},
			],
		},
		{
			description: `rejects eight-digit hex colors`,
			code: `a { color: #123456aa }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 21,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed hex color "#123456aa" (${rule})`,
				},
			],
		},
		{
			description: `rejects invalid hex colors`,
			code: `a { color: #foobar }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed hex color "#foobar" (${rule})`,
				},
			],
		},
		{
			description: `rejects sixteen-digit hex colors`,
			code: `a { color: #0000000000000000 }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
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
