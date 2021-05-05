---
layout: article
title: Dialog
description: "A component that facilitates a conversation between the system and the user. They often request information or an action from the user."
package: "@vrembem/dialog"
category: compound
usage:
  npm: true
  scss: true
---

## dialog

Dialog is a highly composable container component that comes with a variety of elements. The most basic implementation being `dialog` and a `dialog__body` element:

{% include demo_open.html %}
<div class="dialog">
  <div class="dialog__body">
    <p>This is some dialog content...</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <div class="dialog__body">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## dialog__close

Use the `dialog__close` element as a hook for providing users a way to dismiss dialogs arbitrarily. This can either be placed before the `dialog__body` element which will add appropriate padding, or inside the `dialog__header` element along side a `dialog__title`.

{% include demo_open.html %}
<div class="dialog">
  <button class="dialog__close icon-action">
    {% include icon.html icon="x" %}
  </button>
  <div class="dialog__body">
    <p>This is some dialog content...</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <button class="dialog__close icon-action">
    <svg role="img" class="icon">
      <use xlink:href="#x"></use>
    </svg>
  </button>
  <div class="dialog__body">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## dialog__title

Used for adding a title to the dialog.

{% include demo_open.html %}
<div class="dialog">
  <button class="dialog__close icon-action">
    {% include icon.html icon="x" %}
  </button>
  <div class="dialog__body gap-y">
    <h2 class="dialog__title">Dialog Title</h2>
    <p>This is some dialog content...</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <button class="dialog__close">
    ...
  </button>
  <div class="dialog__body">
    <h2 class="dialog__title">...</h2>
    <p>...</p>
  </div>
</div>
```
{% include demo_close.html %}

## dialog__header + dialog__footer

Used to separate distinct dialog sections for headers and footers. Typically the `dialog__header` element will contain the `dialog__title` and `dialog__close` elements while the `dialog__footer` contains a dialogs call to actions. It's also possible to include multiple `dialog__body` elements as needed.

{% include demo_open.html %}
<div class="dialog">
  <div class="dialog__header">
    <h2 class="dialog__title">Dialog Title</h2>
    <button class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
  </div>
  <div class="dialog__body">
    <p>This is some dialog content...</p>
  </div>
  <div class="dialog__footer">
    <button class="button button_color_primary">Accept</button>
    <button class="button">Cancel</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <div class="dialog__header">
    ...
  </div>
  <div class="dialog__body">
    ...
  </div>
  <div class="dialog__footer">
    ...
  </div>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$zindex</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">500</code></td>
        <td data-mobile-label="Desc">Sets the z-index property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1em</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$spacing</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.5em</code></td>
        <td data-mobile-label="Desc">Sets the horizontal spacing between elements in the <code class="code">dialog__header</code> and <code class="code">dialog__footer</code> elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$sep-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border</code></td>
        <td data-mobile-label="Desc">Sets the border property that separates dialog elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$box-shadow-16dp</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <!-- dialog__title -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the font-size property on the <code class="code">dialog__title</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height-lg</code></td>
        <td data-mobile-label="Desc">Sets the line-height property on the <code class="code">dialog__title</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-font-weight</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.font-weight("semi-bold")</code></td>
        <td data-mobile-label="Desc">Sets the font-weight property on the <code class="code">dialog__title</code> element.</td>
      </tr>
    </tbody>
  </table>
</div>
