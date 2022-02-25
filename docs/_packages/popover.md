---
layout: article
title: Popover
description: "A component that is initially hidden and revealed upon user interaction either through a click or hover event. Popover can contain lists of actions, links, or additional supplementary content."
package: "@vrembem/popover"
category: compound
usage:
  npm: true
  scss: true
  js: true
---

## popover

The popover is a simple container component consisting of the `popover` class and an `id`. Popover triggers should have an `aria-controls` attribute set to the ID of the popover element.

{% include demo_open.html %}
<button class="button button_color_primary" aria-controls="popover-1">
  <span>Popover</span>
  <span class="arrow-down"></span>
</button>
<div class="popover" id="popover-1">
  {% include example_menu.html %}
</div>
{% include demo_switch.html %}
```html
<button aria-controls="unique-id">...</button>
<div class="popover" id="unique-id">
  ...
</div>
```
{% include demo_close.html %}

### `popover__arrow`

Adds an arrow to a popover using an empty `<div>` or `<span>` with the `popover__arrow` class. Popover arrows are positioned center relative to the reference element.

{% include demo_open.html %}
<button class="button button_color_primary" aria-controls="popover-2">
  <span>Popover</span>
</button>
<div class="popover" id="popover-2">
  {% include example_menu.html type="short" %}
  <span class="popover__arrow"></span>
</div>
{% include demo_switch.html %}
```html
<button aria-controls="unique-id">...</button>
<div id="unique-id" class="popover">
  ...
  <span class="popover__arrow"></span>
</div>
```
{% include demo_close.html %}

## Event Type

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

