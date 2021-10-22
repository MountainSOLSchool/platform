module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.base.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    quotes: ["error", "double"],
  },
};
