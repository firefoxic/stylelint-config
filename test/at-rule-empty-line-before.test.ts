import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-empty-line-before`

testRule({
	description: `There must be an empty line before the at-rule`,
	rule,
	cases: [
		{
			description: `accepts at-rules with the expected spacing`,
			code: `
				@charset "UTF-8";

				@import "a.css"; /* Shared-line comments do not affect. */
				@import "b.css";
				/* Ignore at-rules that follow a comment. */
				@import "c.css";
				@import "d.css";

				@media (prefers-color-scheme: dark) {
					:root {
						--a: 0;
					}
				}

				.valid-1 {
					top: 0;

					@layer layaut;
				}

				@media all {
					.valid-1 {
						gap: 0;
					}
				}

				@layer foo {
					@layer bar; /* Ignore first nested at-rules. */
					@layer baz;

					@layer bar {
						.valid {
							gap: 0;
						}
					}
				}

			`,
		},
		{
			description: `reports at-rules with incorrect spacing`,
			code: `
				@layer foo;
				@custom-media --small-viewport (width > 600px);
				@media (--small-viewport) {

					@layer bar;
					@layer bar {
						.invalid {
							top: 0;
							@layer bar;
						}
					}
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 1,
					endLine: 3,
					endColumn: 48,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before at-rule (${rule})`,
				},
				{
					line: 4,
					column: 1,
					endLine: 13,
					endColumn: 2,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before at-rule (${rule})`,
				},
				{
					line: 6,
					column: 2,
					endLine: 6,
					endColumn: 13,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected no empty line before at-rule (${rule})`,
				},
				{
					line: 7,
					column: 2,
					endLine: 12,
					endColumn: 3,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before at-rule (${rule})`,
				},
				{
					line: 10,
					column: 4,
					endLine: 10,
					endColumn: 15,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before at-rule (${rule})`,
				},
			],
		},
	],
})
