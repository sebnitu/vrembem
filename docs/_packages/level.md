---
layout: article
title: "Level"
description: "A simple flexbox based layout component."
package: "@vrembem/level"
category: layout
usage:
  npm: true
  scss: true
---

## Level

The most basic imlementation of the level component consists of the `level` container with any number of children. Layout styles are applied to the direct children of the level component using the `> *` selector.

{% include demo_open.html %}
<div class="level">
  {% for i in (1..10) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```
{% include demo_close.html %}

> Level is a flex based layout component. That means you can use the [`@vremben/utility`](https://github.com/sebnitu/vrembem/tree/master/packages/utility) module—specifically the [`flex`](https://github.com/sebnitu/vrembem/tree/master/packages/utility#flex) utility—to further customize your layout.

## level_gap_[key]

Adjusts the gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

{% include demo_open.html %}
<div class="level level_gap_sm">
  {% for i in (1..10) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap_sm">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```
{% include demo_close.html %}

### Available Variations

- `level_gap_none`
- `level_gap_xs`
- `level_gap_sm`
- `level_gap_md`
- `level_gap_lg`
- `level_gap_xl`

## level_gap-x_[key]

Adjusts the horizontal gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

{% include demo_open.html %}
<div class="level level_gap-x_lg">
  {% for i in (1..10) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap-x_lg">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```
{% include demo_close.html %}

### Available Variations

- `level_gap-x_none`
- `level_gap-x_xs`
- `level_gap-x_sm`
- `level_gap-x_md`
- `level_gap-x_lg`
- `level_gap-x_xl`

## level_gap-y_[key]

Adjusts the vertical gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

{% include demo_open.html %}
<div class="level level_gap-y_lg">
  {% for i in (1..10) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap-y_lg">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```
{% include demo_close.html %}

### Available Variations

- `level_gap-y_none`
- `level_gap-y_xs`
- `level_gap-y_sm`
- `level_gap-y_md`
- `level_gap-y_lg`
- `level_gap-y_xl`

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2em</code></td>
        <td data-mobile-label="Desc">The default gap spacing for the level component.</td>
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
  "xs": 1px,
  "sm": 0.25em,
  "md": 0.5em,
  "lg": 1em,
  "xl": 1.5em,
) !default;
```
