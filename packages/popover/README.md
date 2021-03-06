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

- `data-popover` - Placed on our popover component itself.
- `data-popover-trigger` - Placed on any element we use to trigger the popover.

```html
<button data-popover-trigger>...</button>
<div class="popover" data-popover>
  ...
</div>
```

If the data attributes are valueless, the popover trigger will try to find it's associated popover by inspecting the next sibling element. If the popover can't be placed as a direct sibling of the trigger, you should give both attributes a shared unique ID to link them together. The popover can then be placed anywhere in the DOM, but it is still recommended to be as closely after the trigger as possible for keyboard focus tabbing accessibility.

```html
<button data-popover-trigger="unique-id">...</button>

<!-- Somewhere else in the DOM -->
<div class="popover" data-popover="unique-id">
  ...
</div>
```

#### `data-popover-arrow`

The popover arrow is an inner element of the popper that is positioned center relative to the reference element. This can be defined using the `popover__arrow` class for styling and is hooked into the JavaScript implementation using the `data-popover-arrow` boolean attribute.

```html
<button data-popover-trigger>...</button>
<div class="popover" data-popover>
  ...
  <span class="popover__arrow" data-popover-arrow></span>
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

#### Available Placement Values

- `auto` - Will choose the side with the most space.
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

| Sass                | CSS                          | Description                                                                                                                                                                                   |
| ------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$event`            | `--popover-event`            | Controls the event type in the same way `data-popover-event` does. Can be set to `click` or `hover`.                                                                                          |
| `$placement`        | `--popover-placement`        | Controls the preferred placement for the popover in the same way `data-popover-placement` does. [More details &rarr;](https://popper.js.org/docs/v2/constructors/#placement)                  |
| `$offset`           | `--popover-offset`           | Controls the distance from the reference element (`data-popover-trigger`) that a popover will position itself. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/offset/)         |
| `$overflow-padding` | `--popover-overflow-padding` | Controls the distance before a popover is cut off and will try to reposition itself to stay visible. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/prevent-overflow/#padding) |
| `$flip-padding`     | `--popover-flip-padding`     | Controls the distance before a popover is cut off and will try to flip it's placement to stay visible. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/flip/#padding)           |
| `$arrow-padding`    | `--popover-arrow-padding`    | Controls the distance before a popover arrow reaches the edge of the popover. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/arrow/#padding)                                   |


The advantage to having these values set by a CSS variable is that they can be given new values for specific use cases either in your own stylesheet or by setting the variables in a `style` attribute.

```html
<div style="--popover-offset: 0;">
  <div style="--popover-placement: right;">
    ...
  </div>
  <div style="--popover-placement: left;">
    ...
  </div>
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

| Variable                 | Default                | Description                                                                                                                     |
| ------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`          | `null`                 | String to prefix blocks with.                                                                                                   |
| `$prefix-element`        | `"__"`                 | String to prefix elements with.                                                                                                 |
| `$prefix-modifier`       | `"_"`                  | String to prefix modifiers with.                                                                                                |
| `$prefix-modifier-value` | `"_"`                  | String to prefix modifier values with.                                                                                          |
| `$event`                 | `null`                 | Outputs a CSS variable for setting the default popover behavior. Can either be `click` or `hover`.                              |
| `$placement`             | `null`                 | Outputs a CSS variable for setting the preferred popover placement.                                                             |
| `$offset`                | `8`                    | Sets the distance from the reference element that a popover will position itself. Also outputs a CSS variable.                  |
| `$overflow-padding`      | `10`                   | Sets the distance before a popover is cut off and will try to reposition itself to stay visible. Also outputs a CSS variable.   |
| `$flip-padding`          | `10`                   | Sets the distance before a popover is cut off and will try to flip it's placement to stay visible. Also outputs a CSS variable. |
| `$arrow-padding`         | `10`                   | Sets the distance before a popover arrow reaches the edge of the popover.                                                       |
| `$z-index`               | `10`                   | Sets the z-index property.                                                                                                      |
| `$width`                 | `16em`                 | Sets the width property.                                                                                                        |
| `$padding`               | `0.5em`                | Sets the padding property.                                                                                                      |
| `$border`                | `null`                 | Sets the border property.                                                                                                       |
| `$border-radius`         | `core.$border-radius`  | Sets the border-radius property.                                                                                                |
| `$background`            | `core.$white`          | Sets the background property.                                                                                                   |
| `$background-clip`       | `padding-box`          | Sets the background-clip property.                                                                                              |
| `$box-shadow`            | `core.$box-shadow-8dp` | Sets the box-shadow property.                                                                                                   |
| `$font-size`             | `core.$font-size-sm`   | Sets the font-size property.                                                                                                    |
| `$line-height`           | `null`                 | Sets the line-height property.                                                                                                  |
| `$arrow-size`            | `8px`                  | Sets the width and height properties of the `popover__arrow` element.                                                           |
| `$arrow-border`          | `core.$border-light`   | Sets the border property of the `popover__arrow` element.                                                                       |
| `$size-sm-width`         | `12em`                 | Sets the width property of the `popover_size_sm` modifier.                                                                      |
| `$size-lg-width`         | `20em`                 | Sets the width property of the `popover_size_lg` modifier.                                                                      |

