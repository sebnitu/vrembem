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
<!-- Using utility classes independently -->
<div class="padding background-shade border radius">
  <p class="text-bold text-align-center">...</p>
</div>

<!-- Using utility classes with other components -->
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
// Excludes the `color` utilities from being output
@use "@vrembem/utility" with (
  $class-color: null
);
```

## Available Utilities

### `background`

Applies background color property. Most options include light, lighter, dark and darker variants.

```html
<div class="background-primary-lighter"></div>
<div class="background-primary-light"></div>
<div class="background-primary"></div>
<div class="background-primary-dark"></div>
<div class="background-primary-darker"></div>
...
```

> Checkout the [web documentation](https://vrembem.com/packages/utility/#background) for a complete list of available options.

### `border`

Applies border property with optional sides variants.

```html
<div class="border"></div>
<div class="border-top"></div>
<div class="border-right"></div>
<div class="border-bottom"></div>
<div class="border-left"></div>
```

#### `border-none`

Remove border styles with `border-none` utilities and optional side variants.

```html
<div class="border-none"></div>
<div class="border-top-none"></div>
<div class="border-right-none"></div>
<div class="border-bottom-none"></div>
<div class="border-left-none"></div>
```

#### `border-color`

Add border color utilities with light, dark and darker variants.

```html
<!-- border-color -->
<div class="border border-color-light"></div>
<div class="border"></div>
<div class="border border-color-dark"></div>
<div class="border border-color-darker"></div>

<!-- border-color-invert -->
<div class="border border-color-invert-light"></div>
<div class="border border-color-invert"></div>
<div class="border border-color-invert-dark"></div>
<div class="border border-color-invert-darker"></div>
```

### `radius`

Applies border-radius styles with optional corner variants. The value used by the radius utility is pulled from the `core.$border-radius` variable.

```html
<div class="radius"></div>
<div class="radius-top-left"></div>
<div class="radius-top-right"></div>
<div class="radius-bottom-right"></div>
<div class="radius-bottom-left"></div>
```

#### `radius-circle`

Applies the maximum value to border-radius with optional corner variants. The value used by radius-circle utility is pulled from the `core.$border-radius-circle` variable.

```html
<div class="radius-circle"></div>
<div class="radius-circle-top-left"></div>
<div class="radius-circle-top-right"></div>
<div class="radius-circle-bottom-right"></div>
<div class="radius-circle-bottom-left"></div>
```

#### `radius-square`

Removes border-radius by setting it's value to `0` with optional corner variants.

```html
<div class="radius-square"></div>
<div class="radius-square-top-left"></div>
<div class="radius-square-top-right"></div>
<div class="radius-square-bottom-right"></div>
<div class="radius-square-bottom-left"></div>
```

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
`$prefix-utility` | `null` | String to prefix utilities with.
`$class-background` | `"background"` | String to use for the class name of the background utility.
`$class-border` | `"border"` | String to use for the class name of the border utility.
`$class-border-radius` | `"radius"` | String to use for the class name of the border-radius utility.
`$class-box-shadow` | `"elevate"` | String to use for the class name of the box-shadow utility.
`$class-color` | `"color"` | String to use for the class name of the text color utility.
`$class-display` | `"display"` | String to use for the class name of the display utility.
`$class-flex` | `"flex"` | String to use for the class name of the flex utility.
`$class-margin` | `"margin"` | String to use for the class name of the margin utility.
`$class-padding` | `"padding"` | String to use for the class name of the padding utility.
`$class-spacing` | `"spacing"` | String to use for the class name of the spacing utility.
`$class-span` | `"span"` | String to use for the class name of the span utility.
`$class-text` | `"text"` | String to use for the class name of the text utility.
`$breakpoints` | [Source](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/core/src/css/_variables.scss#L14-L20) | The breakpoints map some utilities use to build their styles.
`$columns` | `12` | The columns value to use for `span` component sizing.
`$display-properties` | [Source](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/utility/src/_variables.scss#L24-L31) | Used to determine which display properties to output as utilities.
`$spacing` | `1rem` | The default value used for the `spacing` utility.
`$spacing-map` | [Source](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/utility/src/_variables.scss#L34-L41) | Map of variations to output for the `spacing` utility.
