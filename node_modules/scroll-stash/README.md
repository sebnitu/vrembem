# scroll-stash

A JavaScript plugin to help preserve an element's scroll position.

[![NPM Version](https://img.shields.io/npm/v/scroll-stash.svg)](https://www.npmjs.com/package/scroll-stash)
[![Build Status](https://github.com/sebnitu/scroll-stash/actions/workflows/build.yml/badge.svg)](https://github.com/sebnitu/scroll-stash/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/sebnitu/scroll-stash/badge.svg?branch=master)](https://coveralls.io/github/sebnitu/scroll-stash?branch=master)

[CodePen Example](https://codepen.io/sebnitu/full/eYJbeEj)

## Installation

```
npm install scroll-stash
```

### JavaScript

Import and instantiate ScrollStash in your scripts:

```js
import ScrollStash from 'scroll-stash';
const scrollStash = new ScrollStash({ autoInit: true });
```

It's also possible to include ScrollStash using a script tag:

```html
<!-- Via NPM -->
<script src="./node_modules/scroll-stash/dist/scripts.umd.js"></script>

<!-- Via CDN -->
<script src="https://unpkg.com/scroll-stash"></script>

<!-- Instantiate ScrollStash in your scripts -->
<script>
const scrollStash = new ScrollStash();
scrollStash.init();
</script>
```

### Styles

There are no styles to include for `scroll-stash`, but if you plan on using the anchor feature it's important to make sure:

- The scrollable element has `position: relative` applied.
- The anchor's nearest parent with `position: relative` should be the scrollable container.
- If a parent wrapper of an anchor exists that needs to be positioned relatively, pass it's selector as the `selectorAnchorParent` option.

### Markup

The most basic implementation of `scroll-stash` is the application of the data attribute `data-scroll-stash` with a unique ID as the value. The unique ID is used in saving each `scroll-stash` element's scroll position.

```html
<div data-scroll-stash="[unique-id]">
  ...
</div>
```

#### `data-scroll-stash-anchor`

This optional data attribute—when set on a `scroll-stash` element with a valid selector—defines an anchor that will take precedence over set options on instantiation. Setting it's value to `ignore` or `false` will disable the anchor feature. This is useful to prevent a parent scrollable wrapper from inheriting the anchor of child elements.

```html
<div data-scroll-stash="[unique-id]" data-scroll-stash-anchor="[selector | ignore | false]">
  ...
</div>
```

> Anchors are elements within a scrollable container that you want to always be visible. In the case where a preserved scroll position is applied and the anchor is not visible, the scroll will be adjusted to the nearest position to make the entire element visible with the appropriate padding or clearance elements as defined in options.

## Options

| Key                    | Default                 | Description                                                                                                                                     |
| ---------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoInit`             | `false`                 | Automatically instantiates the instance.                                                                                                        |
| `dataScroll`           | `'scroll-stash'`        | Data attribute for a `scroll-stash` element. Stores the unique ID for saving and restoring scroll positions.                                    |
| `dataAnchor`           | `'scroll-stash-anchor'` | Data attribute for setting an element specific anchor or disabling the anchor feature on a specific `scroll-stash` element.                     |
| `selectorAnchor`       | `''`                    | Selector for the anchor to look for in each `scroll-stash` element.                                                                             |
| `selectorAnchorParent` | `''`                    | Parent selector for anchors who are wrapped in elements with `position: relative` styles.                                                       |
| `selectorTopElem`      | `''`                    | Selector for sticky or fixed top element within a `scroll-stash` that anchors need to take into account.                                        |
| `selectorBotElem`      | `''`                    | Selector for sticky or fixed bottom element within a `scroll-stash` that anchors need to take into account.                                     |
| `alignment`            | `'nearest'`             | Defines the vertical alignment of scroll anchor. Can be set to `start`, `end` or `nearest`.                                                     |
| `behavior`             | `'auto'`                | Defines the transition animation. Can either be set to `auto` or `smooth`.                                                                      |
| `anchorPadding`        | `16`                    | The extra padding to provide when scrolling anchors into view.                                                                                  |
| `saveKey`              | `'ScrollStash'`         | The key that is used to save the scroll stash state object in local storage.                                                                    |
| `throttleDelay`        | `250`                   | The delay to apply between scroll stash saves. Since scrolling events fire extremely fast, this creates a throttle to help improve performance. |
| `customEventPrefix`    | `'scroll-stash:'`       | Prefix to be used on custom events.                                                                                                             |

## Events

- `scroll-stash:saved` Emits when scroll positions are saved.
- `scroll-stash:applied` Emits when scroll positions are applied.
- `scroll-stash:anchor` Emits when the anchor is scrolled into view.

## API

### `scrollStash.init(options)`

Initializes the `scroll-stash` instance.

**Parameters**

- `options` (optional) An options object. This will be merged with the options passed during instantiation.

```js
const scrollStash = new ScrollStash();
scrollStash.init();

// Or, pass in some options:
scrollStash.init({
  selectorAnchor: '.asdf',
  anchorPadding: 20
});
```

### `scrollStash.destroy()`

Destroys the previously initialized `scroll-stash` instance.

```js
const scrollStash = new ScrollStash();
scrollStash.init();
// ...
scrollStash.destroy();
```

### `scrollStash.anchorShow(element, behavior)`

Scrolls the anchor in view of the passed `scroll-stash` HTML element.

**Parameters**

- `element` HTML element that scroll stash has been instantiated on.
- `behavior` (optional) The transition animation. Can either be set to `auto` or `smooth`. Defaults to behavior option.

```js
const el = document.querySelector('[data-scroll-stash]');
const result = scrollStash.anchorShow(el);
// Returns: Object with result details
// If scrolled:
//   { scrolled: { value: [position], behavior: [behavior] }, msg: 'Anchor was scrolled into view' }
// If failed because anchor is already in view:
//   { scrolled: false, msg: 'Anchor is already in view' }
// If failed because anchor was not found:
//   { scrolled: false, msg: 'Anchor was not found' }
```

### `scrollStash.anchorGet(element)`

Returns the anchor element of the passed `scroll-stash` HTML element.

**Parameters**

- `element` HTML element that scroll stash has been instantiated on.

```js
const el = document.querySelector('[data-scroll-stash]');
const anchor = scrollStash.anchorGet(el);
// Returns: HTMLElement Object
```

## Copyright and License

Scroll-stash copyright (c) 2020 Sebastian Nitu. Scroll-stash is released under the [MIT license](https://github.com/sebnitu/scroll-stash/blob/master/LICENSE).
