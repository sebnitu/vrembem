---
layout: article
title: Utility
description: "The utility component provides a set of atomic classes that specialize in a single function."
package: "@vrembem/utility"
category: simple
usage:
  npm: true
  scss: true
---

## background

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch-group">
    <div class="swatch background-primary-lighter"></div>
    <div class="swatch background-primary-light"></div>
    <div class="swatch background-primary"></div>
    <div class="swatch background-primary-dark"></div>
    <div class="swatch background-primary-darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background-secondary-lighter"></div>
    <div class="swatch background-secondary-light"></div>
    <div class="swatch background-secondary"></div>
    <div class="swatch background-secondary-dark"></div>
    <div class="swatch background-secondary-darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background-shade-light"></div>
    <div class="swatch background-shade"></div>
    <div class="swatch background-shade-dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background-night-light"></div>
    <div class="swatch background-night"></div>
    <div class="swatch background-night-dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background-info-lighter"></div>
    <div class="swatch background-info-light"></div>
    <div class="swatch background-info"></div>
    <div class="swatch background-info-dark"></div>
    <div class="swatch background-info-darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background-success-lighter"></div>
    <div class="swatch background-success-light"></div>
    <div class="swatch background-success"></div>
    <div class="swatch background-success-dark"></div>
    <div class="swatch background-success-darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background-caution-lighter"></div>
    <div class="swatch background-caution-light"></div>
    <div class="swatch background-caution"></div>
    <div class="swatch background-caution-dark"></div>
    <div class="swatch background-caution-darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background-danger-lighter"></div>
    <div class="swatch background-danger-light"></div>
    <div class="swatch background-danger"></div>
    <div class="swatch background-danger-dark"></div>
    <div class="swatch background-danger-darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background-black"></div>
    <div class="swatch border border-left-none background-white"></div>
    <div class="swatch border border-left-none background-transparent"></div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="background-primary-lighter"></div>
<div class="background-primary-light"></div>
<div class="background-primary"></div>
<div class="background-primary-dark"></div>
<div class="background-primary-darker"></div>
...
```
{% include demo_close.html %}

## border

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background-shade-light border"></div>
  <div class="swatch background-shade-light border-top"></div>
  <div class="swatch background-shade-light border-right"></div>
  <div class="swatch background-shade-light border-bottom"></div>
  <div class="swatch background-shade-light border-left"></div>
</div>
{% include demo_switch.html %}
```html
<div class="border"></div>
<div class="border-top"></div>
<div class="border-right"></div>
<div class="border-bottom"></div>
<div class="border-left"></div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background-shade-light border border-none"></div>
  <div class="swatch background-shade-light border border-top-none"></div>
  <div class="swatch background-shade-light border border-right-none"></div>
  <div class="swatch background-shade-light border border-bottom-none"></div>
  <div class="swatch background-shade-light border border-left-none"></div>
</div>
{% include demo_switch.html %}
```html
<div class="border-none"></div>
<div class="border-top-none"></div>
<div class="border-right-none"></div>
<div class="border-bottom-none"></div>
<div class="border-left-none"></div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background-shade-light border border-color-light"></div>
  <div class="swatch background-shade-light border"></div>
  <div class="swatch background-shade-light border border-color-dark"></div>
  <div class="swatch background-shade-light border border-color-darker"></div>
</div>
{% include demo_switch.html %}
```html
<div class="border border-color-light"></div>
<div class="border"></div>
<div class="border border-color-dark"></div>
<div class="border border-color-darker"></div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="padding radius background-night">
  <div class="swatch-group">
    <div class="swatch border border-color-invert-light"></div>
    <div class="swatch border border-color-invert"></div>
    <div class="swatch border border-color-invert-dark"></div>
    <div class="swatch border border-color-invert-darker"></div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="border border-color-invert-light"></div>
<div class="border border-color-invert"></div>
<div class="border border-color-invert-dark"></div>
<div class="border border-color-invert-darker"></div>
```
{% include demo_close.html %}

## radius

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background-secondary radius"></div>
  <div class="swatch background-secondary radius-square"></div>
  <div class="swatch background-secondary radius-circle"></div>
</div>
{% include demo_switch.html %}
```html
<div class="radius"></div>
<div class="radius-square"></div>
<div class="radius-circle"></div>
```
{% include demo_close.html %}

## elevate

{% include demo_open.html class_grid="grid_break" %}
<div class="padding-lg background-shade radius">
  <div class="swatch-group">
    <div class="swatch background-white elevate"></div>
    <div class="swatch background-white elevate-flat"></div>
    <div class="swatch background-white elevate-1dp"></div>
    <div class="swatch background-white elevate-4dp"></div>
    <div class="swatch background-white elevate-8dp"></div>
    <div class="swatch background-white elevate-16dp"></div>
    <div class="swatch background-white elevate-24dp"></div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="elevate"></div>
<div class="elevate-flat"></div>
<div class="elevate-1dp"></div>
<div class="elevate-4dp"></div>
<div class="elevate-8dp"></div>
<div class="elevate-16dp"></div>
<div class="elevate-24dp"></div>
```
{% include demo_close.html %}

