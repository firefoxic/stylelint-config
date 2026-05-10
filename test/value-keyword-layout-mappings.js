import { testRule } from "../utils/testRule.js"

let rule = `value-keyword-layout-mappings`

let code = `
.valid {
	text-align: start;
	text-align-last: end;
	float: inline-start;
	clear: inline-end;
	resize: inline;
	caption-side: block-start;
	box-orient: inline-axis;
	offset-anchor: block-end inline-start;
	offset-position: block-start inline-end;
}

.invalid {
  text-align: left;
  text-align-last: right;
  float: left;
  clear: right;
  resize: horizontal;
  caption-side: top;
  box-orient: vertical;
  offset-anchor: bottom left;
  offset-position: top right;
}
`

testRule({
	description: `Properties and values must be logical`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 15,
			column: 15,
			endLine: 15,
			endColumn: 19,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "left" (${rule})`,
			url: undefined,
		},
		{
			line: 16,
			column: 20,
			endLine: 16,
			endColumn: 25,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "right" (${rule})`,
			url: undefined,
		},
		{
			line: 17,
			column: 10,
			endLine: 17,
			endColumn: 14,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "left" (${rule})`,
			url: undefined,
		},
		{
			line: 18,
			column: 10,
			endLine: 18,
			endColumn: 15,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "right" (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 11,
			endLine: 19,
			endColumn: 21,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "horizontal" (${rule})`,
			url: undefined,
		},
		{
			line: 20,
			column: 17,
			endLine: 20,
			endColumn: 20,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "top" (${rule})`,
			url: undefined,
		},
		{
			line: 22,
			column: 18,
			endLine: 22,
			endColumn: 24,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "bottom" (${rule})`,
			url: undefined,
		},
		{
			line: 22,
			column: 25,
			endLine: 22,
			endColumn: 29,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "left" (${rule})`,
			url: undefined,
		},
		{
			line: 23,
			column: 20,
			endLine: 23,
			endColumn: 23,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "top" (${rule})`,
			url: undefined,
		},
		{
			line: 23,
			column: 24,
			endLine: 23,
			endColumn: 29,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Disallowed physical keyword "right" (${rule})`,
			url: undefined,
		},
	],
})
