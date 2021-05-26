---
layout: article
title: Button
description: "Buttons are a simple component that allow users to take actions."
package: "@vrembem/button"
category: simple
usage:
  npm: true
  scss: true
---

## button

The most basic implementation of the button component consists of the `button` class that can be applied to `<button>`, `<input type="button">` or `<a role="button">` elements. [Remember to add `role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) to any none semantic buttons as needed.

{% include demo_open.html %}
<div class="level">
  <button class="button">Button</button>
  <input class="button" type="button" value="Button">
  <a class="button" role="button">Button</a>
</div>
{% include demo_switch.html %}
```html
<button class="button">Button</button>
<input class="button" type="button" value="Button">
<a class="button" role="button">Button</a>
```
{% include demo_close.html %}

Elements within a button are centered vertically and spaced accordingly using the value set in `$gap` (defaults to `0.5em`). When elements are added inside a button, the button's text should also be wrapped in a `<span>` so that it can be spaced properly.

{% include demo_open.html %}
<div class="level">
  <button class="button button_color_primary">
    {% include icon.html icon="anchor" %}
    <span>Button</span>
    <span class="arrow"></span>
  </button>
  <button class="button button_color_primary">
    <span>Button</span>
    {% include icon.html icon="anchor" %}
    <span class="arrow"></span>
  </button>
  <button class="button button_color_primary">
    {% include icon.html icon="anchor" %}
    <span class="arrow"></span>
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="button">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
  <span>Button</span>
  <span class="arrow"></span>
</button>
```
{% include demo_close.html %}

### Disabled

When disabled using the `disabled` attribute, a button will inherit styles to visually appear noninteractive.

{% include demo_open.html %}
<div class="level">
  <button class="button" disabled>Button</button>
  <input class="button" type="button" value="Button" disabled>
  <a class="button" role="button" disabled>Button</a>
</div>
{% include demo_switch.html %}
```html
<button class="button" disabled>Button</button>
<input class="button" type="button" value="Button" disabled>
<a class="button" role="button" disabled>Button</a>
```
{% include demo_close.html %}

### Loading

Buttons can also have a loading state by adding the `is-loading` state class. This is useful when a button has an action that has a delayed response in order to give users a visual indicator that their action is being processed.

{% include demo_open.html %}
<div class="level">
  <button class="is-loading button" disabled>Button</button>
  <button class="is-loading button button_color_subtle" disabled>Button</button>
  <button class="is-loading button button_color_primary" disabled>Button</button>
  <button class="is-loading button button_color_secondary" disabled>Button</button>
</div>
{% include demo_switch.html %}
```html
<button class="button is-loading">Button</button>
<a class="button is-loading" role="button">Button</a>
```
{% include demo_close.html %}

> Warning: the `is-loading` state class will not work on `<input type="button">` buttons since it uses the `::after` pseudo-element to display the loading spinner.

## button_block_[key]

Gives a button "block" styles so that it spans the full width of its container. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `button_block`) will apply block styles under all conditions.

{% include demo_open.html class_parent="gap-y" %}
<div>
  <button class="button button_block button_color_primary">Button</button>
</div>
<div>
  <button class="button button_block button_color_secondary">Button</button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_block">...</button>
```
{% include demo_close.html %}

### Available Variations

- `button_block`
- `button_block_xs`
- `button_block_sm`
- `button_block_md`
- `button_block_lg`
- `button_block_xl`

## button_color_[value]

Adds styles for changing the look and feel of a button. These are usually done with different background and text colors.

{% include demo_open.html class_grid="grid_stack" class_parent="gap-y" %}
<div class="padding background_white radius">
  <div class="level">
    <button class="button button_color_subtle">Color Subtle</button>
    <button class="button button_color_primary">Color Primary</button>
    <button class="button button_color_secondary">Color Secondary</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<button class="button button_color_subtle">Button</button>
<button class="button button_color_primary">Button</button>
<button class="button button_color_secondary">Button</button>
```
{% include demo_close.html %}

### Available Variations

- `button_color_subtle`
- `button_color_primary`
- `button_color_secondary`

## button_icon

Adds styles that make icon-only buttons more balanced and will appear square if the icon used also has equal width and height.

{% include demo_open.html %}
<div class="level">
  <button class="button button_size_sm button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_sm button_icon">
    <span class="arrow"></span>
  </button>
  <button class="button button_size_sm button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_sm button_icon button_color_primary">
    <span class="arrow"></span>
  </button>
  <button class="button button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_icon">
    <span class="arrow"></span>
  </button>
  <button class="button button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_icon button_color_primary">
    <span class="arrow"></span>
  </button>
  <button class="button button_size_lg button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_lg button_icon">
    <span class="arrow"></span>
  </button>
  <button class="button button_size_lg button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_lg button_icon button_color_primary">
    <span class="arrow"></span>
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_icon">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
</button>
```
{% include demo_close.html %}

## button_invert

A supplemental button modifier that allows [`button_color_[value]`](#button_color_value) or [`button_outline_[value]`](#button_outline_value) modified buttons to provide an inversed version of itself. Since not all button styles require an inversed variant, this is typically used for when the background context of a button matters.

{% include demo_open.html class_grid="grid_stack" class_parent="gap-y" %}
<div class="padding background-night radius">
  <div class="level">
    <button class="button button_invert">Default Invert</button>
    <button class="button button_invert button_color_subtle">Color Subtle Invert</button>
    <button class="button button_invert button_outline">Default Outline Invert</button>
    <button class="button button_invert button_outline_primary">Outline Primary</button>
    <button class="button button_invert button_outline_secondary">Outline Secondary Invert</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<button class="button button_invert">Default Invert</button>
<button class="button button_invert button_color_subtle">Color Subtle Invert</button>
```
{% include demo_close.html %}

