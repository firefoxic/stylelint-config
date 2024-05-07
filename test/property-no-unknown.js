import { testRule } from "../utils/testRule.js"

let rule = `property-no-unknown`

let code = `
.valid {
	--my-property: my-value;
	color: #000000;
}

@font-face {
	font-family: my font;
	src: url("./my-font.woff2") format("woff2");
}

@font-feature-values my font {
	@swash {
		pretty: 1;
		cool: 2;
	}

	@annotation {
		circled: 1;
		black-boxed: 3;
	}

	@ornaments {
		fleurons: 1;
	}

	@stylistic {
		inscriptional-g: 1;
	}

	@styleset {
		geometric-m: 7;
	}

	@character-variant {
		beta-3: 2 3;
	}
}

.invalid {
	my-property: my-value;
	colour: #000000;
}
`

testRule({
	description: `Properties must be known`,
	rule,
	code,
	expectedWarnings: [
		{
			line: 41,
			column: 2,
			endLine: 41,
			endColumn: 13,
			rule,
			severity: `error`,
			text: `Unexpected unknown property "my-property" (${rule})`,
		},
		{
			line: 42,
			column: 2,
			endLine: 42,
			endColumn: 8,
			rule,
			severity: `error`,
			text: `Unexpected unknown property "colour" (${rule})`,
		},
	],
})
