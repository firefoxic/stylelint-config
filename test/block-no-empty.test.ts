import { testRule } from "../utils/testRule.ts"

let rule = `block-no-empty`

testRule({
	description: `The block must not be empty`,
	rule,
	cases: [
		{
			description: `accepts a block with declarations`,
			code: `a { gap: 0; }`,
		},
		{
			description: `accepts a comment-only block`,
			code: `a { /* foo */ }`,
		},
		{
			description: `accepts a nested block with declarations`,
			code: `@media print { a { gap: 0; } }`,
		},
		{
			description: `accepts a nested comment-only block`,
			code: `@media print { a { /* bar */ } }`,
		},
		{
			description: `rejects an empty block`,
			code: `a {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 3,
					endLine: 2,
					endColumn: 5,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty block (${rule})`,
				},
			],
		},
		{
			description: `rejects an empty block with a blank line`,
			code: `
				a {

				}
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 3,
					endLine: 4,
					endColumn: 2,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty block (${rule})`,
				},
			],
		},
		{
			description: `rejects an empty nested block`,
			code: `@media print { a {} }`,
			expectedWarnings: [
				{
					line: 2,
					column: 18,
					endLine: 2,
					endColumn: 20,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty block (${rule})`,
				},
			],
		},
		{
			description: `rejects an empty nested block with a blank line`,
			code: `
				@media print {
					a {

					}
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 4,
					endLine: 5,
					endColumn: 3,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty block (${rule})`,
				},
			],
		},
	],
})
