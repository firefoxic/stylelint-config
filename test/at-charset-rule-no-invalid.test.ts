import { testRule } from "../utils/testRule.ts"

let rule = `at-charset-rule-no-invalid`

testRule({
	description: `@charset rules must be valid`,
	rule,
	cases: [
		{
			description: `accepts a valid charset declaration`,
			code: `@charset "utf-8";`,
		},
		{
			description: `rejects single quotes around the encoding`,
			code: `@charset 'utf-8';`,
			expectedWarnings: [
				{
					line: 1,
					column: 1,
					endLine: 1,
					endColumn: 18,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Invalid "@charset" rule, expected double quotes around the encoding label (${rule})`,
				},
			],
		},
	],
})