### Available Combinations

- `button button_invert`
- `button button_invert button_color_subtle`
- `button button_invert button_outline`
- `button button_invert button_outline_primary`
- `button button_invert button_outline_secondary`

## button_outline_[value]

Outline styles usually have a more subtle appearance compared to [`button_color_[value]`](#button_color_value) variants. They use a border to outline the button and have a transparent background color. Consider using [`button_invert`](#button_invert) when the contrast of a button needs to be inverted.

{% include demo_open.html class_grid="grid_stack" class_parent="gap-y" %}
<div class="padding background_white radius">
  <div class="level">
    <button class="button button_outline">Default Outline</button>
    <button class="button button_outline_primary">Outline Primary</button>
    <button class="button button_outline_secondary">Outline Secondary</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<!-- Colors -->
<button class="button button_outline">Default Outline</button>
<button class="button button_outline_primary">Outline Primary</button>
<button class="button button_outline_secondary">Outline Secondary</button>

<!-- Invert -->
<button class="button button_invert button_outline">Default Outline Invert</button>
<button class="button button_invert button_outline_primary">Outline Primary</button>
<button class="button button_invert button_outline_secondary">Outline Secondary Invert</button>
```
{% include demo_close.html %}

### Available Variations

- `button_outline`
- `button_outline_primary`
- `button_outline_secondary`

## button_size_[value]

Adjust the size of a button by increasing or decreasing its padding and font-size. By default, the button scale will provide a button height of 30px (small `button_size_sm`), 40px (default) and 50px (large `button_size_lg`).

{% include demo_open.html %}
<div class="level">
  <button class="button button_size_sm button_color_primary">
    <span>Button</span>
  </button>
  <button class="button button_color_primary">
    <span>Button</span>
  </button>
  <button class="button button_size_lg button_color_primary">
    <span>Button</span>
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_size_sm">Button</button>
<button class="button button_size_lg">Button</button>
```
{% include demo_close.html %}

### Available Variations

- `button_size_sm`
- `button_size_lg`

## Sass Variables

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
      <!-- Prefixes -->
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
      <!-- General -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$breakpoints</code></td>
        <td data-mobile-label="Default">
          <a class="link text-nowrap" href="#breakpoints"><code class="code color-secondary">core.$breakpoints</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">The breakpoints map the <code class="code">button_block_[key]</code> modifier uses to build its styles.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$form-control-size</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of a button using the min-height and min-width properties.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$padding</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.5em</code></td>
        <td data-mobile-label="Desc">The default horizontal gap spacing for elements inside the button component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-width</code></td>
        <td data-mobile-label="Desc">Sets the border-width property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-style</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-style</code></td>
        <td data-mobile-label="Desc">Sets the border-style property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-dark</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-dark</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-darker</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$black, 0.06)</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$black, 0.09)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$black, 0.12)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$black, 0.15)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1em</code></td>
        <td data-mobile-label="Desc">Sets the font-size property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-weight</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">inherit</code></td>
        <td data-mobile-label="Desc">Sets the font-weight property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$letter-spacing</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the letter-spacing property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height</code></td>
        <td data-mobile-label="Desc">Sets the line-height property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$text-transform</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the text-transformation property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">none</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus-offset</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$disabled-opacity</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.5</code></td>
        <td data-mobile-label="Desc">Sets the opacity property when disabled attribute is applied.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1em</code></td>
        <td data-mobile-label="Desc">Sets the size of the loading spinner.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-animation-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.6s</code></td>
        <td data-mobile-label="Desc">Sets the animation-duration property of the loading spinner.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property of the loading spinner.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2px solid</code></td>
        <td data-mobile-label="Desc">Sets the border property of the loading spinner.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-border-tpl</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1 1 0 0</code></td>
        <td data-mobile-label="Desc">The template for where to apply the border-color property. Takes boolean <code class="code">1</code> and <code class="code">0</code> values for top, right, bottom and left borders respectively.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$form-control-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of the <code class="code">button_size_sm</code> modifier using the min-height and min-width properties.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$padding-sm</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the <code class="code">button_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">button_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height-sm</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">button_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$form-control-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of the <code class="code">button_size_lg</code> modifier using the min-height and min-width properties.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$padding-lg</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the <code class="code">button_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">button_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height-lg</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">button_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-border-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1px</code></td>
        <td data-mobile-label="Desc">Sets the border-width property of the <a class="link" href="#button_outline_value"><code class="code">button_outline_[value]</code></a> modifiers.</td>
      </tr>
    </tbody>
  </table>
</div>

### $breakpoints

The breakpoints map the `button_block_[key]` modifier uses to build its styles.

```scss
// Inherited from: core.$breakpoints
$breakpoints: (
  "xs": 480px,
  "sm": 620px,
  "md": 760px,
  "lg": 990px,
  "xl": 1380px
) !default;
```
