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

The most basic imlementation of the button component consists of the `button` class that can be applied to `<button>`, `<input type="button">` or `<a role="button">` elements. [Remember to add `role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) to any none semantic buttons as needed.

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

Buttons can also have a loading state by adding the `is-loading` state class. This is useful when a button has an action that has a delayed response in order to give users a visual indicator that their action is being processed.

{% include demo_open.html %}
<div class="level">
  <button class="is-loading button">Button</button>
  <button class="is-loading button button_color_subtle">Button</button>
  <button class="is-loading button button_color_primary">Button</button>
  <button class="is-loading button button_color_secondary">Button</button>
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

## button_color_[key]

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

A supplemental button modifier that allows [`button_color_[key]`](#button_color_key) or [`button_outline_[key]`](#button_outline_key) modified buttons to provide an inversed version of itself. Since not all button styles require an inversed variant, this is typically used for when the background context of a button matters.

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

## button_outline_[key]

Outline styles usually have a more subtle appearance compared to [`button_color_[key]`](#button_color_key) variants. They use a border to outline the button and have a transparent background color. Consider using [`button_invert`](#button_invert) when the contrast of a button needs to be inverted.

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

## button_size_[key]

Adjust the size of a button by inceasing or decreasing its padding and font-size. By default, the button scale will provide a button height of 30px (`button_size_sm`), 40px (default) and 50px (`button_size_lg`).


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
        <td data-mobile-label="Var"><code class="code text-nowrap">$min-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2.5rem</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of a button using the min-height and min-width properties.</td>
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
