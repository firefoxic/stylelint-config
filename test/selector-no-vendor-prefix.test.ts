import { testRule } from "../utils/testRule.ts"

let rule = `selector-no-vendor-prefix`

testRule({
	description: `Selectors must not have vendor prefixes`,
	rule,
	cases: [
		{
			description: `accepts an unprefixed pseudo-element`,
			code: `input::placeholder {}`,
		},
		{
			description: `rejects a vendor-prefixed pseudo-element`,
			code: `input::-webkit-input-placeholder {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 6,
					endLine: 2,
					endColumn: 33,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Vendor-prefixed selector "::-webkit-input-placeholder" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
