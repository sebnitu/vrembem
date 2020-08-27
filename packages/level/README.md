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

The most basic imlementation of the level component consists of the `level` container with any number of children. Layout styles are applied to the direct children of the level component using the `> *` selector.

```html
<div class="level">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

> Level is a flex based layout component. That means you can use the [`@vremben/utility`](https://github.com/sebnitu/vrembem/tree/master/packages/utility) module—specifically the [`flex`](https://github.com/sebnitu/vrembem/tree/master/packages/utility#flex) utility—to further customize your layout.

## Modifiers

### `level_gap_[key]`

Adjusts the gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

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

### `level_x-gap_[key]`

Adjusts the horizontal gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

```html
<div class="level level_x-gap_xs">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

#### Available Variations

- `level_x-gap_none`
- `level_x-gap_xs`
- `level_x-gap_sm`
- `level_x-gap_md`
- `level_x-gap_lg`
- `level_x-gap_xl`

### `level_y-gap_[key]`

Adjusts the vertical gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

```html
<div class="level level_y-gap_xl">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

#### Available Variations

- `level_y-gap_none`
- `level_y-gap_xs`
- `level_y-gap_sm`
- `level_y-gap_md`
- `level_y-gap_lg`
- `level_y-gap_xl`

## Customization

### Sass Variables

| Variable                 | Default                             | Description                                      |
| ------------------------ | ----------------------------------- | ------------------------------------------------ |
| `$prefix-block`          | `null`                              | String to prefix blocks with.                    |
| `$prefix-element`        | `"__"`                              | String to prefix element with.                   |
| `$prefix-modifier`       | `"_"`                               | String to prefix modifier with.                  |
| `$prefix-modifier-value` | `"_"`                               | String to prefix modifier values with.           |
| `$gap`                   | `0.5em`                             | The default gap spacing for the level component. |
| `$gap-scale`             | [`Sass Map` Ref &darr;](#gap-scale) | Used to output gap modifiers.                    |

#### `$gap-scale`

Used to output gap modifiers.

```scss
$gap-scale: (
  "none": 0,
  "xs": 1px,
  "sm": 0.25em,
  "md": 0.5em,
  "lg": 1em,
  "xl": 1.5em,
) !default;
```
