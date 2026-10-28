import { testRule } from "../utils/testRule.ts"

let rule = `relative-selector-nesting-notation`

testRule({
	description: `Relative selectors must always use implicit nesting selector notation`,
	rule,
	cases: [
		{
			description: `accepts implicit nesting notation`,
			code: `
				.valid-1 {
				  a {}
				}

				.valid-2 {
				  > a {}
				}

				.valid-3 {
				  &:hover {}
				}
			`,
		},
		{
			description: `rejects explicit relative selectors`,
			code: `
				.invalid-1 {
				  & a {}
				}

				.invalid-2 {
				  & > a {}
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 3,
					endLine: 3,
					endColumn: 6,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected implicit nesting notation (${rule})`,
					url: undefined,
				},
				{
					line: 7,
					column: 3,
					endLine: 7,
					endColumn: 8,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected implicit nesting notation (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
