import { testRule } from "../utils/testRule.ts"

let rule = `value-keyword-layout-mappings`

testRule({
	description: `Properties and values must be logical`,
	rule,
	cases: [
		{
			description: `accepts logical keywords`,
			code: `
				.valid {
					text-align: start;
					text-align-last: end;
					float: inline-start;
					clear: inline-end;
					resize: inline;
					caption-side: top;
					box-orient: inline-axis;
					offset-anchor: block-end inline-start;
					offset-position: block-start inline-end;
				}
			`,
		},
		{
			description: `rejects physical keywords`,
			code: `
				.invalid {
				  text-align: left;
				  text-align-last: right;
				  float: left;
				  clear: right;
				  resize: horizontal;
				  box-orient: vertical;
				  offset-anchor: bottom left;
				  offset-position: top right;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 15,
					endLine: 3,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "left" to be "start" (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 20,
					endLine: 4,
					endColumn: 25,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "right" to be "end" (${rule})`,
					url: undefined,
				},
				{
					line: 5,
					column: 10,
					endLine: 5,
					endColumn: 14,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "left" to be "inline-start" (${rule})`,
					url: undefined,
				},
				{
					line: 6,
					column: 10,
					endLine: 6,
					endColumn: 15,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "right" to be "inline-end" (${rule})`,
					url: undefined,
				},
				{
					line: 7,
					column: 11,
					endLine: 7,
					endColumn: 21,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "horizontal" to be "inline" (${rule})`,
					url: undefined,
				},
				{
					line: 9,
					column: 18,
					endLine: 9,
					endColumn: 24,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "bottom" to be "block-end" (${rule})`,
					url: undefined,
				},
				{
					line: 9,
					column: 25,
					endLine: 9,
					endColumn: 29,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "left" to be "inline-start" (${rule})`,
					url: undefined,
				},
				{
					line: 10,
					column: 20,
					endLine: 10,
					endColumn: 23,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "top" to be "block-start" (${rule})`,
					url: undefined,
				},
				{
					line: 10,
					column: 24,
					endLine: 10,
					endColumn: 29,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "right" to be "inline-end" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
