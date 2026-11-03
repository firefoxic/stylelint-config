import { testRule } from "../utils/testRule.ts"

let rule = `declaration-property-value-keyword-no-deprecated`

testRule({
	description: `Deprecated property value keywords must not be used`,
	rule,
	cases: [
		{
			description: `accepts a current display value`,
			code: `a { display: flex; }`,
		},
		{
			description: `rejects the deprecated overflow value`,
			code: `a { overflow: overlay; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 15,
					endLine: 2,
					endColumn: 22,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected "overlay" to be "auto" (${rule})`,
				},
			],
		},
	],
})
