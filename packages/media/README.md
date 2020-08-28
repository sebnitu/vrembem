# Media

The media component is used for displaying groups of content with a corresponding media asset, such as an image, avatar or icon.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fmedia.svg)](https://www.npmjs.com/package/%40vrembem%2Fmedia)

[Documentation](https://vrembem.com/packages/media)

## Installation

```sh
npm install @vrembem/media
```

### Styles

```scss
@use "@vrembem/media";
```

### Markup

The most basic imlementation of the media component consists of the `media` container and atleast one body element (`media__body`) and one object element (`media__obj`).

```html
<div class="media">
  <div class="media__obj">
    ...
  </div>
  <div class="media__body">
    ...
  </div>
</div>
```

## Modifiers

### `media_gap_[key]`

Adjusts the gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

```html
<div class="media media_gap_xs">
  ...
</div>
```

#### Available Variations

- `media_gap_none`
- `media_gap_xs`
- `media_gap_sm`
- `media_gap_md`
- `media_gap_lg`
- `media_gap_xl`

### `media_gap-x_[key]`

Adjusts the horizontal gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

```html
<div class="media media_gap-x_lg">
  ...
</div>
```

#### Available Variations

- `media_gap-x_none`
- `media_gap-x_xs`
- `media_gap-x_sm`
- `media_gap-x_md`
- `media_gap-x_lg`
- `media_gap-x_xl`

### `media_gap-y_[key]`

Adjusts the vertical gap spacing based on the provided key. Gap key output is based on the values in [`$gap-scale`](#gap-scale) variable map.

```html
<div class="media media_gap-y_xs media_stack_lg">
  ...
</div>
```

#### Available Variations

- `media_gap-y_none`
- `media_gap-y_xs`
- `media_gap-y_sm`
- `media_gap-y_md`
- `media_gap-y_lg`
- `media_gap-y_xl`

> The `media_gap-y_[key]` modifier only takes effect when combined with a `media_stack_[bp]` modifier.

### `media_stack_[key]`

Adds a breakpoint for when media elements should be stacked vertically. Values and class keys are generated using the [`$breakpoint`](#breakpoints) map. Omitting the key value from the modifier (e.g. `media_stack`) will stack items under all conditions.

```html
<div class="media media_stack_lg">
  ...
</div>
```

#### Available Variations

- `media_stack`
- `media_stack_xs`
- `media_stack_sm`
- `media_stack_md`
- `media_stack_lg`
- `media_stack_xl`

#### Combined Modifiers

The media component really shines when combining gap and stack modifiers.

- `media_gap-x_lg` - Sets the horizontal gap between media obj and body elements.
- `media_gap-y_xs` - Sets the vertical gap between media obj and body elements whent he stack breakpoint is met.
- `media_stack_lg` - Sets the media component breakpoint that elements should stack.

```html
<div class="media media_gap-x_lg media_gap-y_xs media_stack_lg">
  ...
</div>
```

## Customization

### Sass Variables

| Variable                 | Default                                        | Description                                                                     |
| ------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| `$prefix-block`          | `null`                                         | String to prefix blocks with.                                                   |
| `$prefix-element`        | `"__"`                                         | String to prefix element with.                                                  |
| `$prefix-modifier`       | `"_"`                                          | String to prefix modifier with.                                                 |
| `$prefix-modifier-value` | `"_"`                                          | String to prefix modifier values with.                                          |
| `$breakpoints`           | [`core.$breakpoints` Ref &darr;](#breakpoints) | The breakpoints map the `media_stack_[key]` modifier uses to build it's styles. |
| `$min-height`            | `(core.$line-height * 1em)`                    | Sets the min-height property of the `media__obj` element.                       |
| `$max-width`             | `30%`                                          | Sets the max-width property of the `media__obj` element.                        |
| `$gap`                   | `0.5em`                                        | The default gap spacing for the media component.                                |
| `$gap-scale`             | [`Sass Map` Ref &darr;](#gap-scale)            | Used to output gap modifiers.                                                   |

#### $breakpoints

The breakpoints map the `media_stack_[key]` modifier uses to build it's styles.

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

#### $gap-scale

Used to output gap modifiers.

```scss
$gap-scale: (
  "none": 0,
  "xs": 0.5em,
  "sm": 1em,
  "md": 1.5em,
  "lg": 2em,
  "xl": 3em
) !default;
```
