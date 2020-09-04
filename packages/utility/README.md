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

| Variable          | Default                                        | Description                                                                                                                   |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-utility` | `null`                                         | String to prefix all utility classes with.                                                                                    |
| `$output`         | `true`                                         | Toggles the default output of all modules.                                                                                    |
| `$breakpoints`    | [`core.$breakpoints` Ref &darr;](#breakpoints) | A map of breakpoints used by utilities that provide breakpoint specific variations such as the [`display`](#display) utility. |
| `$gap`            | `core.$gap` &rarr; `1em`                       | Used as the default spacing unit for many utilities.                                                                          |
| `$gap-map`        | [`core.$gap-map` Ref &darr;](#gap-map)         | Used to build gap variants for many utilities.                                                                                |

#### `$breakpoints`

A map of breakpoints used by utilities that provide breakpoint specific variations such as the [`display`](#display) and [`span`](#span) utilities.

```scss
// Inherited from: core.$breakpoints
$breakpoints: (
  "xs": 480px,
  "sm": 620px,
  "md": 760px,
  "lg": 990px,
  "xl": 1380px
) !default;
```

#### `$gap-map`

Used to build gap variants for [`flex-gap`](#flex-gap-key), [`flex-gap-x`](#flex-gap-x-key), [`flex-gap-y`](#flex-gap-y-key), [`gap-x`](#gap-x-key), [`gap-y`](#gap-y-key), [`margin`](#margin) and [`padding`](#padding) utilities.

```scss
// Inherited from: core.$gap-map
$gap-map: (
  "none": 0,
  "xs": 0.25em,
  "sm": 0.5em,
  "md": 1em,
  "lg": 1.5em,
  "xl": 2em
) !default;
```

## Modules

The utility component consists of a number of modules with their own set of specific customizable class and output variables.

- [`background`](#background)
- [`border`](#border)
- [`border-radius`](#border-radius)
- [`elevate`](#elevate)
- [`color`](#color)
- [`display`](#display)
- [`flex`](#flex)
- [`flex-gap-[key]`](#flex-gap-key)
- [`flex-gap-x-[key]`](#flex-gap-x-key)
- [`flex-gap-y-[key]`](#flex-gap-y-key)
- [`gap-x-[key]`](#gap-x-key)
- [`gap-y-[key]`](#gap-y-key)
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

| Variable             | Default                 | Description                                                 |
| -------------------- | ----------------------- | ----------------------------------------------------------- |
| `$output-background` | `$output` &rarr; `true` | Toggles the output of this utility.                         |
| `$class-background`  | `"background"`          | String to use for the class name of the background utility. |

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

| Variable         | Default                 | Description                                             |
| ---------------- | ----------------------- | ------------------------------------------------------- |
| `$output-border` | `$output` &rarr; `true` | Toggles the output of this utility.                     |
| `$class-border`  | `"border"`              | String to use for the class name of the border utility. |

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

### `border-radius`

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

| Variable                | Default                 | Description                                                    |
| ----------------------- | ----------------------- | -------------------------------------------------------------- |
| `$output-border-radius` | `$output` &rarr; `true` | Toggles the output of this utility.                            |
| `$class-border-radius`  | `"radius"`              | String to use for the class name of the border-radius utility. |

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

| Variable             | Default                 | Description                                                 |
| -------------------- | ----------------------- | ----------------------------------------------------------- |
| `$output-box-shadow` | `$output` &rarr; `true` | Toggles the output of this utility.                         |
| `$class-box-shadow`  | `"elevate"`             | String to use for the class name of the box-shadow utility. |

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

| Variable        | Default                 | Description                                            |
| --------------- | ----------------------- | ------------------------------------------------------ |
| `$output-color` | `$output` &rarr; `true` | Toggles the output of this utility.                    |
| `$class-color`  | `"color"`               | String to use for the class name of the color utility. |

> Checkout the [web documentation](https://vrembem.com/packages/utility/#color) for a complete list of available options.

### `display`

Display utilities allow you to toggle the display property on an element with an optional breakpoint conditional.

```
.display-[property]-[breakpoint]
```

Available properties are generated from the `$display-properties` variable map and breakpoint conditions from [`$breakpoints`](#breakpoints) variable map.

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

| Variable              | Default                                      | Description                                                                  |
| --------------------- | -------------------------------------------- | ---------------------------------------------------------------------------- |
| `$output-display`     | `$output` &rarr; `true`                      | Toggles the output of this utility.                                          |
| `$class-display`      | `"display"`                                  | String to use for the class name of the display utility.                     |
| `$display-properties` | [`Sass Map` Ref &darr;](#display-properties) | A list of display properties to output along with their breakpoint variants. |

#### `$display-properties`

A list of display properties to output along with their breakpoint variants.

```scss
$display-properties: (
  inline,
  flex,
  inline-flex,
  block,
  inline-block,
  none
) !default;
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

