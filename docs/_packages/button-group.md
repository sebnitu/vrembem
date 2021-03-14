---
layout: article
title: Button-group
description: "A component for displaying groups of buttons."
package: "@vrembem/button-group"
category: compound
usage:
  npm: true
  scss: true
---

## button-group

The most basic imlementation of the button-group component consists of the `button-group` container wrapping a group of buttons.

{% include demo_open.html %}
<div class="button-group">
  <button class="button">Button</button>
  <button class="button">Button</button>
  <button class="button">Button</button>
</div>
{% include demo_switch.html %}
```html
<div class="button-group">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```
{% include demo_close.html %}

Button-groups that are siblings to one another will inherit the gap provided by the adjacent sibling.

{% include demo_open.html %}
<div class="button-group">
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
</div>
<div class="button-group">
  <button class="button button_color_secondary">Button</button>
  <button class="button button_color_secondary">Button</button>
  <button class="button button_color_secondary">Button</button>
</div>
{% include demo_switch.html %}
```html
<div class="button-group">
  <button class="button">...</button>
  ...
</div>
<div class="button-group">
  <button class="button">...</button>
  ...
</div>
```
{% include demo_close.html %}

## button-group_full_[key]

A modifier to allow a button-group to span the full width of it's container. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `button-group_full`) will stack items under all conditions.

{% include demo_open.html %}
<div class="button-group button-group_full">
  <button class="button">Button</button>
  <button class="button">Button</button>
  <button class="button">Button</button>
</div>
<div class="button-group button-group_full_xl">
  <button class="button button_outline">Button</button>
  <button class="button button_outline">Button</button>
  <button class="button button_outline">Button</button>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_full">
  <button class="button">...</button>
  ...
</div>
<div class="button-group button-group_full_xl">
  <button class="button">...</button>
  ...
</div>
```
{% include demo_close.html %}

### Available Variations

- `button-group_full`
- `button-group_full_xs`
- `button-group_full_sm`
- `button-group_full_md`
- `button-group_full_lg`
- `button-group_full_xl`

## button-group_gap_[key]

Adjusts the gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-map) variable map.

{% include demo_open.html %}
<div class="button-group button-group_gap_xs">
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_secondary">Button</button>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_gap_xs">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```
{% include demo_close.html %}

### Available Variations

- `button-group_gap_none`
- `button-group_gap_xs`
- `button-group_gap_sm`
- `button-group_gap_md`
- `button-group_gap_lg`
- `button-group_gap_xl`

## button-group_join

A modifier to join buttons without a button-group component. This removes all gap spacing and adjusts the border-radius to allow buttons to be visually be joined as a single unit.

{% include demo_open.html class_parent="gap-y" %}
<div>
  <div class="button-group button-group_join">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_join">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_join">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```
{% include demo_close.html %}

## button-group_stack_[key]

Adds a breakpoint for when button-group elements should be stacked vertically. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `button-group_stack`) will stack items under all conditions.

{% include demo_open.html %}
<div class="button-group button-group_stack_lg">
  <button class="button button_color_secondary">Button</button>
  <button class="button button_color_secondary">Button</button>
  <button class="button button_color_secondary">Button</button>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_stack_lg">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```
{% include demo_close.html %}

### Available Variations

- `button-group_stack`
- `button-group_stack_xs`
- `button-group_stack_sm`
- `button-group_stack_md`
- `button-group_stack_lg`
- `button-group_stack_xl`

## Customization

### Sass Variables

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
        <td data-mobile-label="Desc">The breakpoints map the <code class="code">button-group_full_[key]</code> and  <code class="code">button-group_stack_[key]</code> modifiers use to build their styles.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius styles of buttons when button-group adjusts them.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2em</code></td>
        <td data-mobile-label="Desc">The default gap spacing for the button-group component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap-join</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">-1px</code></td>
        <td data-mobile-label="Desc">The gap spacing used for the `button-group_join` modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap-map</code></td>
        <td data-mobile-label="Default">
          <a class="link text-nowrap" href="#gap-map"><code class="code color-secondary">Sass Map</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">Used to output gap modifiers.</td>
      </tr>
    </tbody>
  </table>
</div>

### $breakpoints

The breakpoints map the `button-group_full_[key]` and  `button-group_stack_[key]` modifiers use to build their styles.

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

### $gap-map

Used to output gap modifiers.

```scss
$gap-map: (
  "none": 0,
  "xs": 1px,
  "sm": 0.25em,
  "md": 0.5em,
  "lg": 1em,
  "xl": 1.5em,
) !default;
```
