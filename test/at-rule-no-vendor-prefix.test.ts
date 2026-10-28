import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-no-vendor-prefix`

testRule({
	description: `At-rules must not contain vendor prefixes`,
	rule,
	cases: [
		{
			description: `accepts standard keyframes`,
			code: `@keyframes valid { 0% { top: 0; } }`,
		},
		{
			description: `accepts the standard viewport at-rule`,
			code: `@viewport { orientation: landscape; }`,
		},
		{
			description: `rejects the vendor-prefixed keyframes at-rule`,
			code: `@-webkit-keyframes invalid { 0% { top: 0; } }`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 19,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Vendor-prefixed at-rule "@-webkit-keyframes" (${rule})`,
				},
			],
		},
		{
			description: `rejects the vendor-prefixed viewport at-rule`,
			code: `@-ms-viewport { orientation: landscape; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 14,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Vendor-prefixed at-rule "@-ms-viewport" (${rule})`,
				},
			],
		},
	],
})