### JavaScript Options

| Key              | Default               | Description                                                      |
| ---------------- | --------------------- | ---------------------------------------------------------------- |
| `autoInit`       | `false`               | Automatically initializes the instance.                          |
| `dataPopover`    | `'popover'`           | Data attribute for defining a popover.                           |
| `dataTrigger`    | `'popover-trigger'`   | Data attribute for defining a popover trigger.                   |
| `dataArrow`      | `'popover-arrow'`     | Data attribute for defining a popover arrow.                     |
| `dataEventType`  | `'popover-event'`     | Data attribute for setting the popover event type.               |
| `dataPlacement`  | `'popover-placement'` | Data attribute for setting the preferred placement of a popover. |
| `stateActive`    | `'is-active'`         | Class used for active state.                                     |
| `eventType`      | `'click'`             | The default event type. Can be either `'click'` or `'hover'`.    |
| `eventListeners` | `true`                | Whether or not to output global event listeners.                 |
| `placement`      | `'bottom-start'`      | The default preferred placement.                                 |

## API

### `popover.collection`

An array where all registered popovers are stored. Each entry in the collection takes the following format:

```js
{
  state: String, // The current state of the popover. Either 'hide' or 'show'
  trigger: HTMLElement, // The popover trigger HTML element
  target: HTMLElement, // The popover HTML element
  config: Object // Stores the popover configuration options
  popper: Object // The popper JS instance
  __eventListeners: Array // An array of active event listener details and references
}
```

### `popover.init(options)`

Initializes the popover instance. During initialization, the following processes are run:

- Builds the popover collection by running `registerCollection()`
- Sets up the global event listeners by running `initEventListeners()`

**Parameters**

- `options [Object] (optional) (default null)` An options object for passing your custom settings.

```js
const popover = new Popover();
popover.init();
```

### `popover.destroy()`

Destroys and cleans up the popover instantiation. During cleanup, the following processes are run:

- Builds the popover collection by running `deregisterCollection()`
- Sets up the global event listeners by running `destroyEventListeners()`

```js
const popover = new Popover();
popover.init();
// ...
popover.destroy();
```

### `popover.initEventListeners(processCollection)`

Set the document event listeners.

**Parameters**

- `processCollection [Boolean] (default true)` Whether or not to process the event listeners of popover collection.

```js
const drawer = new Drawer({ eventListeners: false });
drawer.init();
drawer.initEventListeners();
```

### `popover.destroyEventListeners(processCollection)`

Remove the document event listeners.

**Parameters**

- `processCollection [Boolean] (default true)` Whether or not to process the event listeners of popover collection.

```js
const drawer = new Drawer();
drawer.init();
// ...
drawer.destroyEventListeners();
```

### `popover.register(trigger, target)`

Registers a popover into the collection. This also sets the initial state, creates the popper instance and attaches event listeners.

**Parameters**

- `trigger [HTMLElement]` The popover trigger element.
- `target [HTMLElement] (optional) (default false)` The popover element. If not provided, a popover element will be searched for using the trigger element.

**Returns**

- `Object` The popover object that got stored in the collection.

```js
const trigger = document.querySelector('[data-popover-trigger]');
const obj = popover.register(trigger);

console.log(obj);
// => Object { state: "hide", trigger: HTMLElement, target: HTMLElement, popper: {…}, ... }
```

### `popover.deregister(popover)`

Deregister the popover from the collection. This hides the popover if it's active, cleans up the popper instance, removes event listeners and then removes the entry from the collection.

**Parameters**

- `popover [Object]` The popover instance in the collection to deregister.

**Returns**

- `Array` Returns the newly modified collection array.

```js
const item = popover.collection[0];
const array = popover.deregister(item);

console.log(array);
// => Array []
```

### `popover.registerCollection()`

Registers all popovers in the DOM to the collections array. This is done by getting all popover triggers and running them through the `register()` method.

**Returns**

- `Array` Returns the collection array.

```js
popover.registerCollection()
// => Array [...]
```

### `popover.deregisterCollection()`

Deregister all popovers in the collections array. This is done by looping through the collection's array and passing each popover through the `deregister()` method.

**Returns**

- `Array` Returns a now empty collection array.

```js
popover.registerCollection()
// => Array []
```

### `popover.show(popover)`

Used to show a specific popover.

**Parameters**

- `popover [Object]` The popover instance that should be shown.

**Returns**

- `Object` The popover object has been shown.

```js
const item = popover.collection[0];
popover.show(item)
// => Object { state: "show", ... }
```

### `popover.hide(popover)`

Used to hide a specific popover.

**Parameters**

- `popover [Object]` The popover instance that should be hidden.

**Returns**

- `Object` The popover object has been hidden.

```js
const item = popover.collection[0];
popover.show(item)
// => Object { state: "hide", ... }
```

### `popover.hideAll()`

Hides all popovers. This searches for all shown popovers in the collection and hides them.

**Returns**

- `Array` Returns the collection array.

```js
popover.hideAll();
// => Array [...]
```
