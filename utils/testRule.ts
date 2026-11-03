import { stripIndent } from "@morev/stylelint-testing-library"
import stylelint from "stylelint"
import { describe, expect, it } from "vitest"

import config from "../src/stylelint.config.ts"

type RuleTestCase = {
	description: string,
	code: string,
	expectedWarnings?: stylelint.Warning[],
}

type RuleTest = {
	description: string,
	rule: string,
	cases: RuleTestCase[],
}

function isRuleName (rule: string): rule is keyof typeof config.rules {
	return Object.hasOwn(config.rules, rule)
}

/**
 * Test the specified rule with its configuration from `src/stylelint.config.ts`.
 *
 * @param test - Test run parameters.
 */
export function testRule (test: RuleTest): void {
	let { description, rule, cases } = test

	if (!isRuleName(rule)) throw new Error(`"${rule}" is not configured in src/stylelint.config.ts`)

	describe(rule, () => {
		for (let { description: caseDescription, code, expectedWarnings = [] } of cases) {
			it(`${description}: ${caseDescription}`, async () => {
				let normalizedCode = stripIndent(code)

				let [result] = await stylelint.lint({
					code: normalizedCode.startsWith(`@charset `) ? `${normalizedCode}\n` : `\n${normalizedCode}\n`,
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
		}
	})
}
