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

Applies background color property. Most options include light, lighter, dark and darker variants.

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

The flex utility is a great way to adjust individual flex properties on components that use flex layout. These are some available flex property based utilities:

* `flex-align-[key]`
* `flex-justify-[key]`
* `flex-grow-[key]`
* `flex-shrink-[key]`
* `flex-basis-[key]`
* `flex-wrap`
* `flex-nowrap`
* `flex-items-[key]`

### flex-align-[value]

Adjust the `align-items` property of grid columns using the `flex-align-[value]` utility. Avaliable values are:

* `flex-align-start`
* `flex-align-center`
* `flex-align-end`
* `flex-align-stretch`
* `flex-align-baseline`

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

* `flex-justify-start`
* `flex-justify-center`
* `flex-justify-end`
* `flex-justify-between`
* `flex-justify-around`
* `flex-justify-evenly`

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

## span

Set the width, max-width and flex based on a column set using the `span` utility. There are a number of options available:

* `span-auto`
* `span-full`
* `span-[col]`
* `span-[col]-[breakpoint]`

### span-auto

{% include demo_open.html class_grid="grid_break" %}
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

{% include demo_open.html class_grid="grid_break" %}
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

### span-[col]

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__break"></div>
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
  <div class="grid__break"></div>
  <div class="grid__item span-6">...</div>
  <div class="grid__item span-3">...</div>
  <div class="grid__item span-3">...</div>
</div>
```
{% include demo_close.html %}

### span-[col]-[breakpoint]

{% include demo_open.html class_grid="grid_break" %}
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

## text

A utility for adjusting various text styles.

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_md">
    <thead>
      <tr>
        <th class="table__auto">Class</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code text-nowrap">text-size-sm</code></td>
        <td><p class="text-size-sm">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-size-lg</code></td>
        <td><p class="text-size-lg">Text example...</p></td>
      </tr>

      <tr>
        <td><code class="code text-nowrap">text-capitalize</code></td>
        <td><p class="text-capitalize">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-lowercase</code></td>
        <td><p class="text-lowercase">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-uppercase</code></td>
        <td><p class="text-uppercase">Text example...</p></td>
      </tr>

      <tr>
        <td><code class="code text-nowrap">text-align-left</code></td>
        <td><p class="text-align-left">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-align-center</code></td>
        <td><p class="text-align-center">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-align-right</code></td>
        <td><p class="text-align-right">Text example...</p></td>
      </tr>

      <tr>
        <td><code class="code text-nowrap">text-bold</code></td>
        <td><p class="text-bold">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-normal</code></td>
        <td><p class="text-normal">Text example...</p></td>
      </tr>

      <tr>
        <td><code class="code text-nowrap">text-italic</code></td>
        <td><p class="text-italic">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-strike</code></td>
        <td><p class="text-strike">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-underline</code></td>
        <td><p class="text-underline">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-underline-dotted</code></td>
        <td><p class="text-underline-dotted">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-underline-dashed</code></td>
        <td><p class="text-underline-dashed">Text example...</p></td>
      </tr>

      <tr>
        <td><code class="code text-nowrap">text-wrap</code></td>
        <td><p class="text-wrap">Text example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">text-nowrap</code></td>
        <td><p class="text-nowrap">Text example...</p></td>
      </tr>

      <tr>
        <td><code class="code text-nowrap">text-lead</code></td>
        <td><p class="text-lead">Text example: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet interdum elit, non blandit arcu luctus quis. Duis mattis et massa a congue.</p></td>
      </tr>
    </tbody>
  </table>
</div>

### text-overflow-ellipsis

Adds ellipsis styles to an element that will display an ellipsis (...) for text that would otherwise wrap.

<div class="border radius padding text-overflow-ellipsis">Text example: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet interdum elit, non blandit arcu luctus quis. Duis mattis et massa a congue.</div>

```html
<div class="text-overflow-ellipsis">...<div>
```

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
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-utility</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix utilities with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">background</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the background utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">border</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the border utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">radius</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the border-radius utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">elevate</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the box-shadow utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">color</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the text color utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-display</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">display</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the display utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-flex</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">flex</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the flex utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-margin</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">margin</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the margin utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">padding</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the padding utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-spacing</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">spacing</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the spacing utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-span</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">span</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the span utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-text</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">text</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the text utility.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$breakpoints</code></td>
        <td data-mobile-label="Default">
          <code class="code color-secondary text-nowrap">
            "xs": 480px,<br>
            "sm": 620px,<br>
            "md": 760px,<br>
            "lg": 990px,<br>
            "xl": 1380px
          </code>
        </td>
        <td data-mobile-label="Desc">The breakpoints map some utilities use to build their styles.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$columns</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">12</code></td>
        <td data-mobile-label="Desc">The columns value to use for <code class="code">span</code> component sizing.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$display-properties</code></td>
        <td data-mobile-label="Default">
          <code class="code color-secondary text-nowrap">
            inline,<br>
            flex,<br>
            inline-flex,<br>
            block,<br>
            inline-block,<br>
            none
          </code>
        </td>
        <td data-mobile-label="Desc">Used to determine which display properties to output as utilities.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$spacing</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1rem</code></td>
        <td data-mobile-label="Desc">The default value used for the <code class="code">spacing</code> utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$spacing-map</code></td>
        <td data-mobile-label="Default">
          <code class="code color-secondary text-nowrap">
            "none": 0,<br>
            "xs": 0.25rem,<br>
            "sm": 0.5rem,<br>
            "md": 1rem,<br>
            "lg": 1.5rem,<br>
            "xl": 2rem
          </code>
        </td>
        <td data-mobile-label="Desc">Map of variations to output for the <code class="code">spacing</code> utility.</td>
      </tr>
    </tbody>
  </table>
</div>
