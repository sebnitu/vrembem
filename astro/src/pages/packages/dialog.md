---
layout: ../../layouts/Page.astro
title: Dialog
desc: "A component that facilitates a conversation between the system and the user. They often request information or an action from the user."
package: "@vrembem/dialog"
---

# Dialog

A component that facilitates a conversation between the system and the user. They often request information or an action from the user.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fdialog.svg)](https://www.npmjs.com/package/%40vrembem%2Fdialog)

[Documentation](https://vrembem.com/packages/dialog)

## Installation

```sh
npm install @vrembem/dialog
```

### Styles

```scss
@use "@vrembem/dialog";
```

### Markup

Dialog is a highly composable container component that comes with a variety of elements. The most basic implementation being `dialog` and a `dialog__body` element:

```html
<div class="dialog">
  <div class="dialog__body">
    ...
  </div>
</div>
```

#### `dialog__close`

Use the `dialog__close` element as a hook for providing users a way to dismiss dialogs arbitrarily. This can either be placed before the `dialog__body` element which will add appropriate padding, or inside the `dialog__header` element along side a `dialog__title`.

```html
<div class="dialog">
  <button class="dialog__close icon-action">
    <svg role="img" class="icon">...</svg>
  </button>
  <div class="dialog__body">
    ...
  </div>
</div>
```

#### `dialog__title`

Used for adding a title to the dialog.

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

#### `dialog__header + dialog__footer`

Used to separate distinct dialog sections for headers and footers. Typically the `dialog__header` element will contain the `dialog__title` and `dialog__close` elements while the `dialog__footer` contains a dialogs call to actions. It's also possible to include multiple `dialog__body` elements as needed.

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

## Customization

### Sass Variables

| Variable                 | Default                       | Description                                                                                         |
| ------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `$prefix-block`          | `null`                        | String to prefix blocks with.                                                                       |
| `$prefix-element`        | `"__"`                        | String to prefix elements with.                                                                     |
| `$prefix-modifier`       | `"_"`                         | String to prefix modifiers with.                                                                    |
| `$prefix-modifier-value` | `"_"`                         | String to prefix modifier values with.                                                              |
| `$z-index`               | `500`                         | Sets the z-index property.                                                                          |
| `$padding`               | `1em`                         | Sets the padding property.                                                                          |
| `$spacing`               | `0.5em`                       | Sets the horizontal spacing between elements in the `dialog__header` and `dialog__footer` elements. |
| `$background`            | `white`                       | Sets the background property.                                                                       |
| `$border`                | `null`                        | Sets the border property.                                                                           |
| `$sep-border`            | `core.$border`                | Sets the border property that separates dialog elements.                                            |
| `$border-radius`         | `core.$border-radius`         | Sets the border-radius property.                                                                    |
| `$box-shadow`            | `core.$box-shadow-4`          | Sets the box-shadow property.                                                                       |
| `$color`                 | `null`                        | Sets the color property.                                                                            |
| `$title-font-size`       | `core.$font-size-lg`          | Sets the font-size property on the `dialog__title` element.                                         |
| `$title-line-height`     | `core.$line-height-lg`        | Sets the line-height property on the `dialog__title` element.                                       |
| `$title-font-weight`     | `core.$font-weight-semi-bold` | Sets the font-weight property on the `dialog__title` element.                                       |
