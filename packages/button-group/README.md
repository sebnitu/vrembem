# Button-group

A component for displaying groups of buttons.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fbutton-group.svg)](https://www.npmjs.com/package/%40vrembem%2Fbutton-group)

[Documentation](https://vrembem.com/packages/button-group)

## Installation

```sh
npm install @vrembem/button-group
```

### Styles

```scss
@use "@vrembem/button-group";
```

### Markup

The most basic imlementation of the button-group component consists of the `button-group` container wrapping a group of buttons.

```html
<div class="button-group">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```

Button-groups that are siblings to one another will inherit the gap provided by the adjacent sibling.

```html
<div class="button-group">
  <button class="button">...</button>
  ...
</div>
<div class="button-group">
  <button class="button">...</button>
  ...
</div>
```

## Modifiers

### `button-group_full_[key]`

A modifier to allow a button-group to span the full width of it's container. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `button-group_full`) will stack items under all conditions.

```html
<div class="button-group button-group_full_md">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```

#### Available Variations

- `button-group_full`
- `button-group_full_xs`
- `button-group_full_sm`
- `button-group_full_md`
- `button-group_full_lg`
- `button-group_full_xl`

### `button-group_gap_[key]`

Adjusts the gap spacing based on the provided key. Gap key output is based on the values in [`$gap-map`](#gap-scale) variable map.

```html
<div class="button-group button-group_gap_xs">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```

#### Available Variations

- `button-group_gap_none`
- `button-group_gap_xs`
- `button-group_gap_sm`
- `button-group_gap_md`
- `button-group_gap_lg`
- `button-group_gap_xl`

### `button-group_join`

A modifier to join buttons without a button-group component. This removes all gap spacing and adjusts the border-radius to allow buttons to be visually be joined as a single unit.

```html
<div class="button-group button-group_join">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```

### `button-group_stack_[key]`

Adds a breakpoint for when button-group elements should be stacked vertically. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `button-group_stack`) will stack items under all conditions.

```html
<div class="button-group button-group_stack_md">
  <button class="button">...</button>
  <button class="button">...</button>
  <button class="button">...</button>
</div>
```

#### Available Variations

- `button-group_stack`
- `button-group_stack_xs`
- `button-group_stack_sm`
- `button-group_stack_md`
- `button-group_stack_lg`
- `button-group_stack_xl`

## Customization

### Sass Variables

| Variable                 | Default                                        | Description                                                                                                            |
| ------------------------ | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`          | `null`                                         | String to prefix blocks with.                                                                                          |
| `$prefix-element`        | `"__"`                                         | String to prefix element with.                                                                                         |
| `$prefix-modifier`       | `"_"`                                          | String to prefix modifier with.                                                                                        |
| `$prefix-modifier-value` | `"_"`                                          | String to prefix modifier values with.                                                                                 |
| `$breakpoints`           | [`core.$breakpoints` Ref &darr;](#breakpoints) | The breakpoints map the `button-group_full_[key]` and  `button-group_stack_[key]` modifiers use to build their styles. |
| `$border-radius`         | `core.$border-radius`                          | Sets the border-radius styles of buttons when button-group adjusts them.                                               |
| `$children-selector`     | `"> *"`                                        | The selector used to target button-group children styles.                                                              |
| `$gap`                   | `0.5em`                                        | The default gap spacing for the button-group component.                                                                |
| `$gap-join`              | `-1px`                                         | The gap spacing used for the `button-group_join` modifier.                                                             |
| `$gap-map`               | [`Sass Map` Ref &darr;](#gap-scale)            | Used to output gap modifiers.                                                                                          |

#### `$breakpoints`

The breakpoints map the `button-group_full_[key]` and  `button-group_stack_[key]` modifiers use to build their styles.

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
  "xs": 1px,
  "sm": 0.25em,
  "md": 0.5em,
  "lg": 1em,
  "xl": 1.5em,
) !default;
```
