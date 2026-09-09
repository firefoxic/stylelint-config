import { testRule } from "../utils/testRule.js"

let rule = `property-layout-mappings`

let code = `
.valid {
	inline-size: 100%;
	block-size: 50vh;
	margin-block-start: 1rem;
	margin-inline: 2rem;
	padding-block: 10px;
	padding-inline-end: 20px;
	inset-inline-start: 0;
	inset-block-end: 10px;
	border-inline-start: 1px solid black;
	border-block-end-color: red;
	border-start-start-radius: 8px;
	transition: margin-inline-start 0 ease;
}

.invalid {
	width: 100%;
	height: 50vh;
	margin-top: 1rem;
	margin-left: 2rem;
	margin-right: 2rem;
	padding-top: 10px;
	padding-bottom: 10px;
	padding-right: 20px;
	left: 0;
	bottom: 10px;
	border-left: 1px solid black;
	border-bottom-color: red;
	border-top-left-radius: 8px;
	transition: margin-left 0 ease;
}
`

testRule({
	description: `Properties and values must be logical`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 18,
			column: 2,
			endLine: 18,
			endColumn: 7,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "width" (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 2,
			endLine: 19,
			endColumn: 8,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "height" (${rule})`,
			url: undefined,
		},
		{
			line: 20,
			column: 2,
			endLine: 20,
			endColumn: 12,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "margin-top" (${rule})`,
			url: undefined,
		},
		{
			line: 21,
			column: 2,
			endLine: 21,
			endColumn: 13,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "margin-left" (${rule})`,
			url: undefined,
		},
		{
			line: 22,
			column: 2,
			endLine: 22,
			endColumn: 14,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "margin-right" (${rule})`,
			url: undefined,
		},
		{
			line: 23,
			column: 2,
			endLine: 23,
			endColumn: 13,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "padding-top" (${rule})`,
			url: undefined,
		},
		{
			line: 24,
			column: 2,
			endLine: 24,
			endColumn: 16,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "padding-bottom" (${rule})`,
			url: undefined,
		},
		{
			line: 25,
			column: 2,
			endLine: 25,
			endColumn: 15,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "padding-right" (${rule})`,
			url: undefined,
		},
		{
			line: 26,
			column: 2,
			endLine: 26,
			endColumn: 6,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "left" (${rule})`,
			url: undefined,
		},
		{
			line: 27,
			column: 2,
			endLine: 27,
			endColumn: 8,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "bottom" (${rule})`,
			url: undefined,
		},
		{
			line: 28,
			column: 2,
			endLine: 28,
			endColumn: 13,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "border-left" (${rule})`,
			url: undefined,
		},
		{
			line: 29,
			column: 2,
			endLine: 29,
			endColumn: 21,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "border-bottom-color" (${rule})`,
			url: undefined,
		},
		{
			line: 30,
			column: 2,
			endLine: 30,
			endColumn: 24,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "border-top-left-radius" (${rule})`,
			url: undefined,
		},
		{
			line: 31,
			column: 14,
			endLine: 31,
			endColumn: 25,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical property "margin-left" (${rule})`,
			url: undefined,
		},
	],
})
