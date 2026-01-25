import { testRule } from "../utils/testRule.js"

let rule = `block-no-empty`

let code = `
.valid-1 {
	gap: 0;
}

.valid-2 {
	/* foo */
}

@media print {
	.valid-1 {
		gap: 0;
	}

	.valid-2 {
		/* bar */
	}
}

.invalid-1 {
}

.invalid-2 {

}

@media print {
	.invalid-1 {
	}

	.invalid-2 {

	}
}
`

testRule({
	description: `The block must not be empty`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 20,
			column: 12,
			endLine: 21,
			endColumn: 2,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
		{
			line: 23,
			column: 12,
			endLine: 25,
			endColumn: 2,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
		{
			line: 28,
			column: 13,
			endLine: 29,
			endColumn: 3,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
		{
			line: 31,
			column: 13,
			endLine: 33,
			endColumn: 3,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
	],
})
