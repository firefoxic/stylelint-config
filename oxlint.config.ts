import config from "@firefoxic/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
	"extends": [config],
	"env": {
		node: true,
	},
	"rules": {
		"import/exports-last": `off`,
	},
	"overrides": [
		{
			files: [`test/**/*.{js,ts}`],
			rules: {
				"no-undefined": `off`,
			},
		},
	],
})