| Variable       | Default                 | Description                                           |
| -------------- | ----------------------- | ----------------------------------------------------- |
| `$output-flex` | `$output` &rarr; `true` | Toggles the output of this utility.                   |
| `$class-flex`  | `"flex"`                | String to use for the class name of the flex utility. |

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

### `flex-gap-[key]`

The flex-gap module adds both horizontal and vertical spacing between an element's children. It also adds negative top and left margins to the element it's applied to which may require an anonymous `<div>` if additional margins are needed. Flex-gap keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `flex-gap`
- `flex-gap-[key]`

```html
<!-- Using the default gap class -->
<div class="flex-gap">...</div>

<!-- Using the gap class with variant key -->
<div class="flex-gap-none">...</div>
<div class="flex-gap-xs">...</div>
<div class="flex-gap-sm">...</div>
<div class="flex-gap-md">...</div>
<div class="flex-gap-lg">...</div>
<div class="flex-gap-xl">...</div>
```

| Variable           | Default                 | Description                                               |
| ------------------ | ----------------------- | --------------------------------------------------------- |
| `$output-flex-gap` | `$output` &rarr; `true` | Toggles the output of this utility.                       |
| `$class-flex-gap`  | `"flex-gap"`            | String to use for the class name of the flex-gap utility. |

### `flex-gap-x-[key]`

Adds flex-gap spacing horizontally between an element's children using margin-left. Flex-gap keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `flex-gap-x`
- `flex-gap-x-[key]`

```html
<!-- Using the default gap class -->
<div class="flex-gap-x">...</div>

<!-- Using the gap class with variant key -->
<div class="flex-gap-x-none">...</div>
<div class="flex-gap-x-xs">...</div>
<div class="flex-gap-x-sm">...</div>
<div class="flex-gap-x-md">...</div>
<div class="flex-gap-x-lg">...</div>
<div class="flex-gap-x-xl">...</div>
```

| Variable             | Default                 | Description                                                 |
| -------------------- | ----------------------- | ----------------------------------------------------------- |
| `$output-flex-gap-x` | `$output` &rarr; `true` | Toggles the output of this utility.                         |
| `$class-flex-gap-x`  | `"flex-gap-x"`          | String to use for the class name of the flex-gap-x utility. |

### `flex-gap-y-[key]`

Adds flex-gap spacing vertically between an element's children using margin-top. Flex-gap keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `flex-gap-y`
- `flex-gap-y-[key]`

```html
<!-- Using the default gap class -->
<div class="flex-gap-y">...</div>

<!-- Using the gap class with variant key -->
<div class="flex-gap-y-none">...</div>
<div class="flex-gap-y-xs">...</div>
<div class="flex-gap-y-sm">...</div>
<div class="flex-gap-y-md">...</div>
<div class="flex-gap-y-lg">...</div>
<div class="flex-gap-y-xl">...</div>
```

| Variable             | Default                 | Description                                                 |
| -------------------- | ----------------------- | ----------------------------------------------------------- |
| `$output-flex-gap-y` | `$output` &rarr; `true` | Toggles the output of this utility.                         |
| `$class-flex-gap-y`  | `"flex-gap-y"`          | String to use for the class name of the flex-gap-y utility. |

### `gap-x-[key]`

Adds gap spacing horizontally using margin-left and the `> * + *` selector. Gap-x keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `gap-x`
- `gap-x-[key]`

```html
<!-- Using the default gap-x class -->
<div class="gap-x">...</div>

<!-- Using the gap-x class with variant key -->
<div class="gap-x-none">...</div>
<div class="gap-x-xs">...</div>
<div class="gap-x-sm">...</div>
<div class="gap-x-md">...</div>
<div class="gap-x-lg">...</div>
<div class="gap-x-xl">...</div>
```

| Variable        | Default                 | Description                                            |
| --------------- | ----------------------- | ------------------------------------------------------ |
| `$output-gap-x` | `$output` &rarr; `true` | Toggles the output of this utility.                    |
| `$class-gap-x`  | `"gap-x"`               | String to use for the class name of the gap-x utility. |

### `gap-y-[key]`

