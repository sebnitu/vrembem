---
layout: article
title: Popover
description: "A component that is initially hidden and revealed upon user interaction either through a click or hover event. Popover can contain lists of actions, links, or additional supplementary content."
package: "@vrembem/popover"
category: compound
usage:
  npm: true
  scss: true
---

## popover

The popover is a simple container component consisting of the `popover` class. To hook up the necessary JavaScript behavior, you'll need the following data attributes:

- `data-popover` - Placed on our popover component itself.
- `data-popover-trigger` - Placed on any element we use to trigger the popover.

{% include demo_open.html %}
<button class="button button_color_primary" data-popover-trigger>
  <span>Popover</span>
  <span class="arrow-down"></span>
</button>
<div class="popover" data-popover>
  {% include example_menu.html %}
</div>
{% include demo_switch.html %}
```html
<button data-popover-trigger>...</button>
<div class="popover" data-popover>
  ...
</div>
```
{% include demo_close.html %}

If the data attributes are valueless, the popover trigger will try to find it's associated popover by inspecting the next sibling element. If the popover can't be placed as a direct sibling of the trigger, you should give both attributes a shared unique ID to link them together. The popover can then be placed anywhere in the DOM, but it is still recommended to be as closely after the trigger as possible for keyboard focus tabbing accessibility.

{% include demo_open.html %}
<button class="button button_color_primary" data-popover-trigger="example-1">
  <span>Popover</span>
  <span class="arrow-down"></span>
</button>
<div>
  <div class="popover" data-popover="example-1">
    {% include example_menu.html %}
  </div>
</div>
{% include demo_switch.html %}
```html
<button data-popover-trigger="unique-id">...</button>

<!-- Somewhere else in the DOM -->
<div class="popover" data-popover="unique-id">
  ...
</div>
```
{% include demo_close.html %}

### `data-popover-arrow`

The popover arrow is an inner element of the popper that is positioned center relative to the reference element. This can be defined using the `popover__arrow` class for styling and is hooked into the JavaScript implementation using the `data-popover-arrow` boolean attribute.

{% include demo_open.html %}
<button class="button button_color_primary" data-popover-trigger>
  <span>Popover</span>
</button>
<div class="popover" data-popover data-popover-placement="auto">
  {% include example_menu.html type="short" %}
  <span class="popover__arrow" data-popover-arrow></span>
</div>
{% include demo_switch.html %}
```html
<button data-popover-trigger>...</button>
<div class="popover" data-popover>
  ...
  <span class="popover__arrow" data-popover-arrow></span>
</div>
```
{% include demo_close.html %}

### `data-popover-event`

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

{% include demo_open.html %}
<button class="button button_color_primary" data-popover-trigger>
  <span>Hover Popover</span>
  <span class="arrow-down"></span>
</button>
<div class="popover" data-popover data-popover-event="hover">
  {% include example_menu.html type="short" %}
</div>
{% include demo_switch.html %}
```html
<div class="popover" data-popover data-popover-event="hover">
  ...
</div>
```
{% include demo_close.html %}

### `data-popover-placement`

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

{% include demo_open.html %}
<button class="button button_color_primary" data-popover-trigger>
  <span>Top Popover</span>
  <span class="arrow-up"></span>
</button>
<div class="popover" data-popover data-popover-placement="top">
  {% include example_menu.html type="short" %}
</div>
{% include demo_switch.html %}
```html
<div class="popover" data-popover data-popover-placement="top">
  ...
</div>
```
{% include demo_close.html %}

### Available Placement Values

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

### CSS Variables

