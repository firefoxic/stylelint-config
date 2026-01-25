import { testRule } from "../utils/testRule.js"

let rule = `declaration-property-value-disallowed-list`

let code = `
.valid-1 {
	display: inline flow;
}

.valid-2 {
	display: block flow-root;
}

.valid-3 {
	display: inline flow-root;
}

.valid-4 {
	display: inline flex;
}

.valid-5 {
	display: inline grid;
}

.valid-6 {
	display: block grid;
}

.valid-6 {
	display: contents;
}

.valid-6 {
	display: none;
}

.valid-6 {
	display: initial;
}

.valid-6 {
	display: unset;
}

.valid-6 {
	display: revert;
}

.invalid-1 {
	display: block;
}

.invalid-2 {
	display: inline;
}

.invalid-3 {
	display: flex;
}

.invalid-4 {
	display: grid;
}

.invalid-5 {
	display: flow-root;
}

.invalid-6 {
	display: inline-block;
}

.invalid-7 {
	display: inline-flex;
}

.invalid-8 {
	display: inline-grid;
}

.invalid-9 {
	display: list-item;
}

.invalid-10 {
	display: table;
}
`

testRule({
	description: `The display property value must not be in legacy syntax`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 47,
			column: 11,
			endLine: 47,
			endColumn: 16,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "block" for property "display" (${rule})`,
		},
		{
			line: 51,
			column: 11,
			endLine: 51,
			endColumn: 17,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "inline" for property "display" (${rule})`,
		},
		{
			line: 55,
			column: 11,
			endLine: 55,
			endColumn: 15,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "flex" for property "display" (${rule})`,
		},
		{
			line: 59,
			column: 11,
			endLine: 59,
			endColumn: 15,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "grid" for property "display" (${rule})`,
		},
		{
			line: 63,
			column: 11,
			endLine: 63,
			endColumn: 20,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "flow-root" for property "display" (${rule})`,
		},
		{
			line: 67,
			column: 11,
			endLine: 67,
			endColumn: 23,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "inline-block" for property "display" (${rule})`,
		},
		{
			line: 71,
			column: 11,
			endLine: 71,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "inline-flex" for property "display" (${rule})`,
		},
		{
			line: 75,
			column: 11,
			endLine: 75,
			endColumn: 22,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "inline-grid" for property "display" (${rule})`,
		},
		{
			line: 79,
			column: 11,
			endLine: 79,
			endColumn: 20,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "list-item" for property "display" (${rule})`,
		},
		{
			line: 83,
			column: 11,
			endLine: 83,
			endColumn: 16,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected value "table" for property "display" (${rule})`,
		},
	],
})
