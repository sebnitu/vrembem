# Base

Includes useful default styles and base modules for common HTML elements.

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

The HTML blockquote element is used for markup up extended quotations. This module helps style these elements in a distinct and appealing way by providing the `.blockquote` CSS class.

```html
<blockquote class="blockquote" cite="...">
  <p>...</p>
  <footer>
    ...,
    <cite>...</cite>
  </footer>
</blockquote>
```

Variable | Default | Description
---|---|---
`$output-blockquote` | `$output` &rarr; `true` | Toggles the output of this module.
`$blockquote-padding` | `1.5em` | Sets the padding property.
`$blockquote-spacing` | `1em` | Sets the vertical spacing between elements inside a blockquote using the margin property.
`$blockquote-color` | `inherit` | Sets the text color property.
`$blockquote-background` | `null` | Sets the background color property.
`$blockquote-border` | `core.$border-light` | Sets the border property.
`$blockquote-border-color-invert` | `core.$border-color-invert` | Sets the inverted border color. This is used when blockquotes appear on a dark background.
`$blockquote-border-radius` | `null` | Sets the border-radius property.
`$blockquote-accent-width` | `4px` | Sets the width of the accent CSS pseudo-element which renders on the right side of the blockquote element.
`$blockquote-accent-offset` | `-1px` | Sets the offset of the accent CSS pseudo-element. Recommended to set negative of the border width.
`$blockquote-accent-color` | `core.$primary` | Sets the color of the accent CSS pseudo-element.

#### `@mixin blockquote()`

Output the styles for a blockquote element.

**Example**

```scss
blockquote {
  @include blockquote();
}

// CSS Output
blockquote {
  position: relative;
  padding: 1.5em;
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: inherit;
}

blockquote::before {
  content: "";
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: -1px;
  width: 4px;
  background-color: #00bcd4;
}

blockquote > * + * {
  margin-top: 1em;
}
```

### `code`

The HTML code element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. This module helps style these elements by providing the `.code` CSS class.

```html
<code class="code">a = 17</code>
```

Variable | Default | Description
---|---|---
`$output-code` | `$output` &rarr; `true` | Toggles the output of this module.
`$code-padding` | `null` | Sets the padding property.
`$code-background` | `null` | Sets the background property.
`$code-border` | `null` | Sets the border property.
`$code-border-radius` | `core.$border-radius` | Sets the border-radius property.
`$code-color` | `core.$pink` | Sets the text color property.
`$code-color-invert` | `core.$pink-300` | Sets the inverted text color. This is used when code elements appear on a dark background.
`$code-font-family` | `core.$font-family-mono` | Sets the font-family property.
`$code-font-size` | `0.9em` | Sets the font-size property.

#### `@mixin code()`

Output the styles for a code element.

**Example**

```scss
code {
  @include code();
}

// CSS Output
.code {
  color: #e91e63;
  font-family: sfmono-regular, menlo, monaco, consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.9em;
  word-break: break-word;
}
```

### `embed`

The embed module is used to wrap iframes or video elements and keep them responsive. It consists of two primary elements, `.embed` wrapper and a single `embed__item` child element which could be applied to an iframe directly.

```html
<div class="embed">
  <iframe class="embed__item" src="..." width="560" height="315"></iframe>
</div>
```

Variable | Default | Description
---|---|---
`$output-embed` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-embed` | `"embed"` | String to use for the class name of the embed module.
`$embed-ratio` | `core.aspect-ratio(16, 9)` | The default aspect ratio to use.

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
