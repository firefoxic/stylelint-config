import { testRule } from "../utils/testRule.ts"

let rule = `display-notation`

testRule({
	description: `The display property value must not be in legacy syntax`,
	rule,
	cases: [
		{
			description: `accepts modern display notation`,
			code: `
				.valid-1 {
					display: inline flow;
				}

				.valid-2 {
					display: block flow-root;
				}

				.valid-3 {
					display: inline flow-root;
				}

				.valid-4 {
					display: inline flex;
				}

				.valid-5 {
					display: inline grid;
				}

				.valid-6 {
					display: block grid;
				}

				.valid-6 {
					display: contents;
				}

				.valid-6 {
					display: none;
				}

				.valid-6 {
					display: initial;
				}

				.valid-6 {
					display: unset;
				}

				.valid-6 {
					display: revert;
				}
			`,
		},
		{
			description: `rejects legacy display notation`,
			code: `
				.invalid-1 {
					display: block;
				}

				.invalid-2 {
					display: inline;
				}

				.invalid-3 {
					display: flex;
				}

				.invalid-4 {
					display: grid;
				}

				.invalid-5 {
					display: flow-root;
				}

				.invalid-6 {
					display: inline-block;
				}

				.invalid-7 {
					display: inline-flex;
				}

				.invalid-8 {
					display: inline-grid;
				}

				.invalid-9 {
					display: list-item;
				}

				.invalid-10 {
					display: table;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 11,
					endLine: 3,
					endColumn: 16,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "block" to be "block flow" (${rule})`,
				},
				{
					line: 7,
					column: 11,
					endLine: 7,
					endColumn: 17,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "inline" to be "inline flow" (${rule})`,
				},
				{
					line: 11,
					column: 11,
					endLine: 11,
					endColumn: 15,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "flex" to be "block flex" (${rule})`,
				},
				{
					line: 15,
					column: 11,
					endLine: 15,
					endColumn: 15,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "grid" to be "block grid" (${rule})`,
				},
				{
					line: 19,
					column: 11,
					endLine: 19,
					endColumn: 20,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "flow-root" to be "block flow-root" (${rule})`,
				},
				{
					line: 23,
					column: 11,
					endLine: 23,
					endColumn: 23,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "inline-block" to be "inline flow-root" (${rule})`,
				},
				{
					line: 27,
					column: 11,
					endLine: 27,
					endColumn: 22,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "inline-flex" to be "inline flex" (${rule})`,
				},
				{
					line: 31,
					column: 11,
					endLine: 31,
					endColumn: 22,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "inline-grid" to be "inline grid" (${rule})`,
				},
				{
					line: 35,
					column: 11,
					endLine: 35,
					endColumn: 20,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "list-item" to be "block flow list-item" (${rule})`,
				},
				{
					line: 39,
					column: 11,
					endLine: 39,
					endColumn: 16,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "table" to be "block table" (${rule})`,
				},
			],
		},
	],
})
