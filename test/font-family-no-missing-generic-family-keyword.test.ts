import { testRule } from "../utils/testRule.ts"

let rule = `font-family-no-missing-generic-family-keyword`

testRule({
	description: `The font family must not be missing a generic family keyword`,
	rule,
	cases: [
		{
			description: `accepts generic families and font shorthands`,
			code: `
				.valid { font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif }
				.valid { font: 1em/1.3 Times, serif, Apple Color Emoji }
				.valid { font: inherit }
				.valid { font: caption }
				.valid { font-family: var(--font-family-common) }
				.valid { font-family: Helvetica, var(--font-family-common) }
			`,
		},
		{
			description: `rejects font families missing a generic family`,
			code: `
				.invalid { font-family: Helvetica, Arial, Verdana, Tahoma }
				.invalid { font: 1em/1.3 Times }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 52,
					endLine: 2,
					endColumn: 58,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Missing generic font family (${rule})`,
				},
				{
					line: 3,
					column: 26,
					endLine: 3,
					endColumn: 31,
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
