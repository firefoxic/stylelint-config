import { testRule } from "../utils/testRule.ts"

let rule = `declaration-block-no-duplicate-custom-properties`

testRule({
	description: `Declaration blocks must not contain duplicate custom properties`,
	rule,
	cases: [
		{
			description: `accepts unique custom properties`,
			code: `
				a { --size: 1 }
				a { --size: 1; --SIZE: 2 }
			`,
		},
		{
			description: `rejects duplicate custom properties`,
			code: `
				a { --size: 1; --size: 2 }
				a { --size: 1; gap: 0; --size: 2 }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 16,
					endLine: 2,
					endColumn: 22,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate custom property "--size" (${rule})`,
				},
				{
					line: 3,
					column: 24,
					endLine: 3,
					endColumn: 30,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate custom property "--size" (${rule})`,
				},
			],
		},
	],
})
