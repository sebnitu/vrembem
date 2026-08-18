# Drawer

A responsive container custom element that switches between a static layout and a modal dialog based on a provided breakpoint.

[Documentation](https://vrembem.com/packages/drawer)

## Installation

```sh
npm install @vrembem/drawer
```

### Styles

```scss
@use "@vrembem/drawer";
```

### JavaScript

```js
// Register the <vb-drawer> tag as a side-effect 
import "@vrembem/drawer/define";

// Import and define the element class directly
import { Drawer } from "@vrembem/drawer";

customElements.define("vb-drawer", Drawer);
```
