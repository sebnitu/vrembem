# Icon

The icon component provides a consistent way to style icons.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Ficon.svg)](https://www.npmjs.com/package/%40vrembem%2Ficon)

[Documentation](https://vrembem.com/packages/icon)

## Installation

```sh
npm install @vrembem/icon
```

### Styles

```scss
@use "@vrembem/icon";
```

### Markup

The most basic implementation of the icon component consists of the `icon` class applied to an svg element.

```html
<svg class="icon" role="img">
  <use xlink:href="#icon-anchor"></use>
</svg>
```

## Modifiers

### `icon_size_[value]`

Add a size modifier to adjust the size of your icons. Icon sizes are controlled using the font-size attribute and optionally a stroke width.

```html
<svg class="icon icon_size_sm" role="img">
  <use xlink:href="#icon-anchor"></use>
</svg>
```

#### Available Variations

- `icon_size_xs`
- `icon_size_sm`
- `icon_size_lg`
- `icon_size_xl`

### `icon_style_[value]`

The default icon style is set using the `$icon-style` variable. You can also explicitly style an icon using the style modifier.

```html
<svg class="icon icon_style_stroke" role="img">
  <use xlink:href="#icon-heart"></use>
</svg>

<svg class="icon icon_style_fill" role="img">
  <use xlink:href="#icon-heart"></use>
</svg>
```

#### Available Variations

- `icon_style_stroke`
- `icon_style_fill`

#### `@mixin icon-style($style)`

Output unique styles for an icons based on their style type.

**Arguments**

| Variable | Type     | Description                                                                                         |
| -------- | -------- | --------------------------------------------------------------------------------------------------- |
| `$style` | `string` | The icon styles to output. Current options include `"stroke"` and `"fill"`, defaults to `"stroke"`. |

**Example**

```scss
.icon-selector {
  @include icon-style("fill");
}

// CSS Output
.icon-selector {
  stroke: none;
  stroke-width: 0;
  fill: currentColor;
}
```

## Customization

### Sass Variables

| Variable                 | Default    | Description                                                                         |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------- |
| `$prefix-block`          | `null`     | String to prefix blocks with.                                                       |
| `$prefix-element`        | `"__"`     | String to prefix elements with.                                                     |
| `$prefix-modifier`       | `"_"`      | String to prefix modifiers with.                                                    |
| `$prefix-modifier-value` | `"_"`      | String to prefix modifier values with.                                              |
| `$style`                 | `"stroke"` | The default icon styles to output. Current options include `"stroke"` and `"fill"`. |
| `$size`                  | `1.25em`   | The base size of icons. This is applied using the `font-size` property.             |
| `$stroke-width`          | `2xp`      | Sets the stroke-width property of icons.                                            |
| `$stroke-linecap`        | `round`    | Sets the stroke-linecap property of icons.                                          |
| `$stroke-linejoin`       | `round`    | Sets the stroke-linejoin property of icons.                                         |
| `$vertical-align`        | `top`      | Sets the vertical-align property of icons.                                          |
| `$size-xs`               | `0.75em`   | Sets the font-size property of icons with the `icon_size_xs` modifier.              |
| `$size-xs-stroke-width`  | `null`     | Sets the stroke-width property of icons with the `icon_size_xs` modifier.           |
| `$size-sm`               | `1em`      | Sets the font-size property of icons with the `icon_size_sm` modifier.              |
| `$size-sm-stroke-width`  | `null`     | Sets the stroke-width property of icons with the `icon_size_sm` modifier.           |
| `$size-lg`               | `1.75em`   | Sets the font-size property of icons with the `icon_size_lg` modifier.              |
| `$size-lg-stroke-width`  | `null`     | Sets the stroke-width property of icons with the `icon_size_lg` modifier.           |
| `$size-xl`               | `2.75em`   | Sets the font-size property of icons with the `icon_size_xl` modifier.              |
| `$size-xl-stroke-width`  | `null`     | Sets the stroke-width property of icons with the `icon_size_xl` modifier.           |
