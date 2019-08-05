module.exports = {
  // Extends
  // https://github.com/stylelint/stylelint-config-standard
  "extends": "stylelint-config-standard",

  // Plugins
  "plugins": [
    "stylelint-order",
    "stylelint-scss",
    "stylelint-selector-bem-pattern"
  ],

  "rules": {
    // Rules
    // https://stylelint.io/user-guide/rules
    "at-rule-no-unknown": null,
    "at-rule-empty-line-before": null,
    "block-closing-brace-newline-after": [
      "always", {
        "ignoreAtRules": [
          "if",
          "else"
        ]
      }
    ],
    "color-hex-length": null,
    "declaration-empty-line-before": "never",
    "property-no-unknown": true,
    "selector-max-compound-selectors": 3,
    "selector-max-id": 0,
    "selector-no-qualifying-type": true,

    // Rules: stylelint-order
    // https://github.com/hudochenkov/stylelint-order
    "order/order": [
      [
        {
          "type": "at-rule",
          "hasBlock": false
        },
        "custom-properties",
        "declarations"
      ]
    ],
    "order/properties-alphabetical-order": true,

    // Rules: stylelint-scss
    // https://github.com/kristerkari/stylelint-scss
    "scss/selector-no-redundant-nesting-selector": true,
    "scss/at-import-no-partial-leading-underscore": true,

    // Rules: stylelint-selector-bem-pattern
    // https://github.com/simonsmith/stylelint-selector-bem-pattern
    "plugin/selector-bem-pattern": {
      "preset": "bem"
    }
  }
}
