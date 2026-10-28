import { testRule } from "../utils/testRule.ts"

let rule = `selector-anb-no-unmatchable`

testRule({
	description: `An+B selectors must be matchable`,
	rule,
	cases: [
		{
			description: `accepts a matchable formula`,
			code: `li:nth-child(2n + 1) {}`,
		},
		{
			description: `rejects a formula that cannot match`,
			code: `li:nth-child(0n + 0) {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 3,
					endLine: 2,
					endColumn: 21,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Unmatchable An+B selector ":nth-child(0n + 0)" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
