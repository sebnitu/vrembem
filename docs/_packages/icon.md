---
layout: article
title: Icon
description: "A component for displaying glyphs that convey meaning through iconography."
package: "@vrembem/icon"
category: simple
usage:
  npm: true
  scss: true
---

<div class="notice notice_type_info">
  <div class="notice__body type">
    <p>You can use any icon set but may require changing default icon variables. Default styles are intended for <a href="https://feathericons.com/">feather icons</a> which is a great open source option.</p>
  </div>
</div>

## icon

You can inject svg icons directly or use svg sprites. The only requirement is the `icon` component class.

{% include demo_open.html class_grid="grid_stack" %}
<div class="level level_gap_xl">
  {% include icon.html icon="anchor" %}
  {% include icon.html icon="arrow-left" %}
  {% include icon.html icon="arrow-right" %}
  {% include icon.html icon="arrow-up" %}
  {% include icon.html icon="arrow-down" %}
  {% include icon.html icon="clipboard" %}
  {% include icon.html icon="clock" %}
  {% include icon.html icon="cpu" %}
  {% include icon.html icon="delete" %}
  {% include icon.html icon="download-cloud" %}
</div>
{% include demo_switch.html %}
```html
<svg class="icon" role="img">
  <use xlink:href="#icon-anchor"></use>
</svg>
```
{% include demo_close.html %}

## icon_size_[key]

Add a size modifier to adjust the size of your icons. Icon sizes are controlled using the font-size attribute and optionally a stroke width.

{% include demo_open.html class_grid="grid_stack" %}
<div class="level level_gap_xl">
  <span>{% include icon.html icon="anchor" class="icon_size_xs" %}</span>
  <span>{% include icon.html icon="anchor" class="icon_size_sm" %}</span>
  <span>{% include icon.html icon="anchor" class="" %}</span>
  <span>{% include icon.html icon="anchor" class="icon_size_lg" %}</span>
  <span>{% include icon.html icon="anchor" class="icon_size_xl" %}</span>
</div>
{% include demo_switch.html %}
```html
<svg class="icon icon_size_sm" role="img">
  <use xlink:href="#icon-anchor"></use>
</svg>
```
{% include demo_close.html %}

### Available Variations

- `icon_size_xs`
- `icon_size_sm`
- `icon_size_lg`
- `icon_size_xl`

## icon_style_[key]

The default icon style is set using the `$icon-style` variable. You can also explicity style an icon using the style modifier.

{% include demo_open.html class_grid="grid_stack" %}
<div class="level level_gap_xl">
{% include icon.html icon="heart" class="icon_style_stroke" %}
{% include icon.html icon="heart" class="icon_style_fill" %}
</div>
{% include demo_switch.html %}
```html
<svg class="icon icon_style_stroke" role="img">
  <use xlink:href="#icon-heart"></use>
</svg>

<svg class="icon icon_style_fill" role="img">
  <use xlink:href="#icon-heart"></use>
</svg>
```
{% include demo_close.html %}

### Available Variations

- `icon_style_stroke`
- `icon_style_fill`

### `@mixin icon-style($style)`

Output unique styles for an icons based on their style type.

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$style</code></td>
        <td data-mobile-label="Type"><code class="code color-secondary text-nowrap">string</code></td>
        <td data-mobile-label="Desc">The icon styles to output. Current options include <code class="code text-nowrap">'stroke'</code> and <code class="code text-nowrap">'fill'</code>, defaults to <code class="code text-nowrap">'stroke'</code>.</td>
      </tr>
    </tbody>
  </table>
</div>

**Example**

```scss
.icon-selector {
  @include icon-style("fill");
}

// CSS Output
.icon-selector {
  stroke: none;
  stroke-width: 0;
  fill: currentColor;
}
```

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1.25em</code></td>
        <td data-mobile-label="Desc">The base size of icons. This is applied using the <code class="code color-secondary">font-size</code> property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$stroke-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2xp</code></td>
        <td data-mobile-label="Desc">Sets the stroke width property of icons.</td>
      </tr>
    </tbody>
  </table>
</div>
