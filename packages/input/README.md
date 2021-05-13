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

#### `disabled`

Adding the boolean `disabled` attribute to the input will provide visual indication that the input is not available for use.

```html
<input class="input" type="text" disabled />
```

#### `readonly`

Adding the boolean `readonly` attribute to the input will provide visual indication that the user should not be able to edit the value of the input.

```html
<input class="input" type="text" readonly />
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
