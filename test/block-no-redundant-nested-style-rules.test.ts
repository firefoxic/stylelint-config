import { testRule } from "../utils/testRule.ts"

let rule = `block-no-redundant-nested-style-rules`

testRule({
	description: `Redundant nested style rules must not be used`,
	rule,
	cases: [
		{
			description: `accepts a nested rule with a distinct selector`,
			code: `.parent { & .child { color: red; } }`,
		},
		{
			description: `rejects a nested rule repeating its parent selector`,
			code: `.parent { & { color: red; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 11,
					endLine: 2,
					endColumn: 28,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Redundant nested style rule (${rule})`,
				},
			],
		},
	],
})
