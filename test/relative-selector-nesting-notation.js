import { testRule } from "../utils/testRule.js"

let rule = `relative-selector-nesting-notation`

let code = `
.valid-1 {
  a {}
}

.valid-2 {
  > a {}
}

.valid-3 {
  &:hover {}
}

.invalid-1 {
  & a {}
}

.invalid-2 {
  & > a {}
}
`

testRule({
	description: `Relative selectors must always use implicit nesting selector notation`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 15,
			column: 3,
			endLine: 15,
			endColumn: 6,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected implicit nesting notation (${rule})`,
			url: undefined,
		},
		{
			line: 19,
			column: 3,
			endLine: 19,
			endColumn: 8,
			fix: undefined,
			rule,
			severity: `error`,
			text: `Expected implicit nesting notation (${rule})`,
			url: undefined,
		},
	],
})
