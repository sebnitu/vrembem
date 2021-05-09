---
layout: article
title: Table
description: "A table component for displaying HTML tables."
package: "@vrembem/table"
category: simple
usage:
  npm: true
  scss: true
---

## table

For basic table styles, only the `table` component class is required. Use [proper HTML table markup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) and styles should apply as expected.

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  {% include table.html caption="List of anarchists" %}
</div>
{% include demo_switch.html %}
```html
<table class="table">
  <caption>...</caption>
  <thead>
    <tr>
      <th>...</th>
      <th>...</th>
      ...
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>...</td>
      <td>...</td>
      ...
    </tr>
    ...
  </tbody>
</table>
```
{% include demo_close.html %}

For simple responsive table styles, wrap your tables in the [`scroll-box` base module](/packages/base#scroll-box) which provides horizontal scrolling when tables can't fit in their container.

```html
<div class="scroll-box">
  <table class="table">
    ...
  </table>
</div>
```

## table_overflow_ellipsis

Switches a table layout to `fixed` and adds ellipsis overflow styles to table cells and headers.

{% include demo_open.html %}
<table class="table table_ellipsis">
  <colgroup>
    <col style="width: 50px;">
  </colgroup>
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Email</th>
      <th>Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Noam</td>
      <td>Chomsky</td>
      <td>noam@chomsky.com</td>
      <td>@chomsky</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Howard</td>
      <td>Zinn</td>
      <td>howard@zinn.com</td>
      <td>@zinn</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Pierre-Joseph</td>
      <td>Proudhon</td>
      <td>pierre@proudhon.com</td>
      <td>@proudhon</td>
    </tr>
    <tr>
      <th>4</th>
      <td>George</td>
      <td>Orwell</td>
      <td>george@orwell.com</td>
      <td>@orwell</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Rudolf</td>
      <td>Rocker</td>
      <td>rudolf@rocker.com</td>
      <td>@rocker</td>
    </tr>
  </tbody>
</table>
{% include demo_switch.html %}
```html
<table class="table table_ellipsis">
  ...
</table>
```
{% include demo_close.html %}

Space will be split equally between columns when `table_ellipsis` is applied. For more control over specific column widths, use the `<colgroup>` and `<col>` elements and set their desired widths as needed.

```html
<table class="table table_ellipsis">
  <colgroup>
    <col style="width: 50px;">
  </colgroup>
  ...
</table>
```

## table_hover

Adds hover and focus state styles for table row (`<tr>`) elements.

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  {% include table.html class="table_hover" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_hover">
  ...
</table>
```
{% include demo_close.html %}

## table_responsive_[key]

When the [`scroll-box` base module](/packages/base#scroll-box) isn't mobile friendly enough, this modifier adds responsive styles to a table so that it's easier to read on specific breakpoints. This is done by using the `data-mobile-label` attribute on table cells that should correspond to the table column header for that specific cell. Use the value-less `table_responsive` modifier to apply these styles universally.

{% include demo_open.html class_grid="grid_stack" class_parent="gap-y" %}
<div class="scroll-box">
  <table class="table table_responsive table_style_bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>User</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="#">1</td>
        <td data-mobile-label="User">someone</td>
        <td data-mobile-label="Email">someone@email.com</td>
      </tr>
      <tr>
        <td data-mobile-label="#">2</td>
        <td data-mobile-label="User">else</td>
        <td data-mobile-label="Email">else@email.com</td>
      </tr>
    </tbody>
  </table>
</div>
{% include demo_switch.html %}
```html
<table class="table table_responsive_lg">
  <thead>
    <tr>
      <th>key</th>
      <th>value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-mobile-label="key">...</td>
      <td data-mobile-label="value">...</td>
    </tr>
  </tbody>
</table>
```
{% include demo_close.html %}

The mobile label value will be truncated if it exceeds the width set by `$mobile-label-width`, so keep the label terse when possible.

### Available Variations

- `table_responsive`
- `table_responsive_xs`
- `table_responsive_sm`
- `table_responsive_md`
- `table_responsive_lg`
- `table_responsive_xl`

### `@mixin table-responsive-styles()`

Output responsive table styles. This is used to generate the styles for the `table_responsive_[key]` modifier.

**Example**

```scss
.table_custom_modifier {
  @include table-responsive-styles();
}
```

## table_size_[key]

Adjust the size of a table by increasing or decreasing cell padding.

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  {% include table.html class="table table_zebra table_size_sm" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_size_sm">
  ...
</table>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  {% include table.html class="table table_zebra table_size_lg" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_size_lg">
  ...
</table>
```
{% include demo_close.html %}

### Available Variations

- `table_size_sm`
- `table_size_lg`

## table_style_[value]

Adds table styles based on the provided value.

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  {% include table.html class="table_style_rowed" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_style_rowed">
  ...
</table>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  {% include table.html class="table_style_bordered" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_style_bordered">
  ...
</table>
```
{% include demo_close.html %}

### Available Variations

- `table_style_rowed`
- `table_style_bordered`

## table_zebra

Adds zebra styled rows to a table to help increase its readability. This is done by alternating the background color of rows to help guide the reader's eye.

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  {% include table.html class="table_zebra" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_zebra">
  ...
</table>
```
{% include demo_close.html %}

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
        <td data-mobile-label="Desc">The breakpoints map the <a class="link" href="#table_responsive_key"><code class="code">table_responsive_[key]</code> modifier</a> uses to build its styles.</td>
      </tr>
    </tbody>
  </table>
</div>

### $breakpoints

The breakpoints map the [`table_responsive_[key]` modifier](#table_responsive_key) uses to build its styles.

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
