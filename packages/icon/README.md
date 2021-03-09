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

The most basic imlementation of the icon component consists of the `icon` class applied to an svg element.

```html
<svg class="icon" role="img">
  <use xlink:href="#icon-anchor"></use>
</svg>
```

## Modifiers

### `icon_size_[key]`

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

### `icon_style_[key]`

The default icon style is set using the `$icon-style` variable. You can also explicity style an icon using the style modifier.

```html
<svg class="icon icon_style_stroke" role="img">
  <use xlink:href="#icon-heart"></use>
</svg>
```

#### Available Variations

- `icon_style_stroke`
- `icon_style_fill`

## Customization

### Sass Variables

| Variable                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `$prefix-block`          | `null`  | String to prefix blocks with.          |
| `$prefix-element`        | `"__"`  | String to prefix element with.         |
| `$prefix-modifier`       | `"_"`   | String to prefix modifier with.        |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with. |
