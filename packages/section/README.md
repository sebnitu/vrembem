# Section

A container component for wrapping distinct sections of a page.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fsection.svg)](https://www.npmjs.com/package/%40vrembem%2Fsection)

[Documentation](https://vrembem.com/packages/section)

## Installation

```sh
npm install @vrembem/section
```

### Styles

```scss
@use "@vrembem/section";
```

### Markup

Sections are composed using the base wrapper (`section`) along with three optional elements. The `section__container` element's primary purpose is to wrap content with a max-width and centered using margin auto. The other two element's—`section__background` and `section__screen` (usually used together)—add a background image and colored screen that fills the full size of the section component.

- `section`
  - `section__container`
  - `section__background`
  - `section__screen`

```html
<section class="section">
  <div class="section__container">
    ...
  </div>
  <img class="section__background" src="..." />
  <div class="section__screen"></div>
</section>
```

> Depending on contrast when using background and screen elements, it may be needed to invert the text color of the section content for readability.

## Modifiers

### `section_size_[key]`

Sections have a few size modifier options to help adjust the space that is used based on how prominent the section needs to be. These are optimized for all screen sizes to avoid oversized areas on mobile. These values are built using the [`$padding-scale`](#padding-scale) map.

* `section_size_xs`
* `section_size_sm`
* `section_size_md`
* `section_size_lg`
* `section_size_xl`

```html
<section class="section section_size_xl">
  ...
</section>
```

## Customization

### Sass Variables

| Variable                 | Default                               | Description                                                       |
| ------------------------ | ------------------------------------- | ----------------------------------------------------------------- |
| `$prefix-block`          | `null`                                | String to prefix blocks with.                                     |
| `$prefix-element`        | `"__"`                                | String to prefix elements with.                                   |
| `$prefix-modifier`       | `"_"`                                 | String to prefix modifiers with.                                  |
| `$prefix-modifier-value` | `"_"`                                 | String to prefix modifier values with.                            |
| `$max-width`             | `70rem`                               | Sets the max-width property on the section container element.     |
| `$screen-opacity`        | `0.7`                                 | Sets the opacity property on the section screen element.          |
| `$screen-background`     | `core.$night`                         | Sets the background-color property on the section screen element. |
| `$padding`               | [Sass map ref &darr;](#padding)       | Sets the default padding for the section component.               |
| `$padding-scale`         | [Sass map ref &darr;](#padding-scale) | Used to build the size modifiers for the section component.       |

#### `$padding`

Sets the default padding for the section component. Each key in the map represents a breakpoint to apply the specified padding value. The `base` key is applied with no media query.

```scss
$padding: (
  'base': 1.5em,
  'md': 2em 1.5em,
  'lg': 3em 1.5em
) !default;
```

#### `$padding-scale`

Used to build the `section_size_[key]` modifier where each key represents a map of breakpoint and padding value pairs for the size key modifier. The `base` key is applied with no media query.

```scss
$padding-scale: (
  'xs': (
    'base': 0,
    'md': 0,
    'lg': 0
  ),
  'sm': (
    'base': 1em,
    'md': 1em,
    'lg': 1em
  ),
  'md': (
    'base': 1.5em,
    'md': 2em 1.5em,
    'lg': 3em 1.5em
  ),
  'lg': (
    'base': 1.5em,
    'md': 4em 1.5em,
    'lg': 6em 1.5em
  ),
  'xl': (
    'base': 3em 1.5em,
    'md': 8em 2em,
    'lg': 12em 2em
  )
) !default;
```
