import { testRule } from "../utils/testRule.js"

let rule = `no-unknown-custom-media`

let code = `
@custom-media --any-valid (width >= 40rem);

@media (--any-valid), (height < 40rem) {}

@media (--another-valid) {}

@custom-media --another-valid (width >= 60rem);

@media (--invalid) {}

@media (--invalid), (height < 40rem) {}
`

testRule({
	description: `Custom media queries should be known`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 10,
			column: 9,
			endLine: 10,
			endColumn: 18,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected unknown custom media "--invalid" (${rule})`,
		},
		{
			line: 12,
			column: 9,
			endLine: 12,
			endColumn: 18,
			rule,
			url: undefined,
			fix: undefined,
			severity: `error`,
			text: `Unexpected unknown custom media "--invalid" (${rule})`,
		},
	],
})
