import { testRule } from "../utils/testRule.js"

let rule = `declaration-block-single-line-max-declarations`

let code = `
.valid {
	gap: 0;
}

.invalid { gap: 0; }
`

testRule({
	description: `The block must not be single-line`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 6,
			column: 10,
			endLine: 6,
			endColumn: 21,
			rule,
			severity: `error`,
			text: `Expected no more than 0 declarations (${rule})`,
		},
	],
})
