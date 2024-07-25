export default {
  "extends": [
    "stylelint-config-standard-scss"
  ],
  "plugins": [
    "stylelint-order"
  ],
  "ignoreFiles": [
    "dev",
    "dist"
  ],
  "rules": {
    "scss/at-else-closing-brace-newline-after": null,
    "scss/at-else-closing-brace-space-after": null,
    "scss/at-else-empty-line-before": null,
    "scss/at-function-pattern": null,
    "scss/at-if-closing-brace-newline-after": null,
    "scss/at-if-closing-brace-space-after": null,
    "scss/at-mixin-argumentless-call-parentheses": null,
    "scss/at-mixin-pattern": null,
    "scss/at-rule-conditional-no-parentheses": null,
    "scss/dollar-variable-colon-space-after": null,
    "scss/dollar-variable-empty-line-before": null,
    "scss/dollar-variable-pattern": null,
    "scss/double-slash-comment-empty-line-before": null,
    "scss/selector-no-redundant-nesting-selector": true,
    "at-rule-no-unknown": null,
    "at-rule-empty-line-before": null,
    "color-function-notation": "modern",
    "color-hex-length": null,
    "custom-property-pattern": null,
    "declaration-empty-line-before": ["never", {
      "ignore": "after-comment"
    }],
    "hue-degree-notation": null,
    "media-feature-name-no-vendor-prefix": null,
    "media-feature-range-notation": "prefix",
    "no-descending-specificity": null,
    "property-no-unknown": true,
    "property-no-vendor-prefix": null,
    "selector-class-pattern": null,
    "selector-max-compound-selectors": 3,
    "selector-max-id": 0,
    "selector-no-qualifying-type": true,
    "selector-no-vendor-prefix": null,
    "order/order": [
      [
        "custom-properties",
        "declarations"
      ]
    ],
    "order/properties-order": [
      "content",
      "quotes",
      "position",
      "z-index",
      "top",
      "right",
      "bottom",
      "left",
      "display",
      "visibility",
      "box-sizing",
      "grid",
      "grid-after",
      "grid-area",
      "grid-auto-columns",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-before",
      "grid-column",
      "grid-column-end",
      "grid-column-gap",
      "grid-column-start",
      "grid-columns",
      "grid-end",
      "grid-gap",
      "grid-row",
      "grid-row-end",
      "grid-row-gap",
      "grid-row-start",
      "grid-rows",
      "grid-start",
      "grid-template",
      "grid-template-areas",
      "grid-template-columns",
      "grid-template-rows",
      "flex",
      "flex-basis",
      "flex-direction",
      "flex-flow",
      "flex-grow",
      "flex-shrink",
      "flex-wrap",
      "align-content",
      "align-items",
      "align-self",
      "justify-content",
      "order",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "float",
      "clear",
      "overflow",
      "overflow-x",
      "overflow-y",
      "clip",
      "zoom",
      "columns",
      "column-gap",
      "column-fill",
      "column-rule",
      "column-span",
      "column-count",
      "column-width",
      "table-layout",
      "empty-cells",
      "caption-side",
      "border-spacing",
      "border-collapse",
      "list-style",
      "list-style-position",
      "list-style-type",
      "list-style-image",
      "animation",
      "animation-name",
      "animation-duration",
      "animation-play-state",
      "animation-timing-function",
      "animation-delay",
      "animation-iteration-count",
      "animation-direction",
      "transform",
      "transform-origin",
      "transform-style",
      "backface-visibility",
      "perspective",
      "perspective-origin",
      "transition",
      "transition-property",
      "transition-duration",
      "transition-timing-function",
      "transition-delay",
      "outline",
      "outline-color",
      "outline-offset",
      "outline-style",
      "outline-width",
      "border",
      "border-top",
      "border-right",
      "border-bottom",
      "border-left",
      "border-width",
      "border-top-width",
      "border-right-width",
      "border-bottom-width",
      "border-left-width",
      "border-style",
      "border-top-style",
      "border-right-style",
      "border-bottom-style",
      "border-left-style",
      "border-radius",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-bottom-left-radius",
      "border-bottom-right-radius",
      "border-color",
      "border-top-color",
      "border-right-color",
      "border-bottom-color",
      "border-left-color",
      "stroke",
      "stroke-width",
      "stroke-linecap",
      "stroke-dasharray",
      "stroke-dashoffset",
      "background",
      "background-color",
      "background-image",
      "background-repeat",
      "background-position",
      "background-size",
      "background-clip",
      "box-shadow",
      "opacity",
      "fill",
      "color",
      "font",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-effect",
      "font-style",
      "font-variant",
      "font-weight",
      "font-emphasize",
      "font-emphasize-position",
      "font-emphasize-style",
      "letter-spacing",
      "line-height",
      "list-style",
      "word-spacing",
      "text-align",
      "text-align-last",
      "text-decoration",
      "text-indent",
      "text-justify",
      "text-overflow",
      "text-overflow-ellipsis",
      "text-overflow-mode",
      "text-rendering",
      "text-outline",
      "text-shadow",
      "text-transform",
      "text-wrap",
      "word-wrap",
      "overflow-wrap",
      "word-break",
      "text-emphasis",
      "text-emphasis-color",
      "text-emphasis-style",
      "text-emphasis-position",
      "vertical-align",
      "white-space",
      "word-spacing",
      "hyphens",
      "src",
      "tab-size",
      "counter-reset",
      "counter-increment",
      "resize",
      "cursor",
      "pointer-events",
      "speak",
      "user-select",
      "nav-index",
      "nav-up",
      "nav-right",
      "nav-down",
      "nav-left"
    ]
  }
};
