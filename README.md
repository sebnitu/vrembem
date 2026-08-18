<p align="center">
  <a href="https://vrembem.com">
    <img src="./docs/src/assets/vrembem-logo-color.svg" alt="Vrembem" width="500">
  </a>
  <br />
  A component library based on the BEM methodology.
  <br />
  <a href="https://vrembem.com">Documentations &rarr;</a>
</p>

## Quick Links

- [Get Started](https://vrembem.com/guide/get-started)
- [Packages](https://vrembem.com/packages/core)
- [Philosophy](https://vrembem.com/guide/philosophy)
- [Why Vrembem](https://vrembem.com/guide/why)

## Using CDN

For fast prototyping, use your favorite CDN (Content Delivery Network) to get Vrembem into your project without needing to install and build from NPM.

```html
<link href="https://unpkg.com/vrembem@next/dist/index.css" rel="stylesheet" />
```

```html
<link href="https://cdn.jsdelivr.net/npm/vrembem@next/dist/index.css" rel="stylesheet" />
```

## Using NPM

Vrembem is a collection of packages built with Sass that compiles to CSS. Install Vrembem via NPM and integrate it into your build pipeline to leverage Sass configurations and modules.

```sh
npm install vrembem
```

```scss
@use "vrembem";
```

### Style entries

Vrembem provides both Sass (SCSS) and CSS entries. Which one to choose depends on project setup and how much control you need over the output.

**SCSS**

- ✅ Control output including prefixes and BEM naming conventions.
- ✅ Use Sass modules for managing config, tokens, palettes, and theming.
- ✅ Best for projects already using Sass that want deeper integration.

**CSS**

- ✅ Minimal setup and no build tools required.
- ✅ Customizable components using design token CSS variables.
- ✅ Best for projects that don't use Sass and want minimal dependencies

### Library entry

Use the entire library by importing the base `vrembem` entry.

```scss
// The entire Vrembem library
@use "vrembem";
```

### Layer entries

Or, import specific layers using layer based entries.

```scss
// CSS layer order
@use "vrembem/layers";
// Output: @layer tokens, base, components, utilities;

// Design token CSS variables
@use "vrembem/tokens";

// Base styles
@use "vrembem/base";

// Component styles
@use "vrembem/components";

// Utility styles
@use "vrembem/utilities";
```

### Component entries

Components can be imported on a per-package basis using package imports. View specific package documentation for more information on a package config and usage.

```scss
// Component specific entries
@use "@vrembem/<package>";
```

### JavaScript entries

Vrembem provides JavaScript entries for packages that expose custom elements. Use the root `vrembem` entry when you want to import the exported classes and define custom elements yourself.

```js
import { Drawer, Popover } from "vrembem";

customElements.define("vb-drawer", Drawer);
customElements.define("vb-popover", Popover);
```

Use the `vrembem/define` entry when you want to register all packaged custom elements automatically.

```js
import "vrembem/define";
```

For individual packages, the same pattern applies.

```js
import { Drawer } from "@vrembem/drawer";
import { Popover } from "@vrembem/popover";

customElements.define("vb-drawer", Drawer);
customElements.define("vb-popover", Popover);
```

```js
import "@vrembem/drawer/define";
import "@vrembem/popover/define";
```
