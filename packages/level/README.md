# Level

A simple flexbox based layout component.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Flevel.svg)](https://www.npmjs.com/package/%40vrembem%2Flevel)

[Documentation](https://vrembem.com/packages/level)

## Installation

```sh
npm install @vrembem/level
```

### Styles

```scss
@use "@vrembem/level";
```

### Markup

The most basic implementation of the level component consists of the `level` container with any number of children. Layout styles are applied to the direct children of the level component using the `> *` selector.

```html
<div class="level">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

> Level is a flex based layout component. That means you can use the [`@vremben/utility`](https://github.com/sebnitu/vrembem/tree/master/packages/utility) package—specifically the [`flex`](https://github.com/sebnitu/vrembem/tree/master/packages/utility#flex) module—to further customize your layout.

## Modifiers

### `level_gap_[key]`

Adjusts the gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

```html
<div class="level level_gap_sm">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

#### Available Variations

- `level_gap_none`
- `level_gap_xs`
- `level_gap_sm`
- `level_gap_md`
- `level_gap_lg`
- `level_gap_xl`

### `level_gap-x_[key]`

Adjusts the horizontal gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

```html
<div class="level level_gap-x_xs">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

#### Available Variations

- `level_gap-x_none`
- `level_gap-x_xs`
- `level_gap-x_sm`
- `level_gap-x_md`
- `level_gap-x_lg`
- `level_gap-x_xl`

### `level_gap-y_[key]`

Adjusts the vertical gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

```html
<div class="level level_gap-y_xl">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

#### Available Variations

- `level_gap-y_none`
- `level_gap-y_xs`
- `level_gap-y_sm`
- `level_gap-y_md`
- `level_gap-y_lg`
- `level_gap-y_xl`

## level_nowrap

Removes the ability for level children to wrap and allows them to shrink as needed.

```html
<div class="level level_nowrap">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

## Customization

### Sass Variables

| Variable                 | Default                             | Description                                      |
| ------------------------ | ----------------------------------- | ------------------------------------------------ |
| `$prefix-block`          | `null`                              | String to prefix blocks with.                    |
| `$prefix-element`        | `"__"`                              | String to prefix elements with.                  |
| `$prefix-modifier`       | `"_"`                               | String to prefix modifiers with.                 |
| `$prefix-modifier-value` | `"_"`                               | String to prefix modifier values with.           |
| `$gap`                   | `0.5em`                             | The default gap spacing for the level component. |
| `$gap-map`               | [`Sass Map` Ref &darr;](#gap-scale) | Used to output gap modifiers.                    |

#### `$gap-map`

Used to output gap modifiers.

```scss
$gap-map: (
  "none": 0,
  "xs": 1px,
  "sm": 0.25em,
  "md": 0.5em,
  "lg": 1em,
  "xl": 1.5em,
) !default;
```
