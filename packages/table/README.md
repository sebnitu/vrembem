# Table

A table component for displaying HTML tables.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Ftable.svg)](https://www.npmjs.com/package/%40vrembem%2Ftable)

[Documentation](https://vrembem.com/packages/table)

## Installation

```sh
npm install @vrembem/table
```

### Styles

```scss
@use "@vrembem/table";
```

### Markup

For basic table styles, only the `table` component class is required. Use [proper HTML table markup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) and styles should apply as expected.

```html
<table class="table">
  <caption>...</caption>
  <thead>
    <tr>
      <th>...</th>
      ...
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>...</td>
      ...
    </tr>
    ...
  </tbody>
</table>
```

For simple responsive table styles, wrap your tables in the [`scroll-box` base module](https://github.com/sebnitu/vrembem/tree/main/packages/base#scroll-box) which provides horizontal scrolling when tables can't fit in their container.

```html
<div class="scroll-box">
  <table class="table">
    ...
  </table>
</div>
```

## Modifiers

### `table_ellipsis`

Switches a table layout to `fixed` and adds ellipsis overflow styles to table cells and headers.

```html
<table class="table table_ellipsis">
  ...
</table>
```

Space will be split equally between columns when `table_ellipsis` is applied. For more control over specific column widths, use the `<colgroup>` and `<col>` elements and set their desired widths as needed.

```html
<table class="table table_ellipsis">
  <colgroup>
    <col style="width: 50px;">
  </colgroup>
  ...
</table>
```

### `table_hover`

Adds hover and focus state styles for table row (`<tr>`) elements.

```html
<table class="table table_hover">
  ...
</table>
```

### `table_responsive_[key]`

When the [`scroll-box` base module](https://github.com/sebnitu/vrembem/tree/main/packages/base#scroll-box) isn't mobile friendly enough, this modifier adds responsive styles to a table so that it's easier to read on specific breakpoints. This is done by using the `data-mobile-label` attribute on table cells that should correspond to the table column header for that specific cell. Use the value-less `table_responsive` modifier to apply these styles universally.

```html
<table class="table table_responsive_lg">
  <thead>
    <tr>
      <th>key</th>
      <th>value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-mobile-label="key">...</td>
      <td data-mobile-label="value">...</td>
    </tr>
  </tbody>
</table>
```

The mobile label value will be truncated if it exceeds the width set by `$mobile-label-width`, so keep the label terse when possible.

#### Available Variations

- `table_responsive`
- `table_responsive_xs`
- `table_responsive_sm`
- `table_responsive_md`
- `table_responsive_lg`
- `table_responsive_xl`

#### `@mixin table-responsive-styles()`

Output responsive table styles. This is used to generate the styles for the `table_responsive_[key]` modifier.

**Example**

```scss
.table_custom_modifier {
  @include table-responsive-styles();
}
```

### `table_size_[value]`

Adjust the size of a table by increasing or decreasing cell padding.

```html
<table class="table table_size_sm">
  ...
</table>
```

#### Available Variations

- `table_size_sm`
- `table_size_lg`

### `table_style_[value]`

Adds table styles based on the provided value.

```html
<table class="table table_style_rowed">
  ...
</table>
```

#### Available Variations

- `table_style_rowed`
- `table_style_bordered`

### `table_zebra`

Adds zebra styled rows to a table to help increase its readability. This is done by alternating the background color of rows to help guide the reader's eye.

```html
<table class="table table_zebra">
  ...
</table>
```

## Customization

### Sass Variables

| Variable                    | Default                                        | Description                                                                                                  |
| --------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `$prefix-block`             | `null`                                         | String to prefix blocks with.                                                                                |
| `$prefix-element`           | `"__"`                                         | String to prefix elements with.                                                                              |
| `$prefix-modifier`          | `"_"`                                          | String to prefix modifiers with.                                                                             |
| `$prefix-modifier-value`    | `"_"`                                          | String to prefix modifier values with.                                                                       |
| `$breakpoints`              | [`core.$breakpoints` Ref &darr;](#breakpoints) | The breakpoints map the [`table_responsive_[key]` modifier](#table_responsive_key) uses to build its styles. |
| `$padding`                  | `core.$padding`                                | Sets the padding property on the `<th>`, `<td>` and `<caption>` elements.                                    |
| `$padding-sm`               | `core.$padding-sm`                             | Sets the padding property of the `table_size_sm` modifier.                                                   |
| `$padding-lg`               | `core.$padding-lg`                             | Sets the padding property of the `table_size_lg` modifier.                                                   |
| `$border-color`             | `core.$border-color`                           | Sets the border-color value in `$border` and `$border-alt` variables.                                        |
| `$border`                   | `1px solid $border-color`                      | Sets the border property.                                                                                    |
| `$border-alt`               | `1px dotted $border-color`                     | Sets the border property in between `<td>` elements of the `table_responsive_[key]` modifier.                |
| `$background`               | `null`                                         | Sets the background-color property.                                                                          |
| `$background-zebra`         | `rgba(core.$black, 0.03)`                      | Sets the background-color property of the `table_zebra` modifier.                                            |
| `$background-hover`         | `rgba(core.$yellow, 0.3)`                      | Sets the background-color property of the `table_hover` modifier.                                            |
| `$box-shadow-hover`         | `null`                                         | Sets the box-shadow property of the `table_hover` modifier.                                                  |
| `$color`                    | `null`                                         | Sets the color property.                                                                                     |
| `$color-hover`              | `null`                                         | Sets the color property of the `table_hover` modifier.                                                       |
| `$th-font-weight`           | `core.$font-weight-bold`                       | Sets the font-weight property on the `<th>` element.                                                         |
| `$th-background`            | `null`                                         | Sets the background-color property on the `<th>` element.                                                    |
| `$td-background`            | `null`                                         | Sets the background-color property on the `<td>` element.                                                    |
| `$mobile-label-attr`        | `"data-mobile-label"`                          | Attribute value to use for settings the mobile label of the `table_responsive_[key]` modifier.               |
| `$mobile-label-width`       | `8rem`                                         | Sets the width property on the mobile label pseudo-element.                                                  |
| `$mobile-label-background`  | `null`                                         | Sets the background-color property on the mobile label pseudo-element.                                       |
| `$mobile-label-color`       | `null`                                         | Sets the color property on the mobile label pseudo-element.                                                  |
| `$mobile-label-font-weight` | `core.$font-weight-semi-bold`                  | Sets the font-weight property on the mobile label pseudo-element.                                            |

#### `$breakpoints`

The breakpoints map the [`table_responsive_[key]` modifier](#table_responsive_key) uses to build its styles.

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
