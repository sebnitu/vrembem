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

The popover is a simple container component consisting of the `popover` class and an `id`. Popover triggers should have an `aria-controls` attribute set to the ID of the popover element.

```html
<button aria-controls="unique-id">...</button>
<div class="popover" id="unique-id">
  ...
</div>
```

#### `popover__arrow`

Adds an arrow to a popover using an empty `<div>` or `<span>` with the `popover__arrow` class. Popover arrows are positioned center relative to the reference element.

```html
<button aria-controls="unique-id">...</button>
<div id="unique-id" class="popover">
  ...
  <span class="popover__arrow"></span>
</div>
```

#### Event Type

There are two event types that can trigger a popover: `click` (the default) and `hover` (hover also applies focus events). You an set your preferred default event type by passing it as an option on instantiation or initialization.

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

Alternatively, this value can be overridden using the [`--vb-popover-event` CSS variable](#css-variables). This can be done either through your own custom CSS or using the `style` attribute.

```html
<div class="popover" style="--vb-popover-event: hover;">
  ...
</div>
```

#### Placement

Popover uses the [Popper JS positioning engine](https://popper.js.org/) to determine the optimal place to display a popover. The default preference is `bottom` but can be changed by passing it as an option on instantiation or initialization.

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

Alternatively, this value can be overridden using the [`--vb-popover-placement` CSS variable](#css-variables). This can be done either through your own custom CSS or using the `style` attribute.

```html
<div class="popover" style="--vb-popover-placement: top;">
  ...
</div>
```

#### Available Placement Values

- `auto`
- `auto-start`
- `auto-end`
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

Popover provides CSS variables on the `:root` element for controlling the event type, preferred placement, offset and overflow-padding. They're consumed by the JavaScript implementation to set options dynamically. The following Sass variable are output as CSS variables:

| Sass                | CSS                             | Description                                                                                                                                                                                   |
| ------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$event`            | `--vb-popover-event`            | Controls the event type. Can be set to `click` or `hover`.                                                                                                                                    |
| `$placement`        | `--vb-popover-placement`        | Controls the preferred placement for the popover. [More details &rarr;](https://popper.js.org/docs/v2/constructors/#placement)                                                                |
| `$offset`           | `--vb-popover-offset`           | Controls the distance from the popover trigger element (`aria-controls`) that a popover will position itself. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/offset/)          |
| `$overflow-padding` | `--vb-popover-overflow-padding` | Controls the distance before a popover is cut off and will try to reposition itself to stay visible. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/prevent-overflow/#padding) |
| `$flip-padding`     | `--vb-popover-flip-padding`     | Controls the distance before a popover is cut off and will try to flip it's placement to stay visible. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/flip/#padding)           |
| `$arrow-padding`    | `--vb-popover-arrow-padding`    | Controls the distance before a popover arrow reaches the edge of the popover. [More details &rarr;](https://popper.js.org/docs/v2/modifiers/arrow/#padding)                                   |

The advantage to having these values set by a CSS variable is that they can be given new values for specific use cases either in your own stylesheet or by setting the variables in a `style` attribute.

```html
<div style="--vb-popover-offset: 0;">
  <div style="--vb-popover-placement: right;">
    ...
  </div>
  <div style="--vb-popover-placement: left;">
    ...
  </div>
</div>
```

## Modifiers

### `popover_size_[value]`

Adjusts the size of the popover. There are two options relative to the default size, `popover_size_sm` and `popover_size_lg`. Also available is `popover_size_auto` which allows the popover to adjust size based on its content.

```html
<div id="unique-id" class="popover popover_size_sm">
  ...
</div>
```

#### Available Variations

- `popover_size_auto`
- `popover_size_sm`
- `popover_size_lg`

### `popover_tooltip`

Applies styles to create a popover tooltip. The default placement of a tooltip is `top` and are triggered by the `hover` and `focus` events. Tooltips also require a different set of attributes for accessibility:

- The popover element should have the `role="tooltip"` set.
- The popover trigger should have `aria-describedby` (instead of `aria-controls`) set to the ID of the popover element.

```html
<span aria-describedby="unique-id">HTML</span>
<div id="unique-id" class="popover popover_tooltip" role="tooltip">
  Hypertext Markup Language
  <span class="popover__arrow"></span>
</div>
```

> For more information regarding tooltip accessibility and best practices: [ARIA: tooltip role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)

## Customization

### Sass Variables

| Variable                 | Default                | Description                                                                                                                     |
| ------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-variable`       | `null`                 | String to prefix CSS variables with.                                                                                            |
| `$prefix-block`          | `null`                 | String to prefix blocks with.                                                                                                   |
| `$prefix-element`        | `"__"`                 | String to prefix elements with.                                                                                                 |
| `$prefix-modifier`       | `"_"`                  | String to prefix modifiers with.                                                                                                |
| `$prefix-modifier-value` | `"_"`                  | String to prefix modifier values with.                                                                                          |
| `$event`                 | `null`                 | Outputs a CSS variable for setting the default popover behavior. Can either be `click` or `hover`.                              |
| `$placement`             | `null`                 | Outputs a CSS variable for setting the preferred popover placement.                                                             |
| `$offset`                | `8`                    | Sets the distance from the reference element that a popover will position itself. Also outputs a CSS variable.                  |
| `$overflow-padding`      | `10`                   | Sets the distance before a popover is cut off and will try to reposition itself to stay visible. Also outputs a CSS variable.   |
| `$flip-padding`          | `10`                   | Sets the distance before a popover is cut off and will try to flip it's placement to stay visible. Also outputs a CSS variable. |
| `$z-index`               | `10`                   | Sets the z-index property.                                                                                                      |
| `$width`                 | `16em`                 | Sets the width property.                                                                                                        |
| `$max-width`             | `calc(100vw - 20px)`   | Sets the max-width property.                                                                                                    |
| `$padding`               | `0.5em`                | Sets the padding property.                                                                                                      |
| `$border`                | `null`                 | Sets the border property.                                                                                                       |
| `$border-radius`         | `core.$border-radius`  | Sets the border-radius property.                                                                                                |
| `$background`            | `core.$white`          | Sets the background property.                                                                                                   |
| `$background-clip`       | `padding-box`          | Sets the background-clip property.                                                                                              |
| `$box-shadow`            | `core.$box-shadow-8dp` | Sets the box-shadow property.                                                                                                   |
| `$font-size`             | `core.$font-size-sm`   | Sets the font-size property.                                                                                                    |
| `$line-height`           | `null`                 | Sets the line-height property.                                                                                                  |
| `$arrow-size`            | `8px`                  | Sets the width and height properties of the `popover__arrow` element.                                                           |
| `$arrow-padding`         | `10`                   | Sets the distance before a popover arrow reaches the edge of the popover.                                                       |
| `$arrow-border`          | `core.$border-light`   | Sets the border property of the `popover__arrow` element.                                                                       |
| `$size-sm-width`         | `12em`                 | Sets the width property of the `popover_size_sm` modifier.                                                                      |
| `$size-lg-width`         | `20em`                 | Sets the width property of the `popover_size_lg` modifier.                                                                      |

### JavaScript Options

| Key               | Default             | Description                                                   |
| ----------------- | ------------------- | ------------------------------------------------------------- |
| `autoInit`        | `false`             | Automatically initializes the instance.                       |
| `selectorPopover` | `'.popover'`        | Selector for finding popover elements.                        |
| `selectorArrow`   | `'.popover__arrow'` | Selector for finding popover arrow elements.                  |
| `stateActive`     | `'is-active'`       | Class used for active state.                                  |
| `eventType`       | `'click'`           | The default event type. Can be either `'click'` or `'hover'`. |
| `eventListeners`  | `true`              | Whether or not to output global event listeners.              |
| `placement`       | `'bottom'`          | The default preferred placement.                              |

## API

### `popover.collection`

An array where all popover objects are stored when registered. Each popover object contains the following properties:

```js
{
  id: String, // The unique ID of the popover.
  state: String, // The current state of the popover ('closed' or 'opened').
  el: HTMLElement, // The popover HTML element.
  trigger: HTMLElement, // The popover trigger HTML element.
  popper: Object // The popper JS instance.
  config: Object // Stores the popover configuration options.
  open: Function // Method to open this popover.
  close: Function // Method to close this popover.
  deregister: Function // Method to deregister this popover.
}
```

### `popover.init(options)`

Initializes the popover instance. During initialization, the following processes are run:

- Builds the popover collection by running `registerCollection()`
- Sets up the global event listeners by running `initEventListeners()`

**Parameters**

- `options [Object] (optional)` An options object for passing custom settings.

```js
const popover = new Popover();
await popover.init();
```

### `popover.destroy()`

Destroys and cleans up the popover initialization. During cleanup, the following processes are run:

- Deregister the popover collection by running `deregisterCollection()`
- Removes global event listeners by running `destroyEventListeners()`

```js
const popover = new Popover();
await popover.init();
// ...
await popover.destroy();
```

### `popover.initEventListeners(processCollection)`

Set document and collection entry event listeners.

**Parameters**

- `processCollection [Boolean] (default true)` Whether or not to process the event listeners of popover collection.

```js
const popover = new Popover({ eventListeners: false });
await popover.init();
popover.initEventListeners();
```

### `popover.destroyEventListeners(processCollection)`

Remove document and collection entry event listeners.

**Parameters**

- `processCollection [Boolean] (default true)` Whether or not to process the event listeners of popover collection.

```js
const popover = new Popover();
await popover.init();
// ...
popover.destroyEventListeners();
```

### `popover.register(query)`

Registers a popover into the collection. This also sets the initial state, creates the popper instance and attaches event listeners.

**Parameters**

- `query [String | Object]` A popover ID or an HTML element of either a popover or its trigger.

**Returns**

- `Object` The popover object that got stored in the collection.

```js
const result = await popover.register('popover-id');
// => Object { id: 'popover-id', ... }
```

### `popover.deregister(query)`

Deregister the popover from the collection. This closes the popover if it's opened, cleans up the popper instance, removes event listeners and then removes the entry from the collection.

**Parameters**

- `query [String | Object]` A popover ID or an HTML element of either a popover or its trigger.

**Returns**

- `Array` Returns the newly modified collection array.

```js
const result = await popover.deregister('popover-id');
// => Array [{}, {}, ...]
```

### `popover.registerCollection(items)`

Registers array of popovers to the collection. All popovers in array are run through the `register()` method.

**Parameters**

- `items [Array]` An array of popovers or popover IDs to register.

**Returns**

- `Array` Returns the collection array.

```js
const popovers = document.querySelectorAll('.popover');
const result = await popover.registerCollection(popovers);
// => Array [{}, {}, ...]
```

### `popover.deregisterCollection()`

Deregister all popovers in the collections array. All popovers in collection are run through the `deregister()` method.

**Returns**

- `Array` Returns an empty collection array.

```js
const result = await popover.registerCollection();
// => Array []
```

### `popover.get(value, key)`

Used to retrieve a registered popover object from the collection. Query should match the key type to search by: e.g. to search by popover elements, pass the popover html node with a key of `'el'`. Defaults to `'id'`.

**Parameters**

- `value [String | Object]` The value to search for within the collection.
- `key [String] (optional) (default 'id')` The property key to search the value against.

**Returns**

- `Object | undefined` The first element in the collection that matches the provided query and key. Otherwise, undefined is returned.

```js
const entry = popover.get('popover-id');
// => Object { id: 'popover-id', ... }
```

### `popover.open(id)`

Opens a popover using the provided ID.

**Parameters**

- `id [String]` The ID of the popover that should be opened.

**Returns**

- `Object` The popover object that was opened.

```js
popover.open('popover-id')
// => Object { state: 'opened', ... }
```

### `popover.close(id)`

Close a popover using the provided ID. Can be called without an ID to close all open popovers.

**Parameters**

- `id [String] (optional)` The ID of the popover that should be closed.

**Returns**

- `Object | Array` The popover object or array of popover objects that were closed.

```js
const entry = await popover.close();
// => Array [{}, {}, ...]
```
