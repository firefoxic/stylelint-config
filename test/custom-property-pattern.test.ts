import { testRule } from "../utils/testRule.ts"

let rule = `custom-property-pattern`

testRule({
	description: `Custom property names must be kebab-case`,
	rule,
	cases: [
		{
			description: `accepts a kebab-case custom property`,
			code: `a { --brand-color: red; }`,
		},
		{
			description: `rejects a camel-case custom property`,
			code: `a { --brandColor: red; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 17,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected custom property name "--brandColor" to be kebab-case (${rule})`,
				},
			],
		},
	],
})
