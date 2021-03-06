# Utility <!-- omit in toc -->

The utility component provides a set of atomic classes that specialize in a single function.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Futility.svg)](https://www.npmjs.com/package/%40vrembem%2Futility)

[Documentation](https://vrembem.com/packages/utility)

## Installation <!-- omit in toc -->

```sh
npm install @vrembem/utility
```

### Styles <!-- omit in toc -->

```scss
@use "@vrembem/utility";
```

### Markup <!-- omit in toc -->

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

#### Global Variables <!-- omit in toc -->

Setting these variables will apply to all utility modules.

| Variable          | Default                                        | Description                                                                                                                   |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-utility` | `null`                                         | String to prefix all utility classes with.                                                                                    |
| `$output`         | `true`                                         | Toggles the default output of all modules.                                                                                    |
| `$breakpoints`    | [`core.$breakpoints` Ref &darr;](#breakpoints) | A map of breakpoints used by utilities that provide breakpoint specific variations such as the [`display`](#display) utility. |
| `$gap`            | `core.$gap` &rarr; `1em`                       | Used as the default spacing unit for many utilities.                                                                          |
| `$gap-map`        | [`core.$gap-map` Ref &darr;](#gap-map)         | Used to build gap variants for many utilities.                                                                                |

#### `$breakpoints` <!-- omit in toc -->

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

#### `$gap-map` <!-- omit in toc -->

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

## Modules <!-- omit in toc -->

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
- [`font`](#font)
- [`gap-x-[key]`](#gap-x-key)
- [`gap-y-[key]`](#gap-y-key)
- [`margin`](#margin)
- [`max-width`](#max-width)
- [`padding`](#padding)
- [`position`](#position)
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

Also available are utility classes for the `background-clip-[value]` property.

```html
<div class="background-clip-border"></div>
<div class="background-clip-content"></div>
<div class="background-clip-padding"></div>
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

#### `border-none` <!-- omit in toc -->

Remove border styles with `border-none` utilities and optional side variants.

```html
<div class="border-none"></div>
<div class="border-top-none"></div>
<div class="border-right-none"></div>
<div class="border-bottom-none"></div>
<div class="border-left-none"></div>
```

#### `border-color` <!-- omit in toc -->

Add border color utilities with light, dark and darker variants. Also available is the `border-color-transparent` utility which sets the border-color property to transparent.

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

#### `radius-circle` <!-- omit in toc -->

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

#### `radius-square` <!-- omit in toc -->

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

#### `$display-properties` <!-- omit in toc -->

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

The flex utility is a great way to adjust individual flex properties on components that use flex layout. Flex utilities fall under two categories: 1) those that are appleid to a flexbox container and 2) those that are applied to flexbox children elements directly. These are some available flex property based utilities:

**Applied to flex containers**

- `flex` & `flex-inline` - Sets the display flex or flex-inline property.
- `flex-direction-[key]` - Applies a flex direction property with the provided key as the value.
- `flex-nowrap` - Applies the flex-wrap property with the value of `nowrap`.
- `flex-wrap` - Applies the flex-wrap property with the value of `wrap`.
- `flex-wrap-reverse` - Applies the flex-wrap property with the value of `wrap-reverse`.
- `flex-justify-[key]` - Applies the justify-content property with the provided key as the value.
- `flex-align-[key]` - Applies the align-items property with the provided key as the value.
- `flex-items-[key]` - Gives all direct children the flex property to either share the container space equally (`equal`) or keep their content's width (`auto`).

**Applied to flex children elements**

- `flex-order-[key]` - Applies the order property with the provided key as the value.
- `flex-grow-[key]` - Applies the flex-grow property with the provided key as the value.
- `flex-shrink-[key]` - Applies the flex-shrink property with the provided key as the value.
- `flex-basis-[key]` - Applies the flex-basis property with the provided key (`0` || `auto`) as the value.
- `flex-self-[key]` - Applies the align-self property with the provided key as the value.


