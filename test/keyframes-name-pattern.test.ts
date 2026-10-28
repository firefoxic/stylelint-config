import { testRule } from "../utils/testRule.ts"

let rule = `keyframes-name-pattern`

testRule({
	description: `Keyframe names should be kebab-case`,
	rule,
	cases: [
		{
			description: `accepts a prefixed kebab-case name`,
			code: `@keyframes --fade-in { to { opacity: 1; } }`,
		},
		{
			description: `rejects a name without the required prefix`,
			code: `@keyframes fade-in { to { opacity: 1; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected keyframe name "fade-in" to be --kebab-case (${rule})`,
				},
			],
		},
	],
})
