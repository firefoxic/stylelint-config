import { testRule } from "../utils/testRule.ts"

let rule = `no-invalid-position-at-import-rule`

testRule({
	description: `Import rules should appear before style rules`,
	rule,
	cases: [
		{
			description: `accepts an import before style rules`,
			code: `@import url("base.css"); a { color: red; }`,
		},
		{
			description: `rejects an import after a style rule`,
			code: `a { color: red; } @import url("base.css");`,
			expectedWarnings: [
				{
					line: 2,
					column: 19,
					endLine: 2,
					endColumn: 42,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Invalid position for @import rule (${rule})`,
				},
			],
		},
	],
})
