---
layout: article
title: Drawer
description: "A container component that slides in from the left or right. It typically contains menus, search or other content for your app."
category: compound
# usage:
  # npm: "@vrembem/drawer"
  # scss: "vrembem/drawer/all"
  # js: "vrembem/drawer"
---

<div class="notice notice_type_info">
  <h2 class="notice__title">Dependencies</h2>
  <div class="type">
    <p>The drawer component depends on the following components to be imported:</p>
    <ul>
      <li>
        <a href="/components/dialog"><strong>Dialog</strong></a> - Drawers are a container component. You can add any content you'd like but wrapping your content with the dialog component allows for the most flexibility and consistent layouts.
      </li>
      <li>
        <a href="/components/modal"><strong>Modal</strong></a> - Used for switch functionality. If enabled, drawer items get switched into modals for smaller screens.
      </li>
    </ul>
  </div>
</div>

{% include flag.html heading="drawer" %}

<div class="type" markdown="1">

A drawer component is composed of at minimum three elements:

* `drawer`: Defines the wrapper which contains a drawer set.
  * `drawer__item`: The primary component of the drawer functionality. You can have one or many drawer items per drawer component.
  * `drawer__main`: Defines the main content area that drawers are siblings to. Only one of these should exist per drawer component.

To create a trigger for your drawer, give a link or button the `drawer__trigger` class along with a `[data-target]` attribute containing a valid drawer selector as it's value.

</div>

{% include demo_open.html class_gridItem="span_12" %}

<div class="drawer">

  <aside class="drawer__item drawer-demo-left">
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a <code>drawer__item</code></p>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer__main</code></p>
    <div class="button-group">
      <button
        class="button button_color_primary drawer__trigger"
        data-target=".drawer-demo-left">
        Drawer left
      </button>
    </div>
  </div>

</div>

{% include demo_switch.html class_gridItem="span_12" %}

```html
<button class="drawer__trigger" data-target=".drawer__item">...</button>

<div class="drawer">
  <div class="drawer__item">
    ...
  </div>
  <div class="drawer__main">
    ...
  </div>
</div>
```

{% include demo_close.html %}

<div class="type" markdown="1">

Although you can use any content within a drawer, the [dialog component](/components/dialog) is recommeneded. You'll just need to add the `drawer__dialog` element class to the base `dialog` component.

</div>

{% include demo_open.html class_gridItem="span_12" %}

<div class="drawer">

  <div class="drawer__item drawer-demo-dialog is-active">
    <div class="drawer__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Dialog Title</h2>
        <button class="dialog__close icon-action icon-action_color_fade drawer__trigger" data-target=".drawer-demo-dialog">
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body">
        <p>This is the dialog body area...</p>
      </div>
      <div class="dialog__footer">
        <p>This is the dialog footer area...</p>
      </div>
    </div>
  </div>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer__main</code></p>
    <div class="button-group">
      <button class="button button_color_primary drawer__trigger" data-target=".drawer-demo-dialog">
        Drawer left
      </button>
    </div>
  </div>

</div>

{% include demo_switch.html class_gridItem="span_12" %}

```html
...
<div class="drawer__item">
  <div class="drawer__dialog dialog">
    <div class="dialog__header">
      ...
    </div>
    <div class="dialog__body">
      ...
    </div>
    <div class="dialog__footer">
      ...
    </div>
  </div>
</div>
...
```

{% include demo_close.html %}

{% include flag.html heading="drawer__item_pos_[location]" %}

<div class="type" markdown="1">

Drawer items can slide in from the left or right using the position modifiers:

* `drawer__item_pos_left`
* `drawer__item_pos_right`

</div>

{% include demo_open.html class_gridItem="span_12" %}

<div class="drawer">

  <aside class="drawer__item drawer__item_pos_left drawer-demo-pos-left">
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a <code>drawer__item</code>. I'm positioned using the <code>drawer__item_pos_left</code> modifier.</p>
      </div>
    </div>
  </aside>

  <aside class="drawer__item drawer__item_pos_right drawer-demo-pos-right">
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a <code>drawer__item</code>. I'm positioned using the <code>drawer__item_pos_right</code> modifier.</p>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer__main</code></p>
    <div class="button-group">
      <button class="button button_color_primary drawer__trigger" data-target=".drawer-demo-pos-left">
        Drawer left
      </button>
      <button class="button button_color_primary drawer__trigger" data-target=".drawer-demo-pos-right">
        Drawer right
      </button>
    </div>
  </div>

