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

## Modules

The base component consists of a number of modules with their own set of specific customizable variables and output mixins.

- [`base`](#base)
- [`blockquote`](#blockquote)
- [`code`](#code)
- [`embed`](#embed)
- [`heading`](#heading)
- [`link`](#link)
- [`list`](#list)
- [`pre`](#pre)
- [`scroll-box`](#scroll-box)
- [`separator`](#separator)
- [`spacing`](#spacing)
- [`symbols`](#symbols)
- [`type`](#type)

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


### `blockquote`

TBD

Variable | Default | Description
---|---|---
`$output-blockquote` | `$output` &rarr; `true` | Toggles the output of this module.

### `code`

TBD

Variable | Default | Description
---|---|---
`$output-code` | `$output` &rarr; `true` | Toggles the output of this module.

### `embed`

TBD

Variable | Default | Description
---|---|---
`$output-embed` | `$output` &rarr; `true` | Toggles the output of this module.

### `heading`

TBD

Variable | Default | Description
---|---|---
`$output-heading` | `$output` &rarr; `true` | Toggles the output of this module.

### `link`

TBD

Variable | Default | Description
---|---|---
`$output-link` | `$output` &rarr; `true` | Toggles the output of this module.

### `list`

TBD

Variable | Default | Description
---|---|---
`$output-list` | `$output` &rarr; `true` | Toggles the output of this module.

### `pre`

TBD

Variable | Default | Description
---|---|---
`$output-pre` | `$output` &rarr; `true` | Toggles the output of this module.

### `scroll-box`

TBD

Variable | Default | Description
---|---|---
`$output-scroll-box` | `$output` &rarr; `true` | Toggles the output of this module.

### `separator`

TBD

Variable | Default | Description
---|---|---
`$output-separator` | `$output` &rarr; `true` | Toggles the output of this module.

### `spacing`

A utility for adding vertical spacing between an element's children. Spacing size and spacing values are generated from `$spacing-map` variable map.

- `spacing`
- `spacing-[key]`

```html
<div class="spacing">...</div>
```

Variable | Default | Description
---|---|---
`$output-spacing` | `$output` &rarr; `true` | Toggles the output of this module.

### `symbols`

TBD

Variable | Default | Description
---|---|---
`$output-symbols` | `$output` &rarr; `true` | Toggles the output of this module.

### `type`

TBD

Variable | Default | Description
---|---|---
`$output-type` | `$output` &rarr; `true` | Toggles the output of this module.