Alternatively, this value can be overridden using the [`--popover-event` CSS variable](#css-variables). This can be done either through your own custom CSS or using the `style` attribute.

{% include demo_open.html %}
<button class="button button_color_primary" aria-controls="popover-3">
  <span>Hover Popover</span>
  <span class="arrow-down"></span>
</button>
<div class="popover" id="popover-3" style="--popover-event: hover;">
  {% include example_menu.html type="short" %}
</div>
{% include demo_switch.html %}
```html
<div id="unique-id" class="popover" style="--popover-event: hover;">
  ...
</div>
```
{% include demo_close.html %}

## Placement

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

Alternatively, this value can be overridden using the [`--popover-placement` CSS variable](#css-variables). This can be done either through your own custom CSS or using the `style` attribute.

{% include demo_open.html %}
<button class="button button_color_primary" aria-controls="popover-4">
  <span>Top Popover</span>
  <span class="arrow-up"></span>
</button>
<div class="popover" id="popover-4" style="--popover-placement: top;">
  {% include example_menu.html type="short" %}
</div>
{% include demo_switch.html %}
```html
<div id="unique-id" class="popover" style="--popover-placement: top;">
  ...
</div>
```
{% include demo_close.html %}

### Available Placement Values

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

## CSS Variables

Popover provides CSS variables on the `:root` element for controlling the event type, preferred placement, offset and overflow-padding. They're consumed by the JavaScript implementation to set options dynamically. The following Sass variable are output as CSS variables:

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Sass</th>
        <th>CSS</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Sass"><code class="code text-nowrap">$event</code></td>
        <td data-mobile-label="CSS"><code class="code color-secondary">--popover-event</code></td>
        <td data-mobile-label="Desc">Controls the event type. Can be set to <code class="code">click</code> or <code class="code">hover</code>.</td>
      </tr>
      <tr>
        <td data-mobile-label="Sass"><code class="code text-nowrap">$placement</code></td>
        <td data-mobile-label="CSS"><code class="code color-secondary">--popover-placement</code></td>
        <td data-mobile-label="Desc">Controls the preferred placement for the popover. <a href="https://popper.js.org/docs/v2/constructors/#placement" class="link">More details &rarr;</a></td>
      </tr>
      <tr>
        <td data-mobile-label="Sass"><code class="code text-nowrap">$offset</code></td>
        <td data-mobile-label="CSS"><code class="code color-secondary">--popover-offset</code></td>
        <td data-mobile-label="Desc">Controls the distance from the popover trigger element (<code class="code">aria-controls</code>) that a popover will position itself. <a href="https://popper.js.org/docs/v2/modifiers/offset/" class="link">More details &rarr;</a></td>
      </tr>
      <tr>
        <td data-mobile-label="Sass"><code class="code text-nowrap">$overflow-padding</code></td>
        <td data-mobile-label="CSS"><code class="code color-secondary">--popover-overflow-padding</code></td>
        <td data-mobile-label="Desc">Controls the distance before a popover is cut off and will try to reposition itself to stay visible. <a href="https://popper.js.org/docs/v2/modifiers/prevent-overflow/#padding" class="link">More details &rarr;</a></td>
      </tr>
      <tr>
        <td data-mobile-label="Sass"><code class="code text-nowrap">$flip-padding</code></td>
        <td data-mobile-label="CSS"><code class="code color-secondary">--popover-flip-padding</code></td>
        <td data-mobile-label="Desc">Controls the distance before a popover is cut off and will try to flip it's placement to stay visible. <a href="https://popper.js.org/docs/v2/modifiers/flip/#padding" class="link">More details &rarr;</a></td>
      </tr>
      <tr>
        <td data-mobile-label="Sass"><code class="code text-nowrap">$arrow-padding</code></td>
        <td data-mobile-label="CSS"><code class="code color-secondary">--popover-arrow-padding</code></td>
        <td data-mobile-label="Desc">Controls the distance before a popover arrow reaches the edge of the popover. <a href="https://popper.js.org/docs/v2/modifiers/arrow/#padding" class="link">More details &rarr;</a></td>
      </tr>
    </tbody>
  </table>
</div>

The advantage to having these values set by a CSS variable is that they can be given new values for specific use cases either in your own stylesheet or by setting the variables in a `style` attribute.

{% include demo_open.html %}
<div class="level flex-justify-between" style="--popover-offset: 0;">
  <div style="--popover-placement: right;">
    <button class="button button_color_primary" aria-controls="popover-5">
      <span class="arrow-right"></span>
    </button>
    <div class="popover" id="popover-5">
      {% include example_menu.html type="short" %}
      <span class="popover__arrow"></span>
    </div>
  </div>
  <div style="--popover-placement: left;">
    <button class="button button_color_primary" aria-controls="popover-6">
      <span class="arrow-left"></span>
    </button>
    <div class="popover" id="popover-6">
      {% include example_menu.html type="short" %}
      <span class="popover__arrow"></span>
    </div>
  </div>
</div>
{% include demo_switch.html %}
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
{% include demo_close.html %}

## popover_size_[value]

Adjusts the size of the popover. There are two options relative to the default size, `popover_size_sm` and `popover_size_lg`. Also available is `popover_size_auto` which allows the popover to adjust based on it's content.

{% include demo_open.html %}
<button class="button" aria-controls="popover-7">
  <span>Auto</span>
  <span class="arrow-down"></span>
</button>
<div class="popover popover_size_auto" id="popover-7">
  {% include example_menu.html type="short" %}
</div>
<button class="button" aria-controls="popover-8">
  <span>Small</span>
  <span class="arrow-down"></span>
</button>
<div class="popover popover_size_sm" id="popover-8">
  {% include example_menu.html type="short" %}
</div>
<button class="button" aria-controls="popover-9">
  <span>Default</span>
  <span class="arrow-down"></span>
</button>
<div class="popover" id="popover-9">
  {% include example_menu.html type="short" %}
</div>
<button class="button" aria-controls="popover-10">
  <span>Large</span>
  <span class="arrow-down"></span>
</button>
<div class="popover popover_size_lg" id="popover-10">
  {% include example_menu.html type="short" %}
</div>
{% include demo_switch.html %}
```html
<div id="unique-id" class="popover popover_size_sm">
  ...
</div>
```
{% include demo_close.html %}

### Available Variations

- `popover_size_auto`
- `popover_size_sm`
- `popover_size_lg`

## popover_tooltip

Applies styles to create a popover tooltip. The default placement of a tooltip is `top` and are triggered by the `hover` and `focus` events. Tooltips also require a different set of attributes for accessibility:

- The popover element should have the `role="tooltip"` set.
- The popover trigger should have `aria-describedby` (instead of `aria-controls`) set to the ID of the popover element.

{% include demo_open.html %}
<span class="border-bottom" aria-describedby="popover-11">HTML</span>
<div id="popover-11" class="popover popover_tooltip" role="tooltip">
  Hypertext Markup Language
  <span class="popover__arrow"></span>
</div>
{% include demo_switch.html %}
```html
<span aria-describedby="unique-id">HTML</span>
<div id="unique-id" class="popover popover_tooltip" role="tooltip">
  Hypertext Markup Language
  <span class="popover__arrow"></span>
</div>
```
{% include demo_close.html %}

> For more information regarding tooltip accessibility and best practices: [ARIA: tooltip role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)

## Sass variables

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-variable</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">String to prefix CSS variables with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-block</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>
      <!-- CSS Variable Output -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$event</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Outputs a CSS variable for setting the default popover behavior. Can either be <code class="code">click</code> or <code class="code">hover</code>.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$placement</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Outputs a CSS variable for setting the preferred popover placement.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$offset</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">8</code></td>
        <td data-mobile-label="Desc">Sets the distance from the reference element that a popover will position itself. Also outputs a CSS variable.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$overflow-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">10</code></td>
        <td data-mobile-label="Desc">Sets the distance before a popover is cut off and will try to reposition itself to stay visible. Also outputs a CSS variable.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$flip-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">10</code></td>
        <td data-mobile-label="Desc">Sets the distance before a popover is cut off and will try to flip it's placement to stay visible. Also outputs a CSS variable.</td>
      </tr>
      <!-- General -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$z-index</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">10</code></td>
        <td data-mobile-label="Desc">Sets the z-index property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">10</code></td>
        <td data-mobile-label="Desc">Sets the width property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">calc(100vw - 20px)</code></td>
        <td data-mobile-label="Desc">Sets the max-width property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">0.5em</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-clip</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">padding-box</code></td>
        <td data-mobile-label="Desc">Sets the background-clip property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$box-shadow-8dp</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the font-size property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the line-height property.</td>
      </tr>
      <!-- popover__arrow -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$arrow-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">8px</code></td>
        <td data-mobile-label="Desc">Sets the width and height properties of the <code class="code">popover__arrow</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$arrow-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">10</code></td>
        <td data-mobile-label="Desc">Sets the distance before a popover arrow reaches the edge of the popover.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$arrow-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-light</code></td>
        <td data-mobile-label="Desc">Sets the border property of the <code class="code">popover__arrow</code> element.</td>
      </tr>
      <!-- popover_size_[value] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">12em</code></td>
        <td data-mobile-label="Desc">Sets the width property of the <code class="code">popover_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">20em</code></td>
        <td data-mobile-label="Desc">Sets the width property of the <code class="code">popover_size_lg</code> modifier.</td>
      </tr>
    </tbody>
  </table>
</div>

## JavaScript Options

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Key</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">autoInit</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">false</code></td>
        <td data-mobile-label="Desc">Automatically initializes the instance.</td>
      </tr>
      <!-- Selectors -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorPopover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'.popover'</code></td>
        <td data-mobile-label="Desc">Selector for finding popover elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorArrow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'.popover__arrow'</code></td>
        <td data-mobile-label="Desc">Selector for finding popover arrow elements.</td>
      </tr>
      <!-- State classes -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">stateActive</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-active'</code></td>
        <td data-mobile-label="Desc">Class used for active state.</td>
      </tr>
      <!-- Feature toggles -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">eventType</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'click'</code></td>
        <td data-mobile-label="Desc">The default event type. Can be either <code class="code">'click'</code> or <code class="code">'hover'</code>.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">eventListeners</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Whether or not to output global event listeners.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">placement</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'bottom'</code></td>
        <td data-mobile-label="Desc">The default preferred placement.</td>
      </tr>
    </tbody>
  </table>
</div>

## API

### `popover.collection`

An array where all registered popovers are stored. Each entry in the collection contains the following properties:

```js
{
  id: String, // The unique ID of the popover.
  state: String, // The current state of the popover ('closed' or 'opened').
  trigger: HTMLElement, // The popover trigger HTML element.
  target: HTMLElement, // The popover HTML element.
  popper: Object // The popper JS instance.
  config: Object // Stores the popover configuration options.
  open: Function // Method to open this popover.
  close: Function // Method to close this popover.
  deregister: Function // Method to deregister this popover.
  __eventListeners: Array // An array of active event listener details and references.
}
```

### `popover.init(options)`

Initializes the popover instance. During initialization, the following processes are run:

- Builds the popover collection by running `registerCollection()`
- Sets up the global event listeners by running `initEventListeners()`

**Parameters**

- `options [Object] (optional) (default null)` An options object for passing custom settings.

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

Set document and collection entry event listeners.

**Parameters**

- `processCollection [Boolean] (default true)` Whether or not to process the event listeners of popover collection.

```js
const popover = new Popover({ eventListeners: false });
popover.init();
popover.initEventListeners();
```

### `popover.destroyEventListeners(processCollection)`

Remove document and collection entry event listeners.

**Parameters**

- `processCollection [Boolean] (default true)` Whether or not to process the event listeners of popover collection.

```js
const popover = new Popover();
popover.init();
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
const items = document.querySelector('.popover');
const obj = popover.register(items);

console.log(obj);
// => Object { id: 'popover-id', state: 'closed', trigger: HTMLElement, target: HTMLElement, popper: {…}, ... }
```

### `popover.deregister(query)`

Deregister the popover from the collection. This closes the popover if it's active, cleans up the popper instance, removes event listeners and then removes the entry from the collection.

**Parameters**

- `query [String | Object]` A popover ID or an HTML element of either a popover or its trigger.

**Returns**

- `Array` Returns the newly modified collection array.

```js
const item = popover.collection[0];
const array = popover.deregister(item);

console.log(array);
// => Array []
```

### `popover.registerCollection(items)`

Registers array of popovers to the collection. All popovers in array are run through the `register()` method.

**Parameters**

- `items [Array]` An array of items to register.

**Returns**

- `Array` Returns the collection array.

```js
popover.registerCollection(items);
// => Array [...]
```

### `popover.deregisterCollection()`

Deregister all popovers in the collections array. All popovers in collection are run through the `deregister()` method.

**Returns**

- `Array` Returns an empty collection array.

```js
popover.registerCollection();
// => Array []
```

### `popover.get(query, key)`

Used to look up a popover entry within the collection. Query should match the key type to search by: e.g. to search by target elements, pass the target html node with a key of `'target'`. Defaults to `'id'`.

**Parameters**

- `query [String | Object]` The value or object to match against for within the collection.
- `key [String] (optional) (default 'id')` The entry property to search.

**Returns**

- `Object | null` The popover entry if found otherwise `null`.

```js
popover.get('popover-id')
// => Object { id: 'popover-id', ... }
```

### `popover.open(id)`

Used to close a specific popover.

**Parameters**

- `id [String]` The ID of the popover that should be opened.

**Returns**

- `Object` The popover object that has been opened.

```js
popover.open('popover-id')
// => Object { state: 'opened', ... }
```

### `popover.close(id)`

Used to closed a specific popover. Can be called without a parameter to close all open popovers.

**Parameters**

- `id [String] (optional)` The ID of the popover that should be closed.

**Returns**

- `Object` The popover object that has been closed.

```js
popover.close('popover-id')
// => Object { state: 'closed', ... }
```
