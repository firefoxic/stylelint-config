import { testRule } from "../utils/testRule.ts"

let rule = `no-duplicate-at-import-rules`

testRule({
	description: `Import rules should not be duplicated`,
	rule,
	cases: [
		{
			description: `accepts distinct imports`,
			code: `@import url("base.css"); @import url("theme.css");`,
		},
		{
			description: `rejects a duplicated import`,
			code: `@import url("base.css"); @import url("base.css");`,
			expectedWarnings: [
				{
					line: 2,
					column: 26,
					endLine: 2,
					endColumn: 49,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Duplicate @import rule base.css (${rule})`,
				},
			],
		},
	],
})
