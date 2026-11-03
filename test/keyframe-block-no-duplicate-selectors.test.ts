import { testRule } from "../utils/testRule.ts"

let rule = `keyframe-block-no-duplicate-selectors`

testRule({
	description: `Keyframe blocks must not have duplicate selectors`,
	rule,
	cases: [
		{
			description: `accepts unique keyframe selectors`,
			code: `@keyframes --fade { from { opacity: 0; } to { opacity: 1; } }`,
		},
		{
			description: `rejects duplicate keyframe selectors`,
			code: `@keyframes --fade { from { opacity: 0; } from { opacity: 1; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 42,
					endLine: 2,
					endColumn: 46,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate keyframe selector "from" (${rule})`,
				},
			],
		},
	],
})
