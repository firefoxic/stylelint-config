import { testRule } from "../../utils/testRule.js"

let plugin = {
	name: `stylelint-plugin-logical-css`,
	prefix: `plugin/`,
}

let rule = `${plugin.prefix}use-logical-properties-and-values`

let code = `
.valid {
	inline-size: 100px;
	block-size: 100px;
	inset: 0;
	inset-block-start: 5px;
	padding-inline-end: 5px;
	float: inline-start;
	clear: inline-end;
}

.invalid {
	width: 100px;
	height: 100px;
	top: 5px;
	bottom: 0;
	padding-bottom: 5px;
	float: right;
	clear: left;
}
`

testRule({
	description: `Properties and values must be logical`,
	rule,
	plugin,
	code,
	expectedWarnings: [
		{
			line: 13,
			column: 2,
			endLine: 13,
			endColumn: 15,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected "width" property. Use "inline-size". (${rule})`,
		},
		{
			line: 14,
			column: 2,
			endLine: 14,
			endColumn: 16,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected "height" property. Use "block-size". (${rule})`,
		},
		{
			line: 15,
			column: 2,
			endLine: 15,
			endColumn: 11,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected "top" property. Use "inset-block-start". (${rule})`,
		},
		{
			line: 16,
			column: 2,
			endLine: 16,
			endColumn: 12,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected "bottom" property. Use "inset-block-end". (${rule})`,
		},
		{
			line: 17,
			column: 2,
			endLine: 17,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected "padding-bottom" property. Use "padding-block-end". (${rule})`,
		},
		{
			line: 18,
			column: 2,
			endLine: 18,
			endColumn: 15,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected "right" value in "float" property. Use "inline-end". (${rule})`,
		},
		{
			line: 19,
			column: 2,
			endLine: 19,
			endColumn: 14,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected "left" value in "clear" property. Use "inline-start". (${rule})`,
		},
	],
})
