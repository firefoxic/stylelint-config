import { testRule } from "../utils/testRule.ts"

let rule = `property-layout-mappings`

testRule({
	description: `Properties and values must be logical`,
	rule,
	cases: [
		{
			description: `accepts logical properties`,
			code: `
				.valid {
					inline-size: 100%;
					block-size: 50vh;
					margin-block-start: 1rem;
					margin-inline: 2rem;
					padding-block: 10px;
					padding-inline-end: 20px;
					inset-inline-start: 0;
					inset-block-end: 10px;
					border-inline-start: 1px solid black;
					border-block-end-color: red;
					border-start-start-radius: 8px;
					transition: margin-inline-start 0 ease;
				}
			`,
		},
		{
			description: `rejects physical properties`,
			code: `
				.invalid {
					width: 100%;
					height: 50vh;
					margin-top: 1rem;
					margin-left: 2rem;
					margin-right: 2rem;
					padding-top: 10px;
					padding-bottom: 10px;
					padding-right: 20px;
					left: 0;
					bottom: 10px;
					border-left: 1px solid black;
					border-bottom-color: red;
					border-top-left-radius: 8px;
					transition: margin-left 0 ease;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 2,
					endLine: 3,
					endColumn: 7,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "width" to be "inline-size" (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 8,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "height" to be "block-size" (${rule})`,
					url: undefined,
				},
				{
					line: 5,
					column: 2,
					endLine: 5,
					endColumn: 12,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "margin-top" to be "margin-block-start" (${rule})`,
					url: undefined,
				},
				{
					line: 6,
					column: 2,
					endLine: 6,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "margin-left" to be "margin-inline-start" (${rule})`,
					url: undefined,
				},
				{
					line: 7,
					column: 2,
					endLine: 7,
					endColumn: 14,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "margin-right" to be "margin-inline-end" (${rule})`,
					url: undefined,
				},
				{
					line: 8,
					column: 2,
					endLine: 8,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "padding-top" to be "padding-block-start" (${rule})`,
					url: undefined,
				},
				{
					line: 9,
					column: 2,
					endLine: 9,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "padding-bottom" to be "padding-block-end" (${rule})`,
					url: undefined,
				},
				{
					line: 10,
					column: 2,
					endLine: 10,
					endColumn: 15,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "padding-right" to be "padding-inline-end" (${rule})`,
					url: undefined,
				},
				{
					line: 11,
					column: 2,
					endLine: 11,
					endColumn: 6,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "left" to be "inset-inline-start" (${rule})`,
					url: undefined,
				},
				{
					line: 12,
					column: 2,
					endLine: 12,
					endColumn: 8,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "bottom" to be "inset-block-end" (${rule})`,
					url: undefined,
				},
				{
					line: 13,
					column: 2,
					endLine: 13,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "border-left" to be "border-inline-start" (${rule})`,
					url: undefined,
				},
				{
					line: 14,
					column: 2,
					endLine: 14,
					endColumn: 21,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "border-bottom-color" to be "border-block-end-color" (${rule})`,
					url: undefined,
				},
				{
					line: 15,
					column: 2,
					endLine: 15,
					endColumn: 24,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "border-top-left-radius" to be "border-start-start-radius" (${rule})`,
					url: undefined,
				},
				{
					line: 16,
					column: 14,
					endLine: 16,
					endColumn: 25,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "margin-left" to be "margin-inline-start" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
