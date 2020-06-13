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

* `grid`
* `grid__item`

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
  <div class="grid__item">...</div>
  <div class="grid__clear"></div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

## Modifiers

### `grid_auto`

### `grid_break_[key]`

### `grid_fill`

### `grid_gap_[key]`

## Customization

### Sass Variables

Variable | Default | Description
---|---|---
`$prefix-block` | `null` | String to prefix blocks with.
`$prefix-element` | `"__"` | String to prefix element with.
`$prefix-modifier` | `"_"` | String to prefix modifier with.
`$prefix-modifier-value` | `"_"` | String to prefix modifier values with.
`$breakpoints` | See: `core.$breakpoints` | The breakpoints map the `_break_[key]` modifier usees to build it's styles.
`$gap` | `2rem` | String to prefix modifier values with.
`$gap-scale` | `(
  "xs": 0.5rem,
  "sm": 1rem,
  "md": 2rem,
  "lg": 3rem,
  "xl": 4rem,
)` | A scale map the `_gap_[key]` modifier uses to build it's styles.
