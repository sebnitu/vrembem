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

- [`base`](#base-1)
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
`$body-background` | `null` | Sets the background color that's applied to the body element.

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
`$blockquote-padding` | `1.5em` | ...
`$blockquote-spacing` | `1em` | ...
`$blockquote-color` | `inherit` | ...
`$blockquote-background` | `null` | ...
`$blockquote-border` | `core.$border-light` | ...
`$blockquote-border-invert` | `core.$border-invert` | ...
`$blockquote-border-radius` | `null` | ...
`$blockquote-border-width` | `4px` | ...
`$blockquote-border-offset` | `-1px` | ...
`$blockquote-border-color` | `core.$primary` | ...

### `code`

TBD

Variable | Default | Description
---|---|---
`$output-code` | `$output` &rarr; `true` | Toggles the output of this module.
`$code-padding` | `null` | ...
`$code-padding` | `null` | ...
`$code-border` | `null` | ...
`$code-border-radius` | `core.$border-radius` | ...
`$code-color` | `core.$pink` | ...
`$code-color-invert` | `core.$pink-300` | ...

### `embed`

TBD

Variable | Default | Description
---|---|---
`$output-embed` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-embed` | `"embed"` | String to use for the class name of the embed module.
`$embed-ratio` | `core.aspect-ratio(16, 9)` | ...

### `heading`

TBD

Variable | Default | Description
---|---|---
`$output-heading` | `$output` &rarr; `true` | Toggles the output of this module.
`$heading-font-family` | `null` | ...
`$heading-line-height` | `1.3` | ...
`$heading-color` | `inherit` | ...
`$heading-color-invert` | `null` | ...
`$heading-font-weight` | `core.font-weight("semi-bold")` | ...

### `link`

TBD

Variable | Default | Description
---|---|---
`$output-link` | `$output` &rarr; `true` | Toggles the output of this module.
`$link-text-decoration` | `none` | ...
`$link-text-decoration-hover` | `null` | ...
`$link-transition` | `null` | ...
`$link-color` | `core.$primary` | ...
`$link-color-hover` | `core.$primary-dark` | ...
`$link-border` | `1px solid core.$border-color` | ...
`$link-border-hover` | `1px solid currentColor` | ...
`$link-subtle-color` | `core.$color-subtle` | ...
`$link-subtle-color-hover` | `$link-color-hover` | ...
`$link-subtle-border-color` | `core.$border-color` | ...
`$link-subtle-border-color-hover` | `currentColor` | ...
`$link-invert-color` | `core.$white` | ...
`$link-invert-color-hover` | `core.$white` | ...
`$link-invert-border-color` | `rgba(core.$white, 0.5)` | ...
`$link-invert-border-color-hover` | `currentColor` | ...
`$link-invert-subtle-color` | `core.$color-invert-subtle` | ...
`$link-invert-subtle-color-hover` | `core.$color-invert` | ...
`$link-invert-subtle-border-color` | `rgba(core.$white, 0.5)` | ...
`$link-invert-subtle-border-color-hover` | `currentColor` | ...

### `list`

TBD

Variable | Default | Description
---|---|---
`$output-list` | `$output` &rarr; `true` | Toggles the output of this module.
`$list-spacing` | `1.5em` | ...
`$list-item-spacing` | `0.5em` | ...

### `pre`

TBD

Variable | Default | Description
---|---|---
`$output-pre` | `$output` &rarr; `true` | Toggles the output of this module.
`$pre-padding` | `1em` | ...
`$pre-background` | `core.$shade` | ...
`$pre-border` | `null` | ...
`$pre-border-radius` | `core.$border-radius` | ...
`$pre-color` | `core.$color` | ...

### `scroll-box`

TBD

Variable | Default | Description
---|---|---
`$output-scroll-box` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-scroll-box` | `"scroll-box"` | String to use for the class name of the scroll-box module.

### `separator`

TBD

Variable | Default | Description
---|---|---
`$output-separator` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-separator` | `"sep"` | String to use for the class name of the separator module.
`$separator-border` | `1px solid core.$border-color` | ...
`$separator-border-invert` | `1px solid core.$border-color-invert` | ...

### `spacing`

A utility for adding vertical spacing between an element's children. Spacing size and spacing values are generated from `$spacing-map` variable map.

- `spacing`
- `spacing-[key]`

```html
<!-- Using the default spacing class -->
<div class="spacing">...</div>

<!-- Using the spacing class with modifier key -->
<div class="spacing-sm">...</div>
<div class="spacing-md">...</div>
```

Variable | Default | Description
---|---|---
`$output-spacing` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-spacing` | `"spacing"` | String to use for the class name of the spacing module.
`$spacing` | `core.$spacing` | ...
`$spacing-map-border` | `core.$spacing-map` | ...

### `symbols`

TBD

Variable | Default | Description
---|---|---
`$output-symbols` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-symbols` | `"symbols"` | String to use for the class name of the symbols module.

### `type`

TBD

Variable | Default | Description
---|---|---
`$output-type` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-type` | `"type"` | String to use for the class name of the type module.
`$type-font-family` | `null` | ...
`$type-font-size` | `null` | ...
`$type-line-height` | `null` | ...
`$type-spacing` | `null` | ...
