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

## Customization

### Sass Variables

| Variable                     | Default                           | Description                                                                                |
| ---------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| `$prefix-block`              | `null`                            | String to prefix blocks with.                                                              |
| `$prefix-element`            | `"__"`                            | String to prefix elements with.                                                            |
| `$prefix-modifier`           | `"_"`                             | String to prefix modifiers with.                                                           |
| `$prefix-modifier-value`     | `"_"`                             | String to prefix modifier values with.                                                     |
| `$background`                | `null`                            | Sets the background property.                                                              |
| `$foreground`                | `--vb-foreground-lighter`         | Sets the color property.                                                                   |
| `$delimiter`                 | `"/"`                             | Sets the delimiter character used after each `breadcrumb__item` element.                   |
| `$delimiter-color`           | `--vb-border-color-dark`          | Sets the color property for the delimiter character.                                       |
| `$delimiter-padding`         | `0 0.5em`                         | Sets the padding property for the delimiter character.                                     |
| `$delimiter-last`            | `false`                           | Whether or not to render the delimiter at the end of the breadcrumb.                       |
| `$link-color`                | `base.$link-color`                | Sets the color property on the `breadcrumb__link` element.                                 |
| `$link-color-hover`          | `base.$link-color-hover`          | Sets the color property on the `breadcrumb__link` element for its `:hover` state.          |
| `$link-decoration`           | `base.$link-decoration`           | Sets the decoration property on the `breadcrumb__link` element.                            |
| `$link-decoration-hover`     | `base.$link-decoration-hover`     | Sets the decoration property on the `breadcrumb__link` element for its `:hover` state.     |
| `$link-outline-focus`        | `base.$link-outline-focus`        | Sets the outline property on the `breadcrumb__link` element for its `:focus` state.        |
| `$link-outline-focus-offset` | `base.$link-outline-focus-offset` | Sets the outline-offset property on the `breadcrumb__link` element for its `:focus` state. |
