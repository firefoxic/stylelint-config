import { testRule } from "../utils/testRule.ts"

let rule = `keyframe-declaration-no-important`

testRule({
	description: `Keyframe declarations must not be important`,
	rule,
	cases: [
		{
			description: `accepts a normal keyframe declaration`,
			code: `@keyframes --fade { from { opacity: 0; } }`,
		},
		{
			description: `rejects an important keyframe declaration`,
			code: `@keyframes --fade { from { opacity: 0 !important; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 39,
					endLine: 2,
					endColumn: 49,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Disallowed !important (${rule})`,
				},
			],
		},
	],
})
