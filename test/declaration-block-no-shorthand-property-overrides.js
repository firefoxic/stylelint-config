import { testRule } from "../utils/testRule.js"

let rule = `declaration-block-no-shorthand-property-overrides`

let code = `
.valid-1 { padding: 10px; padding-left: 20px }
.valid-2 { transition-property: opacity }
.valid-2 { transition: opacity 1s linear }
.valid-3 { transition-property: opacity; -webkit-transition: opacity 1s linear }

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
`

testRule({
	description: `The shorthand property must not override the related longhand properties`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 9,
			column: 2,
			endLine: 9,
			endColumn: 9,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected shorthand "padding" after "padding-left" (${rule})`,
		},
		{
			line: 14,
			column: 2,
			endLine: 14,
			endColumn: 12,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected shorthand "transition" after "transition-property" (${rule})`,
		},
		{
			line: 19,
			column: 2,
			endLine: 19,
			endColumn: 20,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected shorthand "-webkit-transition" after "-webkit-transition-property" (${rule})`,
		},
		{
			line: 24,
			column: 2,
			endLine: 24,
			endColumn: 8,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected shorthand "border" after "border-top-width" (${rule})`,
		},
	],
})
