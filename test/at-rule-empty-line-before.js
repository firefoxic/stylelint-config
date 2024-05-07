import { testRule } from "../utils/testRule.js"

let rule = `at-rule-empty-line-before`

let code = `
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

/* Invalid: */

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
`

testRule({
	description: `There must be an empty line before the at-rule`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 42,
			column: 1,
			endLine: 42,
			endColumn: 48,
			rule,
			severity: `error`,
			text: `Expected empty line before at-rule (${rule})`,
		},
		{
			line: 43,
			column: 1,
			endLine: 52,
			endColumn: 2,
			rule,
			severity: `error`,
			text: `Expected empty line before at-rule (${rule})`,
		},
		{
			line: 45,
			column: 2,
			endLine: 45,
			endColumn: 13,
			rule,
			severity: `error`,
			text: `Unexpected empty line before at-rule (${rule})`,
		},
		{
			line: 46,
			column: 2,
			endLine: 51,
			endColumn: 3,
			rule,
			severity: `error`,
			text: `Expected empty line before at-rule (${rule})`,
		},
		{
			line: 49,
			column: 4,
			endLine: 49,
			endColumn: 15,
			rule,
			severity: `error`,
			text: `Expected empty line before at-rule (${rule})`,
		},
	],
})
