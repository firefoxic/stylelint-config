import { testRule } from "../utils/testRule.ts"

let rule = `property-layout-mappings`

testRule({
	description: `Properties and values must be logical`,
	rule,
	cases: [
		{
			description: `accepts "inline-size"`,
			code: `a { inline-size: 100%; }`,
		},
		{
			description: `accepts "block-size"`,
			code: `a { block-size: 50vh; }`,
		},
		{
			description: `accepts "margin-block-start"`,
			code: `a { margin-block-start: 1rem; }`,
		},
		{
			description: `accepts "margin-inline"`,
			code: `a { margin-inline: 2rem; }`,
		},
		{
			description: `accepts "padding-block"`,
			code: `a { padding-block: 10px; }`,
		},
		{
			description: `accepts "padding-inline-end"`,
			code: `a { padding-inline-end: 20px; }`,
		},
		{
			description: `accepts "inset-inline-start"`,
			code: `a { inset-inline-start: 0; }`,
		},
		{
			description: `accepts "inset-block-end"`,
			code: `a { inset-block-end: 10px; }`,
		},
		{
			description: `accepts "border-inline-start"`,
			code: `a { border-inline-start: 1px solid black; }`,
		},
		{
			description: `accepts "border-block-end-color"`,
			code: `a { border-block-end-color: red; }`,
		},
		{
			description: `accepts "border-start-start-radius"`,
			code: `a { border-start-start-radius: 8px; }`,
		},
		{
			description: `accepts logical properties in transition`,
			code: `a { transition: margin-inline-start 0 ease; }`,
		},
		{
			description: `rejects "width"`,
			code: `a { width: 100%; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 10,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "width" to be "inline-size" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "height"`,
			code: `a { height: 50vh; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 11,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "height" to be "block-size" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "margin-top"`,
			code: `a { margin-top: 1rem; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 15,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "margin-top" to be "margin-block-start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "margin-left"`,
			code: `a { margin-left: 2rem; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "margin-left" to be "margin-inline-start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "margin-right"`,
			code: `a { margin-right: 2rem; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 17,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "margin-right" to be "margin-inline-end" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "padding-top"`,
			code: `a { padding-top: 10px; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "padding-top" to be "padding-block-start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "padding-bottom"`,
			code: `a { padding-bottom: 10px; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "padding-bottom" to be "padding-block-end" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "padding-right"`,
			code: `a { padding-right: 20px; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 18,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "padding-right" to be "padding-inline-end" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "left"`,
			code: `a { left: 0; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 9,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "left" to be "inset-inline-start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "bottom"`,
			code: `a { bottom: 10px; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 11,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "bottom" to be "inset-block-end" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "border-left"`,
			code: `a { border-left: 1px solid black; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "border-left" to be "border-inline-start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "border-bottom-color"`,
			code: `a { border-bottom-color: red; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 24,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "border-bottom-color" to be "border-block-end-color" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "border-top-left-radius"`,
			code: `a { border-top-left-radius: 8px; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 27,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "border-top-left-radius" to be "border-start-start-radius" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects physical properties in transition`,
			code: `a { transition: margin-left 0 ease; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 17,
					endLine: 2,
					endColumn: 28,
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
