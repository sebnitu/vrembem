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

The popover is a simple container component consisting of the `popover` class. To hook up the necessary JavaScript behavior, you'll need the following data attributes:

- `data-popover` - This is placed on our popover component itself.
- `data-popover-trigger` - This is placed on any element we use to trigger our popover.

```html
<button data-popover-trigger>...</button>
<div class="popover" data-popover>
  ...
</div>
```

If the data attributes are valueless, the popover trigger will try to find it's associated popover by inspecting the next sibling element. If the popover can't be placed as a direct sibling of the trigger, you should give them both a shared unique ID to link them together. The popover can then be placed anywhere in the DOM, but it is still recommended to be as closely after the trigger as possible for keyboard focus tabbing accessibility.

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

Alternatively, this value can be overridden using the [`--popover-event` CSS variable](#css-variables). This can be done either through your own custom CSS or using the `style` attribute. You can also set the event type on a per-popover basis by using the `data-popover-event` attribute and giving it an event type value.

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
  placement: 'top'
});

// Set on initialization
popover.init({
  placement: 'bottom'
});
```

Alternatively, this value can be overridden using the [`--popover-placement` CSS variable](#css-variables). This can be done either through your own custom CSS or using the `style` attribute. If you'd like to set the preferred popover placement per-popover, use the `data-popover-placement` attribute providing a valid placement value.

```html
<div class="popover" data-popover data-popover-placement="top">
  ...
</div>
```

**Available Placement Values**

- `auto` - Will choose the side with most space.
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

Popover provides some CSS variables on the `:root` element for controlling the event type, preferred placement, offset and overflow-padding. They're consumed by the JavaScript implementation to set options dynamically. These are the Sass variable that output CSS variables:

- `$event` &rarr; `--popover-event` - Controls the event type in the same way `data-popover-event` does. Can be set to `click` or `hover`.
- `$placement` &rarr; `--popover-placement` - Controls the preferred placement for the popover in the same way `data-popover-placement` does. [More details &rarr;](https://popper.js.org/docs/v2/constructors/#placement)
- `$offset` &rarr; `--popover-offset` - Controls the distance from the reference element (`data-popover-trigger`) that a popover will position itself. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/offset/)
- `$overflow-padding` &rarr; `--popover-overflow-padding` - Controls the distance before a popover is cut off and will try to reposition itself to stay visible. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/prevent-overflow/#padding)

The advantage to having these values set via a CSS variable is that they can be given new values for specific use cases either in your own stylesheet or by setting the variables in a `style` attribute.

```css
.header .popover {
  --popover-placement: bottom;
}
```

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

<!--
$event: null !default;
$placement: null !default;
$offset: 8 !default;
$overflow-padding: 10 !default;

$z-index: 10 !default;
$width: 16em !default;
$padding: 0.5em !default;
$border: null !default;
$border-radius: core.$border-radius !default;
$background: core.$white !default;
$background-clip: padding-box !default;
$box-shadow: core.$box-shadow-8dp !default;
$font-size: core.$font-size-sm !default;
$line-height: null !default;

$size-sm-width: 12em !default;
$size-lg-width: 20em !default;
-->

### JavaScript Options

| Key        | Default | Description                             |
| ---------- | ------- | --------------------------------------- |
| `autoInit` | `false` | Automatically initializes the instance. |

<!--
// Data attributes
dataPopover: 'popover',
dataTrigger: 'popover-trigger',
dataEventType: 'popover-event',
dataPlacement: 'popover-placement',

// State classes
stateActive: 'is-active',

// Feature toggles
eventType: 'click',
eventListeners: true,
placement: 'bottom-start'
-->

## API

### `popover.init(options)`

...

**Parameters**

- `options [Object] (optional)` An options object for passing your custom settings.

```js
const popover = new popover();
popover.init();
```

<!--
init(options = null)
destroy()
initEventListeners(processCollection = true)
destroyEventListeners(processCollection = true)
register(trigger, target = false)
unregister(popover)
registerEventListeners(popover)
unregisterEventListeners(popover)
registerCollection()
unregisterCollection()
show(popover)
hide(popover)
hideAll()
-->
