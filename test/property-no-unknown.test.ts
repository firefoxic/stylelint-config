import { testRule } from "../utils/testRule.ts"

let rule = `property-no-unknown`

testRule({
	description: `Properties must be known`,
	rule,
	cases: [
		{
			description: `accepts known properties`,
			code: `
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
			`,
		},
		{
			description: `rejects unknown properties`,
			code: `
				.invalid {
					my-property: my-value;
					colour: #000000;
				}
			`,
			expectedWarnings: [
				{
					line: 3,
					column: 2,
					endLine: 3,
					endColumn: 13,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown property "my-property" (${rule})`,
				},
				{
					line: 4,
					column: 2,
					endLine: 4,
					endColumn: 8,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown property "colour" (${rule})`,
				},
			],
		},
	],
})
