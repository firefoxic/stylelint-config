import { testRule } from "../utils/testRule.ts"

let rule = `declaration-property-unit-allowed-list`

testRule({
	description: `line-height must not have a unit`,
	rule,
	cases: [
		{
			description: `accepts a unitless line-height`,
			code: `a { line-height: 1.5; }`,
		},
		{
			description: `rejects a unit on line-height`,
			code: `a { line-height: 1.5px; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 18,
					endLine: 2,
					endColumn: 23,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed unit "px" for property "line-height" (${rule})`,
				},
			],
		},
	],
})
