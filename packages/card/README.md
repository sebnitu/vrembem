# Card

The cards component provides a flexible and extensive content container with multiple variants and options.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fcard.svg)](https://www.npmjs.com/package/%40vrembem%2Fcard)

[Documentation](https://vrembem.com/packages/card)

## Installation

```sh
npm install @vrembem/card
```

### Styles

```scss
@use "@vrembem/card";
```

### Markup

Card is a highly composable container component that comes with a variety of elements. The three most basic are:

- `card__body`
- `card__image`
- `card__title`

```html
<div class="card">
  <img class="card__image" src="..." />
  <div class="card__body">
    <h3 class="card__title">...</h3>
    ...
  </div>
</div>
```

#### `card__header + card__footer`

Used to separate distinct card sections for headers and footers. It's also possible to include multiple `card__body` elements as needed.

- `card__header`
- `card__footer`

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">...</h3>
  </div>
  <div class="card__body">
    ...
  </div>
  <div class="card__footer">
    ...
  </div>
</div>
```

#### `card__screen + card__background`

Card screens and backgrounds are displayed behind the other card elements. These are typically paired with the [`card_invert` modifier](#card_invert) which switches text colors to better suite a dark background theme.

- `card__screen`
- `card__background`

```html
<div class="card card_invert">
  <div class="card__body">
    ...
  </div>
  <img src="..." class="card__background" />
  <div class="card__screen"></div>
</div>
```

## Modifiers

### `card_fade`

Hides the content of a card so that [only the `card__background` is visible](#card__screen-+-card__background). The content is then revealed on user interaction via `:hover` and `:focus` events.

```html
<div class="card card_fade">
  ...
  <img src="..." class="card__background">
  <div class="card__screen"></div>
</div>
```

### `card_invert`

Inverts the contrast of the card component (by default adds a dark background with white text). This can be used together with the [`card__screen` and `card__background` elements](#card__screen-+-card__background) to help keep the content of a card legible. 

```html
<div class="card card_invert">
  ...
</div>
```

### `card_link`

Add styles to a card when the entire component is a clickable link. 

```html
<a class="card card_link" href="#">
  ...
</a>
```

### `card_zoom`

A style enhancement modifier for when the [`card__background` element](#card__screen-+-card__background) is used. This will create a "zoom" effect when the card is hovered or focused.

```html
<div class="card card_zoom">
  ...
  <img src="..." class="card__background">
  <div class="card__screen"></div>
</div>
```

## Customization

### Sass Variables

| Variable                      | Default                                                 | Description                                                                                     |
| ----------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                                                  | String to prefix blocks with.                                                                   |
| `$prefix-element`             | `"__"`                                                  | String to prefix elements with.                                                                 |
| `$prefix-modifier`            | `"_"`                                                   | String to prefix modifiers with.                                                                |
| `$prefix-modifier-value`      | `"_"`                                                   | String to prefix modifier values with.                                                          |
| `$padding`                    | `1.25em`                                                | Sets the padding property on the `card__body`, `card__header` and `card__footer` elements.      |
| `$background`                 | `core.$white`                                           | Sets the background property.                                                                   |
| `$border`                     | `null`                                                  | Sets the border property.                                                                       |
| `$sep-border`                 | `core.$border`                                          | Sets the border property that separates card elements.                                          |
| `$border-radius`              | `core.$border-radius`                                   | Sets the border-radius property.                                                                |
| `$box-shadow`                 | `core.$box-shadow-1`                                    | Sets the box-shadow property.                                                                   |
| `$color`                      | `null`                                                  | Sets the color property.                                                                        |
| `$transition-property`        | `background-color, border-color, box-shadow, transform` | Sets the transition-property property.                                                          |
| `$transition-duration`        | `core.$transition-duration`                             | Sets the transition-duration property.                                                          |
| `$transition-timing-function` | `core.$transition-timing-function`                      | Sets the transition-timing-function property.                                                   |
| `$title-font-size`            | `core.$font-size-lg`                                    | Sets the font-size property on the `card__title` element.                                       |
| `$title-line-height`          | `core.$line-height-lg`                                  | Sets the line-height property on the `card__title` element.                                     |
| `$title-font-weight`          | `core.$font-weight-semi-bold`                           | Sets the font-weight property on the `card__title` element.                                     |
| `$screen-opacity`             | `0.7`                                                   | Sets the opacity property on the `card__screen` element.                                        |
| `$screen-background`          | `core.$night`                                           | Sets the background property on the `card__screen` element.                                     |
| `$invert-background`          | `core.$night`                                           | Sets the background property of the `card_invert` modifier.                                     |
| `$invert-border-color`        | `null`                                                  | Sets the border-color property of the `card_invert` modifier.                                   |
| `$invert-sep-border-color`    | `core.$border-color-invert`                             | Sets the border-color property that separates card elements of the `card_invert` modifier.      |
| `$invert-color`               | `core.$white`                                           | Sets the background property of the `card_invert` modifier.                                     |
| `$link-shadow`                | `core.$box-shadow-2`                                    | Sets the box-shadow property of the `card_link` modifier.                                       |
| `$link-shadow-hover`          | `core.$box-shadow-3`                                    | Sets the box-shadow property of the `card_link` modifier on `:hover` state.                     |
| `$link-offset`                | `0.25em`                                                | Sets the distance that the card will travel vertically on `:hover` of the `card_link` modifier. |
