import stylelint from "stylelint"
import { describe, expect, it } from "vitest"

import config from "../stylelint.config.ts"

type RuleTest = {
	description: string,
	rule: string,
	code: string,
	expectedWarnings: stylelint.Warning[],
}

function isRuleName (rule: string): rule is keyof typeof config.rules {
	return Object.hasOwn(config.rules, rule)
}

/**
 * Test the specified rule with its configuration from `stylelint.config.ts`.
 *
 * @param test - Test run parameters.
 */
export function testRule (test: RuleTest): void {
	let { description, rule, code, expectedWarnings } = test

	if (!isRuleName(rule)) throw new Error(`"${rule}" is not configured in stylelint.config.ts`)

	describe(rule, () => {
		it(description, async () => {
			let [result] = await stylelint.lint({
				code,
				config: {
					languageOptions: config.languageOptions,
					plugins: config.plugins,
					rules: {
						[rule]: config.rules[rule],
					},
				},
			}).then((r) => r.results)

			expect(result.parseErrors).toStrictEqual([])
			expect(result.invalidOptionWarnings).toStrictEqual([])
			expect(result.warnings).toStrictEqual(expectedWarnings)
		})
	})
}
