import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default [
    js.configs.recommended,
    {
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            "prefer-const": "error",
            "no-unused-vars": "warn",
            "no-duplicate-imports": "error",
            "no-unreachable": "error",
            "no-console": "warn",
            camelcase: "error",
            eqeqeq: "warn",
            "no-var": "error",
            "@stylistic/indent": ["error", 4],
            "@stylistic/quotes": ["error", "double"],
        },
        files: ["**/*.js"],
        languageOptions: { sourceType: "commonjs" },
    },
    { languageOptions: { globals: globals.browser } },
];
