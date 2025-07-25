module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"@vue/eslint-config-typescript",
		"@vue/prettier"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
		extraFileExtensions: [".vue"],
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"vue/multi-word-component-names": "off",
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"prettier/prettier": "off",
	},
};
