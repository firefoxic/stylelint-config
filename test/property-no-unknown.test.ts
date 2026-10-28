import { testRule } from "../utils/testRule.ts"

let rule = `property-no-unknown`

testRule({
	description: `Properties must be known`,
	rule,
	cases: [
		{
			description: `accepts custom properties`,
			code: `a { --my-property: my-value; }`,
		},
		{
			description: `accepts known standard properties`,
			code: `a { color: #000000; }`,
		},
		{
			description: `accepts descriptors in "@font-face"`,
			code: `
				@font-face {
					font-family: my font;
					src: url("./my-font.woff2") format("woff2");
				}
			`,
		},
		{
			description: `accepts descriptors in "@font-feature-values"`,
			code: `
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
			description: `rejects "my-property"`,
			code: `a { my-property: my-value; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 16,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown property "my-property" (${rule})`,
				},
			],
		},
		{
			description: `rejects "colour"`,
			code: `a { colour: #000000; }`,
			expectedWarnings: [
				{
					line: 2,
					column: 5,
					endLine: 2,
					endColumn: 11,
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
