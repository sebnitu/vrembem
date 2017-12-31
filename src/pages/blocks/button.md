# Button

<p class="text_lead">The most basic of UI components. Buttons represent an action that a user can take.</p>

## `button`

<div class="demo demo_medium_row">
  <div class="demo__render demo__render_tile">
    <a class="button" href="#">Button</a>
    <button class="button">Button</button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<a class="button" href="#">Button</a>
<button class="button">Button</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button__item`

Elements inside the button component receive appropriate spacing using the `> * + *` selector rule. You can also use the `.button__item` element for more specificity.

<div class="demo demo_medium_row">
  <div class="demo__render demo__render_tile">
    <button class="button button_color_primary">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
      <span class="button__item">Button</span>
      <span class="arrow"></span>
    </button>
    <button class="button button_color_primary">
      <span class="button__item">Button</span>
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
      <span class="arrow"></span>
    </button>
    <button class="button button_color_primary">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
      <span class="arrow"></span>
    </button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="button">
  <svg role="img" class="icon">
    <use xlink:href="#github"></use>
  </svg>
  <span class="button__item">Button</span>
  <span class="arrow"></span>
</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button_icon`

Used for when displaying a button with only an icon and no text.

<div class="demo demo_medium_row">
  <div class="demo__render demo__render_tile">
    <button class="button button_size_small button_icon">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
    </button>
    <button class="button button_size_small button_icon button_color_primary">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
    </button>
    <button class="button button_icon">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
    </button>
    <button class="button button_icon button_color_primary">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
    </button>
    <button class="button button_size_large button_icon">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
    </button>
    <button class="button button_size_large button_icon button_color_primary">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
    </button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="button button_icon">
  <svg role="img" class="icon">
    <use xlink:href="#github"></use>
  </svg>
</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button_size`

<div class="demo demo_medium_row">
  <div class="demo__render demo__render_tile">
    <button class="button button_size_small button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_size_large button_color_primary">Button</button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="button button_size_small button_color_primary">Button</button>
<button class="button button_color_primary">Button</button>
<button class="button button_size_large button_color_primary">Button</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button_block`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <button class="button button_block button_color_primary">Button</button>
    </div>
    <div class="demo__group">
      <button class="button button_block button_color_secondary">Button</button>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="button button_block">
  Button
</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button_min-width`

<div class="demo demo_medium_row">
  <div class="demo__render demo__render_tile">
    <button class="button button_min-width button_color_primary">Button</button>
    <button class="button button_min-width button_color_secondary">Button</button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="button button_min-width">Button</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button_color`

<div class="demo demo_medium_row">
  <div class="demo__render demo__render_tile">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_secondary">Button</button>
    <button class="button button_color_success">Button</button>
    <button class="button button_color_caution">Button</button>
    <button class="button button_color_danger">Button</button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="button button_color_primary">Button</button>
<button class="button button_color_secondary">Button</button>
<button class="button button_color_success">Button</button>
<button class="button button_color_caution">Button</button>
<button class="button button_color_danger">Button</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button_outline`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group demo__group_tile">
      <button class="button button_outline">Button</button>
      <button class="button button_outline_primary">Button</button>
      <button class="button button_outline_secondary">Button</button>
      <button class="button button_outline_success">Button</button>
      <button class="button button_outline_caution">Button</button>
      <button class="button button_outline_danger">Button</button>
      <button class="button button_outline_dark">Button</button>
      <button class="button button_outline_fade">Button</button>
    </div>
    <div class="demo__group demo__group_inverted">
      <button class="button button_outline_inverted">Button</button>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="button button_outline">Button</button>
<button class="button button_outline_inverted">Button</button>
<button class="button button_outline_primary">Button</button>
<button class="button button_outline_secondary">Button</button>
<button class="button button_outline_success">Button</button>
<button class="button button_outline_caution">Button</button>
<button class="button button_outline_danger">Button</button>
<button class="button button_outline_dark">Button</button>
<button class="button button_outline_fade">Button</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->
