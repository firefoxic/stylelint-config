import { testRule } from "../utils/testRule.ts"

let rule = `property-no-vendor-prefix`

testRule({
	description: `Properties must not have vendor prefixes`,
	rule,
	cases: [
		{
			description: `accepts an unprefixed property`,
			code: `appearance: none;`,
		},
		{
			description: `rejects a vendor-prefixed property`,
			code: `-webkit-border-radius: 0;`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 22,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Vendor-prefixed property "-webkit-border-radius" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
