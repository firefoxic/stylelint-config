import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-empty-line-before`

testRule({
	description: `There must be an empty line before the at-rule`,
	rule,
	cases: [
		{
			description: `accepts a charset at-rule`,
			code: `@charset "UTF-8";`,
		},
		{
			description: `accepts consecutive imports and imports following comments`,
			code: `
				@import "a.css"; /* Shared-line comments do not affect. */
				@import "b.css";
				/* Ignore at-rules that follow a comment. */
				@import "c.css";
				@import "d.css";
			`,
		},
		{
			description: `accepts a media query with a root rule`,
			code: `
				@media (prefers-color-scheme: dark) {
					:root {
						--a: 0;
					}
				}
			`,
		},
		{
			description: `accepts a nested at-rule after a declaration`,
			code: `
				a {
					top: 0;

					@layer layaut;
				}
			`,
		},
		{
			description: `accepts a media query containing a rule`,
			code: `
				@media all {
					a {
						gap: 0;
					}
				}
			`,
		},
		{
			description: `accepts the first nested at-rule without a preceding empty line`,
			code: `
				@layer foo {
					@layer bar;
				}
			`,
		},
		{
			description: `accepts a nested at-rule after another nested at-rule`,
			code: `
				@layer foo {
					@layer bar;
					@layer baz;
				}
			`,
		},
		{
			description: `accepts a nested block at-rule after an empty line`,
			code: `
				@layer foo {
					@layer bar;

					@layer baz {
						a {
							gap: 0;
						}
					}
				}
			`,
		},
		{
			description: `reports a missing empty line before @custom-media`,
			code: `
				@layer foo;
				@custom-media --small-viewport (width > 600px);
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
			],
		},
		{
			description: `reports a missing empty line before @media`,
			code: `
				@custom-media --small-viewport (width > 600px);
				@media (--small-viewport) {
					a {
						gap: 0;
					}
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 1,
					endLine: 7,
					endColumn: 2,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before at-rule (${rule})`,
				},
			],
		},
		{
			description: `reports an empty line before the first nested @layer`,
			code: `
				@media (--small-viewport) {

					@layer bar;
				}
			`,
			expectedWarnings: [
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 13,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected no empty line before at-rule (${rule})`,
				},
			],
		},
		{
			description: `reports a missing empty line before a nested @layer block`,
			code: `
				@media (--small-viewport) {
					@layer bar;
					@layer bar {
						a {
							gap: 0;
						}
					}
				}
			`,
			expectedWarnings: [
				{
					line: 4,
					column: 2,
					endLine: 8,
					endColumn: 3,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Expected empty line before at-rule (${rule})`,
				},
			],
		},
		{
			description: `reports a missing empty line before a nested @layer declaration`,
			code: `
				@media (--small-viewport) {
					@layer bar {
						a {
							top: 0;
							@layer bar;
						}
					}
				}
			`,
			expectedWarnings: [
				{
					line: 6,
					column: 4,
					endLine: 6,
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
