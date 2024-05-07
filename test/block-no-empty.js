import { testRule } from "../utils/testRule.js"

let rule = `block-no-empty`

let code = `
.valid {
	gap: 0;
}

@media print {
	.valid {
		gap: 0;
	}
}

.invalid-1 {
}

.invalid-2 {

}

.invalid-3 {
	/* foo */
}

@media print {
	.invalid-1 {
	}

	.invalid-2 {

	}

	.invalid-3 {
		/* bar */
	}
}
`

testRule({
	description: `The block must not be empty`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 12,
			column: 12,
			endLine: 13,
			endColumn: 2,
			rule,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
		{
			line: 15,
			column: 12,
			endLine: 17,
			endColumn: 2,
			rule,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
		{
			line: 19,
			column: 12,
			endLine: 21,
			endColumn: 2,
			rule,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
		{
			line: 24,
			column: 13,
			endLine: 25,
			endColumn: 3,
			rule,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
		{
			line: 27,
			column: 13,
			endLine: 29,
			endColumn: 3,
			rule,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
		{
			line: 31,
			column: 13,
			endLine: 33,
			endColumn: 3,
			rule,
			severity: `error`,
			text: `Unexpected empty block (${rule})`,
		},
	],
})
