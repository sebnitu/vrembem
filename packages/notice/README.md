# Notice

A component for highlighting messages to the user.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fnotice.svg)](https://www.npmjs.com/package/%40vrembem%2Fnotice)

[Documentation](https://vrembem.com/packages/notice)

## Installation

```sh
npm install @vrembem/notice
```

### Styles

```scss
@use "@vrembem/notice";
```

### Markup

The most basic implementation component consists of the `notice` container element wrapping text content.

```html
<div class="notice">
  <p>...</p>
</div>
```

#### `notice__title`

Add a title to your notice using the `notice__title` element.

```html
<div class="notice">
  <h2 class="notice__title">...</h2>
  <p>...</p>
</div>
```

#### `notice + media`

For cases where a notice message should be displayed alongside an icon or image, try combining it with the media component.

```html
<div class="notice">
  <div class="media media_gap_sm">
    <div class="media__obj">
      ...
    </div>
    <div class="media__body">
      ...
    </div>
  </div>
</div>
```

#### `notice + icon-action`

When a notice needs to be dismissible, try adding the icon-action component along with some flex utilities.

```html
<div class="notice">
  <div class="flex flex-justify-between">
    <p>...</p>
    <button class="icon-action" aria-label="Close">
      <svg role="img" class="icon">...</svg>
    </button>
  </div>
</div>
```

> Dismissible JavaScript behavior is not provided.

## Modifiers

### `notice_state_[value]`

Adds styles for changing the look and feel of a notice to better reflect the urgency or status.

```html
<div class="notice notice_state_danger">
  <p>An error has occurred!</p>
</div>
```

#### Available Variations

- `notice_state_info`
- `notice_state_success`
- `notice_state_caution`
- `notice_state_danger`

## Customization

### Sass Variables

| Variable                 | Default                       | Description                                                                |
| ------------------------ | ----------------------------- | -------------------------------------------------------------------------- |
| `$prefix-block`          | `null`                        | String to prefix blocks with.                                              |
| `$prefix-element`        | `"__"`                        | String to prefix elements with.                                            |
| `$prefix-modifier`       | `"_"`                         | String to prefix modifiers with.                                           |
| `$prefix-modifier-value` | `"_"`                         | String to prefix modifier values with.                                     |
| `$gap`                   | `0.5em`                       | The default vertical gap spacing for elements inside the notice component. |
| `$padding`               | `1em`                         | Sets the padding property.                                                 |
| `$border`                | `null`                        | Sets the border property.                                                  |
| `$border-radius`         | `core.$border-radius`         | Sets the border-radius property.                                           |
| `$background`            | `core.$shade`                 | Sets the background property.                                              |
| `$box-shadow`            | `null`                        | Sets the box-shadow property.                                              |
| `$title-font-size`       | `core.$font-size-lg`          | Sets the font-size property of the `notice__title` element.                |
| `$title-font-weight`     | `core.$font-weight-semi-bold` | Sets the font-weight property of the `notice__title` element.              |
| `$title-line-height`     | `core.$line-height-lg`        | Sets the line-height property of the `notice__title` element.              |
