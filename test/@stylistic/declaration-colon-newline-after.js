import { testRule } from "../../utils/testRule.js"

let plugin = {
	name: `@stylistic/stylelint-plugin`,
	prefix: `@stylistic/`,
}

let rule = `${plugin.prefix}declaration-colon-newline-after`

let code = `
.valid {
	background:
		url("foo.png"),
		url("bar.png");
	transform:
		translate(
			1px,
			1px
		);
}

.invalid {
	background: url("foo.png"),
		url("bar.png");
	transform: translate(
		1px,
		1px
	);
}
`

testRule({
	description: `Multiline declarations should include a new line after a colon`,
	rule,
	plugin,
	code,
	expectedWarnings: [
		{
			line: 14,
			column: 12,
			endLine: 14,
			endColumn: 13,
			rule,
			url: undefined,
			severity: `error`,
			text: `Expected newline after ":" with a multi-line declaration (${rule})`,
		},
		{
			line: 16,
			column: 11,
			endLine: 16,
			endColumn: 12,
			rule,
			url: undefined,
			severity: `error`,
			text: `Expected newline after ":" with a multi-line declaration (${rule})`,
		},
	],
})
