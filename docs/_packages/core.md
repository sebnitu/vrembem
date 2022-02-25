---
layout: article
title: Core
description: "The core variables, functions and mixins for Vrembem components."
package: "@vrembem/core"
category: core
usage:
  npm: true
---

## Sass

To load Vrembem's core functions, mixins and variables, use Sass' module system and the `@use` rule:

```scss
@use "@vrembem/core";
```

Pass in your own customizations using the `with` keyword. All loaded Vrembem components after will inherit these customizations.

```scss
@use "@vrembem/core" with (
  $prefix-block: "vb-",
  $padding: "0.75em 1.25em"
);
```

## JavaScript

To make use of the core JavaScript modules, import the specific named export you need:

```js
// Import specific named exports
import { addClass, removeClass } from '@vrembem/core';

// Usage
addClass(el, 'some-class');
```

You can also include all core named exports under a namespace by importing the entire module's contents:

```js
// Import all named exports under the 'core' namespace
import * as core from '@vrembem/core';

// Usage
core.removeClass(el, 'some-class');
```

## Sass Variables

<div class="notice notice_state_caution">
  <div class="notice__body">
    <div class="media media_stack_lg media_gap_xs">
      <div class="media__body media media_gap_xs">
        <div class="media__obj">
          {% include icon.html icon="alert-circle" %}
        </div>
        <div class="media__body">
          Sass Variable documentation coming soon!
        </div>
      </div>
      <div class="media__obj">
        <a class="link text-nowrap" href="https://github.com/sebnitu/vrembem/blob/main/packages/core/src/css/_variables.scss">View source &rarr;</a>
      </div>
    </div>
  </div>
</div>

## Modules

<div class="notice notice_state_caution">
  <div class="notice__body">
    <div class="media media_stack_lg media_gap_xs">
      <div class="media__body media media_gap_xs">
        <div class="media__obj">
          {% include icon.html icon="alert-circle" %}
        </div>
        <div class="media__body">
          Module documentation coming soon!
        </div>
      </div>
      <div class="media__obj">
        <a class="link text-nowrap" href="https://github.com/sebnitu/vrembem/tree/main/packages/core/src/js">View source &rarr;</a>
      </div>
    </div>
  </div>
</div>

