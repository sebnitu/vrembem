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

The most basic implementation of the button component consists of the `button` class that can be applied to `<button>`, `<a role="button">` or `<input>` elements with a type attribute of "button", "submit" or "reset". [Remember to add `role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) to any none semantic buttons as needed.

{% include demo_open.html %}
<div class="level">
  <button class="button">Button</button>
  <a href="#" class="button" role="button">Anchor</a>
  <input class="button" type="button" value="Input">
  <input class="button" type="submit" value="Submit">
  <input class="button" type="reset" value="Reset">
</div>
{% include demo_switch.html %}
```html
<button class="button">Button</button>
<a class="button" role="button">Anchor</a>
<input class="button" type="button" value="Input">
<input class="button" type="submit" value="Submit">
<input class="button" type="reset" value="Reset">
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
  <button class="button button_subtle" disabled>Button</button>
  <button class="button button_color_primary" disabled>Button</button>
  <button class="button button_color_secondary" disabled>Button</button>
</div>
{% include demo_switch.html %}
```html
<button class="button" disabled>Button</button>
```
{% include demo_close.html %}

### Loading

Buttons can also have a loading state by adding the `is-loading` state class. This is useful when a button has an action that has a delayed response in order to give users a visual indicator that their action is being processed.

{% include demo_open.html %}
<div class="level">
  <button class="is-loading button" disabled>Button</button>
  <button class="is-loading button button_subtle" disabled>Button</button>
  <button class="is-loading button button_color_primary" disabled>Button</button>
  <button class="is-loading button button_color_secondary" disabled>Button</button>
</div>
{% include demo_switch.html %}
```html
<button class="button is-loading" disabled>Button</button>
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

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <button class="button button_color_primary">Color Primary</button>
  <button class="button button_color_secondary">Color Secondary</button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_color_primary">Button</button>
<button class="button button_color_secondary">Button</button>
```
{% include demo_close.html %}

### Available Variations

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

A boolean button modifier that allows buttons and their modifiers to provide an inversed version of themselves. Since not all button styles require an inversed variant, this is typically used for when the background context of a button matters. Can be combined with [`button_subtle`](#button_subtle) boolean modifier.

{% include demo_open.html class_grid="grid_stack" class_parent="gap-y" %}
<div class="padding background-night radius">
  <div class="level">
    <button class="button button_invert">Default Invert</button>
    <button class="button button_invert button_subtle">Invert Subtle</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<button class="button button_invert">Default Invert</button>
<button class="button button_invert button_subtle">Invert Subtle</button>
```
{% include demo_close.html %}

### Available Combinations

- `button button_invert`
- `button button_invert button_subtle`

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

## button_state_[value]

Adds styles for changing the look and feel of a button to better reflect the urgency or status.

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <button class="button button_state_info">State Info</button>
  <button class="button button_state_success">State Success</button>
  <button class="button button_state_caution">State Caution</button>
  <button class="button button_state_danger">State Danger</button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_state_info">Button</button>
<button class="button button_state_success">Button</button>
<button class="button button_state_caution">Button</button>
<button class="button button_state_danger">Button</button>
```
{% include demo_close.html %}

### Available Variations

- `button_state_info`
- `button_state_success`
- `button_state_caution`
- `button_state_danger`

## button_subtle

A boolean button modifier that allows buttons and their modifiers to provide a more subtle version of themselves. Can be combined with [`button_invert`](#button_invert) boolean modifier.

{% include demo_open.html class_grid="grid_stack" class_parent="flex flex-items-equal" %}
<div class="padding radius background-white border margin-right-sm">
  <button class="button button_subtle">
    Default Subtle
  </button>
</div>
<div class="padding radius background-night margin-left-sm">
  <button class="button button_subtle button_invert">
    Subtle Inverted
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_subtle">Default Subtle</button>
<button class="button button_subtle button_invert">Subtle Invert</button>
```
{% include demo_close.html %}

### Available Combinations

- `button button_subtle`
- `button button_subtle button_invert`

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
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"_"</code></td>
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
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of a button using the min-height and min-width properties.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$padding</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">0.5rem</code></td>
        <td data-mobile-label="Desc">The default horizontal gap spacing for elements inside the button component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-property</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">box-shadow, outline, outline-offset</code></td>
        <td data-mobile-label="Desc">Sets the transition-property property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$transition-duration-short</code></td>
        <td data-mobile-label="Desc">Sets the transition-duration property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$transition-timing-function</code></td>
        <td data-mobile-label="Desc">Sets the transition-timing-function property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1em</code></td>
        <td data-mobile-label="Desc">Sets the font-size property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-weight</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">inherit</code></td>
        <td data-mobile-label="Desc">Sets the font-weight property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height</code></td>
        <td data-mobile-label="Desc">Sets the line-height property.</td>
      </tr>
      <!-- border -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1px solid core.$border-color-dark</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-color-darker</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-color-darker</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:active</code> state.</td>
      </tr>
      <!-- background -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">transparent</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">transparent</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">transparent</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.05)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <!-- box-shadow -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property on <code class="code">:active</code> state.</td>
      </tr>
      <!-- color -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:active</code> state.</td>
      </tr>
      <!-- outline -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0) solid 0</code></td>
        <td data-mobile-label="Desc">Sets the outline property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus-visible</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.1) solid 3px</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:focus-visible</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:active</code> state.</td>
      </tr>
      <!-- outline-offset -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-offset</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-offset-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-offset-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$outline-offset-focus-visible</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:focus-visible</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-offset-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:active</code> state.</td>
      </tr>
      <!-- disabled -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$disabled-opacity</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">0.6</code></td>
        <td data-mobile-label="Desc">Sets the opacity property when disabled attribute is applied.</td>
      </tr>
      <!-- loading -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1em</code></td>
        <td data-mobile-label="Desc">Sets the size of the loading spinner.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-animation-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">0.6s</code></td>
        <td data-mobile-label="Desc">Sets the animation-duration property of the loading spinner.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">$color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property of the loading spinner.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">2px solid</code></td>
        <td data-mobile-label="Desc">Sets the border property of the loading spinner.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$loading-border-tpl</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1 1 0 0</code></td>
        <td data-mobile-label="Desc">The template for where to apply the border-color property. Takes boolean <code class="code">1</code> and <code class="code">0</code> values for top, right, bottom and left borders respectively.</td>
      </tr>
      <!-- button_size_sm -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of the <code class="code">button_size_sm</code> modifier using the min-height and min-width properties.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$padding-sm</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the <code class="code">button_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">button_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height-sm</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">button_size_sm</code> modifier.</td>
      </tr>
      <!-- button_size_lg -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of the <code class="code">button_size_lg</code> modifier using the min-height and min-width properties.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$padding-lg</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the <code class="code">button_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">button_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height-lg</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">button_size_lg</code> modifier.</td>
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
