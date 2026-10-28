import { testRule } from "../utils/testRule.ts"

let rule = `declaration-block-no-redundant-longhand-properties`

testRule({
	description: `Redundant longhand properties must not be used`,
	rule,
	cases: [
		{
			description: `accepts a shorthand property`,
			code: `a { margin: 1px; }`,
		},
		{
			description: `rejects longhand properties that can be shortened`,
			code: `a { margin-top: 1px; margin-right: 1px; margin-bottom: 1px; margin-left: 1px; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 78,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected shorthand property "margin" (${rule})`,
				},
			],
		},
	],
})
