import { testRule } from "../utils/testRule.ts"

let rule = `declaration-empty-line-before`

testRule({
	description: `Declarations must be preceded by an empty line`,
	rule,
	cases: [
		{
			description: `accepts consecutive declarations`,
			code: `a { color: red; background: blue; }`,
		},
		{
			description: `rejects a declaration immediately after a nested rule`,
			code: `
				a {
					&:hover { color: red; }
					background: blue;
				}
			`,
			expectedWarnings: [
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before declaration (${rule})`,
				},
			],
		},
	],
})
