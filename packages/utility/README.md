# Utility

The utility component provides a set of atomic classes that specialize in a single function.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Futility.svg)](https://www.npmjs.com/package/%40vrembem%2Futility)

[Documentation](https://vrembem.com/packages/utility)

## Installation

```sh
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

Each utility has a corresponding `$output-[module]` and `$class-[module]` variable that determines whether or not the module is output and it's class name. Output variable inherits their default value from `$output`.

```scss
// Will disable the output of the color module
@use "@vrembem/utility" with (
  $output-color: false
);

// Will disable all modules, but enables the color module
@use "@vrembem/utility" with (
  $output: false,
  $output-color: true
);
```

#### Global Variables

Setting these variables will apply to all utility modules.

| Variable          | Default | Description                                |
| ----------------- | ------- | ------------------------------------------ |
| `$prefix-utility` | `null`  | String to prefix all utility classes with. |
| `$output`         | `true`  | Toggles the default output of all modules. |

## Modules

The utility component consists of a number of modules with their own set of specific customizable class and output variables.

- [`background`](#background)
- [`border`](#border)
- [`radius`](#radius)
- [`elevate`](#elevate)
- [`color`](#color)
- [`display`](#display)
- [`flex`](#flex)
- [`margin`](#margin)
- [`padding`](#padding)
- [`span`](#span)
- [`text`](#text)

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
<!-- Applied to all corners -->
<div class="radius"></div>

<!-- Applied to all corners on a specific side -->
<div class="radius-top"></div>
<div class="radius-right"></div>
<div class="radius-bottom"></div>
<div class="radius-left"></div>

<!-- Applied to specific corners -->
<div class="radius-top-left"></div>
<div class="radius-top-right"></div>
<div class="radius-bottom-right"></div>
<div class="radius-bottom-left"></div>
```

#### `radius-circle`

Applies the maximum value to border-radius with optional corner variants. The value used by radius-circle utility is pulled from the `core.$border-radius-circle` variable.

```html
<!-- Applied to all corners -->
<div class="radius-circle"></div>

<!-- Applied to all corners on a specific side -->
<div class="radius-circle-top"></div>
<div class="radius-circle-right"></div>
<div class="radius-circle-bottom"></div>
<div class="radius-circle-left"></div>

<!-- Applied to specific corners -->
<div class="radius-circle-top-left"></div>
<div class="radius-circle-top-right"></div>
<div class="radius-circle-bottom-right"></div>
<div class="radius-circle-bottom-left"></div>
```

#### `radius-square`

Removes border-radius by setting it's value to `0` with optional corner variants.

```html
<!-- Applied to all corners -->
<div class="radius-square"></div>

<!-- Applied to all corners on a specific side -->
<div class="radius-square-top"></div>
<div class="radius-square-right"></div>
<div class="radius-square-bottom"></div>
<div class="radius-square-left"></div>

<!-- Applied to specific corners -->
<div class="radius-square-top-left"></div>
<div class="radius-square-top-right"></div>
<div class="radius-square-bottom-right"></div>
<div class="radius-square-bottom-left"></div>
```

### `elevate`

Applies different levels of elevation through box-shadow styles.

```html
<div class="elevate"></div>
<div class="elevate-flat"></div>
<div class="elevate-1dp"></div>
<div class="elevate-4dp"></div>
<div class="elevate-8dp"></div>
<div class="elevate-16dp"></div>
<div class="elevate-24dp"></div>
```

### `color`

Applies text color property. Most options include light, lighter, dark and darker variants.

```html
<span class="color">...</span>
<span class="color-subtle">...</span>
<span class="color-primary-light">...</span>
<span class="color-primary">...</span>
<span class="color-primary-dark">...</span>
...
```

> Checkout the [web documentation](https://vrembem.com/packages/utility/#color) for a complete list of available options.

### `display`

Display utilities allow you to toggle the display property on an element with an optional breakpoint conditional.

```
.display-[property]-[breakpoint]
```

Available properties are generated from the `$display-properties` variable map and breakpoint conditions from `$breakpoints` variable map.

```html
<div class="display-block display-none-xs">
  <p>Small Mobile</p>
</div>

<div class="display-none display-block-xs display-none-sm">
  <p>Small Mobile => Mobile</p>
</div>

<div class="display-none display-block-sm display-none-md">
  <p>Mobile => Tablet</p>
</div>

<div class="display-none display-block-md display-none-lg">
  <p>Tablet => Desktop</p>
</div>

<div class="display-none display-block-lg display-none-xl">
  <p>Desktop => Large Desktop</p>
</div>

<div class="display-none display-block-xl">
  <p>Large Desktop</p>
</div>
```

### `flex`

The flex utility is a great way to adjust individual flex properties on components that use flex layout. These are some available flex property based utilities:

- `flex-align-[key]`
- `flex-justify-[key]`
- `flex-grow-[key]`
- `flex-shrink-[key]`
- `flex-basis-[key]`
- `flex-wrap`
- `flex-nowrap`
- `flex-items-[key]`

#### flex-align-[value]

Adjust the `align-items` property of grid columns using the `flex-align-[value]` utility. Available values are:

- `flex-align-start`
- `flex-align-center`
- `flex-align-end`
- `flex-align-stretch`
- `flex-align-baseline`

```html
<div class="grid flex-align-start">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>

<div class="grid flex-align-center">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>

<div class="grid flex-align-end">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```

#### flex-justify-[value]

Change the `justify-content` property of grid columns using the `flex-justify-[value]` utility. Best used along with the `grid_auto` modifier. Avaliable values are:

- `flex-justify-start`
- `flex-justify-center`
- `flex-justify-end`
- `flex-justify-between`
- `flex-justify-around`
- `flex-justify-evenly`

```html
<div class="grid flex-justify-start">...</div>
<div class="grid flex-justify-center">...</div>
<div class="grid flex-justify-end">...</div>
<div class="grid flex-justify-between">...</div>
```

### `margin`

Add margin to an element using directional and size modifiers. Margin size and spacing values are generated from `$spacing-map` variable map.

- `margin`: Adds margins on all sides.
- `margin-[size]`: Adds margins on all sides with a specific size key.
- `margin-[direction]-[size]`: Adds margins on a specific size and with size key.
- `margin-hori-[size]`: Adds left and right margins with a specific size key.
- `margin-vert-[size]`: Adds top and bottom margins with a specific size key.
- `margin-auto`: Sets left and right margins to auto.
- `margin-left-auto`: Sets left margin to auto.
- `margin-right-auto`: Sets right margin to auto.

### `padding`

Add padding to an element using directional and size modifiers. Padding size and spacing values are generated from `$spacing-map` variable map.

- `padding`: Adds padding on all sides.
- `padding-[size]`: Adds padding on all sides with a specific size key.
- `padding-[direction]-[size]`: Adds padding on a specific size and with size key.
- `padding-hori-[size]`: Adds left and right padding with a specific size key.
- `padding-vert-[size]`: Adds top and bottom padding with a specific size key.

### `span`

Set the width, max-width and flex based on a column set using the `span` utility. Span widths are based on a column set based on the `$columns` variable. There are a number of options available:

- `span-[col]`: Sets the number of columns an element should span.
- `span-[col]-[breakpoint]`: Sets the number of columns an element should span based on a breakpoint condition.
- `span-auto`: Sets an elements width to `auto`.
- `span-full`: Sets an elements width to `100%`.

#### `span-[col]`

Sets the number of columns an element should span. The total number of columns is set in the `$columns` variable.

```html
<div class="grid">
  <div class="grid__item span-6">...</div>
  <div class="grid__item span-6">...</div>
  <div class="grid__break"></div>
  <div class="grid__item span-6">...</div>
  <div class="grid__item span-3">...</div>
  <div class="grid__item span-3">...</div>
</div>
```

#### `span-[col]-[breakpoint]`

Sets the number of columns an element should span based on a breakpoint conditon. The total number of columns is set in the `$columns` variable. Breakpoint keys are built from the `$breakpoints` variable map.

```html
<div class="grid">
  <div class="grid__item span-12 span-6-xs span-8-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-8-sm span-12-md span-3-lg">...</div>
</div>
```

#### `span-auto`

Sets an elements width to `auto`.

```html
<div class="grid">
  <div class="grid__item span-auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

#### `span-full`

Sets an elements width to `100%`.

```html
<div class="grid">
  <div class="grid__item span-full">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

### `text`

A utility for adjusting various text styles.

- `text-size-sm`: Adds a smaller font-size relative to base font-size.
- `text-size-lg`: Adds a larger font-size relative to base font-size.
- `text-capitalize`: Sets text-transform to capitalize.
- `text-lowercase`: Sets text-transform to lowercase.
- `text-uppercase`: Sets text-transform to uppercase.
- `text-align-left`: Sets text-align to left.
- `text-align-center`: Sets text-align to center.
- `text-align-right`: Sets text-align to right.
- `text-bold`: Sets font-weight to bold.
- `text-normal`: Sets font-weight to normal.
- `text-italic`: Sets font-style to italic.
- `text-strike`: Sets text-decoration to line-through.
- `text-underline`: Sets text-decoration to underline.
- `text-underline-dotted`: Sets text-decoration to underline with dotted style.
- `text-underline-dashed`: Sets text-decoration to underline with dashed style.
- `text-wrap`: Sets white-space to normal allowing text to wrap.
- `text-nowrap`: Sets white-space to `nowrap` which no longer allows text to wrap.
- `text-lead`: Adds font styles to create leading text.

#### `text-overflow-ellipsis`

Adds ellipsis styles to an element that will display an ellipsis (...) for text that would otherwise wrap.

```html
<div class="text-overflow-ellipsis">...<div>
```

## Customization

### Sass Variables

| Variable               | Default                                                                                                                                 | Description                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `$prefix-utility`      | `null`                                                                                                                                  | String to prefix utilities with.                                   |
| `$class-background`    | `"background"`                                                                                                                          | String to use for the class name of the background utility.        |
| `$class-border`        | `"border"`                                                                                                                              | String to use for the class name of the border utility.            |
| `$class-border-radius` | `"radius"`                                                                                                                              | String to use for the class name of the border-radius utility.     |
| `$class-box-shadow`    | `"elevate"`                                                                                                                             | String to use for the class name of the box-shadow utility.        |
| `$class-color`         | `"color"`                                                                                                                               | String to use for the class name of the text color utility.        |
| `$class-display`       | `"display"`                                                                                                                             | String to use for the class name of the display utility.           |
| `$class-flex`          | `"flex"`                                                                                                                                | String to use for the class name of the flex utility.              |
| `$class-margin`        | `"margin"`                                                                                                                              | String to use for the class name of the margin utility.            |
| `$class-padding`       | `"padding"`                                                                                                                             | String to use for the class name of the padding utility.           |
| `$class-span`          | `"span"`                                                                                                                                | String to use for the class name of the span utility.              |
| `$class-text`          | `"text"`                                                                                                                                | String to use for the class name of the text utility.              |
| `$breakpoints`         | `core.$breakpoints`                                                                                                                     | The breakpoints map some utilities use to build their styles.      |
| `$columns`             | `12`                                                                                                                                    | The columns value to use for `span` component sizing.              |
| `$display-properties`  | [Source](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/utility/src/_variables.scss#L24-L31) | Used to determine which display properties to output as utilities. |
| `$spacing`             | `core.$spacing`                                                                                                                         | The default value used for utilities that handle spacing.          |
| `$spacing-map`         | `core.$spacing-map`                                                                                                                     | Map of variations to output for utilities that handle spacing.     |
