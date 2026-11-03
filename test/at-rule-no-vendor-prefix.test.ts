import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-no-vendor-prefix`

testRule({
	description: `At-rules must not contain vendor prefixes`,
	rule,
	cases: [
		{
			description: `accepts standard at-rules`,
			code: `
				@keyframes valid {
					0% {
						top: 0;
					}
				}

				@viewport {
					orientation: landscape;
				}
			`,
		},
		{
			description: `rejects vendor-prefixed at-rules`,
			code: `
				@-webkit-keyframes invalid {
					0% {
						top: 0;
					}
				}

				@-ms-viewport {
					orientation: landscape;
				}
			`,
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
				{
					line: 8,
					column: 1,
					endLine: 8,
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