| Variable             | Default                 | Description                                                |
| -------------------- | ----------------------- | ---------------------------------------------------------- |
| `$output-flex`       | `$output` &rarr; `true` | Toggles the output of this utility.                        |
| `$class-flex`        | `"flex"`                | String to use for the class name of the flex utility.      |
| `$flex-order-count`  | `12`                    | Number of flex order utilities to output starting from 1.  |
| `$flex-grow-count`   | `6`                     | Number of flex-grow utilities to output starting from 0.   |
| `$flex-shrink-count` | `6`                     | Number of flex-shrink utilities to output starting from 0. |

#### `flex-direction-[value]` <!-- omit in toc -->

Applies a flex direction property with the provided key value.

- `flex-direction-row`
- `flex-direction-row-reverse`
- `flex-direction-column`
- `flex-direction-column-reverse`

#### `flex-wrap` <!-- omit in toc -->

Applies various flex-wrap property values.

- `flex-nowrap` - Applies the flex-wrap property with the value of `nowrap`.
- `flex-wrap` - Applies the flex-wrap property with the value of `wrap`.
- `flex-wrap-reverse` - Applies the flex-wrap property with the value of `wrap-reverse`.


#### `flex-justify-[value]` <!-- omit in toc -->

Applies the justify-content property with the provided key as the value.

- `flex-justify-start`
- `flex-justify-center`
- `flex-justify-end`
- `flex-justify-between`
- `flex-justify-around`
- `flex-justify-evenly`

#### `flex-align-[value]` <!-- omit in toc -->

Applies the align-items property with the provided key as the value.

- `flex-align-start`
- `flex-align-center`
- `flex-align-end`
- `flex-align-stretch`
- `flex-align-baseline`

#### `flex-items-[key]` <!-- omit in toc -->

Gives all direct children the flex property to either share the container space equally (`equal`) or keep their content's width (`auto`).

- `flex-items-equal` - Applies the flex property children elements with the value of `1 1 0` to share the container space equally.
- `flex-items-auto` - Applies the flex property children elements with the value of `0 0 auto` to keep their content's width.

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

### `font`

A utility for adjusting various font styles.

| Variable       | Default                 | Description                                           |
| -------------- | ----------------------- | ----------------------------------------------------- |
| `$output-font` | `$output` &rarr; `true` | Toggles the output of this utility.                   |
| `$class-font`  | `"font"`                | String to use for the class name of the font utility. |

- `font-family-sans` - Sets the font-family property to the sans-serif font stack.
- `font-family-serif` - Sets the font-family property to the serif font stack.
- `font-family-mono` - Sets the font-family property to the monospace font stack.
- `font-size-base` - Sets the font-size property to the base value.
- `font-size-sm` - Sets the font-size property to small variable.
- `font-size-lg` - Sets the font-size property to large variable.
- `font-leading-base` - Sets the line-height property to the base value.
- `font-leading-sm` - Sets the line-height property to small variable.
- `font-leading-lg` - Sets the line-height property to large variable.
- `font-kerning-0` - Sets the letter-spacing property to 0.
- `font-kerning-1` - Sets the letter-spacing property to `0.1em`.
- `font-kerning-2` - Sets the letter-spacing property to `0.2em`.
- `font-weight-normal` - Sets the font-weight property to "normal" (`400`).
- `font-weight-medium` - Sets the font-weight property to "medium" (`500`).
- `font-weight-semibold` - Sets the font-weight property to "semibold" (`600`).
- `font-weight-bold` - Sets the font-weight property to "bold" (`700`).
- `font-weight-lighter` - Sets the font-weight property to the relative "lighter" value.
- `font-weight-bolder` - Sets the font-weight property to the relative "bolder" value.
- `font-style-normal` - Sets the font-style property to normal.
- `font-style-italic` - Sets the font-style property to italic.

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

