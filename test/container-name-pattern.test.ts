import { testRule } from "../utils/testRule.ts"

let rule = `container-name-pattern`

testRule({
	description: `Container names must be kebab-case`,
	rule,
	cases: [
		{
			description: `accepts a kebab-case container name`,
			code: `.card { container-name: --card-layout; }`,
		},
		{
			description: `rejects a camel-case container name`,
			code: `.card { container-name: --cardLayout; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 25,
					endLine: 2,
					endColumn: 37,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected container name "--cardLayout" to be --kebab-case (${rule})`,
				},
			],
		},
	],
})
