# Icon-action

A component for displaying simple action buttons using icons.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Ficon-action.svg)](https://www.npmjs.com/package/%40vrembem%2Ficon-action)

[Documentation](https://vrembem.com/packages/icon-action)

## Installation

```sh
npm install @vrembem/icon-action
```

### Styles

```scss
@use "@vrembem/icon-action";
```

### JavaScript

```js
import icon-action from '@vrembem/icon-action';
const icon-action = new icon-action({ autoInit: true });
```

### Markup

The icon-action component consists of two parts, the `icon-action` and it's child `icon` component. Because icon-actions only contain an icon as its content, it's important to add an `aria-label` attribute with a label of what the action does for accessibility.

```html
<button class="icon-action" aria-label="Close button">
  <svg role="img" class="icon">
    <!-- SVG markup or link ID goes here... -->
  </svg>
</button>
```

## Modifiers

### `icon-action_invert`

...

```html
<button class="icon-action icon-action_invert" aria-label="...">
  ...
</button>
```

### `icon-action_subtle`

...

```html
<button class="icon-action icon-action_subtle" aria-label="...">
  ...
</button>
```

### `icon-action_type_[key]`

Adds styles for changing the look and feel of an icon-action to better reflect the urgency or status of the action.

```html
<button class="icon-action icon-action_type_info" aria-label="...">
  ...
</button>
```

#### Available Variations

- `icon-action_type_info`
- `icon-action_type_success`
- `icon-action_type_caution`
- `icon-action_type_danger`

## Customization

### Sass Variables

| Variable                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `$prefix-block`          | `null`  | String to prefix blocks with.          |
| `$prefix-element`        | `"__"`  | String to prefix elements with.        |
| `$prefix-modifier`       | `"_"`   | String to prefix modifiers with.       |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with. |
