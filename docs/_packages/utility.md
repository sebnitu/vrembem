---
layout: article
title: Utility
description: "The utility component provides a set of atomic classes that specialize in a single function."
package: "@vrembem/utility"
category: core
usage:
  npm: true
  scss: true
---

## Intro

Once loaded, the utility component provides a number of classes that can be used independently or to supplement other loaded components.

```html
<!-- Using utility classes independently -->
<div class="padding background-shade border radius">
  <p class="text-bold text-align-center">...</p>
</div>

<!-- Using utility classes with other components -->
<div class="grid flex-justify-center">
  <div class="grid__item span-auto">...</div>
  <div class="grid__item span-auto">...</div>
</div>
```

Each utility has a corresponding `$output-[module]` and `$class-[module]` variable that determines whether or not the module is output and it's class name. Output variable inherits their default value from `$output`.

```scss
// Will disable the output of the color module
@use "@vrembem/utility" with (
  $output-color: false
);

// Will disable all modules, but enables the color module
@use "@vrembem/utility" with (
  $output: false,
  $output-color: true
);
```

### Global Variables

Setting these variables will apply to all utility modules.

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
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">String to prefix all utility classes with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$output</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">true</code></td>
        <td data-mobile-label="Desc">Toggles the default output of all modules.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$breakpoints</code></td>
        <td data-mobile-label="Default">
          <a class="link" href="#breakpoints"><code class="code color-secondary text-nowrap">core.$breakpoints</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">A map of breakpoints used by utilities that provide breakpoint specific variations such as the <a class="link" href="#display"><code class="code">display</code></a> and <a class="link" href="#span"><code class="code">span</code></a> utilities.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$spacing</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$spacing</code> &rarr; <code class="code color-secondary">1em</code></td>
        <td data-mobile-label="Desc">Used as the default spacing for <a class="link" href="#margin"><code class="code">margin</code></a> and <a class="link" href="#padding"><code class="code">padding</code></a> utilities.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$spacing-map</code></td>
        <td data-mobile-label="Default">
          <a class="link" href="#spacing-map"><code class="code color-secondary text-nowrap">core.$spacing-map</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">Used to build spacing variants for <a class="link" href="#margin"><code class="code">margin</code></a> and <a class="link" href="#padding"><code class="code">padding</code></a> utilities.</td>
      </tr>
    </tbody>
  </table>
</div>

### $breakpoints

