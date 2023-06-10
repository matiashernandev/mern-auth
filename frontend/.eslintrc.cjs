module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:react/jsx-runtime"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname

  },
  plugins: [
    "react"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/space-before-function-paren": 0,
    "@typescript-eslint/quotes": 0,
    quotes: ["error", "double"],
    "@typescript-eslint/no-unused-vars": 1
    /* '@typescript-eslint/promise-function-async': 0,
    '@typescript-eslint/no-floating-promises': 0 */

  }
}
