import { testRule } from "../../utils/testRule.js"

let plugin = {
	name: `stylelint-plugin-logical-css`,
	prefix: `plugin/`,
}

let rule = `${plugin.prefix}use-logical-units`

let code = `
.valid {
	inline-size: 10svi;
	block-size: 10svb;
	inset: 5dvb;
	inset-inline: 5lvi;
	padding-block: 5vb;
}

.invalid {
	inline-size: 10svw;
	block-size: 10svh;
	inset: 5dvh;
	inset-inline: 5lvw;
	padding-block: 5vh;
}
`

testRule({
	description: `Units must be logical`,
	rule,
	plugin,
	code,
	expectedWarnings: [
		{
			line: 11,
			column: 2,
			endLine: 11,
			endColumn: 21,
			rule,
			url: undefined,
			severity: `error`,
			text: `Unexpected "svw" unit. Use "svi". (${rule})`,
		},
		{
			line: 12,
			column: 2,
			endLine: 12,
			endColumn: 20,
			rule,
			url: undefined,
			severity: `error`,
			text: `Unexpected "svh" unit. Use "svb". (${rule})`,
		},
		{
			line: 13,
			column: 2,
			endLine: 13,
			endColumn: 14,
			rule,
			url: undefined,
			severity: `error`,
			text: `Unexpected "dvh" unit. Use "dvb". (${rule})`,
		},
		{
			line: 14,
			column: 2,
			endLine: 14,
			endColumn: 21,
			rule,
			url: undefined,
			severity: `error`,
			text: `Unexpected "lvw" unit. Use "lvi". (${rule})`,
		},
		{
			line: 15,
			column: 2,
			endLine: 15,
			endColumn: 21,
			rule,
			url: undefined,
			severity: `error`,
			text: `Unexpected "vh" unit. Use "vb". (${rule})`,
		},
	],
})
