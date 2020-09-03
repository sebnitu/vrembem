---
layout: article
title: Media
description: "The media component is used for displaying groups of content with a corresponding media asset, such as an image, avatar or icon."
package: "@vrembem/media"
category: compound
usage:
  npm: true
  scss: true
---

## media

The most basic imlementation of the media component consists of the `media` container and atleast one body element (`media__body`) and one object element (`media__obj`).

{% include demo_open.html class_parent="gap" %}
<div class="media">
  <div class="media__obj">
    <img class="radius" src="https://picsum.photos/90/90/?11" width="90" height="90" />
  </div>
  <div class="media__body">
    <h2 class="h5">Media Content Title</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
<div class="media">
  <div class="media__obj">
    {% include icon.html icon="settings" %}
  </div>
  <div class="media__body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media">
  <div class="media__obj">
    ...
  </div>
  <div class="media__body">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## media_gap_[key]

Adjusts the gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

{% include demo_open.html class_parent="gap" %}
<div class="media media_gap_xs">
  <div class="media__obj">
    {% include icon.html icon="settings" %}
  </div>
  <div class="media__body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_gap_xs">
  ...
</div>
```
{% include demo_close.html %}

### Available Variations

- `media_gap_none`
- `media_gap_xs`
- `media_gap_sm`
- `media_gap_md`
- `media_gap_lg`
- `media_gap_xl`

## media_gap-x_[key]

Adjusts the horizontal gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

{% include demo_open.html class_parent="gap" %}
<div class="media media_gap-x_lg">
  <div class="media__obj">
    {% include icon.html icon="settings" %}
  </div>
  <div class="media__body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_gap-x_lg">
  ...
</div>
```
{% include demo_close.html %}

### Available Variations

- `media_gap-x_none`
- `media_gap-x_xs`
- `media_gap-x_sm`
- `media_gap-x_md`
- `media_gap-x_lg`
- `media_gap-x_xl`

## media_gap-y_[key]

Adjusts the vertical gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

{% include demo_open.html class_parent="gap" %}
<div class="media media_gap-y_xs media_stack_lg">
  <div class="media__obj">
    {% include icon.html icon="settings" %}
  </div>
  <div class="media__body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_gap-y_xs media_stack_lg">
  ...
</div>
```
{% include demo_close.html %}

### Available Variations

- `media_gap-y_none`
- `media_gap-y_xs`
- `media_gap-y_sm`
- `media_gap-y_md`
- `media_gap-y_lg`
- `media_gap-y_xl`

> The `media_gap-y_[key]` modifier only takes effect when combined with a `media_stack_[key]` modifier.

## media_stack_[key]

Adds a breakpoint for when media elements should be stacked vertically. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `media_stack`) will stack items under all conditions.

{% include demo_open.html class_parent="gap" %}
<div class="media media_stack_lg">
  <img class="media__obj radius" src="https://picsum.photos/90/90/?15" width="90" height="90" />
  <div class="media__body">
    <h2 class="h5">Media Content Title</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_stack_lg">
  ...
</div>
```
{% include demo_close.html %}

#### Available Variations

- `media_stack`
- `media_stack_xs`
- `media_stack_sm`
- `media_stack_md`
- `media_stack_lg`
- `media_stack_xl`

### Combined Modifiers

The media component really shines when combining gap and stack modifiers.

- `media_gap-x_lg` - Sets the horizontal gap between media obj and body elements.
- `media_gap-y_xs` - Sets the vertical gap between media obj and body elements whent he stack breakpoint is met.
- `media_stack_lg` - Sets the media component breakpoint that elements should stack.

{% include demo_open.html class_parent="gap" %}
<div class="media media_gap-x_lg media_gap-y_xs media_stack_lg">
  <img class="media__obj radius" src="https://picsum.photos/90/90/?15" width="90" height="90" />
  <div class="media__body">
    <h2 class="h5">Media Content Title</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_gap-x_lg media_gap-y_xs media_stack_lg">
  ...
</div>
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
          <a class="link" href="#breakpoints"><code class="code color-secondary">core.$breakpoints</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">The breakpoints map the <code class="code">media_stack_[key]</code> modifier uses to build it's styles.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$min-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">(core.$line-height * 1em)</code></td>
        <td data-mobile-label="Desc">Sets the min-height property of the <code class="code">media__obj</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">30%</code></td>
        <td data-mobile-label="Desc">Sets the max-width property of the <code class="code">media__obj</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1.5em</code></td>
        <td data-mobile-label="Desc">The default gap spacing for the media component.</td>
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

### $breakpoints

The breakpoints map the `media_stack_[key]` modifier uses to build it's styles.

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

### $gap-scale

Used to output gap modifiers.

```scss
$gap-scale: (
  "none": 0,
  "xs": 0.5em,
  "sm": 1em,
  "md": 1.5em,
  "lg": 2em,
  "xl": 3em
) !default;
```
