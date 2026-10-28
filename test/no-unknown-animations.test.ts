import { testRule } from "../utils/testRule.ts"

let rule = `no-unknown-animations`

testRule({
	description: `Animation names should be declared`,
	rule,
	cases: [
		{
			description: `accepts a declared animation`,
			code: `@keyframes --fade { to { opacity: 1; } } a { animation-name: --fade; }`,
		},
		{
			description: `rejects an undeclared animation`,
			code: `a { animation-name: --missing; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 21,
					endLine: 2,
					endColumn: 30,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown animation "--missing" (${rule})`,
				},
			],
		},
	],
})
