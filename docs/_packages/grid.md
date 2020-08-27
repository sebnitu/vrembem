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

The most basic imlementation of the grid component consists of two elements. By default, `grid__item`'s split the available space within the `grid` parent evenly:

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
<div class="grid grid_fill">
  <div class="grid__item" style="height: 200px;">
    <div class="box">...</div>
  </div>
  <div class="grid__item spacing">
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

Modifiers that adjust the gutter spacing between `grid__item` elements. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

```html
<div class="grid grid_gap_sm">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

### Available Variations

- `grid_gap_none`
- `grid_gap_xs`
- `grid_gap_sm`
- `grid_gap_md`
- `grid_gap_lg`
- `grid_gap_xl`

## grid_gap-x_[key]

Adjusts the horizontal gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

```html
<div class="grid grid_gap-x_xs">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

### Available Variations

- `grid_gap-x_none`
- `grid_gap-x_xs`
- `grid_gap-x_sm`
- `grid_gap-x_md`
- `grid_gap-x_lg`
- `grid_gap-x_xl`

## grid_gap-y_[key]

Adjusts the vertical gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

```html
<div class="grid grid_gap-y_xl">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

### Available Variations

- `grid_gap-y_none`
- `grid_gap-y_xs`
- `grid_gap-y_sm`
- `grid_gap-y_md`
- `grid_gap-y_lg`
- `grid_gap-y_xl`

## grid_stack_[key]

Adds a breakpoint for when grid items should be stacked vertically. Values and class keys are generated using the `$breakpoint` map. Also available is the `grid_stack` modifier which stacks grid items under all conditions.

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
<div class="grid grid_stack">...</div>
<div class="grid grid_stack_xs">...</div>
<div class="grid grid_stack_sm">...</div>
<div class="grid grid_stack_md">...</div>
<div class="grid grid_stack_lg">...</div>
<div class="grid grid_stack_xl">...</div>
```
{% include demo_close.html %}

## flex

The [flex utility](/packages/utility#flex) is a great way to adjust individual flex properties on components that use flex layout. These are some available flex property based utilities:

- `flex-align-[key]`
- `flex-justify-[key]`
- `flex-grow-[key]`
- `flex-shrink-[key]`
- `flex-basis-[key]`
- `flex-wrap`
- `flex-nowrap`
- `flex-items-[key]`

### flex-align-[value]

Adjust the `align-items` property of grid columns using the `flex-align-[value]` utility. Avaliable values are:

- `flex-align-start`
- `flex-align-center`
- `flex-align-end`
- `flex-align-stretch`
- `flex-align-baseline`

{% include demo_open.html %}
<div class="grid flex-align-start">
  <div class="grid__item">
    <div class="box" style="height: 100px;">...</div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-align-start">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid flex-align-center">
  <div class="grid__item">
    <div class="box" style="height: 100px;">...</div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-align-center">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid flex-align-end">
  <div class="grid__item">
    <div class="box" style="height: 100px;">...</div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-align-end">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

### flex-justify-[value]

Change the `justify-content` property of grid columns using the `flex-justify-[value]` utility. Best used along with the `grid_auto` modifier. Avaliable values are:

- `flex-justify-start`
- `flex-justify-center`
- `flex-justify-end`
- `flex-justify-between`
- `flex-justify-around`
- `flex-justify-evenly`

{% include demo_open.html %}
<div class="grid grid_auto flex-justify-start">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-justify-start">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex-justify-center">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-justify-center">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex-justify-end">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-justify-end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex-justify-between">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-justify-between">...</div>
```
{% include demo_close.html %}

## span

Set the width, max-width and flex based on a column set using the `span` utility. Span widths are based on a column set based on the `$columns` variable. There are a number of options available:

- `span-[col]`: Sets the number of columns an element should span.
- `span-[col]-[breakpoint]`: Sets the number of columns an element should span based on a breakpoint condition.
- `span-auto`: Sets an elements width to `auto`.
- `span-full`: Sets an elements width to `100%`.

### span-[col]

Sets the number of columns an element should span. The total number of columns is set in the `$columns` variable.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid grid_flatten">
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__stack"></div>
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
  <div class="grid__stack"></div>
  <div class="grid__item span-6">...</div>
  <div class="grid__item span-3">...</div>
  <div class="grid__item span-3">...</div>
</div>
```
{% include demo_close.html %}

### span-[col]-[breakpoint]

Sets the number of columns an element should span based on a breakpoint conditon. The total number of columns is set in the `$columns` variable. Breakpoint keys are built from the `$breakpoints` variable map.

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

### span-auto

Sets an elements width to `auto`.

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

### span-full

Sets an elements width to `100%`.

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
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$breakpoints</code></td>
        <td data-mobile-label="Desc">The breakpoints map the <code class="code">grid_stack_[key]</code> modifier usees to build it's styles.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2em</code></td>
        <td data-mobile-label="Desc">The default gap spacing for the grid component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap-scale</code></td>
        <td data-mobile-label="Default">
          <a class="link" href="#gap-scale"><code class="code color-secondary">Sass Map</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">Used to output gap modifiers.</td>
      </tr>
    </tbody>
  </table>
</div>

### $gap-scale

Used to output gap modifiers.

```scss
$gap-scale: (
  "none": 0,
  "xs": 0.5em,
  "sm": 1em,
  "md": 2em,
  "lg": 3em,
  "xl": 4em
) !default;
```
