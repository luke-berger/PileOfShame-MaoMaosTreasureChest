import globals from "globals";
2 import pluginJs from "@eslint/js";
3 import tseslint from "typescript-eslint";
4 import eslintConfigPrettier from "eslint-config-prettier";
5
6
7 /** @type {import('eslint').Linter.Config[]} */
8 export default [
9 {files: ["**/*.{js,mjs,cjs,ts}"]},
10 {languageOptions: { globals: globals.browser }},
11 pluginJs.configs.recommended,
12 ...tseslint.configs.recommended,
13 eslintConfigPrettier
14 ];