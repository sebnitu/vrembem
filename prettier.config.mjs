/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 80,
  overrides: [
    {
      files: ["*.css", "*.scss"],
      options: {
        printWidth: 1000
      }
    }
  ]
};
