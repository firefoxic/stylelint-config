import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-no-unknown`

testRule({
	description: `At-rules must be known`,
	rule,
	cases: [
		{
			description: `accepts known at-rules`,
			code: `
				@charset "utf-8";

				@import "a.css";

				@font-face {
					font-family: My Font;
					src: url("./my-font.woff2") format("woff2");
				}

				@font-feature-values My Font {
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

				@supports (gap: 0) {
					a {
						gap: 0;
					}
				}

				@page wide {
					size: a4 landscape;

					@top-left-corner {
						margin: 0;
					}
				}

				@keyframes slidein {
					from {
						transform: translateX(0%);
					}

					to {
						transform: translateX(100%);
					}
				}

				@counter-style thumbs {
					system: cyclic;
					symbols: "🐽";
					suffix: " ";
				}

				@property --my-answer {
					syntax: "<integer>";
					initial-value: 42;
					inherits: false;
				}

				@layer base;

				@layer base {
					.valid {
						gap: 0;
					}
				}

				@custom-media --small-viewport (width > 600px);

				@media (--small-viewport) {
					.valid {
						gap: 0;
					}
				}

				@container (width > 400px) {
					.valid {
						gap: 1em;
					}
				}

			`,
		},
		{
			description: `rejects unknown at-rules`,
			code: `
				@unknown-at-rule {
					.invalid {
						gap: 0;
					}
				}
			`,
			expectedWarnings: [
				{
					line: 2,
					column: 1,
					endLine: 2,
					endColumn: 17,
					rule,
					url: undefined,
					fix: undefined,
					severity: `error`,
					text: `Unknown at-rule "@unknown-at-rule" (${rule})`,
				},
			],
		},
	],
})
