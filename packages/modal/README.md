# Modal

A component for changing the mode of a page to complete a critical task. This is usually used alongside the dialog component to create modal dialogs.

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
