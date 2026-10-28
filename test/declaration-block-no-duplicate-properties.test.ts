import { testRule } from "../utils/testRule.ts"

let rule = `declaration-block-no-duplicate-properties`

testRule({
	description: `Declaration blocks must not contain duplicate properties`,
	rule,
	cases: [
		{
			description: `accepts unique declaration properties`,
			code: `
				a { color: pink; }
				a { color: pink; background: orange; }
			`,
		},
		{
			description: `rejects duplicate declaration properties`,
			code: `
				a { color: pink; color: orange; }
				a { color: pink; background: orange; color: orange }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 10,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate property "color" (${rule})`,
				},
				{
					line: 3,
					column: 5,
					endLine: 3,
					endColumn: 10,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate property "color" (${rule})`,
				},
			],
		},
	],
})
