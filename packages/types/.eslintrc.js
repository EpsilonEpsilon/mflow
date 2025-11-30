module.exports = {
  parser: "@typescript-eslint/parser", // lets ESLint understand TS
  parserOptions: {
    ecmaVersion: 2020, // latest ES features
    sourceType: "module", // enables import/export
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
};
