import { deepEqual } from "node:assert/strict"

import stylelint from "stylelint"
import { describe, it } from "vitest"

import config from "../stylelint.config.js"

/**
 * Test the specified rule with its configuration from the `stylelint.config.js` file.
 *
 * @param {Object} test - Test run parameters.
 * @param {string} test.description - The description of the test.
 * @param {string} test.rule - The name of the rule under test.
 * @param {Object} [test.plugin] - The plugin required for the rule under test.
 * @param {string} test.code - The code for the rule under test.
 * @param {Array} test.expectedWarnings - Full data of the warnings expected in the test.
 * @returns {void}
 */
export function testRule ({ description, rule, plugin, code, expectedWarnings }) {
	let ruleConfig = {
		plugins: plugin?.name,
		rules: {
			[rule]: config.rules[rule],
		},
	}

	describe(rule, () => {
		it(description, async () => {
			let warnings = await stylelint.lint({ code, config: ruleConfig }).then((r) => r.results[0].warnings)

			deepEqual(warnings, expectedWarnings)
		})
	})
}
