import { testRule } from "../utils/testRule.ts"

let rule = `font-family-no-missing-generic-family-keyword`

testRule({
	description: `The font family must not be missing a generic family keyword`,
	rule,
	cases: [
		{
			description: `accepts a font family with a generic family keyword`,
			code: `a { font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif }`,
		},
		{
			description: `accepts a font shorthand with a generic family keyword`,
			code: `a { font: 1em/1.3 Times, serif, Apple Color Emoji }`,
		},
		{
			description: `accepts an inherited font shorthand`,
			code: `a { font: inherit }`,
		},
		{
			description: `accepts a system font keyword`,
			code: `a { font: caption }`,
		},
		{
			description: `accepts a font family provided by a custom property`,
			code: `a { font-family: var(--font-family-common) }`,
		},
		{
			description: `accepts a font family with a custom property after a named font`,
			code: `a { font-family: Helvetica, var(--font-family-common) }`,
		},
		{
			description: `rejects a font family without a generic family keyword`,
			code: `a { font-family: Helvetica, Arial, Verdana, Tahoma }`,
			expectedWarnings: [
				{
					line: 2,
					column: 45,
					endLine: 2,
					endColumn: 51,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Missing generic font family (${rule})`,
				},
			],
		},
		{
			description: `rejects a font shorthand without a generic family keyword`,
			code: `a { font: 1em/1.3 Times }`,
			expectedWarnings: [
				{
					line: 2,
					column: 19,
					endLine: 2,
					endColumn: 24,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Missing generic font family (${rule})`,
				},
			],
		},
	],
})
