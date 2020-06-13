# Utility

The utility component provides a set of atomic classes that specialize in a single function.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Futility.svg)](https://www.npmjs.com/package/%40vrembem%2Futility)

[Documentation](https://vrembem.com/packages/utility)

## Installation

```
npm install @vrembem/utility
```

### Styles

```scss
@use "@vrembem/utility";
```

### Markup

Once loaded, the utility component provides a number of classes that can be used independently or to supplement other loaded components.

```html
<div class="grid flex-justify-center">
  <div class="grid__item span-auto">...</div>
  <div class="grid__item span-auto">...</div>
</div>
```

* [`background`](#background)
* [`border`](#border)
* [`radius`](#radius)
* [`elevate`](#elevate)
* [`color`](#color)
* [`display`](#display)
* [`flex`](#flex)
* [`margin`](#margin)
* [`padding`](#padding)
* [`spacing`](#spacing)
* [`span`](#span)
* [`text`](#text)

Each utility has a corresponding `$class-[property]` variable that determines the class name used in output. Setting it's value to `null` will omit their style output.

```scss
@use "@vrembem/utility" with (
  $class-color: null
);
```

## Available Utilities

### `background`

TBD

### `border`

TBD

### `radius`

TBD

### `elevate`

TBD

### `color`

TBD

### `display`

TBD

### `flex`

TBD

### `margin`

TBD

### `padding`

TBD

### `spacing`

TBD

### `span`

TBD

### `text`

TBD

## Customization

### Sass Variables

Variable | Default | Description
---|---|---
`$prefix-block` | `null` | String to prefix blocks with.
`$prefix-element` | `"__"` | String to prefix element with.
`$prefix-modifier` | `"_"` | String to prefix modifier with.
`$prefix-modifier-value` | `"_"` | String to prefix modifier values with.
