import stylelint from "stylelint"
import { describe, expect, it } from "vitest"

import config from "../stylelint.config.js"

/**
 * Test the specified rule with its configuration from the `stylelint.config.js` file.
 *
 * @param {Object} test - Test run parameters.
 * @param {string} test.description - The description of the test.
 * @param {string} test.rule - The name of the rule under test.
 * @param {string} test.code - The code for the rule under test.
 * @param {Array} test.expectedWarnings - Full data of the warnings expected in the test.
 * @returns {void}
 */
export function testRule ({ description, rule, code, expectedWarnings }) {
	if (!(rule in config.rules)) throw new Error(`"${rule}" is not configured in stylelint.config.js`)

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