## color

{% include demo_open.html class_grid="grid_break" class_parent="spacing" %}
<div class="padding radius background-shade-light">
  <div class="swatch-group">
    <span class="color">Color</span>
    <span class="color-subtle">Color light</span>
    <span class="color-primary-lighter">Color primary</span>
    <span class="color-primary-light">Color primary</span>
    <span class="color-primary">Color primary</span>
    <span class="color-primary-dark">Color primary</span>
    <span class="color-primary-darker">Color primary</span>
    <span class="color-secondary-lighter">Color secondary</span>
    <span class="color-secondary-light">Color secondary</span>
    <span class="color-secondary">Color secondary</span>
    <span class="color-secondary-dark">Color secondary</span>
    <span class="color-secondary-darker">Color secondary</span>
    <span class="color-shade-light">Color shade</span>
    <span class="color-shade">Color shade</span>
    <span class="color-shade-dark">Color shade</span>
    <span class="color-night-light">Color night</span>
    <span class="color-night">Color night</span>
    <span class="color-night-dark">Color night</span>
    <span class="color-info-lighter">Color info</span>
    <span class="color-info-light">Color info</span>
    <span class="color-info">Color info</span>
    <span class="color-info-dark">Color info</span>
    <span class="color-info-darker">Color info</span>
    <span class="color-success-lighter">Color success</span>
    <span class="color-success-light">Color success</span>
    <span class="color-success">Color success</span>
    <span class="color-success-dark">Color success</span>
    <span class="color-success-darker">Color success</span>
    <span class="color-caution-lighter">Color caution</span>
    <span class="color-caution-light">Color caution</span>
    <span class="color-caution">Color caution</span>
    <span class="color-caution-dark">Color caution</span>
    <span class="color-caution-darker">Color caution</span>
    <span class="color-danger-lighter">Color danger</span>
    <span class="color-danger-light">Color danger</span>
    <span class="color-danger">Color danger</span>
    <span class="color-danger-dark">Color danger</span>
    <span class="color-danger-darker">Color danger</span>
    <span class="color-black">Color black</span>
    <span class="color-white">Color white</span>
    <span class="color-transparent">Color transparent</span>
  </div>
</div>
<div class="padding radius background-night">
  <div class="swatch-group">
    <span class="color-invert">Color invert</span>
    <span class="color-invert_subtle">Color invert dark</span>
    <span class="color-primary-lighter">Color primary</span>
    <span class="color-primary-light">Color primary</span>
    <span class="color-primary">Color primary</span>
    <span class="color-primary-dark">Color primary</span>
    <span class="color-primary-darker">Color primary</span>
    <span class="color-secondary-lighter">Color secondary</span>
    <span class="color-secondary-light">Color secondary</span>
    <span class="color-secondary">Color secondary</span>
    <span class="color-secondary-dark">Color secondary</span>
    <span class="color-secondary-darker">Color secondary</span>
    <span class="color-shade-light">Color shade</span>
    <span class="color-shade">Color shade</span>
    <span class="color-shade-dark">Color shade</span>
    <span class="color-night-light">Color night</span>
    <span class="color-night">Color night</span>
    <span class="color-night-dark">Color night</span>
    <span class="color-info-lighter">Color info</span>
    <span class="color-info-light">Color info</span>
    <span class="color-info">Color info</span>
    <span class="color-info-dark">Color info</span>
    <span class="color-info-darker">Color info</span>
    <span class="color-success-lighter">Color success</span>
    <span class="color-success-light">Color success</span>
    <span class="color-success">Color success</span>
    <span class="color-success-dark">Color success</span>
    <span class="color-success-darker">Color success</span>
    <span class="color-caution-lighter">Color caution</span>
    <span class="color-caution-light">Color caution</span>
    <span class="color-caution">Color caution</span>
    <span class="color-caution-dark">Color caution</span>
    <span class="color-caution-darker">Color caution</span>
    <span class="color-danger-lighter">Color danger</span>
    <span class="color-danger-light">Color danger</span>
    <span class="color-danger">Color danger</span>
    <span class="color-danger-dark">Color danger</span>
    <span class="color-danger-darker">Color danger</span>
    <span class="color-black">Color black</span>
    <span class="color-white">Color white</span>
    <span class="color-transparent">Color transparent</span>
  </div>
