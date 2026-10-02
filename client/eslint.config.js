import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default [
    { ignores: ["dist", "node_modules"] },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                // Vite build-time replacement, previously reached for via
                // `process.env` which does not exist in the browser bundle.
                "import.meta.env": "readonly",
            },
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "no-unused-vars": [
                "error",
                {
                    // JSX-referenced identifiers are invisible to core ESLint
                    // without eslint-plugin-react, so PascalCase (components,
                    // hooks) and SCREAMING_CASE (constants) are ignored.
                    varsIgnorePattern: "^[A-Z_]",
                    // Destructured props land in the args bucket, so a component
                    // aliased out of `children` (`{ children: Section }`) has to
                    // be allowed here too.
                    argsIgnorePattern: "^[A-Z_]",
                    // An unused rest sibling is how you deliberately drop a prop.
                    ignoreRestSiblings: true,
                    caughtErrors: "none",
                },
            ],
            "no-empty": ["error", { allowEmptyCatch: true }],
            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true,
                    // A context file is expected to export both the provider and
                    // the `useX` hook that consumes it; splitting them would mean
                    // an import from two files for one concept.
                    allowExportNames: ["useTheme", "useDimension"],
                },
            ],
            // The audio and particle helpers read CSS custom properties that a
            // minifier cannot see; `no-unused-vars` on those params is noise.
            "no-unused-private-class-members": "off",
        },
    },
    {
        // Build tooling and tests run under Node.
        files: ["scripts/**/*.mjs", "**/*.test.{js,jsx}", "vitest.config.js"],
        languageOptions: {
            globals: { ...globals.node },
        },
    },
]