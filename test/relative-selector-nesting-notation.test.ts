import { testRule } from "../utils/testRule.ts"

let rule = `relative-selector-nesting-notation`

testRule({
	description: `Relative selectors must always use implicit nesting selector notation`,
	rule,
	cases: [
		{
			description: `accepts a type selector using implicit nesting notation`,
			code: `
				a {
				  a {}
				}
			`,
		},
		{
			description: `accepts a child combinator using implicit nesting notation`,
			code: `
				a {
				  > a {}
				}
			`,
		},
		{
			description: `accepts a pseudo-class on the parent selector`,
			code: `
				a {
				  &:hover {}
				}
			`,
		},
		{
			description: `rejects an explicit nesting selector before a type selector`,
			code: `
				a {
				  & a {}
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 3,
					endLine: 3,
					endColumn: 6,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected implicit nesting notation (${rule})`,
					url: undefined,
				},
			],
		},
		{
			description: `rejects an explicit nesting selector before a child combinator`,
			code: `
				a {
				  & > a {}
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 3,
					endLine: 3,
					endColumn: 8,
					fix: undefined,
					rule,
					severity: `error`,
					text: `Expected implicit nesting notation (${rule})`,
					url: undefined,
				},
			],
		},
	],
})
