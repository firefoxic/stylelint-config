import { testRule } from "../utils/testRule.ts"

let rule = `layer-name-pattern`

testRule({
	description: `Layer names should be kebab-case`,
	rule,
	cases: [
		{
			description: `accepts a prefixed layer name`,
			code: `@layer --base {}`,
		},
		{
			description: `accepts a prefixed dotted layer name`,
			code: `@layer --base.--components {}`,
		},
		{
			description: `rejects a layer name without the required prefix`,
			code: `@layer components {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 8,
					endLine: 2,
					endColumn: 18,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected layer name "components" to be --kebab-case (${rule})`,
				},
			],
		},
	],
})
