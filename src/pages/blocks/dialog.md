# Dialog

<p class="text_lead">A component that facilitates a conversation between the system and the user. They often request information or an action from the user.</p>

## `dialog`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="dialog">
      <div class="dialog__body">
        <p>This is a dialog</p>
      </div>
    </div>
  </div>
  <div class="demo__code">

```html
...
```

  </div>
</div>

## `dialog__body`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="dialog">
      <button class="dialog__close icon-action icon-action_color_fade">
        <svg role="img" class="icon">
          <use xlink:href="#x"></use>
        </svg>
      </button>
      <div class="dialog__body">
        <h2 class="dialog__title">Dialog Title</h2>
        <p>This is a dialog</p>
        <div class="dialog__group dialog__group_justify_right">
          <button class="button button_color_primary">Accept</button>
          <button class="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  <div class="demo__code">

```html
...
```

  </div>
</div>


## `dialog__header + dialog__footer`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Dialog Title</h2>
        <button class="dialog__close icon-action icon-action_color_fade">
          <svg role="img" class="icon">
            <use xlink:href="#x"></use>
          </svg>
        </button>
      </div>
      <div class="dialog__body">
        <p>This is a dialog</p>
      </div>
      <div class="dialog__footer">
        <button class="button button_color_primary">Accept</button>
        <button class="button">Cancel</button>
      </div>
    </div>
  </div>
  <div class="demo__code">

```html
...
```

  </div>
</div>

## Dialog Compositions

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">New Message</h2>
        <div class="dialog__group">
          <div>
            <button class="icon-action icon-action_color_fade">
              <svg role="img" class="icon">
                <use xlink:href="#minus"></use>
              </svg>
            </button>
          </div>
          <div>
            <button class="icon-action icon-action_color_fade">
              <svg role="img" class="icon">
                <use xlink:href="#maximize-2"></use>
              </svg>
            </button>
          </div>
          <div>
            <button class="dialog__close icon-action icon-action_color_fade">
              <svg role="img" class="icon">
                <use xlink:href="#x"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <form class="dialog__body">
        <div>
          <input type="text" class="input" placeholder="Recipients" />
        </div>
        <div>
          <input type="text" class="input" placeholder="Subjects" />
        </div>
        <div>
          <textarea class="input input_type_textarea" placeholder="..."></textarea>
        </div>
      </form>
      <div class="dialog__footer dialog__footer_justify_split">
        <div class="dialog__group">
          <button class="button button_color_primary">Send</button>
          <button class="button button_icon">
            <svg role="img" class="icon">
              <use xlink:href="#paperclip"></use>
            </svg>
          </button>
          <button class="button button_icon">
            <svg role="img" class="icon">
              <use xlink:href="#image"></use>
            </svg>
          </button>
        </div>
        <div class="dialog__group">
          <button class="button button_icon">
            <svg role="img" class="icon">
              <use xlink:href="#trash"></use>
            </svg>
          </button>
          <button class="button button_icon">
            <svg role="img" class="icon">
              <use xlink:href="#chevron-up"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="demo__code">

```html
...
```

  </div>
</div>
