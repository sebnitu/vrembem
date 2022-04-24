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

## Intro <!-- omit in toc -->

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

### Global Variables <!-- omit in toc -->

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$gap</code> &rarr; <code class="code color-secondary">1em</code></td>
        <td data-mobile-label="Desc">Used as the default spacing for <a class="link" href="#margin"><code class="code">margin</code></a> and <a class="link" href="#padding"><code class="code">padding</code></a> utilities.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap-map</code></td>
        <td data-mobile-label="Default">
          <a class="link" href="#gap-map"><code class="code color-secondary text-nowrap">core.$gap-map</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">Used to build gap variants for <a class="link" href="#margin"><code class="code">margin</code></a> and <a class="link" href="#padding"><code class="code">padding</code></a> utilities.</td>
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

### $gap-map

Used to build gap variants for [`flex-gap`](#flex-gap-key), [`flex-gap-x`](#flex-gap-x-key), [`flex-gap-y`](#flex-gap-y-key), [`gap-x`](#gap-x-key), [`gap-y`](#gap-y-key), [`margin`](#margin) and [`padding`](#padding) utilities.

```scss
// Inherited from: core.$gap-map
$gap-map: (
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

- [background](#background)
- [border](#border)
- [border-radius](#border-radius)
- [box-shadow](#box-shadow)
- [color](#color)
- [display](#display)
- [flex](#flex)
- [flex-gap-[key]](#flex-gap-key)
- [flex-gap-x-[key]](#flex-gap-x-key)
- [flex-gap-y-[key]](#flex-gap-y-key)
- [font](#font)
- [gap-x-[key]](#gap-x-key)
- [gap-y-[key]](#gap-y-key)
- [margin](#margin)
- [max-width](#max-width)
- [padding](#padding)
- [position](#position)
- [text](#text)

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

Also available are utility classes for the `background-clip-[value]` property.

```html
<div class="background-clip-border"></div>
<div class="background-clip-content"></div>
<div class="background-clip-padding"></div>
```

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

### border-none <!-- omit in toc -->

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

### border-color <!-- omit in toc -->

Add border color utilities with light, dark and darker variants. Also available is the `border-color-transparent` utility which sets the border-color property to transparent.

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

## border-radius

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

### radius-circle <!-- omit in toc -->

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

### radius-square <!-- omit in toc -->

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

## box-shadow

Applies different levels of elevation through box-shadow styles.

{% include demo_open.html class_grid="grid_stack" %}
<div class="padding-lg background-shade radius">
  <div class="swatch-group">
    <div class="swatch background-white shadow"></div>
    <div class="swatch background-white shadow-flat"></div>
    <div class="swatch background-white shadow-1"></div>
    <div class="swatch background-white shadow-2"></div>
    <div class="swatch background-white shadow-3"></div>
    <div class="swatch background-white shadow-4"></div>
    <div class="swatch background-white shadow-5"></div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="shadow"></div>
<div class="shadow-flat"></div>
<div class="shadow-1"></div>
<div class="shadow-2"></div>
<div class="shadow-3"></div>
<div class="shadow-4"></div>
<div class="shadow-5"></div>
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
    <div class="notice notice_state_info flex flex-align-center">
      {% include icon.html icon="eye" %}
    </div>
  </div>
  <div class="grid__item">
    <div class="notice notice_state_success display-block display-none-xs">
      <p>Small Mobile</p>
    </div>
    <div class="notice notice_state_success display-none display-block-xs display-none-sm">
      <p>Small Mobile &rarr; Mobile</p>
    </div>
    <div class="notice notice_state_success display-none display-block-sm display-none-md">
      <p>Mobile &rarr; Tablet</p>
    </div>
    <div class="notice notice_state_success display-none display-block-md display-none-lg">
      <p>Tablet &rarr; Desktop</p>
    </div>
    <div class="notice notice_state_success display-none display-block-lg display-none-xl">
      <p>Desktop &rarr; Large Desktop</p>
    </div>
    <div class="notice notice_state_success display-none display-block-xl">
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

### $display-properties <!-- omit in toc -->

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

The flex utility is a great way to adjust individual flex properties on components that use flex layout. Flex utilities fall under two categories: 1) those that are appleid to a flexbox container and 2) those that are applied to flexbox children elements directly. These are some available flex property based utilities:

**Applied to flex containers**

- `flex` & `flex-inline` - Sets the display flex or flex-inline property.
- `flex-direction-[key]` - Applies a flex direction property with the provided key as the value.
- `flex-nowrap` - Applies the flex-wrap property with the value of `nowrap`.
- `flex-wrap` - Applies the flex-wrap property with the value of `wrap`.
- `flex-wrap-reverse` - Applies the flex-wrap property with the value of `wrap-reverse`.
- `flex-justify-[key]` - Applies the justify-content property with the provided key as the value.
- `flex-align-[key]` - Applies the align-items property with the provided key as the value.
- `flex-items-[key]` - Gives all direct children the flex property to either share the container space equally (`equal`) or keep their content's width (`auto`).

**Applied to flex children elements**

- `flex-order-[key]` - Applies the order property with the provided key as the value.
- `flex-grow-[key]` - Applies the flex-grow property with the provided key as the value.
- `flex-shrink-[key]` - Applies the flex-shrink property with the provided key as the value.
- `flex-basis-[key]` - Applies the flex-basis property with the provided key (`0` || `auto`) as the value.
- `flex-self-[key]` - Applies the align-self property with the provided key as the value.

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
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$flex-order-count</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">12</code></td>
        <td data-mobile-label="Desc">Number of flex order utilities to output starting from 1.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$flex-grow-count</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">6</code></td>
        <td data-mobile-label="Desc">Number of flex-grow utilities to output starting from 0.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$flex-shrink-count</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">6</code></td>
        <td data-mobile-label="Desc">Number of flex-shrink utilities to output starting from 0.</td>
      </tr>
    </tbody>
  </table>
</div>

### flex-direction-[value] <!-- omit in toc -->

Applies a flex direction property with the provided key value.

- `flex-direction-row`
- `flex-direction-row-reverse`
- `flex-direction-column`
- `flex-direction-column-reverse`

{% include demo_open.html %}
<div class="level flex-direction-row">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-direction-row">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="level flex-direction-row-reverse">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-direction-row-reverse">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="flex flex-gap-sm flex-direction-column">
  <div class="box">1</div>
  <div class="box">2</div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-direction-column">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="flex flex-gap-sm flex-direction-column-reverse">
  <div class="box">1</div>
  <div class="box">2</div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-direction-column-reverse">...</div>
```
{% include demo_close.html %}

### flex-wrap <!-- omit in toc -->

Applies various flex-wrap property values.

- `flex-nowrap` - Applies the flex-wrap property with the value of `nowrap`.
- `flex-wrap` - Applies the flex-wrap property with the value of `wrap`.
- `flex-wrap-reverse` - Applies the flex-wrap property with the value of `wrap-reverse`.

{% include demo_open.html %}
<div class="scroll-box">
  <div class="flex flex-gap-sm flex-nowrap">
    {% for i in (1..10) %}
      <div class="box">{{ i }}</div>
    {% endfor %}
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-nowrap">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="scroll-box">
  <div class="flex flex-gap-sm flex-wrap">
    {% for i in (1..10) %}
      <div class="box">{{ i }}</div>
    {% endfor %}
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-wrap">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="scroll-box">
  <div class="flex flex-gap-sm flex-wrap-reverse">
    {% for i in (1..10) %}
      <div class="box">{{ i }}</div>
    {% endfor %}
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-wrap-reverse">...</div>
```
{% include demo_close.html %}

### flex-justify-[value] <!-- omit in toc -->

Applies the justify-content property with the provided key as the value.

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

### flex-align-[value] <!-- omit in toc -->

Applies the align-items property with the provided key as the value.

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

### flex-items-[key] <!-- omit in toc -->

Gives all direct children the flex property to either share the container space equally (`equal`) or keep their content's width (`auto`).

- `flex-items-equal` - Applies the flex property children elements with the value of `1 1 0` to share the container space equally.
- `flex-items-auto` - Applies the flex property children elements with the value of `0 0 auto` to keep their content's width.

{% include demo_open.html %}
<div class="flex flex-gap-sm flex-items-equal">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-items-equal">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="flex flex-gap-sm flex-items-auto">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>
{% include demo_switch.html %}
```html
<div class="flex-items-auto">...</div>
```
{% include demo_close.html %}

## flex-gap-[key]

The flex-gap module adds both horizontal and vertical spacing between an element's children. It also adds negative top and left margins to the element it's applied to which may require an anonymous `<div>` if additional margins are needed. Flex-gap keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `flex-gap`
- `flex-gap-[key]`

{% include demo_open.html %}
<div class="flex flex-wrap flex-gap">
  {% for i in (1..10) %}
    <div class="box">...</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<!-- Using the default gap class -->
<div class="flex-gap">...</div>

<!-- Using the gap class with variant key -->
<div class="flex-gap-none">...</div>
<div class="flex-gap-xs">...</div>
<div class="flex-gap-sm">...</div>
<div class="flex-gap-md">...</div>
<div class="flex-gap-lg">...</div>
<div class="flex-gap-xl">...</div>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-flex-gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-flex-gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"flex-gap"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the flex-gap utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## flex-gap-x-[key]

Adds flex-gap spacing horizontally between an element's children using margin-left. Flex-gap keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `flex-gap-x`
- `flex-gap-x-[key]`

{% include demo_open.html %}
<div class="flex flex-wrap flex-gap-x">
  {% for i in (1..10) %}
    <div class="box">...</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<!-- Using the default gap class -->
<div class="flex-gap-x">...</div>

<!-- Using the gap class with variant key -->
<div class="flex-gap-x-none">...</div>
<div class="flex-gap-x-xs">...</div>
<div class="flex-gap-x-sm">...</div>
<div class="flex-gap-x-md">...</div>
<div class="flex-gap-x-lg">...</div>
<div class="flex-gap-x-xl">...</div>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-flex-gap-x</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-flex-gap-x</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"flex-gap-x"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the flex-gap-x utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## flex-gap-y-[key]

Adds flex-gap spacing vertically between an element's children using margin-top. Flex-gap keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `flex-gap-y`
- `flex-gap-y-[key]`

{% include demo_open.html %}
<div class="flex flex-wrap flex-gap-y">
  {% for i in (1..10) %}
    <div class="box">...</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<!-- Using the default gap class -->
<div class="flex-gap-y">...</div>

<!-- Using the gap class with variant key -->
<div class="flex-gap-y-none">...</div>
<div class="flex-gap-y-xs">...</div>
<div class="flex-gap-y-sm">...</div>
<div class="flex-gap-y-md">...</div>
<div class="flex-gap-y-lg">...</div>
<div class="flex-gap-y-xl">...</div>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-flex-gap-y</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-flex-gap-y</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"flex-gap-y"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the flex-gap-y utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## font

A utility for adjusting various font styles.

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-font</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-font</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"font"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the font utility.</td>
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
        <td><code class="code text-nowrap">font-family-sans</code></td>
        <td><p class="font-family-sans">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-family-serif</code></td>
        <td><p class="font-family-serif">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-family-mono</code></td>
        <td><p class="font-family-mono">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-size-base</code></td>
        <td><p class="font-size-base">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-size-sm</code></td>
        <td><p class="font-size-sm">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-size-lg</code></td>
        <td><p class="font-size-lg">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-leading-base</code></td>
        <td><p class="font-leading-base">Lorem ipsum dolor sit amet<br>consectetur adipiscing elit.</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-leading-sm</code></td>
        <td><p class="font-leading-sm">Lorem ipsum dolor sit amet<br>consectetur adipiscing elit.</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-leading-lg</code></td>
        <td><p class="font-leading-lg">Lorem ipsum dolor sit amet<br>consectetur adipiscing elit.</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-kerning-0</code></td>
        <td><p class="font-kerning-0">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-kerning-1</code></td>
        <td><p class="font-kerning-1">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-kerning-2</code></td>
        <td><p class="font-kerning-2">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-weight-normal</code></td>
        <td><p class="font-weight-normal">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-weight-medium</code></td>
        <td><p class="font-weight-medium">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-weight-semibold</code></td>
        <td><p class="font-weight-semibold">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-weight-bold</code></td>
        <td><p class="font-weight-bold">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-weight-lighter</code></td>
        <td><p class="font-weight-lighter">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-weight-bolder</code></td>
        <td><p class="font-weight-bolder">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-style-normal</code></td>
        <td><p class="font-style-normal">Font example...</p></td>
      </tr>
      <tr>
        <td><code class="code text-nowrap">font-style-italic</code></td>
        <td><p class="font-style-italic">Font example...</p></td>
      </tr>
    </tbody>
  </table>
</div>

## gap-x-[key]

Adds gap spacing horizontally using margin-left and the `> * + *` selector. Gap-x keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `gap-x`
- `gap-x-[key]`

{% include demo_open.html %}
<div class="flex flex-items-equal gap-x">
  {% for i in (1..4) %}
    <div class="box">...</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<!-- Using the default gap-x class -->
<div class="gap-x">...</div>

<!-- Using the gap-x class with variant key -->
<div class="gap-x-none">...</div>
<div class="gap-x-xs">...</div>
<div class="gap-x-sm">...</div>
<div class="gap-x-md">...</div>
<div class="gap-x-lg">...</div>
<div class="gap-x-xl">...</div>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-gap-x</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-gap-x</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"gap-x"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the gap-x utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## gap-y-[key]

Adds gap spacing vertically using margin-top and the `> * + *` selector. Gap-y keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `gap-y`
- `gap-y-[key]`

{% include demo_open.html %}
<div class="gap-y">
  {% for i in (1..3) %}
    <div class="box">...</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<!-- Using the default gap-y class -->
<div class="gap-y">...</div>

<!-- Using the gap-y class with variant key -->
<div class="gap-y-none">...</div>
<div class="gap-y-xs">...</div>
<div class="gap-y-sm">...</div>
<div class="gap-y-md">...</div>
<div class="gap-y-lg">...</div>
<div class="gap-y-xl">...</div>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-gap-y</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-gap-y</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"gap-y"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the gap-y utility.</td>
      </tr>
    </tbody>
  </table>
</div>

## margin

Add margin to an element using directional and size variations. Margin size and spacing values are generated from [`$gap-map`](#gap-map) variable map.

- `margin` - Adds margins on all sides.
- `margin-[direction]` - Adds default margin to a specific side.
- `margin-[size]` - Adds margins on all sides with a specific size key.
- `margin-[direction]-[size]` - Adds margins on a specific side and size.
- `margin-x-[size]` - Adds left and right margins with a specific size key.
- `margin-y-[size]` - Adds top and bottom margins with a specific size key.
- `margin-auto` - Sets margins to auto.
- `margin-[direction]-auto` - Sets margins auto to a specific side.
- `margin-x-auto` - Sets left and right margins to auto.
- `margin-y-auto` - Sets top and bottom margins to auto.

<div>
  <div class="grid grid_stack_xs">
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[direction]</code>
        </div>
        <div class="card__body gap-y">
          <p><code>top</code></p>
          <p><code>right</code></p>
          <p><code>bottom</code></p>
          <p><code>left</code></p>
          <p><code>x <span class="color-subtle">left &amp; right</span></code></p>
          <p><code>y <span class="color-subtle">top &amp; bottom</span></code></p>
        </div>
      </div>
    </div>
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[size]</code>
        </div>
        <div class="card__body gap-y">
          <p><code>none <span class="color-subtle">...0</span></code></p>
          <p><code>xs <span class="color-subtle">...0.25em</span></code></p>
          <p><code>sm <span class="color-subtle">...0.5em</span></code></p>
          <p><code>md <span class="color-subtle">...1em</span></code></p>
          <p><code>lg <span class="color-subtle">...1.5em</span></code></p>
          <p><code>xl <span class="color-subtle">...2em</span></code></p>
          <p><code>auto <span class="color-subtle">...auto</span></code></p>
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

## max-width

Set the max-width property on an element using values mapped from scale keys. Scale variations are built using the [`$max-width-scale`](#max-width-scale) variable map.

- `max-width` - Sets the max-width propertry to the default value set in `$max-width`.
- `max-width-none` - Sets the max-width property to `none`.
- `max-width-[key]` - Sets the max-width property to the value of a specific scale key.
- `max-width-full` - Sets the max-width property to `100%`.

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"max-width"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the max-width utility.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">70rem</code></td>
        <td data-mobile-label="Desc">The default value used to set max-width.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$max-width-scale</code></td>
        <td data-mobile-label="Default"><a class="link" href="#max-width-scale">Sass map ref &darr;</a></td>
        <td data-mobile-label="Desc">Map used to build max-width utility variants.</td>
      </tr>
    </tbody>
  </table>
</div>

### $max-width-scale<!-- omit in toc -->

A scale map used for building max-width utility variations using the key as variant name.

```scss
$max-width-scale: (
  'none': none,
  'xs': 45rem,
  'sm': 60rem,
  'md': 70rem,
  'lg': 80rem,
  'xl': 90rem,
  'full': 100%
) !default;
```

## padding

Add padding to an element using directional and size variations. Padding size and spacing values are generated from [`$gap-map`](#gap-map) variable map.

- `padding` - Adds default padding on all sides.
- `padding-[direction]` - Adds default padding to a specific side.
- `padding-[size]` - Adds padding on all sides with a specific size key.
- `padding-[direction]-[size]` - Adds padding on a specific side and size.
- `padding-x-[size]` - Sets left and right padding to a specific size key.
- `padding-y-[size]` - Sets top and bottom padding to a specific size key.

<div>
  <div class="grid grid_stack_xs">
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[direction]</code>
        </div>
        <div class="card__body gap-y">
          <p><code>top</code></p>
          <p><code>right</code></p>
          <p><code>bottom</code></p>
          <p><code>left</code></p>
          <p><code>x <span class="color-subtle">left &amp; right</span></code></p>
          <p><code>y <span class="color-subtle">top &amp; bottom</span></code></p>
        </div>
      </div>
    </div>
    <div class="grid__item grid__item_fill">
      <div class="card">
        <div class="card__header">
          <code class="code">[size]</code>
        </div>
        <div class="card__body gap-y">
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

## position

A utility for setting the position CSS property.

- `position-absolute` - Sets the position property to absolute.
- `position-fixed` - Sets the position property to fixed.
- `position-relative` - Sets the position property to relative.
- `position-static` - Sets the position property to static.
- `position-sticky` - Sets the position property to sticky.

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$output-position</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$output</code> &rarr; <code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the output of this module.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-position</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"position"</code></td>
        <td data-mobile-label="Desc">String to use for the class name of the position utility.</td>
      </tr>
    </tbody>
  </table>
</div>

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

### text-overflow-ellipsis <!-- omit in toc -->

Adds ellipsis styles to an element that will display an ellipsis (...) for text that would otherwise wrap.

<div class="border radius padding text-overflow-ellipsis">Text example: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet interdum elit, non blandit arcu luctus quis. Duis mattis et massa a congue.</div>

```html
<div class="text-overflow-ellipsis">...<div>
```