</div>

{% include demo_switch.html class_gridItem="span_12" %}

```html
<div class="drawer">
  <div class="drawer drawer__item_pos_left">
    ...
  </div>
  <div class="drawer drawer__item_pos_right">
    ...
  </div>
  <div class="drawer__main">
    ...
  </div>
</div>
```

{% include demo_close.html %}

<div class="notice notice_type_info type" markdown="1">
If a position modifier is not provided, the drawer will appear based on it's location in the DOM relative to the main content area.
</div>

{% include flag.html heading="Drawer save state" %}

<div class="type" markdown="1">

By default the state of your drawers are saved when a unique identifier is provided using the `id` attribute. States are saved using [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

</div>

{% include demo_open.html class_gridItem="span_12" %}

<div class="drawer">

  <aside id="demo-drawer" class="drawer__item drawer__item_pos_left is-active">
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a <code>drawer__item</code>. My state will be saved!</p>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer__main</code></p>
    <div class="button-group">
      <button class="button button_color_primary drawer__trigger" data-target="#demo-drawer">
        Drawer left
      </button>
    </div>
  </div>

</div>

{% include demo_switch.html class_gridItem="span_12" %}

```html
<button class="drawer__trigger" data-target="#custom-drawer">...</button>

<div class="drawer">
  <aside id="custom-drawer" class="drawer__item is-active">
    ...
  </aside>
  <div class="drawer__main">
    ...
  </div>
</div>
```

{% include demo_close.html %}

<div class="type" markdown="1">

The default state of a drawer is given by the `is-active` class in your raw markup. If this class is not present, the default state is closed.

</div>

{% include flag.html heading="Drawer media switch" %}

<div class="type" markdown="1">

Drawer items have the ability to switch between drawer or modal modes by default using the `[data-drawer-switch]`. The default breakpoint that drawer items get switched is `990px`.

</div>

{% include demo_open.html class_gridItem="span_12" %}

<div class="drawer">

  <aside id="demo-drawer-switch" class="drawer__item drawer__item_pos_left is-active" data-drawer-switch>
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a <code>drawer__item</code>. My default switch breakpoint is <code>lg</code></p>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer__main</code></p>
    <div class="button-group">
      <button class="button button_color_primary drawer__trigger" data-target="#demo-drawer-switch">
        Drawer left
      </button>
    </div>
  </div>

</div>

{% include demo_switch.html class_gridItem="span_12" %}

```html
<div class="drawer">
  <aside class="drawer__item" data-drawer-switch>
    ...
  </aside>
  <div class="drawer__main">
    ...
  </div>
</div>
```

{% include demo_close.html %}

<div class="type" markdown="1">

Define the breakpoint that drawers get switched by passing a breakpoint as the `[data-drawer-switch]` value. Valid breakpoint values are either breakpoint keys as found in [`src/js/config.json`](https://github.com/sebnitu/vrembem/blob/master/src/js/config.json) or an explicit pixel value, e.g: `"720px"`, `"1200px"`, etc.

</div>

{% include demo_open.html class_gridItem="span_12" %}

<div class="drawer">

  <aside
    id="demo-drawer-switch-01"
    class="drawer__item drawer__item_pos_left is-active"
    data-drawer-switch="xl">
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a <code>drawer__item</code>. My switch breakpoint is set to <code>xl</code></p>
      </div>
    </div>
  </aside>

  <aside
    id="demo-drawer-switch-02"
    class="drawer__item drawer__item_pos_right is-active"
    data-drawer-switch="800px">
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a <code>drawer__item</code>. My switch breakpoint is set to <code>800px</code></p>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer__main</code></p>
    <div class="button-group">
      <button class="button button_color_primary drawer__trigger" data-target="#demo-drawer-switch-01">
        Drawer left
      </button>
      <button class="button button_color_primary drawer__trigger" data-target="#demo-drawer-switch-02">
        Drawer right
      </button>
    </div>
  </div>

</div>

{% include demo_switch.html class_gridItem="span_12" %}

```html
<div class="drawer">
  <aside class="drawer__item" data-drawer-switch="xl">
    ...
  </aside>
  <aside class="drawer__item" data-drawer-switch="800px">
    ...
  </aside>
  ...
</div>
```

{% include demo_switch.html class_gridItem="span_12" %}

```js
// Import our drawer component
import Drawer from 'drawer'

// Initialize a drawer instance with a custom default switch breakpoint
const drawer = new Drawer({
  switchBreakpoint: "900px"
})
```

{% include demo_close.html %}

{% include flag.html heading="Usage" %}

<div class="type" markdown="1">

```js
// Import our drawer component
import Drawer from 'drawer'

// Initialize a new instance of our drawer component with default settings
const drawer = new Drawer()
```

</div>

<div class="type" markdown="1">

<table class="table table_rowed table_zebra_remove table_responsive">
  <tr>
    <th>Options</th>
    <th>Description</th>
    <th>Type</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code class="text_nowrap">classTarget</code></td>
    <td>Class used for the target element</td>
    <td>String</td>
    <td><code class="text_nowrap">'drawer__item'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">classTrigger</code></td>
    <td>Class used for the trigger element</td>
    <td>String</td>
    <td><code class="text_nowrap">'drawer__trigger'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">classInner</code></td>
    <td>Class used for the inner component for transitions</td>
    <td>String</td>
    <td><code class="text_nowrap">'drawer__dialog'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">classTargetSwitch</code></td>
    <td>Class that gets switched to on the target element</td>
    <td>String</td>
    <td><code class="text_nowrap">'modal'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">classTriggerSwitch</code></td>
    <td>Class that gets switched to on the trigger element</td>
    <td>String</td>
    <td><code class="text_nowrap">'modal__trigger'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">classInnerSwitch</code></td>
    <td>Class that gets switched to on the inner element</td>
    <td>String</td>
    <td><code class="text_nowrap">'modal__dialog'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">classActive</code></td>
    <td>Class the applied when a drawer is active</td>
    <td>String</td>
    <td><code class="text_nowrap">'is-active'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">classTransitionNone</code></td>
    <td>Class to disable transitions during initial state load</td>
    <td>String</td>
    <td><code class="text_nowrap">'transition_none'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">saveState</code></td>
    <td>Whether or not to enable save state feature</td>
    <td>Boolean</td>
    <td><code class="text_nowrap">true</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">switch</code></td>
    <td>False to disable switch functionality, or a valid selector</td>
    <td>String</td>
    <td><code class="text_nowrap">'[data-drawer-switch]'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">switchBreakpoint</code></td>
    <td>The breakpoint to switch between display modes</td>
    <td>String</td>
    <td><code class="text_nowrap">'lg'</code></td>
  </tr>
  <tr>
    <td><code class="text_nowrap">transitionDuration</code></td>
    <td>Duration in miliseconds that a drawer transitions</td>
    <td>Milisecond</td>
    <td><code class="text_nowrap">500</code></td>
  </tr>
</table>

</div>

<div class="grid">

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="init"
      desc="The constructor method, run as soon as an instance is created."
      param="@param {Object} options - A json object with your custom settings"
      script="drawer.init()"
    %}
  </div>

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="destroy"
      desc="The deconstructor method, used to reset and destroy the drawer instance."
      param="@param {Boolean} defaultState - Return drawers to their default state?"
      script="drawer.destroy()"
    %}
  </div>

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="open"
      desc="Public method to open a drawer or group of drawers."
      param="@param {String} selector - A valid CSS selector"
      script="drawer.open()"
    %}
  </div>

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="close"
      desc="Public method to close a drawer or group of drawers."
      param="@param {String} selector - A valid CSS selector"
      script="drawer.close()"
    %}
  </div>

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="toggle"
      desc="Public method to toggle a drawer or group of drawers."
      param="@param {String} selector - A valid CSS selector"
      script="drawer.toggle()"
    %}
  </div>

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="switchToDrawer"
      desc="Public method to switch a modal into drawer."
      param="@param {String} selector - A valid CSS selector"
      script="drawer.switchToDrawer()"
    %}
  </div>

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="switchToModal"
      desc="Public method to switch a drawer into modal."
      param="@param {String} selector - A valid CSS selector"
      script="drawer.switchToModal()"
    %}
  </div>

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="stateSave"
      desc="Save the drawer current drawer state."
      param="n/a"
      script="drawer.stateSave()"
    %}
  </div>

  <div class="grid__item grid__item_fill span_12 span_6_md span_4_xl">
    {% include card_method.html
      title="stateClear"
      desc="Clears drawer state from local storage."
      param="n/a"
      script="drawer.stateClear()"
    %}
  </div>

</div>
