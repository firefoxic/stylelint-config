import { testRule } from "../utils/testRule.js"

let rule = `at-rule-no-vendor-prefix`

let code = `
@keyframes valid {
	0% {
		top: 0;
	}
}

@viewport {
	orientation: landscape;
}

@-webkit-keyframes invalid {
	0% {
		top: 0;
	}
}

@-ms-viewport {
	orientation: landscape;
}
`

testRule({
	description: `At-rules must not contain vendor prefixes`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 12,
			column: 1,
			endLine: 12,
			endColumn: 19,
			rule,
			severity: `error`,
			text: `Unexpected vendor-prefixed at-rule "@-webkit-keyframes" (${rule})`,
		},
		{
			line: 18,
			column: 1,
			endLine: 18,
			endColumn: 14,
			rule,
			severity: `error`,
			text: `Unexpected vendor-prefixed at-rule "@-ms-viewport" (${rule})`,
		},
	],
})
