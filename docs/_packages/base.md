---
layout: article
title: Base
description: "Includes useful default styles and base modules for common HTML elements."
package: "@vrembem/base"
category: simple
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

## blockquote

The HTML blockquote element is used for markup up extended quotations. This module helps style these elements in a distinct and appealing way by providing the `.blockquote` CSS class.

{% include demo_open.html class_parent="spacing" %}
<blockquote class="blockquote" cite="https://ideapod.com/35-noam-chomsky-quotes-will-make-question-everything-society/">
  <p>"All over the place, from the popular culture to the propaganda system, there is constant pressure to make people feel that they are helpless, that the only role they can have is to ratify decisions and to consume."</p>
  <footer>Noam Chomsky, <cite>On Keeping the Population Passive</cite></footer>
</blockquote>
{% include demo_switch.html %}
```html
<blockquote class="blockquote" cite="...">
  <p>...</p>
  <footer>
    ...,
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1.5em</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$blockquote-spacing</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1em</code></td>
        <td data-mobile-label="Desc">Sets the vertical spacing between elements inside a blockquote using the margin property.</td>
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

{% include demo_open.html class_parent="spacing" %}
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

## embed

The embed module is used to wrap iframes or video elements and keep them responsive. It consists of two primary elements, `.embed` wrapper and a single `embed__item` child element which could be applied to an iframe directly.

{% include demo_open.html %}
<div class="embed">
  <iframe class="embed__item" src="https://www.youtube.com/embed/YTsf-OAaoKc?rel=0&showinfo=0" width="560" height="315" frameborder="0" scrolling="no" allowfullscreen></iframe>
</div>
{% include demo_switch.html %}
```html
<div class="embed">
  <iframe class="embed__item" src="..." width="560" height="315"></iframe>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-embed</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-embed</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"embed"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the embed module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$embed-ratio</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.aspect-ratio(16, 9)</code></td>
        <td data-mobile-label="Desc">The default aspect ratio to use.</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ADD NEW CONTENT ABOVE -->

## Heading

{% include demo_open.html class_parent="spacing" %}
<p class="h1">Heading</p>
<p class="h2">Heading</p>
<p class="h3">Heading</p>
<p class="h4">Heading</p>
<p class="h5">Heading</p>
<p class="h6">Heading</p>
{% include demo_switch.html %}
```html
<p class="h1">...</p>
<p class="h2">...</p>
<p class="h3">...</p>
<p class="h4">...</p>
<p class="h5">...</p>
<p class="h6">...</p>
```
{% include demo_close.html %}

## Link

{% include demo_open.html %}
<div class="spacing padding">
  <p><a href="#" class="link">Default link</a></p>
  <p><a href="#" class="link link_subtle">Subtle link</a></p>
</div>
<div class="spacing padding radius background-night">
  <p><a href="#" class="link link_invert">Inverted link</a></p>
  <p><a href="#" class="link link_invert-subtle">Inverted link</a></p>
</div>
{% include demo_switch.html %}
```html
<a href="#" class="link">Link</p>
<a href="#" class="link link_subtle">Link</a>
<a href="#" class="link link_invert">Link</a>
<a href="#" class="link link_invert-subtle">Link</a>
```
{% include demo_close.html %}

## List

{% include demo_open.html %}
<div class="spacing-xl">
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

## Separator

Typically used on an `<hr>` HTML element representing a thematic break between paragraph-level elements.

{% include demo_open.html %}
<div class="spacing padding">
  <hr class="sep">
  <hr class="sep border-color-darker">
</div>
<div class="spacing padding radius background-night">
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

## pre

{% include demo_open.html class_parent="spacing" %}
<pre class="pre"><code>a = 17
print "a = #{a}";</code></pre>
{% include demo_switch.html %}
```html
<pre class="pre"><code>...</code></pre>
```
{% include demo_close.html %}

## spacing

A utility for adding vertical spacing between an element's children. Spacing size and spacing values are generated from `$spacing-map` variable map.

* `spacing`
* `spacing-[key]`

{% include demo_open.html %}
<div class="spacing">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
{% include demo_switch.html %}
```html
<div class="spacing">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div>
  <div class="grid">
    <div class="grid__item span-4">
      <div class="spacing-none">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-xs">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-sm">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-md">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-lg">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-xl">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="spacing-none">...</div>
<div class="spacing-xs">...</div>
<div class="spacing-sm">...</div>
<div class="spacing-md">...</div>
<div class="spacing-lg">...</div>
<div class="spacing-xl">...</div>
```
{% include demo_close.html %}

## type

The `type` component is a quick way to apply all base styles to components directy based on their respective HTML elements. Base component modifiers will override a parent `type` component when explicitly set.

{% include demo_open.html class_parent="spacing" %}
<div class="type spacing">

  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>This is a paragraph <code>$code-example</code> and some other things. <a href="#">Click here</a> for a link example. You can still apply <a class="link_subtle" href="#">link modifiers</a> inside of a type component.</p>

  <hr>

  <ul>
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

  <ol>
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

  <blockquote cite="https://ideapod.com/35-noam-chomsky-quotes-will-make-question-everything-society/">
    <p>"History shows that, more often than not, loss of sovereignty leads to liberalization imposed in the interests of the powerful."</p>
    <footer>Noam Chomsky, <cite>On Authority</cite></footer>
  </blockquote>

<pre><code>a = 17
print "a = #{a}";</code></pre>

</div>
{% include demo_switch.html %}
```html
<div class="type">

  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>...</p>

  <hr>

  <ul>
    <li>One</li>
    ...
  </ul>

  <ol>
    <li>One</li>
    ...
  </ol>

  <blockquote cite="...">
    ...
  </blockquote>

  <pre>
    <code>
      ...
    </code>
  </pre>

</div>
```
{% include demo_close.html %}

<div class="notice notice_type_info type" markdown="1">
Note: `type` does not add vertical spacing between elements by default. You can either add it by giving `$type-spacing` a value or by applying the [`spacing` utility class](/packages/utility#spacing).
</div>

## type_invert

{% include demo_open.html class_parent="spacing" %}
<div class="type type_invert spacing background-night-dark padding radius">

  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>This is a paragraph <code>$code-example</code> and some other things. <a href="#">Click here</a> for a link example. You can still apply <a class="link_invert-subtle" href="#">link modifiers</a> inside of a type component.</p>

  <hr>

  <ul>
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

  <ol>
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

  <blockquote cite="https://ideapod.com/35-noam-chomsky-quotes-will-make-question-everything-society/">
    <p>"It is quite possible–overwhelmingly probable, one might guess–that we will always learn more about human life and personality from novels than from scientific psychology."</p>
    <footer>Noam Chomsky, <cite>On Science</cite></footer>
  </blockquote>

<pre><code>a = 17
print "a = #{a}";</code></pre>

</div>
{% include demo_switch.html %}
```html
<div class="type type_invert">

  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>...</p>

  <hr>

  <ul>
    <li>One</li>
    ...
  </ul>

  <ol>
    <li>One</li>
    ...
  </ol>

  <blockquote cite="...">
    ...
  </blockquote>

  <pre>
    <code>
      ...
    </code>
  </pre>

</div>
```
{% include demo_close.html %}
