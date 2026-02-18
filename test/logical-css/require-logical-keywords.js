import { testRule } from "../../utils/testRule.js"

let plugin = {
	name: `stylelint-plugin-logical-css`,
	prefix: `logical-css/`,
}

let rule = `${plugin.prefix}require-logical-keywords`

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
	plugin,
	code,
	expectedWarnings: [
		{
			line: 15,
			column: 3,
			endLine: 15,
			endColumn: 20,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword left. Please use the logical equivalent — start (${rule})`,
			url: undefined,
		},
		{
			line: 16,
			column: 3,
			endLine: 16,
			endColumn: 26,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword right. Please use the logical equivalent — end (${rule})`,
			url: undefined,
		},
		{
			line: 17,
			column: 3,
			endLine: 17,
			endColumn: 15,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword left. Please use the logical equivalent — inline-start (${rule})`,
			url: undefined,
		},
		{
			line: 18,
			column: 3,
			endLine: 18,
			endColumn: 16,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword right. Please use the logical equivalent — inline-end (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 3,
			endLine: 19,
			endColumn: 22,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword horizontal. Please use the logical equivalent — inline (${rule})`,
			url: undefined,
		},
		{
			line: 20,
			column: 3,
			endLine: 20,
			endColumn: 21,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword top. Please use the logical equivalent — block-start (${rule})`,
			url: undefined,
		},
		{
			line: 21,
			column: 3,
			endLine: 21,
			endColumn: 24,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword vertical. Please use the logical equivalent — block-axis (${rule})`,
			url: undefined,
		},
		{
			line: 22,
			column: 3,
			endLine: 22,
			endColumn: 30,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword bottom. Please use the logical equivalent — block-end (${rule})`,
			url: undefined,
		},
		{
			line: 22,
			column: 3,
			endLine: 22,
			endColumn: 30,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword left. Please use the logical equivalent — inline-start (${rule})`,
			url: undefined,
		},
		{
			line: 23,
			column: 3,
			endLine: 23,
			endColumn: 30,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword top. Please use the logical equivalent — block-start (${rule})`,
			url: undefined,
		},
		{
			line: 23,
			column: 3,
			endLine: 23,
			endColumn: 30,
			fix: undefined,
			rule: `logical-css/require-logical-keywords`,
			severity: `error`,
			text: `Unexpected physical CSS directional keyword right. Please use the logical equivalent — inline-end (${rule})`,
			url: undefined,
		},
	],
})
