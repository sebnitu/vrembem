# Popover

A component that is initially hidden and revealed upon user interaction either through a click or hover event. Popover can contain lists of actions, links, or additional supplementary content.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fpopover.svg)](https://www.npmjs.com/package/%40vrembem%2Fpopover)

[Documentation](https://vrembem.com/packages/popover)

## Installation

```sh
npm install @vrembem/popover
```

### Styles

```scss
@use "@vrembem/popover";
```

### JavaScript

```js
import Popover from '@vrembem/popover';
const popover = new Popover({ autoInit: true });
```

### Markup

The popover component consists of a single element with the `popover` class. To hook up the necessary JavaScript behavior, you'll need the following data attributes:

- `data-popover` - This is placed on our popover component itself.
- `data-popover-trigger` - This is placed on any element we use to trigger our popover.

```html
<button data-popover-trigger>...</button>
<div class="popover" data-popover>
  ...
</div>
```

If the data attributes are valueless, the popover trigger will try to find it's associated popover by inspecting it's sibling element. If you're not able to place the popover directly following the trigger, you should give them both a shared unique ID to link them together. The popover can then be placed anywhere in the DOM, but is still recommended to be as closely after the trigger as possible for keyboard accessibility.

```html
<button data-popover-trigger="unique-id">...</button>

<!-- Somewhere else in the DOM -->
<div class="popover" data-popover="unique-id">
  ...
</div>
```

#### `data-popover-event`

There are two event types to trigger a popover, `click` (the default) or `hover` (hover also applies focus events). You an set your preferred default event type by passing it as an option on instantiation or initialization.

```js
// Set on instantiation
const popover = new Popover({
  eventType: 'click'
});

// Set on initialization
popover.init({
  eventType: 'hover'
});
```

You can also set the event type on a per-popover basis by using the `data-popover-event` attribute and giving it an event type value.

```html
<div class="popover" data-popover data-popover-event="hover">
  ...
</div>
```

#### `data-popover-placement`

Popover uses the [Popper JS positioning engine](https://popper.js.org/) to determine the optimal place to display a popover. The default preference is `bottom-start` but can be changed by passing it as an option on instantiation or initialization.

```js
// Set on instantiation
const popover = new Popover({
  placement: 'click'
});

// Set on initialization
popover.init({
  placement: 'hover'
});
```

If you'd like to set the preferred popover placement per-popover, use the `data-popover-placement` attribute and providing a valid placement value.

```html
<div class="popover" data-popover data-popover-placement="top">
  ...
</div>
```

**Available Placement Options**

- `top`
- `top-start`
- `top-end`
- `bottom`
- `bottom-start`
- `bottom-end`
- `left`
- `left-start`
- `left-end`
- `right`
- `right-start`
- `right-end`

#### CSS Variables

Popover sets two CSS variables via `:root` for controlling the offset and offset-overflow. These values are then consumed by the JavaScript implementation and used to set popper's modifier options. The variables are initially set by `$offset` and `$offset-overflow` Sass variables whose values map to `--popover-offset` and `--popover-offset-overflow` respectively.

- `$offset` &rarr; `--popover-offset` - Controls the distance from the reference element (`data-popover-trigger`) that a popover will position itself. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/offset/)
- `$offset-overflow` &rarr; `--popover-offset-overflow` - Controls the distance before a popover is cut off when it will try and reposition itself to stay visible. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/prevent-overflow/#padding)

The advantage to having these values set via a CSS variable is that they can be given new values for specific use cases either in your own stylesheet or by setting the variables in a `style` attribute.

```html
<div class="popover" data-popover style="--popover-offset: 6;">
  ...
</div>
```

## Modifiers

### `popover_size_[value]`

Adjusts the size of the popover. There are two options relative to the default size, `popover_size_sm` and `popover_size_lg`. Also available is `popover_size_auto` which allows the popover to adjust based on it's content.

```html
<div class="popover popover_size_sm" data-popover>
  ...
</div>
```

#### Available Variations

- `popover_size_auto`
- `popover_size_sm`
- `popover_size_lg`

## Customization

### Sass Variables

| Variable                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `$prefix-block`          | `null`  | String to prefix blocks with.          |
| `$prefix-element`        | `"__"`  | String to prefix elements with.        |
| `$prefix-modifier`       | `"_"`   | String to prefix modifiers with.       |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with. |

### JavaScript Options

| Key        | Default | Description                             |
| ---------- | ------- | --------------------------------------- |
| `autoInit` | `false` | Automatically initializes the instance. |

## API

### `popover.init(options)`

...

**Parameters**

- `options [Object] (optional)` An options object for passing your custom settings.

```js
const popover = new popover();
popover.init();
```
