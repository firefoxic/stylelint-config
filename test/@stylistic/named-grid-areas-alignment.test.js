import { testRule } from "../../utils/testRule.js"

let plugin = {
	name: `@stylistic/stylelint-plugin`,
	prefix: `@stylistic/`,
}

let rule = `${plugin.prefix}named-grid-areas-alignment`

let code = `
.valid {
	grid-template-areas:
		"a         a       "
		"foo       foo     "
		"long-one  long-one";
}

.invalid-1 {
	grid-template-areas:
		"a a"
		"foo foo"
		"long-one long-one";
}

.invalid-2 {
	grid-template-areas:
		"a        a       "
		"foo      foo     "
		"long-one long-one";
}

.invalid-3 {
	grid-template-areas:
		"a         a"
		"foo       foo"
		"long-one  long-one";
}

.invalid-4 {
	grid-template-areas:
		"a          a       "
		"foo        foo     "
		"long-one   long-one";
}

.invalid-5 {
	grid-template-areas:
		"a  a              "
		"foo  foo          "
		"long-one  long-one";
}
`

testRule({
	description: `Grid template areas should be aligned`,
	rule,
	plugin,
	code,
	expectedWarnings: [
		{
			line: 11,
			column: 3,
			endLine: 13,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected \`grid-template-areas\` value to be aligned (${rule})`,
		},
		{
			line: 18,
			column: 3,
			endLine: 20,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected \`grid-template-areas\` value to be aligned (${rule})`,
		},
		{
			line: 25,
			column: 3,
			endLine: 27,
			endColumn: 23,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected \`grid-template-areas\` value to be aligned (${rule})`,
		},
		{
			line: 32,
			column: 3,
			endLine: 34,
			endColumn: 24,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected \`grid-template-areas\` value to be aligned (${rule})`,
		},
		{
			line: 39,
			column: 3,
			endLine: 41,
			endColumn: 23,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Expected \`grid-template-areas\` value to be aligned (${rule})`,
		},
	],
})
