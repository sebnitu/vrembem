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
<input class="input" type="text">
```

#### `disabled`

Adding the boolean `disabled` attribute to the input will provide visual indication that the input is not available for use.

```html
<input class="input" type="text" disabled>
```

#### `readonly`

Adding the boolean `readonly` attribute to the input will provide visual indication that the user should not be able to edit the value of the input.

```html
<input class="input" type="text" readonly>
```

## Modifiers

### `input_auto`

Sets the width of an input to `auto` instead of the base component width of `100%`.

```html
<input class="input input_auto" type="text">
```

### `input_size_[value]`

Adjust the size of an input by increasing or decreasing its padding and font-size. By default, the input scale will provide an input height of 30px (small `input_size_sm`), 40px (default) and 50px (large `input_size_lg`).

```html
<input class="input input_size_sm" type="text">
<input class="input input_size_lg" type="text">
```

#### Available Variations

- `input_size_sm`
- `input_size_lg`

### `input_state_[value]`

Adds styles for changing the look and feel of an input to better reflect the urgency or status.

```html
<input class="input input_state_danger" type="text">
```

### Available Variations

- `input_state_info`
- `input_state_success`
- `input_state_caution`
- `input_state_danger`

### `input_type_[value]`

Adds unique styles for various form input types. These form controls share styles with the basic form input such as [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) and [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) HTML elements.

```html
<select class="input input_type_select" name="">
  <option value="">Select one</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>

<textarea class="input input_type_textarea" rows="3"></textarea>
```

### Available Variations

- `input_type_select`
- `input_type_textarea`

## Customization

### Sass Variables

| Variable                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `$prefix-block`          | `null`  | String to prefix blocks with.          |
| `$prefix-element`        | `"__"`  | String to prefix elements with.        |
| `$prefix-modifier`       | `"_"`   | String to prefix modifiers with.       |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with. |
