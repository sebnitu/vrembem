# Input

A component for displaying form input elements.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Finput.svg)](https://www.npmjs.com/package/%40vrembem%2Finput)

[Documentation](https://vrembem.com/packages/input)

## Installation

```sh
npm install @vrembem/input
```

### Styles

```scss
@use "@vrembem/input";
```

### Markup

The most basic implementation of the input component consists of the `input` class applied to an `<input>` element.

```html
<input class="input" type="text" />
```

## Modifiers

### `input_auto`

### `input_size_[value]`

### `input_state_[value]`

### `input_type_[value]`

## Customization

### Sass Variables

| Variable                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `$prefix-block`          | `null`  | String to prefix blocks with.          |
| `$prefix-element`        | `"__"`  | String to prefix elements with.        |
| `$prefix-modifier`       | `"_"`   | String to prefix modifiers with.       |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with. |