</div>
{% include demo_switch.html %}
```html
<span class="color"></span>
<span class="color-subtle"></span>
<span class="color-primary-light"></span>
<span class="color-primary"></span>
<span class="color-primary-dark"></span>
...
```
{% include demo_close.html %}

## display

Display utilities allow you to toggle the display property on an element with an optional breakpoint conditional.

```
.display-[property]-[breakpoint]
```

<div>
  <div class="grid grid_break_xs">
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[property]</code>
        </div>
        <div class="card__body spacing">
          <p><code>inline</code></p>
          <p><code>flex</code></p>
          <p><code>inline-flex</code></p>
          <p><code>block</code></p>
          <p><code>inline-block</code></p>
          <p><code>none</code></p>
        </div>
      </div>
    </div>
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[breakpoint]</code>
        </div>
        <div class="card__body spacing">
          <p><code>xs <span class="color-subtle">...480px</span></code></p>
          <p><code>sm <span class="color-subtle">...620px</span></code></p>
          <p><code>md <span class="color-subtle">...760px</span></code></p>
          <p><code>lg <span class="color-subtle">...990px</span></code></p>
          <p><code>xl <span class="color-subtle">...1380px</span></code></p>
        </div>
      </div>
    </div>
  </div>
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_gap_sm">
  <div class="grid__item grid__item_fill span-auto">
    <div class="notice notice_type_info flex-align-center">
      {% include icon.html icon="eye" %}
    </div>
  </div>
  <div class="grid__item">
    <div class="notice notice_type_success display-block display-none-xs">
      <p>Small Mobile</p>
    </div>
    <div class="notice notice_type_success display-none display-block-xs display-none-sm">
      <p>Small Mobile &rarr; Mobile</p>
    </div>
    <div class="notice notice_type_success display-none display-block-sm display-none-md">
      <p>Mobile &rarr; Tablet</p>
    </div>
    <div class="notice notice_type_success display-none display-block-md display-none-lg">
      <p>Tablet &rarr; Desktop</p>
    </div>
    <div class="notice notice_type_success display-none display-block-lg display-none-xl">
      <p>Desktop &rarr; Large Desktop</p>
    </div>
    <div class="notice notice_type_success display-none display-block-xl">
      <p>Large Desktop</p>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="display-block display-none-xs">
  <p>Small Mobile</p>
</div>
<div class="display-none display-block-xs display-none-sm">
  <p>Small Mobile &rarr; Mobile</p>
</div>
<div class="display-none display-block-sm display-none-md">
  <p>Mobile &rarr; Tablet</p>
</div>
<div class="display-none display-block-md display-none-lg">
  <p>Tablet &rarr; Desktop</p>
</div>
<div class="display-none display-block-lg display-none-xl">
  <p>Desktop &rarr; Large Desktop</p>
</div>
<div class="display-none display-block-xl">
  <p>Large Desktop</p>
</div>
```
{% include demo_close.html %}

## flex

{% include demo_open.html class_grid="grid_break" class_parent="spacing" %}
<div class="flex flex-justify-between flex-align-end border padding-xs">
  <div class="swatch box margin-xs"></div>
  <div class="swatch box margin-xs" style="height: auto"></div>
  <div class="swatch box margin-xs" style="height: auto"></div>
</div>
<div class="flex flex-justify-end flex-align-stretch border padding-xs">
  <div class="swatch box margin-xs" style="height: auto"></div>
  <div class="swatch box margin-xs" style="height: auto"></div>
  <div class="swatch box margin-xs"></div>
</div>
<div class="flex flex-justify-center flex-align-center border padding-xs">
  <div class="swatch box margin-xs" style="height: auto"></div>
  <div class="swatch box margin-xs" style="height: auto"></div>
  <div class="swatch box margin-xs"></div>
</div>
<div class="flex flex-items-equal border padding-xs">
  <div class="swatch box margin-xs"></div>
  <div class="swatch box margin-xs"></div>
  <div class="swatch box margin-xs"></div>
</div>
{% include demo_switch.html %}
```html
<div class="flex flex-justify-between flex-align-end"></div>
<div class="flex flex-justify-end flex-align-stretch"></div>
<div class="flex flex-justify-center flex-align-center"></div>
<div class="flex flex-items-equal"></div>
```
{% include demo_close.html %}

## margin

Add margin to an element using directional and size modifiers.

* `margin`
* `margin-[size]`
* `margin-[direction]_[size]`

<div>
  <div class="grid grid_break_xs">
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[direction]</code>
        </div>
        <div class="card__body spacing">
          <p><code>top</code></p>
          <p><code>right</code></p>
          <p><code>bottom</code></p>
          <p><code>left</code></p>
        </div>
      </div>
    </div>
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[size]</code>
        </div>
        <div class="card__body spacing">
          <p><code>0 <span class="color-subtle">...0</span></code></p>
          <p><code>xs <span class="color-subtle">...0.5rem</span></code></p>
          <p><code>sm <span class="color-subtle">...1rem</span></code></p>
          <p><code>md <span class="color-subtle">...1.5rem</span></code></p>
          <p><code>lg <span class="color-subtle">...2rem</span></code></p>
          <p><code>xl <span class="color-subtle">...3rem</span></code></p>
        </div>
      </div>
    </div>
  </div>
</div>

## padding

Add padding to an element using directional and size modifiers.

* `padding`
* `padding-[size]`
* `padding-[direction]-[size]`

<div>
  <div class="grid grid_break_xs">
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[direction]</code>
        </div>
        <div class="card__body spacing">
          <p><code>top</code></p>
          <p><code>right</code></p>
          <p><code>bottom</code></p>
          <p><code>left</code></p>
        </div>
      </div>
    </div>
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[size]</code>
        </div>
        <div class="card__body spacing">
          <p><code>0 <span class="color-subtle">...0</span></code></p>
          <p><code>xs <span class="color-subtle">...0.5rem</span></code></p>
          <p><code>sm <span class="color-subtle">...1rem</span></code></p>
          <p><code>md <span class="color-subtle">...1.5rem</span></code></p>
          <p><code>lg <span class="color-subtle">...2rem</span></code></p>
          <p><code>xl <span class="color-subtle">...3rem</span></code></p>
        </div>
      </div>
    </div>
  </div>
</div>

## spacing

A utility for adding vertical spacing between an element's children.

* `spacing`
* `spacing-[key]`

{% include demo_open.html %}
<div class="spacing">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
{% include demo_switch.html %}
```html
<div class="spacing">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div>
  <div class="grid">
    <div class="grid__item span-4">
      <div class="spacing-none">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-xs">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-sm">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-md">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-lg">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div class="grid__item span-4">
      <div class="spacing-xl">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="spacing-none">...</div>
