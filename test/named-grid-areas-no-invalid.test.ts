import { testRule } from "../utils/testRule.ts"

let rule = `named-grid-areas-no-invalid`

testRule({
	description: `Named grid areas should form valid rectangles`,
	rule,
	cases: [
		{
			description: `accepts rectangular named areas`,
			code: `a { grid-template-areas: "head head" "body body"; }`,
		},
		{
			description: `rejects a non-rectangular named area`,
			code: `a { grid-template-areas: "head head" "head body"; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 26,
					endLine: 2,
					endColumn: 37,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected single filled-in rectangle for "head" (${rule})`,
				},
			],
		},
	],
})
