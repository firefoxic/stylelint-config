import { testRule } from "../utils/testRule.ts"

let rule = `at-rule-no-unknown`

testRule({
	description: `At-rules must be known`,
	rule,
	cases: [
		{
			description: `accepts @charset`,
			code: `@charset "utf-8";`,
		},
		{
			description: `accepts @import`,
			code: `@import "a.css";`,
		},
		{
			description: `accepts @font-face`,
			code: `
				@font-face {
					font-family: My Font;
					src: url("./my-font.woff2") format("woff2");
				}
			`,
		},
		{
			description: `accepts @font-feature-values`,
			code: `
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

			`,
		},
		{
			description: `accepts @supports`,
			code: `
				@supports (gap: 0) {
					a {
						gap: 0;
					}
				}
			`,
		},
		{
			description: `accepts @page`,
			code: `
				@page wide {
					size: a4 landscape;

					@top-left-corner {
						margin: 0;
					}
				}

			`,
		},
		{
			description: `accepts @keyframes`,
			code: `
				@keyframes slidein {
					from {
						transform: translateX(0%);
					}

					to {
						transform: translateX(100%);
					}
				}

			`,
		},
		{
			description: `accepts @counter-style`,
			code: `
				@counter-style thumbs {
					system: cyclic;
					symbols: "🐽";
					suffix: " ";
				}

			`,
		},
		{
			description: `accepts @property`,
			code: `
				@property --my-answer {
					syntax: "<integer>";
					initial-value: 42;
					inherits: false;
				}

			`,
		},
		{
			description: `accepts @layer statements`,
			code: `@layer base;`,
		},
		{
			description: `accepts @layer blocks`,
			code: `
				@layer base {
					a {
						gap: 0;
					}
				}
			`,
		},
		{
			description: `accepts @custom-media`,
			code: `@custom-media --small-viewport (width > 600px);`,
		},
		{
			description: `accepts @media`,
			code: `
				@media (--small-viewport) {
					a {
						gap: 0;
					}
				}

			`,
		},
		{
			description: `accepts @container`,
			code: `
				@container (width > 400px) {
					a {
						gap: 1em;
					}
				}

			`,
		},
		{
			description: `rejects an unknown at-rule`,
			code: `@unknown-at-rule { a { gap: 0; } }`,
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
