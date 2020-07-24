# Base

Includes useful default styles and base components for common HTML elements.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fbase.svg)](https://www.npmjs.com/package/%40vrembem%2Fbase)

[Documentation](https://vrembem.com/packages/base)

## Installation

```
npm install @vrembem/base
```

### Styles

```scss
@use "@vrembem/base";
```

### Markup

Once loaded, the base component provides default styles for HTML elements and a number of output modules. Base also provides helpful variables and mixins for customizing the output.

```html
<!-- Using base element modules -->
<h1 class="h1">...</h1>
<p>...</p>
<ul class="list">
  <li>...</li>
</ul>

<!-- Using base type module -->
<div class="type">
  <h1>...</h1>
  <p>...</p>
  <ul>
    <li>...</li>
  </ul>
</div>
```

Alternatively, you can disable CSS output using the `$output` and `$output-[module]` variables. All base modules have a corresponding output variable that inherits it's value from `$output`.

```scss
// Will disable the output of the type module
@use "@vrembem/base" with (
  $output-type: false
);

// Will disable all modules, but enables the base module
@use "@vrembem/base" with (
  $output: false,
  $output-base: true
);
```

#### Global Variables

Setting these variables will impact more than one or up to all base modules.

Variable | Default | Description
---|---|---
`$prefix-block` | `null` | String to prefix blocks with.
`$prefix-element` | `"__"` | String to prefix element with.
`$prefix-modifier` | `"_"` | String to prefix modifier with.
`$prefix-modifier-value` | `"_"` | String to prefix modifier values with.
`$output` | `true` | Toggles the default output of all modules.

## Base Modules

### `base`

Outputs a number of base and reset element styles to help keep html elements predictable and easier to work with. Some more global options are set via the `@vrembem/core` component, while others that are specific to the base component are set directly here.

Variable | Default | Description
---|---|---
`$output-base` | `$output` &rarr; `true` | Toggles the output of this module.
`$box-sizing` | `border-box` | Sets the default box-sizing property for all HTML elements.
`$body-background` | `$null` | Sets the background color that's applied to the body element.

Here's an example of the default styles applied to all HTML elements and specific styles on the `html` and `body` elements.

```scss
*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

html {
  box-sizing: var.$box-sizing;
  font-size: core.$font-size;
  line-height: core.$line-height;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  background: var.$body-background;
  color: core.$color;
  font-family: core.$font-family;
}
```

For a complete understanding of what this module does, checkout the source: [`_base.scss`](https://github.com/sebnitu/vrembem/blob/master/packages/base/src/_base.scss)
