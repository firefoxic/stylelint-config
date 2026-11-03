import { testRule } from "../utils/testRule.ts"

let rule = `max-nesting-depth`

testRule({
	description: `Nesting depth should not exceed the configured maximum`,
	rule,
	cases: [
		{
			description: `accepts three levels of nesting`,
			code: `
				a {
					b {
						c {
							color: red;
						}
					}
				}
			`,
		},
		{
			description: `rejects a fourth level of nesting`,
			code: `
				a {
					& b {
						& c {
							& d {
								& e {
									color: red;
								}
							}
						}
					}
				}
			`,
			expectedWarnings: [
				{
					line: 6,
					column: 5,
					endLine: 8,
					endColumn: 6,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Too deep nesting, maximum 3 (${rule})`,
				},
			],
		},
		{
			description: `ignores pseudo-classes`,
			code: `a:hover { color: red; }`,
		},
	],
})
