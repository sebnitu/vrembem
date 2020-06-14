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
`$breakpoints` | [`core.$breakpoints`](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/core/src/css/_variables.scss#L14-L20) | The breakpoints map some utilities use to build their styles.
`$columns` | `12` | The columns value to use for `span` component sizing.
`$display-properties` | [Source](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/utility/src/_variables.scss#L24-L31) | Used to determine which display properties to output as utilities.
`$spacing` | `1rem` | The default value used for the `spacing` utility.
`$spacing-map` | [Source](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/utility/src/_variables.scss#L34-L41) | Map of variations to output for the `spacing` utility.
