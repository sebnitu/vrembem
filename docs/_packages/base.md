---
layout: article
title: Base
description: "Includes useful default styles and base modules for common HTML elements."
package: "@vrembem/base"
category: core
usage:
  npm: true
  scss: true
---

## Intro

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

### Global Variables

Setting these variables will impact more than one or up to all base modules.

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-block</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the default output of all modules.</td>
      </tr>
    </tbody>
  </table>
</div>

### Modules

The base component consists of a number of modules with their own set of specific customizable variables and output mixins.

- [base](#base)
- [arrow](#arrow)
- [blockquote](#blockquote)
- [code](#code)
- [heading](#heading)
- [link](#link)
- [list](#list)
- [pre](#pre)
- [scroll-box](#scroll-box)
- [separator](#separator)
- [type](#type)

> Modules are sorted by the order they're imported; alphabetically except for `base` having priority as first import.

## base

Outputs a number of base and reset element styles to help keep html elements predictable and easier to work with. Some more global options are set via the `@vrembem/core` component, while others that are specific to the base component are set directly here.

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-base</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$root-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">100%</code></td>
        <td data-mobile-label="Desc">Sets the height property on the root <code class="code">html</code> and <code class="code">body</code> elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the base color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-caption</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color-subtle</code></td>
        <td data-mobile-label="Desc">Sets the color property for the caption element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-family</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-family</code></td>
        <td data-mobile-label="Desc">Sets the base font-family property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-family-mono</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-family-mono</code></td>
        <td data-mobile-label="Desc">Sets the font-family property for elements that use a mono-spacing front.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size</code></td>
        <td data-mobile-label="Desc">Sets the base font-size property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-size-sm</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the font-size property for small element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height</code></td>
        <td data-mobile-label="Desc">Sets the base line-height property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-sizing</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">border-box</code></td>
        <td data-mobile-label="Desc">Sets the default box-sizing property for all HTML elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$body-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background color that's applied to the body element.</td>
      </tr>
    </tbody>
  </table>
</div>

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

## arrow

The arrow (caret) module creates directional triangles drawn with CSS.

{% include demo_open.html %}
<span class="arrow"></span>
<span class="arrow-up"></span>
<span class="arrow-left"></span>
<span class="arrow-right"></span>
{% include demo_switch.html %}
```html
<span class="arrow"></span>
<span class="arrow-up"></span>
<span class="arrow-left"></span>
<span class="arrow-right"></span>
```
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-arrow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-arrow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"arrow"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the arrow module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$arrow-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">currentColor</code></td>
        <td data-mobile-label="Desc">Sets the default border-color property of the arrow.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$arrow-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">8px 6px</code></td>
        <td data-mobile-label="Desc">Sets the size of arrows. Can be a list where first number is the width of the "flat" side of the arrow and second is the width of the "pointer".</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$arrow-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2px</code></td>
        <td data-mobile-label="Desc">Applies a slightly rounded edge to the none pointer corners.</td>
      </tr>
    </tbody>
  </table>
</div>

### Example

Arrows are great indicators for buttons and menu items when interacting with them would toggle a popover or other togglable components.

{% include demo_open.html %}
<div class="button-group button-group_wrap">
  <button class="button button_color_primary">
    <span>Button</span>
    <span class="arrow"></span>
  </button>
  <button class="button">
    <span class="arrow-up"></span>
    <span>Button</span>
  </button>
  <button class="button button_color_primary">
    {% include icon.html icon="github" %}
    <span class="arrow-right"></span>
  </button>
  <button class="button">
    <span class="arrow-left"></span>
    {% include icon.html icon="github" %}
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="button">
  <span>Button</span>
  <span class="arrow"></span>
</button>
```
{% include demo_close.html %}

### `@mixin arrow($dir, $color, $size, $radius)`

Output the styles for an arrow.

**Arguments**

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$dir</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">string</code></td>
        <td data-mobile-label="Desc">The direction the arrow should point. Can be <code class="code text-nowrap">'up'</code>, <code class="code text-nowrap">'down'</code>, <code class="code text-nowrap">'left'</code> or <code class="code text-nowrap">'right'</code>. Defaults to <code class="code text-nowrap">'down'</code>.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property of the arrow.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">number (with unit)</code></td>
        <td data-mobile-label="Desc">Sets the size of arrows. Can be a list where first number is the width of the "flat" side of the arrow and second is the width of the "pointer".</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$radius</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">number (with unit)</code></td>
        <td data-mobile-label="Desc">Applies a slightly rounded edge to the none pointer corners.</td>
      </tr>
    </tbody>
  </table>
</div>

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

## blockquote

The HTML blockquote element is used for marking up extended quotations. This module helps style these elements in a distinct and appealing way by providing the `.blockquote` CSS class.

{% include demo_open.html class_parent="gap-y" %}
<blockquote class="blockquote" cite="https://ideapod.com/35-noam-chomsky-quotes-will-make-question-everything-society/">
  <p>"All over the place, from the popular culture to the propaganda system, there is constant pressure to make people feel that they are helpless, that the only role they can have is to ratify decisions and to consume."</p>
  <footer>Noam Chomsky, <cite>On Keeping the Population Passive</cite></footer>
</blockquote>
{% include demo_switch.html %}
```html
<blockquote class="blockquote" cite="...">
  <p>...</p>
  <footer>
    ...
    <cite>...</cite>
  </footer>
</blockquote>
```
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-blockquote</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-blockquote</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"blockquote"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the blockquote module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1.5em</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1em</code></td>
        <td data-mobile-label="Desc">Sets the vertical gap between elements inside a blockquote using the margin property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">inherit</code></td>
        <td data-mobile-label="Desc">Sets the text color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-light</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-border-color-invert</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-invert</code></td>
        <td data-mobile-label="Desc">Sets the inverted border color. This is used when blockquotes appear on a dark background.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-accent-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">4px</code></td>
        <td data-mobile-label="Desc">Sets the width of the accent CSS pseudo-element which renders on the right side of the blockquote element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-accent-offset</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">-1px</code></td>
        <td data-mobile-label="Desc">Sets the offset of the accent CSS pseudo-element. Recommended to set negative of the border width.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-accent-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the color of the accent CSS pseudo-element.</td>
      </tr>
    </tbody>
  </table>
</div>

### `@mixin blockquote()`

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

## code

The HTML code element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. This module helps style these elements by providing the `.code` CSS class.

{% include demo_open.html class_parent="gap-y" %}
<code class="code">a = 17</code>
{% include demo_switch.html %}
```html
<code class="code">a = 17</code>
```
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-code</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-code</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"code"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the code module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$code-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$code-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$code-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$code-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$code-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$pink</code></td>
        <td data-mobile-label="Desc">Sets the text color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$code-color-invert</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$pink-300</code></td>
        <td data-mobile-label="Desc">Sets the inverted text color. This is used when code elements appear on a dark background.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$code-font-family</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-family-mono</code></td>
        <td data-mobile-label="Desc">Sets the font-family property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$code-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.9em</code></td>
        <td data-mobile-label="Desc">Sets the font-size property.</td>
      </tr>
    </tbody>
  </table>
</div>

### `@mixin code()`

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

## Heading

Section headings in HTML are represented by the `<h1>` through `<h6>` elements. This module helps style these elements by providing the `.h1`-`.h6` CSS classes.

{% include demo_open.html class_parent="gap-y" %}
<h1 class="h1">Heading</h1>
<h2 class="h2">Heading</h2>
<h3 class="h3">Heading</h3>
<h4 class="h4">Heading</h4>
<h5 class="h5">Heading</h5>
<h6 class="h6">Heading</h6>
{% include demo_switch.html %}
```html
<h1 class="h1">...</h1>
<h2 class="h2">...</h2>
<h3 class="h3">...</h3>
<h4 class="h4">...</h4>
<h5 class="h5">...</h5>
<h6 class="h6">...</h6>
```
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-heading</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$heading-font-family</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">inherit</code></td>
        <td data-mobile-label="Desc">Sets the font-family property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$heading-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height-sm</code></td>
        <td data-mobile-label="Desc">Sets the line-height property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$heading-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">inherit</code></td>
        <td data-mobile-label="Desc">Sets the text color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$heading-color-invert</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the inverted text color. This is used when heading elements appear on a dark background.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$heading-font-weight</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.font-weight("semi-bold")</code></td>
        <td data-mobile-label="Desc">Sets the font-weight property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$heading-scale</code></td>
        <td data-mobile-label="Default">
          <a href="#heading-scale" class="link"><code class="code color-secondary text-nowrap">Sass Map</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">A map containing the font-size and optional line-height scale for HTML headings.</td>
      </tr>
    </tbody>
  </table>
</div>

### $heading-scale

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

### `@mixin heading-base()`

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

### `@mixin heading-levels($map: $heading-scale), $prefix: null`)

Output all the heading styles set in the passed map which defaults to the [`$heading-scale`](#heading-scale) map.

**Arguments**

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$map</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">map</code></td>
        <td data-mobile-label="Desc">The map object to search heading level values from. Defaults to <a class="link" href="#heading-scale"><code class="code">$heading-scale</code></a>.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">string</code></td>
        <td data-mobile-label="Desc">A string to prefix the key from the passed map object. This is used as the selector.</td>
      </tr>
    </tbody>
  </table>
</div>

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

### `@mixin heading($level, $map: $heading-scale)`

Output the specific styles for a heading level. Takes the heading level as an argument.

**Arguments**

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$level</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">number (1-6) or string (map key)</code></td>
        <td data-mobile-label="Desc">The level of heading styles to output. Can either be a number to search for index or string to search for key.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$map</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">map</code></td>
        <td data-mobile-label="Desc">The map object to search heading level values from. Defaults to <a class="link" href="#heading-scale"><code class="code">$heading-scale</code></a>.</td>
      </tr>
    </tbody>
  </table>
</div>

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

## Link

A link—usually represented by an anchor (`<a>`) HTML element with `href` attribute—creates the styles for a hyperlink to anything a URL can address. This module helps style these elements by providing the `.link` CSS class as well as a few optional modifiers.

{% include demo_open.html %}
<div class="gap-y padding">
  <p><a href="#" class="link">Default link</a></p>
  <p><a href="#" class="link link_subtle">Subtle link</a></p>
</div>
<div class="gap-y padding radius background-night">
  <p><a href="#" class="link link_invert">Inverted link</a></p>
  <p><a href="#" class="link link_invert-subtle">Inverted link</a></p>
</div>
{% include demo_switch.html %}
```html
<a href="#" class="link">Link</a>
<a href="#" class="link link_subtle">Link</a>
<a href="#" class="link link_invert">Link</a>
<a href="#" class="link link_invert-subtle">Link</a>
```
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-link</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-link</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"link"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the link module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-text-decoration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">none</code></td>
        <td data-mobile-label="Desc">Sets the text decoration property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-text-decoration-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the text decoration property on hover state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-transition</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the transition property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-outline-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">currentColor dotted 1px</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-outline-focus-offset</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.125rem</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the text color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$primary-dark</code></td>
        <td data-mobile-label="Desc">Sets the text color property on hover state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1px solid core.$border-color</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-border-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1px solid currentColor</code></td>
        <td data-mobile-label="Desc">Sets the border property on hover state.</td>
      </tr>
      <!-- modifier: subtle -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-subtle-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color-subtle</code></td>
        <td data-mobile-label="Desc">Sets the text color property on subtle modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-subtle-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$link-color-hover</code></td>
        <td data-mobile-label="Desc">Sets the text color property on subtle modifier hover state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-subtle-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on subtle modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-subtle-border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">currentColor</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on subtle modifier hover state.</td>
      </tr>
      <!-- modifier: invert -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-invert-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the text color property on invert modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-invert-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the text color property on invert modifier hover state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-invert-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$white, 0.5)</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on invert modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-invert-border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">currentColor</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on invert modifier hover state.</td>
      </tr>
      <!-- modifier: invert-subtle -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-invert-subtle-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color-invert-subtle</code></td>
        <td data-mobile-label="Desc">Sets the text color property on invert-subtle modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-invert-subtle-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color-invert</code></td>
        <td data-mobile-label="Desc">Sets the text color property on invert-subtle modifier hover state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-invert-subtle-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$white, 0.5)</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on invert-subtle modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-invert-subtle-border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">currentColor</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on invert-subtle modifier hover state.</td>
      </tr>
    </tbody>
  </table>
</div>

### `@mixin link()`

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

### `@mixin link-modifier($modifier)`

Output the styes for a specific link modifier. This is meant to be used in addition to a link's base styles.

**Arguments**

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modifier</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">string</code></td>
        <td data-mobile-label="Desc">A string that matches a pre-defined modifier: <code class="code">"subtle"</code>, <code class="code">"invert"</code> or <code class="code">"invert-subtle"</code>.</td>
      </tr>
    </tbody>
  </table>
</div>

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

## List

The list module helps add styles to unordered (`<ul>`) and ordered (`<ol>`) lists by providing the `.list` class.

{% include demo_open.html %}
<div class="gap-y-xl">
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
    <li>One</li>
    <li>Two
      <ol>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ol>
    </li>
    <li>Three</li>
  </ol>
</div>
{% include demo_switch.html %}
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
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-list</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-list</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"list"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the list module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$list-indent</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1.5em</code></td>
        <td data-mobile-label="Desc">Sets the margin-left property of list elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$list-item-gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.5em</code></td>
        <td data-mobile-label="Desc">Sets the top margin of list items.</td>
      </tr>
    </tbody>
  </table>
</div>

### `@mixin list()`

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

## Pre

This module helps style the HTML `<pre>` element by providing the `.pre` CSS class. Whitespace inside this element is displayed as written.

{% include demo_open.html class_parent="gap-y" %}
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
{% include demo_switch.html %}
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
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-pre</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-pre</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"pre"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the pre module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$pre-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1em</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$pre-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$shade</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$pre-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$pre-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$pre-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the text color property.</td>
      </tr>
    </tbody>
  </table>
</div>

### `@mixin pre()`

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

## scroll-box

This module provides the `.scroll-box` CSS class to be applied as a wrapper around elements when they need a scrollable container.

{% include demo_open.html %}
<div class="scroll-box border radius" style="max-height: 200px;">
  <div class="padding radius-circle background-primary-light" style="width: 900px; height: 900px;">
    This is a big circle...
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="scroll-box">
  ...
</div>
```
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-scroll-box</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-scroll-box</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"scroll-box"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the scroll-box module.</td>
      </tr>
    </tbody>
  </table>
</div>

### `@mixin scroll-box()`

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

## Separator

This module adds the `.sep` and `.sep-invert` CSS classes which visually renders a horizontal separator. This can be applied to an `<hr>` HTML element. It can also be applied to a more generic `<span>` or `<div>` depending on the semantic context.

{% include demo_open.html %}
<div class="gap-y padding">
  <hr class="sep">
  <hr class="sep border-color-darker">
</div>
<div class="gap-y padding radius background-night">
  <hr class="sep-invert">
  <hr class="sep-invert border-color-invert-darker">
</div>
{% include demo_switch.html %}
```html
<!-- Separator -->
<hr class="sep">
<hr class="sep border-color-darker">

<!-- Invert separator -->
<hr class="sep-invert">
<hr class="sep-invert border-color-invert-darker">
```
{% include demo_close.html %}

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-separator</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-separator</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"sep"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the separator module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$separator-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1px solid core.$border-color</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$separator-border-invert</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1px solid core.$border-color-invert</code></td>
        <td data-mobile-label="Desc">Sets the border property on invert variant.</td>
      </tr>
    </tbody>
  </table>
</div>

### `@mixin separator($border)`

Output the separator styles.

**Arguments**

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">border property</code></td>
        <td data-mobile-label="Desc">The border styles to apply on separator output.</td>
      </tr>
    </tbody>
  </table>
</div>

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

## type

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

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-type</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-type</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"type"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the type module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$type-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$type-color-invert</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color-invert</code></td>
        <td data-mobile-label="Desc">Sets the color property for text on a dark background.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$type-font-family</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the font-family property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$type-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the font-size property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$type-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the line-height property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$type-gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Applies vertical gap between elements via the <code class="code">gap</code> module.</td>
      </tr>
    </tbody>
  </table>
</div>

### `@mixin type()`

Output base type module styles.

**Example**

```scss
.element {
  @include type();
}
```

### `@mixin type-invert($color)`

Output invert modifier styles of the type module. Pass in the background color if you're not sure it will meet the lightness threshold set in `core.$lightness-threshold`.

**Arguments**

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">color</code></td>
        <td data-mobile-label="Desc">The background color to check the lightness threshold against.</td>
      </tr>
    </tbody>
  </table>
</div>

**Example**

```scss
.element {
  @include type-invert(#303030);
  background: #303030;
}
```
