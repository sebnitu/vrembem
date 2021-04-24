# Radio

Radios allow the user to select a single option from a set.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fradio.svg)](https://www.npmjs.com/package/%40vrembem%2Fradio)

[Documentation](https://vrembem.com/packages/radio)

## Installation

```sh
npm install @vrembem/radio
```

### Styles

```scss
@use "@vrembem/radio";
```

### Markup

...

```html
<span class="radio">
  <input type="radio" class="radio__native" name="...">
  <span class="radio__background">
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
  </span>
</span>
```

## Customization

### Sass Variables

| Variable                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `$prefix-block`          | `null`  | String to prefix blocks with.          |
| `$prefix-element`        | `"__"`  | String to prefix element with.         |
| `$prefix-modifier`       | `"_"`   | String to prefix modifier with.        |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with. |
