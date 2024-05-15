/** @type {import('stylelint').Config} */
export default {
	plugins: [`@stylistic/stylelint-plugin`],
	rules: {
		"annotation-no-unknown": true,
		"at-rule-empty-line-before": [
			`always`,
			{
				except: [
					`first-nested`,
					`blockless-after-same-name-blockless`,
				],
				ignore: [`after-comment`],
			},
		],
		"at-rule-no-unknown": true,
		"at-rule-no-vendor-prefix": true,
		"block-no-empty": [
			true,
			{
				ignore: [`comments`],
			},
		],
		"color-function-notation": `modern`,
		"color-hex-alpha": `never`,
		"color-hex-length": `long`,
		"color-named": `never`,
		"color-no-invalid-hex": true,
		"comment-no-empty": true,
		"custom-property-no-missing-var-function": true,
		"declaration-block-no-duplicate-custom-properties": true,
		"declaration-block-no-duplicate-properties": true,
		"declaration-block-no-shorthand-property-overrides": true,
		"declaration-block-single-line-max-declarations": 0,
		"declaration-no-important": true,
		"declaration-property-value-no-unknown": true,
		"font-family-name-quotes": `always-where-required`,
		"font-family-no-duplicate-names": [
			true,
			{
				ignoreFontFamilyNames: [`monospace`],
			},
		],
		"font-family-no-missing-generic-family-keyword": true,
		"function-calc-no-unspaced-operator": true,
		"function-linear-gradient-no-nonstandard-direction": true,
		"function-name-case": `lower`,
		"function-no-unknown": true,
		"function-url-quotes": `always`,
		"import-notation": `string`,
		"keyframe-block-no-duplicate-selectors": true,
		"keyframe-declaration-no-important": true,
		"keyframe-selector-notation": `percentage-unless-within-keyword-only-block`,
		"max-nesting-depth": [
			2,
			{
				ignore: [
					`blockless-at-rules`,
					`pseudo-classes`,
				],
			},
		],
		"media-feature-name-no-unknown": true,
		"media-feature-name-no-vendor-prefix": true,
		"media-query-no-invalid": true,
		"named-grid-areas-no-invalid": true,
		"no-descending-specificity": true,
		"no-duplicate-at-import-rules": true,
		"no-duplicate-selectors": true,
		"no-empty-source": true,
		"no-invalid-double-slash-comments": true,
		"no-invalid-position-at-import-rule": true,
		"no-irregular-whitespace": true,
		"number-max-precision": [
			3,
			{
				insideFunctions: {
					"/^(oklch|oklab)$/": 9,
				},
			},
		],
		"property-no-unknown": [
			true,
			{
				ignoreAtRules: [`font-feature-values`],
			},
		],
		"property-no-vendor-prefix": true,
		"rule-empty-line-before": [
			`always`,
			{
				except: [`first-nested`],
				ignore: [`after-comment`],
			},
		],
		"selector-anb-no-unmatchable": true,
		"selector-attribute-quotes": `always`,
		"selector-max-compound-selectors": 2,
		"selector-max-id": 0,
		"selector-max-universal": 2,
		"selector-not-notation": `complex`,
		"selector-pseudo-class-no-unknown": true,
		"selector-pseudo-element-colon-notation": `double`,
		"selector-pseudo-element-no-unknown": true,
		"selector-type-case": `lower`,
		"selector-type-no-unknown": [
			true,
			{
				ignore: [`custom-elements`],
			},
		],
		"string-no-newline": true,
		"unit-no-unknown": true,
		"value-keyword-case": `lower`,
		"value-no-vendor-prefix": true,

		"@stylistic/at-rule-name-case": `lower`,
		"@stylistic/at-rule-name-space-after": `always`,
		"@stylistic/at-rule-semicolon-newline-after": `always`,
		"@stylistic/block-closing-brace-empty-line-before": `never`,
		"@stylistic/block-closing-brace-newline-after": `always`,
		"@stylistic/block-closing-brace-newline-before": `always`,
		"@stylistic/block-closing-brace-space-after": `always-single-line`,
		"@stylistic/block-closing-brace-space-before": `always-single-line`,
		"@stylistic/block-opening-brace-newline-after": `always`,
		"@stylistic/block-opening-brace-space-after": `always-single-line`,
		"@stylistic/block-opening-brace-space-before": `always`,
		"@stylistic/color-hex-case": `lower`,
		"@stylistic/declaration-bang-space-after": `never`,
		"@stylistic/declaration-bang-space-before": `always`,
		"@stylistic/declaration-block-semicolon-newline-after": `always`,
		"@stylistic/declaration-block-semicolon-newline-before": `never-multi-line`,
		"@stylistic/declaration-block-semicolon-space-after": `always-single-line`,
		"@stylistic/declaration-block-semicolon-space-before": `never`,
		"@stylistic/declaration-block-trailing-semicolon": `always`,
		"@stylistic/declaration-colon-newline-after": `always-multi-line`,
		"@stylistic/declaration-colon-space-after": `always-single-line`,
		"@stylistic/declaration-colon-space-before": `never`,
		"@stylistic/function-comma-newline-after": `always-multi-line`,
		"@stylistic/function-comma-newline-before": `never-multi-line`,
		"@stylistic/function-comma-space-after": `always-single-line`,
		"@stylistic/function-comma-space-before": `never`,
		"@stylistic/function-max-empty-lines": 0,
		"@stylistic/function-parentheses-space-inside": `never-single-line`,
		"@stylistic/function-whitespace-after": `always`,
		"@stylistic/indentation": `tab`,
		"@stylistic/max-empty-lines": 2,
		"@stylistic/media-feature-colon-space-after": `always`,
		"@stylistic/media-feature-colon-space-before": `never`,
		"@stylistic/media-feature-name-case": `lower`,
		"@stylistic/media-feature-parentheses-space-inside": `never`,
		"@stylistic/media-feature-range-operator-space-after": `always`,
		"@stylistic/media-feature-range-operator-space-before": `always`,
		"@stylistic/media-query-list-comma-newline-after": `always-multi-line`,
		"@stylistic/media-query-list-comma-newline-before": `never-multi-line`,
		"@stylistic/media-query-list-comma-space-after": `always-single-line`,
		"@stylistic/media-query-list-comma-space-before": `never-single-line`,
		"@stylistic/no-eol-whitespace": true,
		"@stylistic/no-extra-semicolons": true,
		"@stylistic/no-missing-end-of-source-newline": true,
		"@stylistic/number-leading-zero": `always`,
		"@stylistic/number-no-trailing-zeros": true,
		"@stylistic/property-case": `lower`,
		"@stylistic/selector-attribute-brackets-space-inside": `never`,
		"@stylistic/selector-attribute-operator-space-after": `never`,
		"@stylistic/selector-attribute-operator-space-before": `never`,
		"@stylistic/selector-combinator-space-after": `always`,
		"@stylistic/selector-combinator-space-before": `always`,
		"@stylistic/selector-descendant-combinator-no-non-space": true,
		"@stylistic/selector-list-comma-newline-after": `always`,
		"@stylistic/selector-list-comma-newline-before": `never-multi-line`,
		"@stylistic/selector-list-comma-space-after": `always-single-line`,
		"@stylistic/selector-list-comma-space-before": `never`,
		"@stylistic/selector-max-empty-lines": 0,
		"@stylistic/selector-pseudo-class-case": `lower`,
		"@stylistic/selector-pseudo-class-parentheses-space-inside": `never`,
		"@stylistic/selector-pseudo-element-case": `lower`,
		"@stylistic/string-quotes": `double`,
		"@stylistic/unit-case": `lower`,
		"@stylistic/value-list-comma-newline-after": `always-multi-line`,
		"@stylistic/value-list-comma-newline-before": `never-multi-line`,
		"@stylistic/value-list-comma-space-after": `always-single-line`,
		"@stylistic/value-list-comma-space-before": `never`,
		"@stylistic/value-list-max-empty-lines": 0,
	},
}
