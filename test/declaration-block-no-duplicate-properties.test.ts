import { testRule } from "../utils/testRule.ts"

let rule = `declaration-block-no-duplicate-properties`

testRule({
	description: `Declaration blocks must not contain duplicate properties`,
	rule,
	cases: [
		{
			description: `accepts a single declaration`,
			code: `a { color: pink; }`,
		},
		{
			description: `accepts distinct declaration properties`,
			code: `a { color: pink; background: orange; }`,
		},
		{
			description: `rejects adjacent duplicate properties`,
			code: `a { color: pink; color: orange; }`,
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
			],
		},
		{
			description: `rejects non-adjacent duplicate properties`,
			code: `a { color: pink; background: orange; color: orange }`,
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
			],
		},
	],
})
