"use strict"

module.exports = {
  // Extends
  // https://github.com/stylelint/stylelint-config-standard
  "extends": "stylelint-config-standard",

  // Rules
  // https://stylelint.io/user-guide/rules
  "rules": {
    "at-rule-no-unknown": null,
    "at-rule-empty-line-before": null,
    "block-closing-brace-newline-after": [
      "always",
      {
        "ignoreAtRules": [
          "if",
          "else"
        ]
      }
    ]
  }
}
