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

{% include demo_open.html class_parent="spacing" %}
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

The default space is set using the spacing variable: `$spacing`:

<div class="demo">
<div class="demo__code" markdown="1">
```scss
$spacing: 1.5em !default;
```
</div>
</div>

## media_gap_[key]

{% include demo_open.html class_parent="spacing" %}
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

{% include demo_open.html class_parent="spacing" %}
<div class="media media_gap_xl">
  <div class="media__obj">
    {% include icon.html icon="settings" %}
  </div>
  <div class="media__body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_gap_xl">
  ...
</div>
```
{% include demo_close.html %}

The key is based on the spacing map: `$spacing-map`:

```scss
$spacing-map: (
  "0": 0,
  "xs": 0.5rem,
  "sm": 1rem,
  "md": 1.5rem,
  "lg": 2rem,
  "xl": 3rem
) !default;
```

## media_reverse

{% include demo_open.html class_parent="spacing" %}
<div class="media media_reverse">
  <img class="media__obj radius" src="https://picsum.photos/90/90/?12" width="90" height="90" />
  <div class="media__body">
    <h2 class="h5">Media Content Title</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
<div class="media media_reverse">
  <div class="media__obj">
    {% include icon.html icon="settings" %}
  </div>
  <div class="media__body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_reverse">
  ...
</div>
```
{% include demo_close.html %}

## media_stack_[bp]

{% include demo_open.html class_parent="spacing" %}
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

{% include demo_open.html class_parent="spacing" %}
<div class="media media_reverse media_gap_xl media_stack_lg">
  <img class="media__obj radius" src="https://picsum.photos/90/90/?15" width="90" height="90" />
  <div class="media__body">
    <h2 class="h5">Media Content Title</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_reverse media_gap_xl media_stack_lg">
  ...
</div>
```
{% include demo_close.html %}

Stack breakpoints key is based on the core breakpoints map: `$breakpoints`:

```scss
$breakpoints: (
  "xs": 480px,
  "sm": 620px,
  "md": 760px,
  "lg": 990px,
  "xl": 1380px
) !default;
```
