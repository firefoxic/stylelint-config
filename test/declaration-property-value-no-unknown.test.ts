import { testRule } from "../utils/testRule.ts"

let rule = `declaration-property-value-no-unknown`

testRule({
	description: `Property values must be known`,
	rule,
	cases: [
		{
			description: `accepts a known value`,
			code: `a { gap: 0 }`,
		},
		{
			description: `accepts a custom property value`,
			code: `a { gap: var(--foo) }`,
		},
		{
			description: `rejects a color as a gap value`,
			code: `a { gap: red }`,
			expectedWarnings: [
				{
					line: 2,
					column: 10,
					endLine: 2,
					endColumn: 13,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown value "red" for property "gap" (${rule})`,
				},
			],
		},
		{
			description: `rejects an unknown gap value`,
			code: `a { gap: unknown }`,
			expectedWarnings: [
				{
					line: 2,
					column: 10,
					endLine: 2,
					endColumn: 17,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown value "unknown" for property "gap" (${rule})`,
				},
			],
		},
		{
			description: `rejects a legacy display value`,
			code: `a { display: block table-row }`,
			expectedWarnings: [
				{
					line: 2,
					column: 20,
					endLine: 2,
					endColumn: 29,
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
