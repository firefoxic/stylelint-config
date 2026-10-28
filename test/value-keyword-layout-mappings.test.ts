import { testRule } from "../utils/testRule.ts"

let rule = `value-keyword-layout-mappings`

testRule({
	description: `Properties and values must be logical`,
	rule,
	cases: [
		{
			description: `accepts "start" for "text-align"`,
			code: `a { text-align: start; }`,
		},
		{
			description: `accepts "end" for "text-align-last"`,
			code: `a { text-align-last: end; }`,
		},
		{
			description: `accepts "inline-start" for "float"`,
			code: `a { float: inline-start; }`,
		},
		{
			description: `accepts "inline-end" for "clear"`,
			code: `a { clear: inline-end; }`,
		},
		{
			description: `accepts "inline" for "resize"`,
			code: `a { resize: inline; }`,
		},
		{
			description: `accepts "top" for "caption-side"`,
			code: `a { caption-side: top; }`,
		},
		{
			description: `accepts "inline-axis" for "box-orient"`,
			code: `a { box-orient: inline-axis; }`,
		},
		{
			description: `accepts logical values for "offset-anchor"`,
			code: `a { offset-anchor: block-end inline-start; }`,
		},
		{
			description: `accepts logical values for "offset-position"`,
			code: `a { offset-position: block-start inline-end; }`,
		},
		{
			description: `accepts "vertical" for "box-orient"`,
			code: `a { box-orient: vertical; }`,
		},
		{
			description: `rejects "left" for "text-align"`,
			code: `a { text-align: left; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 17,
					endLine: 2,
					endColumn: 21,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "left" to be "start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "right" for "text-align-last"`,
			code: `a { text-align-last: right; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 22,
					endLine: 2,
					endColumn: 27,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "right" to be "end" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "left" for "float"`,
			code: `a { float: left; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "left" to be "inline-start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "right" for "clear"`,
			code: `a { clear: right; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 12,
					endLine: 2,
					endColumn: 17,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "right" to be "inline-end" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "horizontal" for "resize"`,
			code: `a { resize: horizontal; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 13,
					endLine: 2,
					endColumn: 23,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "horizontal" to be "inline" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "bottom" for "offset-anchor"`,
			code: `a { offset-anchor: bottom inline-start; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 20,
					endLine: 2,
					endColumn: 26,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "bottom" to be "block-end" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "left" for "offset-anchor"`,
			code: `a { offset-anchor: left center; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 20,
					endLine: 2,
					endColumn: 24,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "left" to be "inline-start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "top" for "offset-position"`,
			code: `a { offset-position: top inline-end; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 22,
					endLine: 2,
					endColumn: 25,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "top" to be "block-start" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "right" for "offset-position"`,
			code: `a { offset-position: block-start right; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 34,
					endLine: 2,
					endColumn: 39,
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
