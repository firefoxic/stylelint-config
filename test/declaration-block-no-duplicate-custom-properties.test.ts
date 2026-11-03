import { testRule } from "../utils/testRule.ts"

let rule = `declaration-block-no-duplicate-custom-properties`

testRule({
	description: `Declaration blocks must not contain duplicate custom properties`,
	rule,
	cases: [
		{
			description: `accepts a custom property`,
			code: `a { --size: 1 }`,
		},
		{
			description: `accepts custom properties with case-sensitive names`,
			code: `a { --size: 1; --SIZE: 2 }`,
		},
		{
			description: `rejects an adjacent duplicate custom property`,
			code: `a { --size: 1; --size: 2 }`,
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
			],
		},
		{
			description: `rejects a non-adjacent duplicate custom property`,
			code: `a { --size: 1; gap: 0; --size: 2 }`,
			expectedWarnings: [
				{
					line: 2,
					column: 24,
					endLine: 2,
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
