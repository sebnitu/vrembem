# Breadcrumb

A navigation component that shows the hierarchical path to a users current location.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fbreadcrumb.svg)](https://www.npmjs.com/package/%40vrembem%2Fbreadcrumb)

[Documentation](https://vrembem.com/packages/breadcrumb)

## Installation

```sh
npm install @vrembem/breadcrumb
```

### Styles

```scss
@use "@vrembem/breadcrumb";
```

### Markup

The breadcrumb component is composed of three parts: `breadcrumb`, `breadcrumb__item` and `breadcrumb__link`.

```html
<ol class="breadcrumb">
  <li class="breadcrumb__item">
    <a href="/" class="breadcrumb__link">Home</a>
  </li>
  ...
  <li class="breadcrumb__item">
    Current Page
  </li>
</ol>
```

## Modifiers

### `breadcrumb_invert`

Inverts the colors of the breadcrumb component to be used on dark backgrounds when more contrast is needed.

```html
<ol class="breadcrumb breadcrumb_invert">
  ...
</ol>
```

## Customization

### Sass Variables

| Variable                    | Default                            | Description                                                                                                            |
| --------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`             | `null`                             | String to prefix blocks with.                                                                                          |
| `$prefix-element`           | `"__"`                             | String to prefix elements with.                                                                                        |
| `$prefix-modifier`          | `"_"`                              | String to prefix modifiers with.                                                                                       |
| `$prefix-modifier-value`    | `"_"`                              | String to prefix modifier values with.                                                                                 |
| `$color`                    | `core.$color-subtle`               | Sets the color property.                                                                                               |
| `$delimiter`                | `"/"`                              | Sets the delimiter character used after each `breadcrumb__item` element.                                               |
| `$delimiter-color`          | `core.$border-color-dark`          | Sets the color property for the delimiter character.                                                                   |
| `$delimiter-padding`        | `0 0.5em`                          | Sets the padding property for the delimiter character.                                                                 |
| `$delimiter-last`           | `false`                            | Whether or not to render the delimiter at the end of the breadcrumb.                                                   |
| `$link-color`               | `base.$link-color`                 | Sets the color property on the `breadcrumb__link` element.                                                             |
| `$link-color-hover`         | `base.$link-color-hover`           | Sets the color property on the `breadcrumb__link` element for its `:hover` state.                                      |
| `$link-border`              | `core.$border`                     | Sets the border property on the `breadcrumb__link` element.                                                            |
| `$link-border-hover`        | `1px solid base.$link-color-hover` | Sets the border property on the `breadcrumb__link` element for its `:hover` state.                                     |
| `$invert-color`             | `core.$color-invert-subtle`        | Sets the color property on the `breadcrumb_invert` modifier.                                                           |
| `$invert-delimiter-color`   | `core.$border-color-invert-dark`   | Sets the color property for the delimiter character on the `breadcrumb_invert` modifier.                               |
| `$invert-link-color`        | `base.$link-invert-color`          | Sets the color property on the `breadcrumb__link` element on the `breadcrumb_invert` modifier.                         |
| `$invert-link-color-hover`  | `base.$link-invert-color-hover`    | Sets the color property on the `breadcrumb__link` element on the `breadcrumb_invert` modifier for its `:hover` state.  |
| `$invert-link-border`       | `core.$border-invert`              | Sets the border property on the `breadcrumb__link` element on the `breadcrumb_invert` modifier.                        |
| `$invert-link-border-hover` | `1px solid core.$white`            | Sets the border property on the `breadcrumb__link` element on the `breadcrumb_invert` modifier for its `:hover` state. |
