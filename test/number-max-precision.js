import { testRule } from "../utils/testRule.js"

let rule = `number-max-precision`

let code = `
.valid {
	gap: 0.123em;
}

.valid {
	color: oklch(69.83% 0.123456789 44.123456789);
}

.valid {
	color: oklab(0.74, 0.123456789, 0.123456789);
}

.invalid {
	gap: 0.1234em;
}

.invalid {
	color: oklch(69.83% 0.1234567891 44.1234567891);
}

.invalid {
	color: oklab(0.74, 0.1234567891, 0.1234567891);
}
`

testRule({
	description: `Max precision must not exceed 9 within the oklch/oklab functions and 3 in all other cases.`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 15,
			column: 7,
			endLine: 15,
			endColumn: 13,
			rule,
			severity: `error`,
			text: `Expected "0.1234" to be "0.123" (${rule})`,
		},
		{
			line: 19,
			column: 22,
			endLine: 19,
			endColumn: 34,
			rule,
			severity: `error`,
			text: `Expected "0.1234567891" to be "0.123456789" (${rule})`,
		},
		{
			line: 19,
			column: 35,
			endLine: 19,
			endColumn: 48,
			rule,
			severity: `error`,
			text: `Expected "44.1234567891" to be "44.123456789" (${rule})`,
		},
		{
			line: 23,
			column: 21,
			endLine: 23,
			endColumn: 33,
			rule,
			severity: `error`,
			text: `Expected "0.1234567891" to be "0.123456789" (${rule})`,
		},
		{
			line: 23,
			column: 35,
			endLine: 23,
			endColumn: 47,
			rule,
			severity: `error`,
			text: `Expected "0.1234567891" to be "0.123456789" (${rule})`,
		},
	],
})