Adds gap spacing vertically using margin-top and the `> * + *` selector. Gap-y keys and their values are generated from the [`$gap-map`](#gap-map) variable map.

- `gap-y`
- `gap-y-[key]`

```html
<!-- Using the default gap-y class -->
<div class="gap-y">...</div>

<!-- Using the gap-y class with variant key -->
<div class="gap-y-none">...</div>
<div class="gap-y-xs">...</div>
<div class="gap-y-sm">...</div>
<div class="gap-y-md">...</div>
<div class="gap-y-lg">...</div>
<div class="gap-y-xl">...</div>
```

| Variable        | Default                 | Description                                            |
| --------------- | ----------------------- | ------------------------------------------------------ |
| `$output-gap-y` | `$output` &rarr; `true` | Toggles the output of this utility.                    |
| `$class-gap-y`  | `"gap-y"`               | String to use for the class name of the gap-y utility. |

### `margin`

Add margin to an element using directional and size modifiers. Margin size and spacing values are generated from [`$gap-map`](#gap-map) variable map.

- `margin` - Adds margins on all sides.
- `margin-[size]` - Adds margins on all sides with a specific size key.
- `margin-[direction]-[size]` - Adds margins on a specific size and with size key.
- `margin-x-[size]` - Adds left and right margins with a specific size key.
- `margin-y-[size]` - Adds top and bottom margins with a specific size key.
- `margin-auto` - Sets left and right margins to auto.
- `margin-left-auto` - Sets left margin to auto.
- `margin-right-auto` - Sets right margin to auto.

| Variable         | Default                 | Description                                             |
| ---------------- | ----------------------- | ------------------------------------------------------- |
| `$output-margin` | `$output` &rarr; `true` | Toggles the output of this utility.                     |
| `$class-margin`  | `"margin"`              | String to use for the class name of the margin utility. |

### `padding`

Add padding to an element using directional and size modifiers. Padding size and spacing values are generated from [`$gap-map`](#gap-map) variable map.

- `padding` - Adds padding on all sides.
- `padding-[size]` - Adds padding on all sides with a specific size key.
- `padding-[direction]-[size]` - Adds padding on a specific size and with size key.
- `padding-x-[size]` - Adds left and right padding with a specific size key.
- `padding-y-[size]` - Adds top and bottom padding with a specific size key.

| Variable          | Default                 | Description                                              |
| ----------------- | ----------------------- | -------------------------------------------------------- |
| `$output-padding` | `$output` &rarr; `true` | Toggles the output of this utility.                      |
| `$class-padding`  | `"padding"`             | String to use for the class name of the padding utility. |

### `span`

Set the width, max-width and flex based on a column set using the `span` utility. Span widths are based on a column set based on the `$span-columns` variable. There are a number of options available:

- `span-[col]` - Sets the number of columns an element should span.
- `span-[col]-[breakpoint]` - Sets the number of columns an element should span based on a breakpoint condition.
- `span-auto` - Sets an elements width to `auto`.
- `span-full` - Sets an elements width to `100%`.

| Variable        | Default                 | Description                                           |
| --------------- | ----------------------- | ----------------------------------------------------- |
| `$output-span`  | `$output` &rarr; `true` | Toggles the output of this utility.                   |
| `$class-span`   | `"span"`                | String to use for the class name of the span utility. |
| `$span-columns` | `12`                    | The columns value to use when building span variants. |

#### `span-[col]`

Sets the number of columns an element should span. The total number of columns is set in the `$span-columns` variable.

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

Sets the number of columns an element should span based on a breakpoint conditon. The total number of columns is set in the `$span-columns` variable. Breakpoint keys are built from the [`$breakpoints`](#breakpoints) variable map.

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

| Variable       | Default                 | Description                                           |
| -------------- | ----------------------- | ----------------------------------------------------- |
| `$output-text` | `$output` &rarr; `true` | Toggles the output of this utility.                   |
| `$class-text`  | `"text"`                | String to use for the class name of the text utility. |

- `text-size-sm` - Adds a smaller font-size relative to base font-size.
- `text-size-lg` - Adds a larger font-size relative to base font-size.
- `text-capitalize` - Sets text-transform to capitalize.
- `text-lowercase` - Sets text-transform to lowercase.
- `text-uppercase` - Sets text-transform to uppercase.
- `text-align-left` - Sets text-align to left.
- `text-align-center` - Sets text-align to center.
- `text-align-right` - Sets text-align to right.
- `text-bold` - Sets font-weight to bold.
- `text-normal` - Sets font-weight to normal.
- `text-italic` - Sets font-style to italic.
- `text-strike` - Sets text-decoration to line-through.
- `text-underline` - Sets text-decoration to underline.
- `text-underline-dotted` - Sets text-decoration to underline with dotted style.
- `text-underline-dashed` - Sets text-decoration to underline with dashed style.
- `text-wrap` - Sets white-space to normal allowing text to wrap.
- `text-nowrap` - Sets white-space to `nowrap` which no longer allows text to wrap.
- `text-overflow-ellipsis` - Adds ellipsis styles to an element that will display an ellipsis (...) for text that would otherwise wrap.
