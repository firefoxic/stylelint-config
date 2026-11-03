import { testRule } from "../utils/testRule.ts"

let rule = `nesting-selector-no-missing-scoping-root`

testRule({
	description: `Nested selectors should include a scoping root`,
	rule,
	cases: [
		{
			description: `accepts a nested selector with a scoping root`,
			code: `a { & b { color: red; } }`,
		},
		{
			description: `rejects a nested selector without a scoping root`,
			code: `& { color: red; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 2,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Missing scoping root (${rule})`,
				},
			],
		},
	],
})
