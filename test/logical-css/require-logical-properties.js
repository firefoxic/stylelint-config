import { testRule } from "../../utils/testRule.js"

let plugin = {
	name: `stylelint-plugin-logical-css`,
	prefix: `logical-css/`,
}

let rule = `${plugin.prefix}require-logical-properties`

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
}
`

testRule({
	description: `Properties and values must be logical`,
	rule,
	plugin,
	code,
	expectedWarnings: [
		{
			line: 17,
			column: 2,
			endLine: 17,
			endColumn: 14,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property width. Please use the logical equivalent — inline-size (${rule})`,
			url: undefined,
		},
		{
			line: 18,
			column: 2,
			endLine: 18,
			endColumn: 15,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property height. Please use the logical equivalent — block-size (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 2,
			endLine: 19,
			endColumn: 19,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property margin-top. Please use the logical equivalent — margin-block-start (${rule})`,
			url: undefined,
		},
		{
			line: 20,
			column: 2,
			endLine: 20,
			endColumn: 20,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property margin-left. Please use the logical equivalent — margin-inline-start (${rule})`,
			url: undefined,
		},
		{
			line: 21,
			column: 2,
			endLine: 21,
			endColumn: 21,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property margin-right. Please use the logical equivalent — margin-inline-end (${rule})`,
			url: undefined,
		},
		{
			line: 22,
			column: 2,
			endLine: 22,
			endColumn: 20,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property padding-top. Please use the logical equivalent — padding-block-start (${rule})`,
			url: undefined,
		},
		{
			line: 23,
			column: 2,
			endLine: 23,
			endColumn: 23,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property padding-bottom. Please use the logical equivalent — padding-block-end (${rule})`,
			url: undefined,
		},
		{
			line: 24,
			column: 2,
			endLine: 24,
			endColumn: 22,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property padding-right. Please use the logical equivalent — padding-inline-end (${rule})`,
			url: undefined,
		},
		{
			line: 25,
			column: 2,
			endLine: 25,
			endColumn: 10,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property left. Please use the logical equivalent — inset-inline-start (${rule})`,
			url: undefined,
		},
		{
			line: 26,
			column: 2,
			endLine: 26,
			endColumn: 15,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property bottom. Please use the logical equivalent — inset-block-end (${rule})`,
			url: undefined,
		},
		{
			line: 27,
			column: 2,
			endLine: 27,
			endColumn: 31,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property border-left. Please use the logical equivalent — border-inline-start (${rule})`,
			url: undefined,
		},
		{
			line: 28,
			column: 2,
			endLine: 28,
			endColumn: 27,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property border-bottom-color. Please use the logical equivalent — border-block-end-color (${rule})`,
			url: undefined,
		},
		{
			line: 29,
			column: 2,
			endLine: 29,
			endColumn: 30,
			fix: undefined,
			rule: `logical-css/require-logical-properties`,
			severity: `error`,
			text: `Unexpected physical CSS property border-top-left-radius. Please use the logical equivalent — border-start-start-radius (${rule})`,
			url: undefined,
		},
	],
})
