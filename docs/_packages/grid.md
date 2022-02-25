---
layout: article
title: "Grid"
description: "A flexbox based grid system component."
package: "@vrembem/grid"
category: layout
usage:
  npm: true
  scss: true
---

## grid

The most basic implementation of the grid component consists of two elements. By default, `grid__item`'s split the available space within the `grid` parent evenly:

- `grid`
- `grid__item`

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

> Grid is a flex based layout component. That means you can use the [`@vremben/utility`](https://github.com/sebnitu/vrembem/tree/main/packages/utility) package—specifically [`flex`](https://github.com/sebnitu/vrembem/tree/main/packages/utility#flex) and [`span`](https://github.com/sebnitu/vrembem/tree/main/packages/utility#span) modules—to further customize your layout.

### grid__clear

The clear element allows you to start a new row at any point in a column set.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__clear"></div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## grid_auto

Gives grid items a basis of auto so their content dictates their width.

{% include demo_open.html %}
<div class="grid grid_auto">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_auto">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

Set an individual grid item to auto using `grid__item_auto` element modifier.

{% include demo_open.html %}
<div class="grid">
  <div class="grid__item grid__item_auto">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item grid__item_auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## grid_fill

The fill modifier stretches grid item's contents to fill the height of it's container.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid grid_gap_sm grid_fill">
  <div class="grid__item" style="height: 200px;">
    <div class="box">...</div>
  </div>
  <div class="grid__item gap-y">
    <div class="box">
      ...
    </div>
    <div class="box">
      ...
    </div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_fill">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

Set an individual grid item to fill using the `grid__item_fill` element modifier.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid">
  <div class="grid__item">
    <div class="box" style="height: 200px;">...</div>
  </div>
  <div class="grid__item grid__item_fill">
    <div class="box">
      ...
    </div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item">...</div>
  <div class="grid__item grid__item_fill">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## grid_gap_[key]

Modifiers that adjust the gutter spacing between `grid__item` elements. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

{% include demo_open.html %}
<div class="grid grid_gap_xs">
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__clear"></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap_xs">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

### Available Variations

- `grid_gap_none`
- `grid_gap_xs`
- `grid_gap_sm`
- `grid_gap_md`
- `grid_gap_lg`
- `grid_gap_xl`

## grid_gap-x_[key]

Adjusts the horizontal gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

{% include demo_open.html %}
<div class="grid grid_gap-x_xs">
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__clear"></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap-x_xs">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

### Available Variations

- `grid_gap-x_none`
- `grid_gap-x_xs`
- `grid_gap-x_sm`
- `grid_gap-x_md`
- `grid_gap-x_lg`
- `grid_gap-x_xl`

## grid_gap-y_[key]

Adjusts the vertical gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

{% include demo_open.html %}
<div class="grid grid_gap-y_xs">
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__clear"></div>
  <div class="grid__item"><div class="box">...</div></div>
  <div class="grid__item"><div class="box">...</div></div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap-y_xs">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

### Available Variations

- `grid_gap-y_none`
- `grid_gap-y_xs`
- `grid_gap-y_sm`
- `grid_gap-y_md`
- `grid_gap-y_lg`
- `grid_gap-y_xl`

## grid_stack_[key]

Adds a breakpoint for when grid items should be stacked vertically. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `grid_stack`) will stack items under all conditions.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid grid_stack_xs">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_stack_sm">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_stack_md">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_stack_lg">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_stack_xl">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_stack_md">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

### Available Variations

- `grid_stack`
- `grid_stack_xs`
- `grid_stack_sm`
- `grid_stack_md`
- `grid_stack_lg`
- `grid_stack_xl`

## span

Set the flex-basis, width and max-width on an element using the `span` module. Span column widths are built from the `$span-columns` variable. Breakpoint keys are built from the [`$breakpoints`](#breakpoints) variable map. These are the available variants:

- `span-[col]-[key]` - Sets the number of columns an element should span with an optional breakpoint condition.
- `span-auto-[key]` - Sets an elements width to `auto` with an optional breakpoint condition.
- `span-full-[key]` - Sets an elements width to `100%` with an optional breakpoint condition.

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-span</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-span</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"span"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the span module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-span</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix the span module with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$span-columns</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">12</code></td>
        <td data-mobile-label="Desc">The columns value to use when building span variants.</td>
      </tr>
    </tbody>
  </table>
</div>

### span-[col]-[key]

Sets the number of columns an element should span with an optional breakpoint condition.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid grid_flatten">
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-3">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-3">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span-6">...</div>
  <div class="grid__item span-6">...</div>
  <div class="grid__clear"></div>
  <div class="grid__item span-6">...</div>
  <div class="grid__item span-3">...</div>
  <div class="grid__item span-3">...</div>
</div>
```
{% include demo_close.html %}

Here's an example of using the optional breakpoint variants. Breakpoints variants should be added with a mobile-first approach.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid grid_flatten">
  <div class="grid__item span-12 span-6-xs span-8-sm span-4-md span-3-lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-12 span-6-xs span-8-sm span-12-md span-3-lg">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span-12 span-6-xs span-8-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-8-sm span-12-md span-3-lg">...</div>
</div>
```
{% include demo_close.html %}

### span-auto-[key]

Sets an elements width to `auto` with an optional breakpoint condition.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid grid_flatten">
  <div class="grid__item span-auto">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span-auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

### span-full-[key]

Sets an elements width to `100%` with an optional breakpoint condition.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid grid_flatten">
  <div class="grid__item span-full">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span-full">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## Sass variables

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
        <td data-mobile-label="Desc">The breakpoints map the <code class="code">grid_stack_[key]</code> modifier uses to build its styles.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2em</code></td>
        <td data-mobile-label="Desc">The default gap spacing for the grid component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap-map</code></td>
        <td data-mobile-label="Default">
          <a class="link text-nowrap" href="#gap-scale"><code class="code color-secondary">Sass Map</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">Used to output gap modifiers.</td>
      </tr>
    </tbody>
  </table>
</div>

### $breakpoints

The breakpoints map the `grid_stack_[key]` modifier uses to build its styles.

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
  "xs": 0.5em,
  "sm": 1em,
  "md": 2em,
  "lg": 3em,
  "xl": 4em
) !default;
```