Add margin to an element using directional and size variations. Margin size and spacing values are generated from [`$gap-map`](#gap-map) variable map.

- `margin` - Adds margins on all sides.
- `margin-[direction]` - Adds default margin to a specific side.
- `margin-[size]` - Adds margins on all sides with a specific size key.
- `margin-[direction]-[size]` - Adds margins on a specific side and size.
- `margin-x-[size]` - Adds left and right margins with a specific size key.
- `margin-y-[size]` - Adds top and bottom margins with a specific size key.
- `margin-auto` - Sets margins to auto.
- `margin-[direction]-auto` - Sets margins auto to a specific side.
- `margin-x-auto` - Sets left and right margins to auto.
- `margin-y-auto` - Sets top and bottom margins to auto.

| Variable         | Default                 | Description                                             |
| ---------------- | ----------------------- | ------------------------------------------------------- |
| `$output-margin` | `$output` &rarr; `true` | Toggles the output of this utility.                     |
| `$class-margin`  | `"margin"`              | String to use for the class name of the margin utility. |

### `max-width`

Set the max-width property on an element using values mapped from scale keys. Scale variations are built using the [`$max-width-scale`](#max-width-scale) variable map.

- `max-width` - Sets the max-width propertry to the default value set in `$max-width`.
- `max-width-none` - Sets the max-width property to `none`.
- `max-width-[key]` - Sets the max-width property to the value of a specific scale key.
- `max-width-full` - Sets the max-width property to `100%`.

| Variable            | Default                                 | Description                                                |
| ------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `$output-max-width` | `$output` &rarr; `true`                 | Toggles the output of this module.                         |
| `$class-max-width`  | `"max-width"`                           | String to use for the class name of the max-width utility. |
| `$max-width`        | `70rem`                                 | The default value used to set max-width.                   |
| `$max-width-scale`  | [Sass map ref &darr;](#max-width-scale) | Map used to build max-width utility variants.              |

#### `$max-width-scale`<!-- omit in toc -->

A scale map used for building max-width utility variations using the key as variant name.

```scss
$max-width-scale: (
  'none': none,
  'xs': 45rem,
  'sm': 60rem,
  'md': 70rem,
  'lg': 80rem,
  'xl': 90rem,
  'full': 100%
) !default;
```

### `padding`

Add padding to an element using directional and size variations. Padding size and spacing values are generated from [`$gap-map`](#gap-map) variable map.

- `padding` - Adds default padding on all sides.
- `padding-[direction]` - Adds default padding to a specific side.
- `padding-[size]` - Adds padding on all sides with a specific size key.
- `padding-[direction]-[size]` - Adds padding on a specific side and size.
- `padding-x-[size]` - Sets left and right padding to a specific size key.
- `padding-y-[size]` - Sets top and bottom padding to a specific size key.

| Variable          | Default                 | Description                                              |
| ----------------- | ----------------------- | -------------------------------------------------------- |
| `$output-padding` | `$output` &rarr; `true` | Toggles the output of this utility.                      |
| `$class-padding`  | `"padding"`             | String to use for the class name of the padding utility. |

### `position`

A utility for setting the position CSS property.

- `position-absolute` - Sets the position property to absolute.
- `position-fixed` - Sets the position property to fixed.
- `position-relative` - Sets the position property to relative.
- `position-static` - Sets the position property to static.
- `position-sticky` - Sets the position property to sticky.

| Variable           | Default                 | Description                                               |
| ------------------ | ----------------------- | --------------------------------------------------------- |
| `$output-position` | `$output` &rarr; `true` | Toggles the output of this utility.                       |
| `$class-position`  | `"position"`            | String to use for the class name of the position utility. |

### `text`

A utility for adjusting various text styles.

| Variable       | Default                 | Description                                           |
| -------------- | ----------------------- | ----------------------------------------------------- |
| `$output-text` | `$output` &rarr; `true` | Toggles the output of this utility.                   |
| `$class-text`  | `"text"`                | String to use for the class name of the text utility. |

- `text-capitalize` - Sets text-transform to capitalize.
- `text-lowercase` - Sets text-transform to lowercase.
- `text-uppercase` - Sets text-transform to uppercase.
- `text-align-left` - Sets text-align to left.
- `text-align-center` - Sets text-align to center.
- `text-align-right` - Sets text-align to right.
- `text-strike` - Sets text-decoration to line-through.
- `text-underline` - Sets text-decoration to underline.
- `text-underline-dotted` - Sets text-decoration to underline with dotted style.
- `text-underline-dashed` - Sets text-decoration to underline with dashed style.
- `text-wrap` - Sets white-space to normal allowing text to wrap.
- `text-nowrap` - Sets white-space to `nowrap` which no longer allows text to wrap.
- `text-overflow-ellipsis` - Adds ellipsis styles to an element that will display an ellipsis (...) for text that would otherwise wrap.
