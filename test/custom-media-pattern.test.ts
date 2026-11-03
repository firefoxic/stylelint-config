import { testRule } from "../utils/testRule.ts"

let rule = `custom-media-pattern`

testRule({
	description: `Custom media names must be kebab-case`,
	rule,
	cases: [
		{
			description: `accepts a kebab-case custom media name`,
			code: `@custom-media --small-screen (width < 40em);`,
		},
		{
			description: `rejects a camel-case custom media name`,
			code: `@custom-media --smallScreen (width < 40em);`,
			expectedWarnings: [
				{
					line: 2,
					column: 15,
					endLine: 2,
					endColumn: 28,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected custom media query name "--smallScreen" to be kebab-case (${rule})`,
				},
			],
		},
	],
})
