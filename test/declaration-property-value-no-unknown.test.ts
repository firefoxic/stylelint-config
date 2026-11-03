import { testRule } from "../utils/testRule.ts"

let rule = `declaration-property-value-no-unknown`

testRule({
	description: `The display property value must not be in legacy syntax`,
	rule,
	cases: [
		{
			description: `accepts known property values`,
			code: `
				.valid-1 { gap: 0 }
				.valid-2 { gap: var(--foo) }
			`,
		},
		{
			description: `rejects unknown property values`,
			code: `
				.invalid-1 { gap: red }
				.invalid-2 { gap: unknown }
				.invalid-3 { display: block table-row }
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 19,
					endLine: 2,
					endColumn: 22,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown value "red" for property "gap" (${rule})`,
				},
				{
					line: 3,
					column: 19,
					endLine: 3,
					endColumn: 26,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown value "unknown" for property "gap" (${rule})`,
				},
				{
					line: 4,
					column: 29,
					endLine: 4,
					endColumn: 38,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown value "table-row" for property "display" (${rule})`,
				},
			],
		},
	],
})
