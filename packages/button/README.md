# Button

Buttons are a simple component that allow users to take actions.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fbutton.svg)](https://www.npmjs.com/package/%40vrembem%2Fbutton)

[Documentation](https://vrembem.com/packages/button)

## Installation

```sh
npm install @vrembem/button
```

### Styles

```scss
@use "@vrembem/button";
```

### Markup

The most basic imlementation of the button component consists of the `button` class that can be applied to `<button>`, `<input type="button">` or `<a role="button">` elements. [Remember to add `role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) to any none semantic buttons as needed.

```html
<button class="button">Button</button>
<input class="button" type="button" value="Button">
<a class="button" role="button">Button</a>
```

When disabled using the `disabled` attribute, a button will inherit styles to visually appear noninteractive.

```html
<button class="button" disabled>Button</button>
<input class="button" type="button" value="Button" disabled>
<a class="button" role="button" disabled>Button</a>
```

Elements within a button are centered vertically and spaced accordingly using the value set in `$inner-spacing` (defaults to `0.5em`). When elements are added inside a button, the button's text should also be wrapped in a `<span>` so that it can be spaced properly.

```html
<button class="button">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
  <span>Button</span>
  <span class="arrow"></span>
</button>
```
