import { testRule } from "../utils/testRule.ts"

let rule = `unit-layout-mappings`

testRule({
	description: `Units must be logical`,
	rule,
	cases: [
		{
			description: `accepts "vb"`,
			code: `a { block-size: 100vb; }`,
		},
		{
			description: `accepts "vi"`,
			code: `a { inline-size: 80vi; }`,
		},
		{
			description: `accepts "cqb"`,
			code: `a { max-block-size: 50cqb; }`,
		},
		{
			description: `accepts "cqi"`,
			code: `a { max-inline-size: 100cqi; }`,
		},
		{
			description: `accepts "dvb"`,
			code: `a { min-block-size: 100dvb; }`,
		},
		{
			description: `accepts logical units in "min()"`,
			code: `a { inline-size: min(80vi, 100%); }`,
		},
		{
			description: `accepts logical units in "clamp()"`,
			code: `a { inline-size: clamp(20vi, 50%, 80vi); }`,
		},
		{
			description: `rejects "vh"`,
			code: `a { height: 100vh; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 16,
					endLine: 2,
					endColumn: 18,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vh" to be "vb" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "vw"`,
			code: `a { width: 80vw; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 14,
					endLine: 2,
					endColumn: 16,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vw" to be "vi" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "cqh"`,
			code: `a { max-height: 50cqh; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 19,
					endLine: 2,
					endColumn: 22,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "cqh" to be "cqb" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "cqw"`,
			code: `a { max-width: 100cqw; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 19,
					endLine: 2,
					endColumn: 22,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "cqw" to be "cqi" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "dvh"`,
			code: `a { min-height: 100dvh; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 20,
					endLine: 2,
					endColumn: 23,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "dvh" to be "dvb" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "vw" in "min()"`,
			code: `a { width: min(80vw, 100%); }`,
			expectedWarnings: [
				{
					line: 2,
					column: 18,
					endLine: 2,
					endColumn: 20,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vw" to be "vi" (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects "vw" values in "clamp()"`,
			code: `a { width: clamp(20vw, 50%, 80vw); }`,
			expectedWarnings: [
				{
					line: 2,
					column: 20,
					endLine: 2,
					endColumn: 22,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vw" to be "vi" (${rule})`,
					url: undefined,
				},
				{
					line: 2,
					column: 31,
					endLine: 2,
					endColumn: 33,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vw" to be "vi" (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
