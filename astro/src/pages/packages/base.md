---
layout: ../../layouts/Page.astro
name: Base
desc: "Includes useful default styles and base modules for common HTML elements."
package: "@vrembem/base"
---

# Base

Includes useful default styles and base modules for common HTML elements.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fbase.svg)](https://www.npmjs.com/package/%40vrembem%2Fbase)

[Documentation](https://vrembem.com/packages/base)

## Installation

```sh
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

| Variable                 | Default | Description                                |
| ------------------------ | ------- | ------------------------------------------ |
| `$prefix-block`          | `null`  | String to prefix blocks with.              |
| `$prefix-element`        | `"__"`  | String to prefix elements with.            |
| `$prefix-modifier`       | `"_"`   | String to prefix modifiers with.           |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with.     |
| `$output`                | `true`  | Toggles the default output of all modules. |

## Modules

The base component consists of a number of modules with their own set of specific customizable variables and output mixins.

- [`base`](#base)
- [`arrow`](#arrow)
- [`blockquote`](#blockquote)
- [`code`](#code)
- [`heading`](#heading)
- [`link`](#link)
- [`list`](#list)
- [`pre`](#pre)
- [`scroll-box`](#scroll-box)
- [`separator`](#separator)
- [`type`](#type)

> Modules are sorted by the order they're imported; alphabetically except for `base` having priority as first import.

### `base`

Outputs a number of base and reset element styles to help keep html elements predictable and easier to work with. Some more global options are set via the `@vrembem/core` component, while others that are specific to the base component are set directly here.

| Variable            | Default                  | Description                                                               |
| ------------------- | ------------------------ | ------------------------------------------------------------------------- |
| `$output-base`      | `$output` &rarr; `true`  | Toggles the output of this module.                                        |
| `$root-height`      | `100%`                   | Sets the height property on the root `html` and `body` elements.          |
| `$color`            | `core.$color`            | Sets the base color property.                                             |
| `$color-caption`    | `core.$color-subtle`     | Sets the color property for the caption element.                          |
| `$font-family`      | `core.$font-family`      | Sets the base font-family property.                                       |
| `$font-family-mono` | `core.$font-family-mono` | Sets the font-family property for elements that use a mono-spacing front. |
| `$font-size`        | `core.$font-size`        | Sets the base font-size property.                                         |
| `$font-size-sm`     | `core.$font-size-sm`     | Sets the font-size property for small element.                            |
| `$line-height`      | `core.$line-height`      | Sets the base line-height property.                                       |
| `$box-sizing`       | `border-box`             | Sets the default box-sizing property for all HTML elements.               |
| `$body-background`  | `null`                   | Sets the background color that's applied to the body element.             |

Here's an example of the base styles applied by the base module:

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
  height: $root-height;
}

html {
  box-sizing: $box-sizing;
  font-size: $font-size;
  line-height: $line-height;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  background: $body-background;
  color: $color;
  font-family: $font-family;
}

// Continued ...
```

For a complete understanding of what this module does, checkout the source: [`_base.scss`](https://github.com/sebnitu/vrembem/blob/main/packages/base/src/_base.scss)

### `arrow`

The arrow (caret) module creates directional triangles drawn with CSS.

```html
<span class="arrow"></span>
<span class="arrow-up"></span>
<span class="arrow-left"></span>
<span class="arrow-right"></span>
```

| Variable        | Default                 | Description                                                                                                                                      |
| --------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$output-arrow` | `$output` &rarr; `true` | Toggles the output of this module.                                                                                                               |
| `$class-arrow`  | `"arrow"`               | String to use for the class name of the arrow module.                                                                                            |
| `$arrow-color`  | `currentColor`          | Sets the default border-color property of the arrow.                                                                                             |
| `$arrow-size`   | `8px 6px`               | Sets the size of arrows. Can be a list where first number is the width of the "flat" side of the arrow and second is the width of the "pointer". |
| `$arrow-radius` | `2px`                   | Applies a slightly rounded edge to the none pointer corners.                                                                                     |

#### Example

Arrows are great indicators for buttons and menu items when interacting with them would toggle a popover or other togglable components.

```html
<button class="button">
  <span>Button</span>
  <span class="arrow"></span>
</button>
```

#### `@mixin arrow($dir, $color, $size, $radius)`

Output the styles for an arrow.

**Arguments**

| Variable  | Type                 | Description                                                                                                                                      |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$dir`    | `string`             | The direction the arrow should point. Can be `'up'`, `'down'`, `'left'` or `'right'`. Defaults to `'down'`.                                      |
| `$color`  | `color`              | Sets the border-color property of the arrow.                                                                                                     |
| `$size`   | `number (with unit)` | Sets the size of arrows. Can be a list where first number is the width of the "flat" side of the arrow and second is the width of the "pointer". |
| `$radius` | `number (with unit)` | Applies a slightly rounded edge to the none pointer corners.                                                                                     |

**Example**

```scss
.custom-arrow {
  @include arrow("right", currentColor, 10px 15px);
}

// CSS Output
.custom-arrow {
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 0;
  height: 0;
  transform-origin: center;
  border-top: 15px solid currentColor;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-radius: 2px;
  pointer-events: none;
  transform: rotate(-90deg);
}
```

### `blockquote`

The HTML blockquote element is used for marking up extended quotations. This module helps style these elements in a distinct and appealing way by providing the `.blockquote` CSS class.

```html
<blockquote class="blockquote" cite="...">
  <p>...</p>
  <footer>
    ...
    <cite>...</cite>
  </footer>
</blockquote>
```

| Variable                    | Default                 | Description                                                                                                |
| --------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `$output-blockquote`        | `$output` &rarr; `true` | Toggles the output of this module.                                                                         |
| `$class-blockquote`         | `"blockquote"`          | String to use for the class name of the blockquote module.                                                 |
| `$blockquote-padding`       | `1.5em`                 | Sets the padding property.                                                                                 |
| `$blockquote-gap`           | `1em`                   | Sets the vertical gap between elements inside a blockquote using the margin property.                      |
| `$blockquote-background`    | `null`                  | Sets the background color property.                                                                        |
| `$blockquote-foreground`    | `inherit`               | Sets the text color property.                                                                              |
| `$blockquote-border`        | `core.$border-light`    | Sets the border property.                                                                                  |
| `$blockquote-border-radius` | `null`                  | Sets the border-radius property.                                                                           |
| `$blockquote-accent-width`  | `4px`                   | Sets the width of the accent CSS pseudo-element which renders on the right side of the blockquote element. |
| `$blockquote-accent-offset` | `-1px`                  | Sets the offset of the accent CSS pseudo-element. Recommended to set negative of the border width.         |
| `$blockquote-accent-color`  | `--vb-primary-50`       | Sets the color of the accent CSS pseudo-element.                                                           |

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

| Variable              | Default                  | Description                                          |
| --------------------- | ------------------------ | ---------------------------------------------------- |
| `$output-code`        | `$output` &rarr; `true`  | Toggles the output of this module.                   |
| `$class-code`         | `"code"`                 | String to use for the class name of the code module. |
| `$code-padding`       | `null`                   | Sets the padding property.                           |
| `$code-background`    | `null`                   | Sets the background property.                        |
| `$code-foreground`    | `--vb-secondary-50`      | Sets the text color property.                        |
| `$code-border`        | `null`                   | Sets the border property.                            |
| `$code-border-radius` | `null`                   | Sets the border-radius property.                     |
| `$code-font-family`   | `core.$font-family-mono` | Sets the font-family property.                       |
| `$code-font-size`     | `0.9em`                  | Sets the font-size property.                         |

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

### `heading`

Section headings in HTML are represented by the `<h1>` through `<h6>` elements. This module helps style these elements by providing the `.h1`-`.h6` CSS classes.

```html
<h1 class="h1">...</h1>
<h2 class="h2">...</h2>
<h3 class="h3">...</h3>
<h4 class="h4">...</h4>
<h5 class="h5">...</h5>
<h6 class="h6">...</h6>
```

| Variable                | Default                                 | Description                                                                                   |
| ----------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------- |
| `$output-heading`       | `$output` &rarr; `true`                 | Toggles the output of this module.                                                            |
| `$heading-font-family`  | `inherit`                               | Sets the font-family property.                                                                |
| `$heading-line-height`  | `core.$line-height-sm`                  | Sets the line-height property.                                                                |
| `$heading-color`        | `inherit`                               | Sets the text color property.                                                                 |
| `$heading-color-invert` | `null`                                  | Sets the inverted text color. This is used when heading elements appear on a dark background. |
| `$heading-font-weight`  | `core.$font-weight-semi-bold`           | Sets the font-weight property.                                                                |
| `$heading-scale`        | [`Sass Map` Ref &darr;](#heading-scale) | A map containing the font-size and optional line-height scale for HTML headings.              |

#### `$heading-scale`

A map containing the font-size and optional line-height scale for HTML headings. The map should contain a key of the heading level and the value of a font-size and optional line-height space separated.

```scss
$heading-scale: (
  "h1": 2.25em,
  "h2": 2em,
  "h3": 1.75em,
  "h4": 1.5em,
  "h5": 1.25em inherit,
  "h6": 1em inherit
) !default;
```

#### `@mixin heading-base()`

Output the shared base styles for heading elements.

**Example**

```scss
h1, h2, h3, h4, h5, h6 {
  @include heading-base();
}

// CSS Output
h1, h2, h3, h4, h5, h6 {
  color: inherit;
  font-weight: 600;
  line-height: 1.3;
}
```

#### `@mixin heading-levels($map: $heading-scale, $prefix: null)`

Output all the heading styles set in the passed map which defaults to the [`$heading-scale`](#heading-scale) map.

**Arguments**

| Variable  | Type     | Description                                                                                         |
| --------- | -------- | --------------------------------------------------------------------------------------------------- |
| `$map`    | `map`    | The map object to search heading level values from. Defaults to [`$heading-scale`](#heading-scale). |
| `$prefix` | `string` | A string to prefix the key from the passed map object. This is used as the selector.                |

**Example**

```scss
// Using a custom map
$custom-heading-scale: (
  "h1": 3em 1.6,
  "h2": 2em 1.5,
  "h3": 2.5em 1.4,
);

// Pass in our custom map and a prefix
@include heading-levels($custom-heading-scale, $prefix: '.vb-');

// CSS Output
.vb-h1 {
  font-size: 3em;
  line-height: 1.6;
}

.vb-h2 {
  font-size: 2em;
  line-height: 1.5;
}

.vb-h3 {
  font-size: 2.5em;
  line-height: 1.4;
}
```

#### `@mixin heading($level, $map: $heading-scale)`

Output the specific styles for a heading level. Takes the heading level as an argument.

**Arguments**

| Variable | Type                               | Description                                                                                                    |
| -------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `$level` | `number (1-6) or string (map key)` | The level of heading styles to output. Can either be a number to search for index or string to search for key. |
| `$map`   | `map`                              | The map object to search heading level values from. Defaults to [`$heading-scale`](#heading-scale).            |

**Example**

```scss
// Using a custom map
$custom-heading-scale: (
  "h1": 3em 1.6,
  "h2": 2em 1.5,
  "h3": 2.5em 1.4,
);

// Pass in a level key and our custom map
h1 {
  @include mix.heading("h1", $custom-heading-scale);
}

// CSS Output
h1 {
  font-size: 3em;
  line-height: 1.6;
}
```

### `link`

A link—usually represented by an anchor (`<a>`) HTML element with `href` attribute—creates the styles for a hyperlink to anything a URL can address. This module helps style these elements by providing the `.link` CSS class as well as a few optional modifiers.

```html
<a href="#" class="link">Link</a>
<a href="#" class="link link_subtle">Link</a>
<a href="#" class="link link_invert">Link</a>
<a href="#" class="link link_invert-subtle">Link</a>
```

| Variable                                 | Default                        | Description                                                           |
| ---------------------------------------- | ------------------------------ | --------------------------------------------------------------------- |
| `$output-link`                           | `$output` &rarr; `true`        | Toggles the output of this module.                                    |
| `$class-link`                            | `"link"`                       | String to use for the class name of the link module.                  |
| `$link-text-decoration`                  | `none`                         | Sets the text decoration property.                                    |
| `$link-text-decoration-hover`            | `null`                         | Sets the text decoration property on hover state.                     |
| `$link-transition`                       | `null`                         | Sets the transition property.                                         |
| `$link-outline-focus`                    | `currentColor dotted 1px`      | Sets the outline property on `:focus` state.                          |
| `$link-outline-focus-offset`             | `0.125rem`                     | Sets the outline-offset property on `:focus` state.                   |
| `$link-color`                            | `--vb-primary`                 | Sets the text color property.                                         |
| `$link-color-hover`                      | `--vb-primary-40`              | Sets the text color property on hover state.                          |
| `$link-border`                           | `1px solid core.$border-color` | Sets the border property.                                             |
| `$link-border-hover`                     | `1px solid currentColor`       | Sets the border property on hover state.                              |
| `$link-subtle-color`                     | `core.$color-subtle`           | Sets the text color property on subtle modifier.                      |
| `$link-subtle-color-hover`               | `$link-color-hover`            | Sets the text color property on subtle modifier hover state.          |
| `$link-subtle-border-color`              | `core.$border-color`           | Sets the border-color property on subtle modifier.                    |
| `$link-subtle-border-color-hover`        | `currentColor`                 | Sets the border-color property on subtle modifier hover state.        |
| `$link-invert-color`                     | `white`                        | Sets the text color property on invert modifier.                      |
| `$link-invert-color-hover`               | `white`                        | Sets the text color property on invert modifier hover state.          |
| `$link-invert-border-color`              | `rgba(white, 0.5)`             | Sets the border-color property on invert modifier.                    |
| `$link-invert-border-color-hover`        | `currentColor`                 | Sets the border-color property on invert modifier hover state.        |
| `$link-invert-subtle-color`              | `core.$color-invert-subtle`    | Sets the text color property on invert-subtle modifier.               |
| `$link-invert-subtle-color-hover`        | `core.$color-invert`           | Sets the text color property on invert-subtle modifier hover state.   |
| `$link-invert-subtle-border-color`       | `rgba(white, 0.5)`             | Sets the border-color property on invert-subtle modifier.             |
| `$link-invert-subtle-border-color-hover` | `currentColor`                 | Sets the border-color property on invert-subtle modifier hover state. |

#### `@mixin link()`

Output the styles for a link element.

**Example**

```scss
a {
  @include link();
}

// CSS Output
a {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #00bcd4;
  text-decoration: none;
}

a:hover {
  border-bottom: 1px solid currentColor;
  color: #0097a7;
}

a:focus {
  outline: currentColor dotted 1px;
  outline-offset: 3px;
  border-bottom: 1px solid currentColor;
  color: #0097a7;
}
```

#### `@mixin link-modifier($modifier)`

Output the styes for a specific link modifier. This is meant to be used in addition to a link's base styles.

**Arguments**

| Variable    | Type     | Description                                                                                |
| ----------- | -------- | ------------------------------------------------------------------------------------------ |
| `$modifier` | `string` | A string that matches a pre-defined modifier: `"subtle"`, `"invert"` or `"invert-subtle"`. |

**Example**

```scss
a.subtle {
  @include link-modifier("subtle");
}

// CSS Output
.link_subtle {
  border-color: rgba(0, 0, 0, 0.1);
  color: #9e9e9e;
}

.link_subtle:hover, .link_subtle:focus {
  border-color: currentColor;
  color: #0097a7;
}
```

### `list`

The list module helps add styles to unordered (`<ul>`) and ordered (`<ol>`) lists by providing the `.list` class.

```html
<ul class="list">
  <li>One</li>
  <li>Two
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  </li>
  <li>Three</li>
</ul>

<ol class="list">
  ...
</ol>
```

| Variable         | Default                 | Description                                          |
| ---------------- | ----------------------- | ---------------------------------------------------- |
| `$output-list`   | `$output` &rarr; `true` | Toggles the output of this module.                   |
| `$class-list`    | `"list"`                | String to use for the class name of the list module. |
| `$list-gap`      | `1.5em`                 | Sets the margin-left property of list elements.      |
| `$list-item-gap` | `0.5em`                 | Sets the top margin of list items.                   |

#### `@mixin list()`

Output the styles for list elements.

**Example**

```scss
ul, ol {
  @include list();
}

// CSS Output
ul, ol {
  margin-left: 1.5em;
}

ul ul,
ul ol,
ol ul,
ol ol {
  margin-left: 1.5em;
}

ul li li,
ul li + li,
ol li li,
ol li + li {
  margin-top: 0.5em;
}
```

### `pre`

This module helps style the HTML `<pre>` element by providing the `.pre` CSS class. Whitespace inside this element is displayed as written.

```html
<pre class="pre">
-----------------------------
| I'm an expert in my field |
-----------------------------
     \   ^__^
      \  (oo)\_______
         (__)\       )\/\
             ||----w |
             ||     ||
</pre>
```

| Variable             | Default                 | Description                                         |
| -------------------- | ----------------------- | --------------------------------------------------- |
| `$output-pre`        | `$output` &rarr; `true` | Toggles the output of this module.                  |
| `$class-pre`         | `"pre"`                 | String to use for the class name of the pre module. |
| `$pre-padding`       | `1em`                   | Sets the padding property.                          |
| `$pre-background`    | `core.$shade`           | Sets the background property.                       |
| `$pre-border`        | `null`                  | Sets the border property.                           |
| `$pre-border-radius` | `core.$border-radius`   | Sets the border-radius property.                    |
| `$pre-color`         | `core.$color`           | Sets the text color property.                       |

#### `@mixin pre()`

Output the styles for a pre element.

```scss
pre {
  @include pre();
}

// CSS Output
pre {
  padding: 1em;
  overflow: auto;
  border-radius: 4px;
  background: #f5f5f5;
  color: #212121;
  font-family: sfmono-regular, menlo, monaco, consolas, "Liberation Mono", "Courier New", monospace;
}

pre code {
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font-size: 1em;
}
```

### `scroll-box`

This module provides the `.scroll-box` CSS class to be applied as a wrapper around elements when they need a scrollable container.

```html
<div class="scroll-box">
  ...
</div>
```

| Variable             | Default                 | Description                                                |
| -------------------- | ----------------------- | ---------------------------------------------------------- |
| `$output-scroll-box` | `$output` &rarr; `true` | Toggles the output of this module.                         |
| `$class-scroll-box`  | `"scroll-box"`          | String to use for the class name of the scroll-box module. |

#### `@mixin scroll-box()`

Output the styles for a scroll-box container.

**Example**

```scss
.scrollable {
  @include scroll-box();
}

// CSS Output
.scrollable {
  display: block;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
```

### `separator`

This module adds the `.sep` and `.sep-invert` CSS classes which visually renders a horizontal separator. This can be applied to an `<hr>` HTML element. It can also be applied to a more generic `<span>` or `<div>` depending on the semantic context.

```html
<!-- Separator -->
<hr class="sep">
<hr class="sep border-color-darker">

<!-- Invert separator -->
<hr class="sep-invert">
<hr class="sep-invert border-color-invert-darker">
```

| Variable                   | Default                               | Description                                               |
| -------------------------- | ------------------------------------- | --------------------------------------------------------- |
| `$output-separator`        | `$output` &rarr; `true`               | Toggles the output of this module.                        |
| `$class-separator`         | `"sep"`                               | String to use for the class name of the separator module. |
| `$separator-border`        | `1px solid core.$border-color`        | Sets the border property.                                 |
| `$separator-border-invert` | `1px solid core.$border-color-invert` | Sets the border property on invert variant.               |

#### `@mixin separator($border)`

Output the separator styles.

**Arguments**

| Variable  | Type              | Description                                     |
| --------- | ----------------- | ----------------------------------------------- |
| `$border` | `border property` | The border styles to apply on separator output. |

**Example**

```scss
.horizontal-line {
  @include separator();
}

// CSS Output
.horizontal-line {
  display: block;
  height: 0;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
```

### `type`

The type module provides the `.type` CSS class as a quick way to apply many base modules to HTML elements directly. Base module classes will override a parent `.type` application when explicitly set. Use `.type_invert` for when text sits on a dark background.

```html
<div class="type">
  <h1>Heading</h1>
  <p>...</p>
  <ul>
    <li>...</li>
    <li>...</li>
    <li>...</li>
  </ul>
</div>
```

Modules that get mapped to HTML elements include:

- `.h1`-`.h6` &rarr; `<h1>`-`<h6>`
- `.link` &rarr; `<a>`
- `.code` &rarr; `<code>`
- `.sep` &rarr; `<hr>`
- `.list` &rarr; `<ul>` `<ol>`
- `.blockquote` &rarr; `<blockquote>`
- `.pre` &rarr; `<pre>`

> The type module only applies styles to children HTML elements. It's possible to nest other components within type and not have style or specificity conflicts. It's recommended to wrap nested components with anonymous `<div>` elements when possible.

| Variable             | Default                 | Description                                                 |
| -------------------- | ----------------------- | ----------------------------------------------------------- |
| `$output-type`       | `$output` &rarr; `true` | Toggles the output of this module.                          |
| `$class-type`        | `"type"`                | String to use for the class name of the type module.        |
| `$type-color`        | `null`                  | Sets the color property.                                    |
| `$type-color-invert` | `core.$color-invert`    | Sets the color property for text on a dark background.      |
| `$type-font-family`  | `null`                  | Sets the font-family property.                              |
| `$type-font-size`    | `null`                  | Sets the font-size property.                                |
| `$type-line-height`  | `null`                  | Sets the line-height property.                              |
| `$type-gap`          | `null`                  | Applies vertical gap between elements via the `gap` module. |

#### `@mixin type()`

Output base type module styles.

**Example**

```scss
.element {
  @include type();
}
```

#### `@mixin type-invert($color)`

Output invert modifier styles of the type module. Pass in the background color if you're not sure it will meet the lightness threshold set in `core.$lightness-threshold`.

**Arguments**

| Variable | Type    | Description                                                    |
| -------- | ------- | -------------------------------------------------------------- |
| `$color` | `color` | The background color to check the lightness threshold against. |

**Example**

```scss
.element {
  @include type-invert(#303030);
  background: #303030;
}
```
