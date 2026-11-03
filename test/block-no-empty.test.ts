import { testRule } from "../utils/testRule.ts"

let rule = `block-no-empty`

testRule({
	description: `The block must not be empty`,
	rule,
	cases: [
		{
			description: `accepts non-empty blocks and comment-only blocks`,
			code: `
				.valid-1 {
					gap: 0;
				}

				.valid-2 {
					/* foo */
				}

				@media print {
					.valid-1 {
						gap: 0;
					}

					.valid-2 {
						/* bar */
					}
				}
			`,
		},
		{
			description: `rejects empty blocks`,
			code: `
				.invalid-1 {
				}

				.invalid-2 {

				}

				@media print {
					.invalid-1 {
					}

					.invalid-2 {

					}
				}
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 3,
					endColumn: 2,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty block (${rule})`,
				},
				{
					line: 5,
					column: 12,
					endLine: 7,
					endColumn: 2,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty block (${rule})`,
				},
				{
					line: 10,
					column: 13,
					endLine: 11,
					endColumn: 3,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Empty block (${rule})`,
				},
				{
					line: 13,
					column: 13,
					endLine: 15,
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
