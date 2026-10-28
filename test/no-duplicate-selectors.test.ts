import { testRule } from "../utils/testRule.ts"

let rule = `no-duplicate-selectors`

testRule({
	description: `Selectors should not be duplicated`,
	rule,
	cases: [
		{
			description: `accepts distinct selectors`,
			code: `a { color: red; } b { color: blue; }`,
		},
		{
			description: `rejects a duplicated selector`,
			code: `a { color: red; } a { color: blue; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 19,
					endLine: 2,
					endColumn: 20,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate selector "a", first used at line 2 (${rule})`,
				},
			],
		},
	],
})