<div class="spacing-xs">...</div>
<div class="spacing-sm">...</div>
<div class="spacing-md">...</div>
<div class="spacing-lg">...</div>
<div class="spacing-xl">...</div>
```
{% include demo_close.html %}

## text

{% include demo_open.html %}
<ul class="list">
  <li>
    <p class="text-size-sm">Text size small</p>
  </li>
  <li>
    <p class="text-size-lg">Text size large</p>
  </li>
  <li>
    <p class="text-capitalize">Text capitalize</p>
  </li>
  <li>
    <p class="text-lowercase">Text lowercase</p>
  </li>
  <li>
    <p class="text-uppercase">Text uppercase</p>
  </li>
  <li>
    <p class="text-align-left">Text align left</p>
  </li>
  <li>
    <p class="text-align-center">Text align center</p>
  </li>
  <li>
    <p class="text-align-right">Text align right</p>
  </li>
  <li>
    <p class="text-bold">Text bold</p>
  </li>
  <li>
    <p><strong>Strong tag <span class="text-normal">with normal text</span></strong></p>
  </li>
  <li>
    <p class="text-italic">Text italic</p>
  </li>
  <li>
    <p class="text-strike">Text strike</p>
  </li>
  <li>
    <p class="text-underline">Text underline</p>
  </li>
  <li>
    <p class="text-underline-dotted">Text underline dotted</p>
  </li>
  <li>
    <p class="text-underline-dashed">Text underline dashed</p>
  </li>
  <li>
    <p class="text-wrap">Text wrap</p>
  </li>
  <li>
    <p class="text-nowrap">Text nowrap</p>
  </li>
  <li>
    <p class="text-overflow-ellipsis">Text overflow ellipsis text overflow ellipsis text overflow ellipsis text overflow ellipsis</p>
  </li>
  <li>
    <p class="text-lead">Text lead</p>
  </li>
</ul>
{% include demo_switch.html %}
```html
<!-- Size -->
<p class="text-size-sm">...</p>
<p class="text-size-lg">...</p>

<!-- Transform -->
<p class="text-capitalize">...</p>
<p class="text-lowercase">...</p>
<p class="text-uppercase">...</p>

<!-- Align -->
<p class="text-align-left">...</p>
<p class="text-align-center">...</p>
<p class="text-align-right">...</p>

<!-- Weight & Style -->
<p class="text-bold">...</p>
<p class="text-normal">...</p>
<p class="text-italic">...</p>

<!-- Decoration -->
<p class="text-strike">...</p>
<p class="text-underline">...</p>
<p class="text-underline-dotted">...</p>
<p class="text-underline-dashed">...</p>

<!-- Wrap -->
<p class="text-wrap">...</p>
<p class="text-nowrap">...</p>
<p class="text-overflow-ellipsis">...</p>

<!-- Other -->
<p class="text-lead">...</p>
```
{% include demo_close.html %}
