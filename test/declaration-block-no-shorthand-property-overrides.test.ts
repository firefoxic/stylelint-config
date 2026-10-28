import { testRule } from "../utils/testRule.ts"

let rule = `declaration-block-no-shorthand-property-overrides`

testRule({
	description: `The shorthand property must not override the related longhand properties`,
	rule,
	cases: [
		{
			description: `accepts declarations in either order when no override occurs`,
			code: `
				.valid-1 { padding: 10px; padding-left: 20px }
				.valid-2 { transition-property: opacity }
				.valid-2 { transition: opacity 1s linear }
				.valid-3 { transition-property: opacity; -webkit-transition: opacity 1s linear }
			`,
		},
		{
			description: `rejects shorthand properties that override longhands`,
			code: `
				.invalid-1 {
					padding-left: 10px;
					padding: 20px;
				}

				.invalid-2 {
					transition-property: opacity;
					transition: opacity 1s linear;
				}

				.invalid-3 {
					-webkit-transition-property: opacity;
					-webkit-transition: opacity 1s linear;
				}

				.invalid-4 {
					border-top-width: 1px;
					border: 2px solid blue;
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
				{
					line: 9,
					column: 2,
					endLine: 9,
					endColumn: 12,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Overridden property "transition-property" by shorthand "transition" (${rule})`,
				},
				{
					line: 14,
					column: 2,
					endLine: 14,
					endColumn: 20,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Overridden property "-webkit-transition-property" by shorthand "-webkit-transition" (${rule})`,
				},
				{
					line: 19,
					column: 2,
					endLine: 19,
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