Popover provides some CSS variables on the `:root` element for controlling the event type, preferred placement, offset and overflow-padding. They're consumed by the JavaScript implementation to set options dynamically. These are the Sass variable that output CSS variables:

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
        <td data-mobile-label="Desc">Controls the event type in the same way <code class="code">data-popover-event</code> does. Can be set to <code class="code">click</code> or <code class="code">hover</code>.</td>
      </tr>
      <tr>
        <td data-mobile-label="Sass"><code class="code text-nowrap">$placement</code></td>
        <td data-mobile-label="CSS"><code class="code color-secondary">--popover-placement</code></td>
        <td data-mobile-label="Desc">Controls the preferred placement for the popover in the same way <code class="code">data-popover-placement</code> does. <a href="https://popper.js.org/docs/v2/constructors/#placement" class="link">More details &rarr;</a></td>
      </tr>
      <tr>
        <td data-mobile-label="Sass"><code class="code text-nowrap">$offset</code></td>
        <td data-mobile-label="CSS"><code class="code color-secondary">--popover-offset</code></td>
        <td data-mobile-label="Desc">Controls the distance from the reference element (`data-popover-trigger`) that a popover will position itself. <a href="https://popper.js.org/docs/v2/modifiers/offset/" class="link">More details &rarr;</a></td>
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
    <button class="button button_color_primary" data-popover-trigger>
      <span class="arrow-right"></span>
    </button>
    <div class="popover" data-popover>
      {% include example_menu.html type="short" %}
      <span class="popover__arrow" data-popover-arrow></span>
    </div>
  </div>
  <div style="--popover-placement: left;">
    <button class="button button_color_primary" data-popover-trigger>
      <span class="arrow-left"></span>
    </button>
    <div class="popover" data-popover>
      {% include example_menu.html type="short" %}
      <span class="popover__arrow" data-popover-arrow></span>
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
<button class="button" data-popover-trigger>
  <span>Auto</span>
  <span class="arrow-down"></span>
</button>
<div class="popover popover_size_auto" data-popover>
  {% include example_menu.html type="short" %}
</div>
<button class="button" data-popover-trigger>
  <span>Small</span>
  <span class="arrow-down"></span>
</button>
<div class="popover popover_size_sm" data-popover>
  {% include example_menu.html type="short" %}
</div>
<button class="button" data-popover-trigger>
  <span>Default</span>
  <span class="arrow-down"></span>
</button>
<div class="popover" data-popover>
  {% include example_menu.html type="short" %}
</div>
<button class="button" data-popover-trigger>
  <span>Large</span>
  <span class="arrow-down"></span>
</button>
<div class="popover popover_size_lg" data-popover>
  {% include example_menu.html type="short" %}
</div>
{% include demo_switch.html %}
```html
<div class="popover popover_size_sm" data-popover>
  ...
</div>
```
{% include demo_close.html %}

### Available Variations

- `popover_size_auto`
- `popover_size_sm`
- `popover_size_lg`

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
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$arrow-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">10</code></td>
        <td data-mobile-label="Desc">Sets the distance before a popover arrow reaches the edge of the popover.</td>
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
      <!-- Data attributes -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataPopover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'popover'</code></td>
        <td data-mobile-label="Desc">Data attribute for defining a popover.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataTrigger</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'popover-trigger'</code></td>
        <td data-mobile-label="Desc">Data attribute for defining a popover trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataArrow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'popover-arrow'</code></td>
        <td data-mobile-label="Desc">Data attribute for defining a popover arrow.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataEventType</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'popover-event'</code></td>
        <td data-mobile-label="Desc">Data attribute for setting the popover event type.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataPlacement</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'popover-placement'</code></td>
        <td data-mobile-label="Desc">Data attribute for setting the preferred placement of a popover.</td>
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
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'bottom-start'</code></td>
        <td data-mobile-label="Desc">The default preferred placement.</td>
      </tr>
    </tbody>
  </table>
</div>

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

- Builds the popover collection by running `unregisterCollection()`
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

### `popover.unregister(popover)`

Unregisters the popover from the collection. This hides the popover if it's active, cleans up the popper instance, removes event listeners and then removes the entry from the collection.

**Parameters**

- `popover [Object]` The popover instance in the collection to unregister.

**Returns**

- `Array` Returns the newly modified collection array.

```js
const item = popover.collection[0];
const array = popover.unregister(item);

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

### `popover.unregisterCollection()`

Unregisters all popovers in the collections array. This is done by looping through the collection's array and passing each popover through the `unregister()` method.

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
