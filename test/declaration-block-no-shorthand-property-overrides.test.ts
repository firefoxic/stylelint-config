import { testRule } from "../utils/testRule.ts"

let rule = `declaration-block-no-shorthand-property-overrides`

testRule({
	description: `The shorthand property must not override the related longhand properties`,
	rule,
	cases: [
		{
			description: `accepts a longhand declared after its shorthand`,
			code: `a { padding: 10px; padding-left: 20px }`,
		},
		{
			description: `accepts a standalone transition-property`,
			code: `a { transition-property: opacity }`,
		},
		{
			description: `accepts a standalone transition shorthand`,
			code: `a { transition: opacity 1s linear }`,
		},
		{
			description: `accepts a vendor-prefixed shorthand after its longhand`,
			code: `a { transition-property: opacity; -webkit-transition: opacity 1s linear }`,
		},
		{
			description: `rejects padding overriding padding-left`,
			code: `
				a-1 {
					padding-left: 10px;
					padding: 20px;
				}
			`,
			expectedWarnings: [
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 9,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Overridden property "padding-left" by shorthand "padding" (${rule})`,
				},
			],
		},
		{
			description: `rejects transition overriding transition-property`,
			code: `
				a {
					transition-property: opacity;
					transition: opacity 1s linear;
				}
			`,
			expectedWarnings: [
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 12,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Overridden property "transition-property" by shorthand "transition" (${rule})`,
				},
			],
		},
		{
			description: `rejects a vendor-prefixed transition overriding its longhand`,
			code: `
				a {
					-webkit-transition-property: opacity;
					-webkit-transition: opacity 1s linear;
				}
			`,
			expectedWarnings: [
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 20,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Overridden property "-webkit-transition-property" by shorthand "-webkit-transition" (${rule})`,
				},
			],
		},
		{
			description: `rejects border overriding border-top-width`,
			code: `
				a {
					border-top-width: 1px;
					border: 2px solid blue;
				}
			`,
			expectedWarnings: [
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 8,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Overridden property "border-top-width" by shorthand "border" (${rule})`,
				},
			],
		},
	],
})
