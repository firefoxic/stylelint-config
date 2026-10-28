import { testRule } from "../utils/testRule.ts"

let rule = `display-notation`

testRule({
	description: `The display property value must not be in legacy syntax`,
	rule,
	cases: [
		{
			description: `accepts "inline flow"`,
			code: `a { display: inline flow; }`,
		},
		{
			description: `accepts "block flow-root"`,
			code: `a { display: block flow-root; }`,
		},
		{
			description: `accepts "inline flow-root"`,
			code: `a { display: inline flow-root; }`,
		},
		{
			description: `accepts "inline flex"`,
			code: `a { display: inline flex; }`,
		},
		{
			description: `accepts "inline grid"`,
			code: `a { display: inline grid; }`,
		},
		{
			description: `accepts "block grid"`,
			code: `a { display: block grid; }`,
		},
		{
			description: `accepts "contents"`,
			code: `a { display: contents; }`,
		},
		{
			description: `accepts "none"`,
			code: `a { display: none; }`,
		},
		{
			description: `accepts "initial"`,
			code: `a { display: initial; }`,
		},
		{
			description: `accepts "unset"`,
			code: `a { display: unset; }`,
		},
		{
			description: `accepts "revert"`,
			code: `a { display: revert; }`,
		},
		{
			description: `rejects "block"`,
			code: `a { display: block; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "block" to be "block flow" (${rule})`,
				},
			],
		},
		{
			description: `rejects "inline"`,
			code: `a { display: inline; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 20,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "inline" to be "inline flow" (${rule})`,
				},
			],
		},
		{
			description: `rejects "flex"`,
			code: `a { display: flex; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 18,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "flex" to be "block flex" (${rule})`,
				},
			],
		},
		{
			description: `rejects "grid"`,
			code: `a { display: grid; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 18,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "grid" to be "block grid" (${rule})`,
				},
			],
		},
		{
			description: `rejects "flow-root"`,
			code: `a { display: flow-root; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 23,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "flow-root" to be "block flow-root" (${rule})`,
				},
			],
		},
		{
			description: `rejects "inline-block"`,
			code: `a { display: inline-block; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 26,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "inline-block" to be "inline flow-root" (${rule})`,
				},
			],
		},
		{
			description: `rejects "inline-flex"`,
			code: `a { display: inline-flex; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 25,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "inline-flex" to be "inline flex" (${rule})`,
				},
			],
		},
		{
			description: `rejects "inline-grid"`,
			code: `a { display: inline-grid; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 25,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "inline-grid" to be "inline grid" (${rule})`,
				},
			],
		},
		{
			description: `rejects "list-item"`,
			code: `a { display: list-item; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 23,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "list-item" to be "block flow list-item" (${rule})`,
				},
			],
		},
		{
			description: `rejects "table"`,
			code: `a { display: table; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 19,
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
