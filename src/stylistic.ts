import type { Config } from "stylelint"

export default {
	"extends": [`@stylistic/stylelint-plugin/recommended`],
	"rules": {
		"at-rule-empty-line-before": [
			`always`,
			{
				except: [
					`blockless-after-same-name-blockless`,
					`first-nested`,
				],
				ignore: [`after-comment`],
			},
		],
		"comment-empty-line-before": [
			`always`,
			{
				except: [`first-nested`],
				ignore: [`stylelint-commands`],
			},
		],
		"custom-property-empty-line-before": [
			`always`,
			{
				except: [`after-custom-property`, `first-nested`],
				ignore: [`after-comment`, `inside-single-line-block`],
			},
		],
		"declaration-empty-line-before": [
			`always`,
			{
				except: [`after-declaration`, `first-nested`],
				ignore: [`after-comment`, `inside-single-line-block`],
			},
		],
		"rule-empty-line-before": [
			`always`,
			{
				except: [`first-nested`],
				ignore: [`after-comment`],
			},
		],
	},
} satisfies Config
