# Modal

A component for rendering modal dialog boxes. Modal dialog boxes block interaction with other UI elements, making the rest of the page inert.

[Documentation](https://vrembem.com/packages/modal)

## Installation

```sh
npm install @vrembem/modal
```

### Styles

```scss
@use "@vrembem/modal";
```

### JavaScript

```js
import { ModalCollection } from '@vrembem/modal';
const modals = new ModalCollection();
await modals.mount();
```
