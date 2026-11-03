import { testRule } from "../utils/testRule.ts"

let rule = `custom-property-no-missing-var-function`

testRule({
	description: `Custom properties must not be used without the "var()" function.`,
	rule,
	cases: [
		{
			description: `accepts custom properties in var() and permitted contexts`,
			code: `
				:root { --valid-1: red }
				a { color: var(--valid-1) }

				@property --valid-2 {}
				a { color: var(--valid-2) }

				@property --valid-3 {}
				a { transition-property: --valid-3 }
			`,
		},
		{
			description: `rejects custom properties used without var()`,
			code: `
				:root { --invalid-1: red }
				a { color: --invalid-1 }

				@property --invalid-2 {}
				a { color: --invalid-2 }
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 12,
					endLine: 3,
					endColumn: 23,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Missing var function for "--invalid-1" (${rule})`,
				},
				{
					line: 6,
					column: 12,
					endLine: 6,
					endColumn: 23,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Missing var function for "--invalid-2" (${rule})`,
				},
			],
		},
	],
})
