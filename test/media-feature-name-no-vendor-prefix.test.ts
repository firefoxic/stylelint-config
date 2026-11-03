import { testRule } from "../utils/testRule.ts"

let rule = `media-feature-name-no-vendor-prefix`

testRule({
	description: `Media feature names should not have vendor prefixes`,
	rule,
	cases: [
		{
			description: `accepts an unprefixed media feature`,
			code: `@media (min-width: 40rem) { a { color: red; } }`,
		},
		{
			description: `rejects a vendor-prefixed media feature`,
			code: `@media (-webkit-min-device-pixel-ratio: 2) { a { color: red; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 9,
					endLine: 2,
					endColumn: 39,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Vendor-prefixed media feature name (${rule})`,
				},
			],
		},
	],
})
