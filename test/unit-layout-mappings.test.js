import { testRule } from "../utils/testRule.js"

let rule = `unit-layout-mappings`

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
	code,
	expectedWarnings: [
		{
			line: 13,
			column: 13,
			endLine: 13,
			endColumn: 15,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical unit "vh" (${rule})`,
			url: undefined,
		},
		{
			line: 14,
			column: 11,
			endLine: 14,
			endColumn: 13,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical unit "vw" (${rule})`,
			url: undefined,
		},
		{
			line: 15,
			column: 16,
			endLine: 15,
			endColumn: 19,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical unit "cqh" (${rule})`,
			url: undefined,
		},
		{
			line: 16,
			column: 16,
			endLine: 16,
			endColumn: 19,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical unit "cqw" (${rule})`,
			url: undefined,
		},
		{
			line: 17,
			column: 17,
			endLine: 17,
			endColumn: 20,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical unit "dvh" (${rule})`,
			url: undefined,
		},
		{
			line: 18,
			column: 15,
			endLine: 18,
			endColumn: 17,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical unit "vw" (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 17,
			endLine: 19,
			endColumn: 19,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical unit "vw" (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 28,
			endLine: 19,
			endColumn: 30,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical unit "vw" (${rule})`,
			url: undefined,
		},
	],
})
