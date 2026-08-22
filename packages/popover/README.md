# Popover

An initially hidden component that is revealed upon user interaction.

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
// Register the <vb-popover> tag as a side-effect
import "@vrembem/popover/define";

// Import and define the element class directly
import { Popover } from "@vrembem/popover";

customElements.define("vb-popover", Popover);
```
