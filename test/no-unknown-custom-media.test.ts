import { testRule } from "../utils/testRule.ts"

let rule = `no-unknown-custom-media`

testRule({
	description: `Custom media queries should be known`,
	rule,
	cases: [
		{
			description: `accepts declared custom media queries`,
			code: `
				@custom-media --any-valid (width >= 40rem);

				@media (--any-valid), (height < 40rem) {}

				@media (--another-valid) {}

				@custom-media --another-valid (width >= 60rem);
			`,
		},
		{
			description: `rejects undeclared custom media queries`,
			code: `
				@media (--invalid) {}

				@media (--invalid), (height < 40rem) {}
			`,
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
				{
					line: 4,
					column: 9,
					endLine: 4,
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