A map of breakpoints used by utilities that provide breakpoint specific variations such as the [`display`](#display) and [`span`](#span) utilities.

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

### $spacing-map

Used to build spacing variants for [`margin`](#margin) and [`padding`](#padding) utilities.

```scss
// Inherited from: core.$spacing-map
$spacing-map: (
  "none": 0,
  "xs": 0.25em,
  "sm": 0.5em,
  "md": 1em,
  "lg": 1.5em,
  "xl": 2em
) !default;
```

### Modules

The utility component consists of a number of modules with their own set of specific customizable class and output variables.

- [`background`](#background)
- [`border`](#border)
- [`radius`](#radius)
- [`elevate`](#elevate)
- [`color`](#color)
- [`display`](#display)
- [`flex`](#flex)
- [`margin`](#margin)
- [`padding`](#padding)
- [`span`](#span)
- [`text`](#text)

## background

Applies background color property. Most options include light, lighter, dark and darker variants.

{% include demo_open.html class_grid="grid_stack" %}
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"background"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the background utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## border

Applies border property with optional sides variants.

{% include demo_open.html class_grid="grid_stack" %}
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"border"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the border utility.</td>
      </tr>
    </tbody>
  </table>
</div>

### border-none

Remove border styles with `border-none` utilities and optional side variants.

{% include demo_open.html class_grid="grid_stack" %}
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

### border-color

Add border color utilities with light, dark and darker variants.

{% include demo_open.html class_grid="grid_stack" %}
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

{% include demo_open.html class_grid="grid_stack" %}
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

Applies border-radius styles with optional corner variants. The value used by the radius utility is pulled from the `core.$border-radius` variable.

{% include demo_open.html class_grid="grid_stack" %}
<div class="swatch-group">
  <div class="swatch background-secondary radius"></div>

  <div class="swatch background-secondary radius-top"></div>
  <div class="swatch background-secondary radius-right"></div>
  <div class="swatch background-secondary radius-bottom"></div>
  <div class="swatch background-secondary radius-left"></div>

  <div class="swatch background-secondary radius-top-left"></div>
  <div class="swatch background-secondary radius-top-right"></div>
  <div class="swatch background-secondary radius-bottom-right"></div>
  <div class="swatch background-secondary radius-bottom-left"></div>
</div>
{% include demo_switch.html %}
```html
<!-- Applied to all corners -->
<div class="radius"></div>

<!-- Applied to all corners on a specific side -->
<div class="radius-top"></div>
<div class="radius-right"></div>
<div class="radius-bottom"></div>
<div class="radius-left"></div>

<!-- Applied to specific corners -->
<div class="radius-top-left"></div>
<div class="radius-top-right"></div>
<div class="radius-bottom-right"></div>
<div class="radius-bottom-left"></div>
```
{% include demo_close.html %}

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"radius"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the border-radius utility.</td>
      </tr>
    </tbody>
  </table>
</div>

### radius-circle

Applies the maximum value to border-radius with optional corner variants. The value used by radius-circle utility is pulled from the `core.$border-radius-circle` variable.

{% include demo_open.html class_grid="grid_stack" %}
<div class="swatch-group">
  <div class="swatch background-secondary radius-circle"></div>

  <div class="swatch background-secondary radius-circle-top"></div>
  <div class="swatch background-secondary radius-circle-right"></div>
  <div class="swatch background-secondary radius-circle-bottom"></div>
  <div class="swatch background-secondary radius-circle-left"></div>

  <div class="swatch background-secondary radius-circle-top-left"></div>
  <div class="swatch background-secondary radius-circle-top-right"></div>
  <div class="swatch background-secondary radius-circle-bottom-right"></div>
  <div class="swatch background-secondary radius-circle-bottom-left"></div>
</div>
{% include demo_switch.html %}
```html
<!-- Applied to all corners -->
<div class="radius-circle"></div>

<!-- Applied to all corners on a specific side -->
<div class="radius-circle-top"></div>
<div class="radius-circle-right"></div>
<div class="radius-circle-bottom"></div>
<div class="radius-circle-left"></div>

<!-- Applied to specific corners -->
<div class="radius-circle-top-left"></div>
<div class="radius-circle-top-right"></div>
<div class="radius-circle-bottom-right"></div>
<div class="radius-circle-bottom-left"></div>
```
{% include demo_close.html %}

### radius-square

Removes border-radius by setting it's value to `0` with optional corner variants.

{% include demo_open.html class_grid="grid_stack" %}
<div class="swatch-group">
  <div class="swatch background-secondary radius-circle radius-square"></div>

  <div class="swatch background-secondary radius-circle radius-square-top"></div>
  <div class="swatch background-secondary radius-circle radius-square-right"></div>
  <div class="swatch background-secondary radius-circle radius-square-bottom"></div>
  <div class="swatch background-secondary radius-circle radius-square-left"></div>

  <div class="swatch background-secondary radius-circle radius-square-top-left"></div>
  <div class="swatch background-secondary radius-circle radius-square-top-right"></div>
  <div class="swatch background-secondary radius-circle radius-square-bottom-right"></div>
  <div class="swatch background-secondary radius-circle radius-square-bottom-left"></div>
</div>
{% include demo_switch.html %}
```html
<!-- Applied to all corners -->
<div class="radius-square"></div>

<!-- Applied to all corners on a specific side -->
<div class="radius-square-top"></div>
<div class="radius-square-right"></div>
<div class="radius-square-bottom"></div>
<div class="radius-square-left"></div>

<!-- Applied to specific corners -->
<div class="radius-square-top-left"></div>
<div class="radius-square-top-right"></div>
<div class="radius-square-bottom-right"></div>
<div class="radius-square-bottom-left"></div>
```
{% include demo_close.html %}

## elevate

Applies different levels of elevation through box-shadow styles.

{% include demo_open.html class_grid="grid_stack" %}
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"elevate"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the box-shadow utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## color

Applies text color property. Most options include light, lighter, dark and darker variants.

{% include demo_open.html class_grid="grid_stack" %}
<div class="grid">
  <div class="grid__item">
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
  </div>
  <div class="grid__item">
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"color"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the color utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## display

Display utilities allow you to toggle the display property on an element with an optional breakpoint conditional.

```
.display-[property]-[breakpoint]
```

<div>
  <div class="grid grid_stack_xs">
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

{% include demo_open.html class_grid="grid_stack" %}
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
  <p>Small Mobile => Mobile</p>
</div>

<div class="display-none display-block-sm display-none-md">
  <p>Mobile => Tablet</p>
</div>

<div class="display-none display-block-md display-none-lg">
  <p>Tablet => Desktop</p>
</div>

<div class="display-none display-block-lg display-none-xl">
  <p>Desktop => Large Desktop</p>
</div>

<div class="display-none display-block-xl">
  <p>Large Desktop</p>
</div>
```
{% include demo_close.html %}

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-display</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-display</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"display"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the display utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$display-properties</code></td>
        <td data-mobile-label="Default">
          <a class="link" href="#display-properties"><code class="code color-secondary text-nowrap">Sass Map</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">A list of display properties to output along with their breakpoint variants.</td>
      </tr>
    </tbody>
  </table>
</div>

### $display-properties

A list of display properties to output along with their breakpoint variants.

```scss
$display-properties: (
  inline,
  flex,
  inline-flex,
  block,
  inline-block,
  none
) !default;
```

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-flex</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-flex</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"flex"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the flex utility.</td>
      </tr>
    </tbody>
  </table>
</div>

### flex-align-[value]

Adjust the `align-items` property of grid columns using the `flex-align-[value]` utility. Available values are:

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

Add margin to an element using directional and size modifiers. Margin size and spacing values are generated from [`$spacing-map`](#spacing-map) variable map.

- `margin` - Adds margins on all sides.
- `margin-[size]` - Adds margins on all sides with a specific size key.
- `margin-[direction]-[size]` - Adds margins on a specific size and with size key.
- `margin-x-[size]` - Adds left and right margins with a specific size key.
- `margin-y-[size]` - Adds top and bottom margins with a specific size key.
- `margin-auto` - Sets left and right margins to auto.
- `margin-left-auto` - Sets left margin to auto.
- `margin-right-auto` - Sets right margin to auto.

<div>
  <div class="grid grid_stack_xs">
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
          <p><code>none <span class="color-subtle">...0</span></code></p>
          <p><code>xs <span class="color-subtle">...0.25em</span></code></p>
          <p><code>sm <span class="color-subtle">...0.5em</span></code></p>
          <p><code>md <span class="color-subtle">...1em</span></code></p>
          <p><code>lg <span class="color-subtle">...1.5em</span></code></p>
          <p><code>xl <span class="color-subtle">...2em</span></code></p>
        </div>
      </div>
    </div>
  </div>
</div>

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-margin</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-margin</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"margin"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the margin utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## padding

Add padding to an element using directional and size modifiers. Padding size and spacing values are generated from [`$spacing-map`](#spacing-map) variable map.

- `padding` - Adds padding on all sides.
- `padding-[size]` - Adds padding on all sides with a specific size key.
- `padding-[direction]-[size]` - Adds padding on a specific size and with size key.
- `padding-x-[size]` - Adds left and right padding with a specific size key.
- `padding-y-[size]` - Adds top and bottom padding with a specific size key.

<div>
  <div class="grid grid_stack_xs">
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
          <p><code>none <span class="color-subtle">...0</span></code></p>
          <p><code>xs <span class="color-subtle">...0.25em</span></code></p>
          <p><code>sm <span class="color-subtle">...0.5em</span></code></p>
          <p><code>md <span class="color-subtle">...1em</span></code></p>
          <p><code>lg <span class="color-subtle">...1.5em</span></code></p>
          <p><code>xl <span class="color-subtle">...2em</span></code></p>
        </div>
      </div>
    </div>
  </div>
</div>

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"padding"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the padding utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## span

Set the width, max-width and flex based on a column set using the `span` utility. Span widths are based on a column set based on the `$span-columns` variable. There are a number of options available:

* `span-[col]` - Sets the number of columns an element should span.
* `span-[col]-[breakpoint]` - Sets the number of columns an element should span based on a breakpoint condition.
* `span-auto` - Sets an elements width to `auto`.
* `span-full` - Sets an elements width to `100%`.

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
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-span</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"span"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the span utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$span-columns</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">12</code></td>
        <td data-mobile-label="Desc">The columns value to use when building span variants.</td>
      </tr>
    </tbody>
  </table>
</div>

### span-[col]

Sets the number of columns an element should span. The total number of columns is set in the `$span-columns` variable.

{% include demo_open.html class_grid="grid_stack" %}
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

Sets the number of columns an element should span based on a breakpoint conditon. The total number of columns is set in the `$span-columns` variable. Breakpoint keys are built from the [`$breakpoints`](#breakpoints) variable map.

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

## text

A utility for adjusting various text styles.

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-text</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-text</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"text"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the text utility.</td>
      </tr>
    </tbody>
  </table>
</div>

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
    </tbody>
  </table>
</div>

### text-overflow-ellipsis

Adds ellipsis styles to an element that will display an ellipsis (...) for text that would otherwise wrap.

<div class="border radius padding text-overflow-ellipsis">Text example: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet interdum elit, non blandit arcu luctus quis. Duis mattis et massa a congue.</div>

```html
<div class="text-overflow-ellipsis">...<div>
```
