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

Section headings in HTML are represented by the `<h1>` through `<h6>` elements. This module helps style these elements by providing the `.h1`-`.h6` CSS classes.

```html
<h1 class="h1">...</h1>
<h2 class="h2">...</h2>
<h3 class="h3">...</h3>
<h4 class="h4">...</h4>
<h5 class="h5">...</h5>
<h6 class="h6">...</h6>
```

Variable | Default | Description
---|---|---
`$output-heading` | `$output` &rarr; `true` | Toggles the output of this module.
`$heading-font-family` | `null` | Sets the font-family property.
`$heading-line-height` | `1.3` | Sets the line-height property.
`$heading-color` | `inherit` | Sets the text color property.
`$heading-color-invert` | `null` | Sets the inverted text color. This is used when heading elements appear on a dark background.
`$heading-font-weight` | `core.font-weight("semi-bold")` | Sets the font-weight property.

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

#### `@mixin heading($level)`

Output the specific styles for a heading level. Takes the heading level as an argument.

**Arguments**

Variable | Type | Description
---|---|---
`$level` | `number (1-6)` | The level of heading styles to output.

**Example**

```scss
h1 {
  @include heading(1);
}

// CSS Output
.h1 {
  font-size: 2em;
}

@media (min-width: 760px) {
  .h1 {
    font-size: 2.5em;
  }
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

Variable | Default | Description
---|---|---
`$output-link` | `$output` &rarr; `true` | Toggles the output of this module.
`$link-text-decoration` | `none` | Sets the text decoration property.
`$link-text-decoration-hover` | `null` | Sets the text decoration property on hover state.
`$link-transition` | `null` | Sets the transition property.
`$link-color` | `core.$primary` | Sets the text color property.
`$link-color-hover` | `core.$primary-dark` | Sets the text color property on hover state.
`$link-border` | `1px solid core.$border-color` | Sets the border property.
`$link-border-hover` | `1px solid currentColor` | Sets the border property on hover state.
`$link-subtle-color` | `core.$color-subtle` | Sets the text color property on subtle modifier.
`$link-subtle-color-hover` | `$link-color-hover` | Sets the text color property on subtle modifier hover state.
`$link-subtle-border-color` | `core.$border-color` | Sets the border-color property on subtle modifier.
`$link-subtle-border-color-hover` | `currentColor` | Sets the border-color property on subtle modifier hover state.
`$link-invert-color` | `core.$white` | Sets the text color property on invert modifier.
`$link-invert-color-hover` | `core.$white` | Sets the text color property on invert modifier hover state.
`$link-invert-border-color` | `rgba(core.$white, 0.5)` | Sets the border-color property on invert modifier.
`$link-invert-border-color-hover` | `currentColor` | Sets the border-color property on invert modifier hover state.
`$link-invert-subtle-color` | `core.$color-invert-subtle` | Sets the text color property on invert-subtle modifier.
`$link-invert-subtle-color-hover` | `core.$color-invert` | Sets the text color property on invert-subtle modifier hover state.
`$link-invert-subtle-border-color` | `rgba(core.$white, 0.5)` | Sets the border-color property on invert-subtle modifier.
`$link-invert-subtle-border-color-hover` | `currentColor` | Sets the border-color property on invert-subtle modifier hover state.

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

Variable | Type | Description
---|---|---
`$modifier` | `string` | A string that matches a pre-defined modifier: `"subtle"`, `"invert"` or `"invert-subtle"`.

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

Variable | Default | Description
---|---|---
`$output-list` | `$output` &rarr; `true` | Toggles the output of this module.
`$list-spacing` | `1.5em` | Sets the margin-left property of list elements.
`$list-item-spacing` | `0.5em` | Sets the top and bottom margins of list items.

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

ul li,
ol li {
  margin: 0.5em 0;
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

Variable | Default | Description
---|---|---
`$output-pre` | `$output` &rarr; `true` | Toggles the output of this module.
`$pre-padding` | `1em` | Sets the padding property.
`$pre-background` | `core.$shade` | Sets the background property.
`$pre-border` | `null` | Sets the border property.
`$pre-border-radius` | `core.$border-radius` | Sets the border-radius property.
`$pre-color` | `core.$color` | Sets the text color property.

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

Variable | Default | Description
---|---|---
`$output-scroll-box` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-scroll-box` | `"scroll-box"` | String to use for the class name of the scroll-box module.

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

Variable | Default | Description
---|---|---
`$output-separator` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-separator` | `"sep"` | String to use for the class name of the separator module.
`$separator-border` | `1px solid core.$border-color` | Sets the border property.
`$separator-border-invert` | `1px solid core.$border-color-invert` | Sets the border property on invert variant.

#### `@mixin separator($border)`

Output the separator styles.

**Arguments**

Variable | Type | Description
---|---|---
`$border` | `border property` | The border styles to apply on separator output.

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

### `spacing`

This module adds vertical spacing between an element's children. Spacing size and spacing values are generated from the `$spacing-map` variable map.

```html
<!-- Using the default spacing class -->
<div class="spacing">...</div>

<!-- Using the spacing class with variant key -->
<div class="spacing-none">...</div>
<div class="spacing-xs">...</div>
<div class="spacing-sm">...</div>
<div class="spacing-md">...</div>
<div class="spacing-lg">...</div>
<div class="spacing-xl">...</div>
```

Variable | Default | Description
---|---|---
`$output-spacing` | `$output` &rarr; `true` | Toggles the output of this module.
`$class-spacing` | `"spacing"` | String to use for the class name of the spacing module.
`$spacing` | `core.$spacing` | Sets the vertical spacing via the top and bottom margin property.
`$spacing-map` | `core.$spacing-map` | Used to build the spacing key classes.

#### `@mixin spacing($spacing, $imp: null)`

Output the spacing styles for an element. Styles are applied to an elements children using the `> *` selector.

**Arguments**

Variable | Type | Description
---|---|---
`$spacing` | `number (with unit)` | The unit of spacing to apply.
`$imp` | `boolean` | Whither or not to add the `!important` flag.

**Example**

```scss
.element {
  @include spacing(2em, true);
}

// CSS Output
.element > * {
  margin-top: 2em !important;
  margin-bottom: 2em !important;
}

.element > *:first-child {
  margin-top: 0 !important;
}

.element > *:last-child {
  margin-bottom: 0 !important;
}
```

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
