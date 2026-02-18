import { testRule } from "../../utils/testRule.js"

let plugin = {
	name: `stylelint-plugin-logical-css`,
	prefix: `logical-css/`,
}

let rule = `${plugin.prefix}require-logical-units`

let code = `
.valid {
	block-size: 100vb;
	inline-size: 80vi;
	max-block-size: 50cqb;
	max-inline-size: 100cqi;
	min-block-size: 100dvb;
	inline-size: min(80vi, 100%);
	inline-size: clamp(20vi, 50%, 80vi);
}
фыв
.invalid {
	height: 100vh;
	width: 80vw;
	max-height: 50cqh;
	max-width: 100cqw;
	min-height: 100dvh;
	width: min(80vw, 100%);
	width: clamp(20vw, 50%, 80vw);
}
`

testRule({
	description: `Units must be logical`,
	rule,
	plugin,
	code,
	expectedWarnings: [
		{
			line: 13,
			column: 2,
			endLine: 13,
			endColumn: 16,
			fix: undefined,
			rule: `logical-css/require-logical-units`,
			severity: `error`,
			text: `Unexpected physical CSS unit vh. Please use the logical equivalent — vb (${rule})`,
			url: undefined,
		},
		{
			line: 14,
			column: 2,
			endLine: 14,
			endColumn: 14,
			fix: undefined,
			rule: `logical-css/require-logical-units`,
			severity: `error`,
			text: `Unexpected physical CSS unit vw. Please use the logical equivalent — vi (${rule})`,
			url: undefined,
		},
		{
			line: 15,
			column: 2,
			endLine: 15,
			endColumn: 20,
			fix: undefined,
			rule: `logical-css/require-logical-units`,
			severity: `error`,
			text: `Unexpected physical CSS unit cqh. Please use the logical equivalent — cqb (${rule})`,
			url: undefined,
		},
		{
			line: 16,
			column: 2,
			endLine: 16,
			endColumn: 20,
			fix: undefined,
			rule: `logical-css/require-logical-units`,
			severity: `error`,
			text: `Unexpected physical CSS unit cqw. Please use the logical equivalent — cqi (${rule})`,
			url: undefined,
		},
		{
			line: 17,
			column: 2,
			endLine: 17,
			endColumn: 21,
			fix: undefined,
			rule: `logical-css/require-logical-units`,
			severity: `error`,
			text: `Unexpected physical CSS unit dvh. Please use the logical equivalent — dvb (${rule})`,
			url: undefined,
		},
		{
			line: 18,
			column: 2,
			endLine: 18,
			endColumn: 25,
			fix: undefined,
			rule: `logical-css/require-logical-units`,
			severity: `error`,
			text: `Unexpected physical CSS unit vw. Please use the logical equivalent — vi (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 2,
			endLine: 19,
			endColumn: 32,
			fix: undefined,
			rule: `logical-css/require-logical-units`,
			severity: `error`,
			text: `Unexpected physical CSS unit vw. Please use the logical equivalent — vi (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 2,
			endLine: 19,
			endColumn: 32,
			fix: undefined,
			rule: `logical-css/require-logical-units`,
			severity: `error`,
			text: `Unexpected physical CSS unit vw. Please use the logical equivalent — vi (${rule})`,
			url: undefined,
		},
	],
})
