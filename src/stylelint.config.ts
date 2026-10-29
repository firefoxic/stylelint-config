import type { Config } from "stylelint"

import stylistic from "./stylistic.js"
import syntactic from "./syntactic.js"

export default {
	...syntactic,
	...stylistic,
	rules: {
		...syntactic.rules,
		...stylistic.rules,
	},
} satisfies Config
