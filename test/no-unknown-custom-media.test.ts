import { testRule } from "../utils/testRule.ts"

let rule = `no-unknown-custom-media`

testRule({
	description: `Custom media queries should be known`,
	rule,
	cases: [
		{
			description: `accepts a declared custom media query with a regular query`,
			code: `
				@custom-media --any-valid (width >= 40rem);

				@media (--any-valid), (height < 40rem) {}
			`,
		},
		{
			description: `accepts a declared custom media query used before its declaration`,
			code: `
				@media (--another-valid) {}

				@custom-media --another-valid (width >= 60rem);
			`,
		},
		{
			description: `rejects an undeclared custom media query`,
			code: `@media (--invalid) {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 9,
					endLine: 2,
					endColumn: 18,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown custom media query "--invalid" (${rule})`,
				},
			],
		},
		{
			description: `rejects an undeclared custom media query in a comma-separated query list`,
			code: `@media (--invalid), (height < 40rem) {}`,
			expectedWarnings: [
				{
					line: 2,
					column: 9,
					endLine: 2,
					endColumn: 18,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown custom media query "--invalid" (${rule})`,
				},
			],
		},
	],
})
