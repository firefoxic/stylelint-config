import { testRule } from "../utils/testRule.ts"

let rule = `selector-attribute-quotes`

testRule({
	description: `Attribute values must be quoted`,
	rule,
	cases: [
		{
			description: `accepts a quoted attribute value`,
			code: `[type="button"] {}`,
		},
		{
			description: `rejects an unquoted attribute value`,
			code: `[type=button] {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 7,
					endLine: 2,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected quotes around "button" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
