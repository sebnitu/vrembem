# modal

<p class="text_lead">A component for changing the mode of a page to complete a critical task.</p>

## `modal`

<div class="demo">
  <div class="demo__render">
    <button class="modal__trigger button button_color_primary" data-modal="modal-default">Modal</button>
  </div>
  <div class="demo__code">

```html
<button class="modal__trigger" data-modal="modal-example-1">Modal</button>

<div class="modal" id="modal-default">
  <div class="modal__dialog">
    ...
  </div>
</div>
```

  </div>
</div>

## `modal_size`

<div class="demo">
  <div class="demo__render">
    <button class="modal__trigger button button_color_primary" data-modal="modal-size-small">Small Modal</button>
    <button class="modal__trigger button button_color_primary" data-modal="modal-size-large">Large Modal</button>
  </div>
  <div class="demo__code">

```html
<div class="modal modal_size_small" id="modal-size-small">...</div>
<div class="modal modal_size_large" id="modal-size-large">...</div>
```

  </div>
</div>

## `modal_full`

<div class="demo">
  <div class="demo__render">
    <button class="modal__trigger button button_color_primary" data-modal="modal-full">Modal</button>
  </div>
  <div class="demo__code">

```html
<button class="modal__trigger" data-modal="modal-example-full">Modal</button>

<div class="modal modal_full" id="modal-full">
  <div class="modal__dialog">
    ...
  </div>
</div>
```

  </div>
</div>

<!-- Modal Markup -->

<div class="modal" id="modal-default">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      <svg role="img" class="icon">
        <use xlink:href="#x"></use>
      </svg>
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_size_small" id="modal-size-small">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      <svg role="img" class="icon">
        <use xlink:href="#x"></use>
      </svg>
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_size_large" id="modal-size-large">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      <svg role="img" class="icon">
        <use xlink:href="#x"></use>
      </svg>
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_full" id="modal-full">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      <svg role="img" class="icon">
        <use xlink:href="#x"></use>
      </svg>
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>
