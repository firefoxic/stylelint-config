import { testRule } from "../utils/testRule.ts"

let rule = `unit-layout-mappings`

testRule({
	description: `Units must be logical`,
	rule,
	cases: [
		{
			description: `accepts logical viewport units`,
			code: `
				.valid {
					block-size: 100vb;
					inline-size: 80vi;
					max-block-size: 50cqb;
					max-inline-size: 100cqi;
					min-block-size: 100dvb;
					inline-size: min(80vi, 100%);
					inline-size: clamp(20vi, 50%, 80vi);
				}
			`,
		},
		{
			description: `rejects physical viewport units`,
			code: `
				.invalid {
					height: 100vh;
					width: 80vw;
					max-height: 50cqh;
					max-width: 100cqw;
					min-height: 100dvh;
					width: min(80vw, 100%);
					width: clamp(20vw, 50%, 80vw);
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 13,
					endLine: 3,
					endColumn: 15,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vh" to be "vb" (${rule})`,
					url: undefined,
				},
				{
					line: 4,
					column: 11,
					endLine: 4,
					endColumn: 13,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vw" to be "vi" (${rule})`,
					url: undefined,
				},
				{
					line: 5,
					column: 16,
					endLine: 5,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "cqh" to be "cqb" (${rule})`,
					url: undefined,
				},
				{
					line: 6,
					column: 16,
					endLine: 6,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "cqw" to be "cqi" (${rule})`,
					url: undefined,
				},
				{
					line: 7,
					column: 17,
					endLine: 7,
					endColumn: 20,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "dvh" to be "dvb" (${rule})`,
					url: undefined,
				},
				{
					line: 8,
					column: 15,
					endLine: 8,
					endColumn: 17,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vw" to be "vi" (${rule})`,
					url: undefined,
				},
				{
					line: 9,
					column: 17,
					endLine: 9,
					endColumn: 19,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected "vw" to be "vi" (${rule})`,
					url: undefined,
				},
				{
					line: 9,
					column: 28,
					endLine: 9,
					endColumn: 30,
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
