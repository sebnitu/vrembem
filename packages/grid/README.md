# Grid

A flexbox based grid system component.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fgrid.svg)](https://www.npmjs.com/package/%40vrembem%2Fgrid)

[Documentation](https://vrembem.com/packages/grid)

## Installation

```
npm install @vrembem/grid
```

### Styles

```scss
@use "@vrembem/grid";
```

### Markup

The most basic imlementation of the grid component consists of two elements. By default, `grid__items` split the available space within the `grid` parent evenly:

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

### `grid_break_[key]`

Adds a breakpoint for when grid items should be stacked vertically. Values and class keys are generated using the `$breakpoint` map. Also available is the `grid_break` modifier which stacks grid items under all conditions.

```html
<div class="grid grid_break">...</div>
<div class="grid grid_break_xs">...</div>
<div class="grid grid_break_sm">...</div>
<div class="grid grid_break_md">...</div>
<div class="grid grid_break_lg">...</div>
<div class="grid grid_break_xl">...</div>
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

Modifiers that adjust the gutter spacing between `grid__item` elements. Values and class keys are generated using the `$gap-scale` map.

```html
<div class="grid grid_gap_none">...</div>
<div class="grid grid_gap_xs">...</div>
<div class="grid grid_gap_sm">...</div>
<div class="grid grid_gap_md">...</div>
<div class="grid grid_gap_lg">...</div>
<div class="grid grid_gap_xl">...</div>
```

## Customization

### Sass Variables

Variable | Default | Description
---|---|---
`$prefix-block` | `null` | String to prefix blocks with.
`$prefix-element` | `"__"` | String to prefix element with.
`$prefix-modifier` | `"_"` | String to prefix modifier with.
`$prefix-modifier-value` | `"_"` | String to prefix modifier values with.
`$breakpoints` | [Source](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/core/src/css/_variables.scss#L14-L20) | The breakpoints map the `grid_break_[key]` modifier usees to build it's styles.
`$gap` | `2rem` | String to prefix modifier values with.
`$gap-scale` | [Source](https://github.com/sebnitu/vrembem/blob/08eb7b3b55e9c55ed0027e8d9cee3d24b2ac86d6/packages/grid/src/_variables.scss#L10-L16) | A scale map the `grid_gap_[key]` modifier uses to build it's styles.
