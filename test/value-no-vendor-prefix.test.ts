import { testRule } from "../utils/testRule.ts"

let rule = `value-no-vendor-prefix`

testRule({
	description: `Values must not have vendor prefixes`,
	rule,
	cases: [
		{
			description: `accepts an unprefixed value`,
			code: `display: flex;`,
		},
		{
			description: `rejects a vendor-prefixed value`,
			code: `position: -webkit-sticky;`,
			expectedWarnings: [
				{
					line: 2,
					column: 11,
					endLine: 2,
					endColumn: 25,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Vendor-prefixed value "-webkit-sticky" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
