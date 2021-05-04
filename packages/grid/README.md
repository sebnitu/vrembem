# Grid

A flexbox based grid system component.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fgrid.svg)](https://www.npmjs.com/package/%40vrembem%2Fgrid)

[Documentation](https://vrembem.com/packages/grid)

## Installation

```sh
npm install @vrembem/grid
```

### Styles

```scss
@use "@vrembem/grid";
```

### Markup

The most basic imlementation of the grid component consists of two elements. By default, `grid__item`'s split the available space within the `grid` parent evenly:

- `grid`
- `grid__item`

```html
<div class="grid">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

> Grid is a flex based layout component. That means you can use the [`@vremben/utility`](https://github.com/sebnitu/vrembem/tree/master/packages/utility) package—specifically [`flex`](https://github.com/sebnitu/vrembem/tree/master/packages/utility#flex) and [`span`](https://github.com/sebnitu/vrembem/tree/master/packages/utility#span)—to further customize your layout.

#### `grid__clear`

The clear element allows you to start a new row at any point in a column set.

```html
<div class="grid">
  <div class="grid__item">...</div>
  <div class="grid__clear"></div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

## Modifiers

### `grid_auto`

Gives grid items a basis of auto so their content dictates their width.

```html
<div class="grid grid_auto">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

Set an individual grid item to auto using `grid__item_auto` element modifier.

```html
<div class="grid">
  <div class="grid__item grid__item_auto">...</div>
  <div class="grid__item">...</div>
</div>
```

### `grid_fill`

The fill modifier stretches grid item’s contents to fill the height of it’s container.

```html
<div class="grid grid_fill">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

Set an individual grid item to fill using the `grid__item_fill` element modifier.

```html
<div class="grid">
  <div class="grid__item grid__item_fill">...</div>
  <div class="grid__item">...</div>
</div>
```

### `grid_gap_[key]`

Modifiers that adjust the gutter spacing between `grid__item` elements. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

```html
<div class="grid grid_gap_sm">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

#### Available Variations

- `grid_gap_none`
- `grid_gap_xs`
- `grid_gap_sm`
- `grid_gap_md`
- `grid_gap_lg`
- `grid_gap_xl`

### `grid_gap-x_[key]`

Adjusts the horizontal gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

```html
<div class="grid grid_gap-x_xs">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

#### Available Variations

- `grid_gap-x_none`
- `grid_gap-x_xs`
- `grid_gap-x_sm`
- `grid_gap-x_md`
- `grid_gap-x_lg`
- `grid_gap-x_xl`

### `grid_gap-y_[key]`

Adjusts the vertical gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

```html
<div class="grid grid_gap-y_xl">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

#### Available Variations

- `grid_gap-y_none`
- `grid_gap-y_xs`
- `grid_gap-y_sm`
- `grid_gap-y_md`
- `grid_gap-y_lg`
- `grid_gap-y_xl`

### `grid_stack_[key]`

Adds a breakpoint for when grid items should be stacked vertically. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `grid_stack`) will stack items under all conditions.

```html
<div class="grid grid_stack_md">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

#### Available Variations

- `grid_stack`
- `grid_stack_xs`
- `grid_stack_sm`
- `grid_stack_md`
- `grid_stack_lg`
- `grid_stack_xl`

### `span`

Set the flex-basis, width and max-width on an element using the `span` module. Span column widths are built from the `$span-columns` variable. Breakpoint keys are built from the [`$breakpoints`](#breakpoints) variable map. These are the available variants:

- `span-[col]-[key]` - Sets the number of columns an element should span with an optional breakpoint condition.
- `span-auto-[key]` - Sets an elements width to `auto` with an optional breakpoint condition.
- `span-full-[key]` - Sets an elements width to `100%` with an optional breakpoint condition.

| Variable        | Default  | Description                                           |
| --------------- | -------- | ----------------------------------------------------- |
| `$output-span`  | `true`   | Toggles the output of this module.                    |
| `$class-span`   | `"span"` | String to use for the class name of the span module.  |
| `$prefix-span`  | `null`   | String to prefix the span module with.                |
| `$span-columns` | `12`     | The columns value to use when building span variants. |

#### `span-[col]-[key]`

Sets the number of columns an element should span with an optional breakpoint condition. The total number of columns is set in the `$span-columns` variable. Breakpoint keys are built from the [`$breakpoints`](#breakpoints) variable map.

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

Here's an example of using the optional breakpoint variants. Breakpoints variants should be added with a mobile-first approach.

```html
<div class="grid">
  <div class="grid__item span-12 span-6-xs span-8-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-8-sm span-12-md span-3-lg">...</div>
</div>
```

#### `span-auto-[key]`

Sets an elements width to `auto` with an optional breakpoint condition.

```html
<div class="grid">
  <div class="grid__item span-auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

#### `span-full-[key]`

Sets an elements width to `100%` with an optional breakpoint condition.

```html
<div class="grid">
  <div class="grid__item span-full">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

## Customization

### Sass Variables

| Variable                 | Default                                        | Description                                                                   |
| ------------------------ | ---------------------------------------------- | ----------------------------------------------------------------------------- |
| `$prefix-block`          | `null`                                         | String to prefix blocks with.                                                 |
| `$prefix-element`        | `"__"`                                         | String to prefix elements with.                                               |
| `$prefix-modifier`       | `"_"`                                          | String to prefix modifiers with.                                              |
| `$prefix-modifier-value` | `"_"`                                          | String to prefix modifier values with.                                        |
| `$breakpoints`           | [`core.$breakpoints` Ref &darr;](#breakpoints) | The breakpoints map the `grid_stack_[key]` modifier uses to build its styles. |
| `$gap`                   | `2em`                                          | The default gap spacing for the grid component.                               |
| `$gap-map`               | [`Sass Map` Ref &darr;](#gap-scale)            | Used to output gap modifiers.                                                 |

#### `$breakpoints`

The breakpoints map the `grid_stack_[key]` modifier uses to build its styles.

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

Used to output gap modifiers.

```scss
$gap-map: (
  "none": 0,
  "xs": 0.5em,
  "sm": 1em,
  "md": 2em,
  "lg": 3em,
  "xl": 4em
) !default;
```
