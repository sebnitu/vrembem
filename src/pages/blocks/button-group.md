# Button-group

<p class="text_lead">A container component for groups of buttons.</p>

## `button-group`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <div class="button-group">
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group">
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
      </div>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<div class="button-group">
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
</div>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button-group_full`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
      </div>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<div class="button-group button-group_full">
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
</div>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button-group_stack`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <div class="button-group button-group_stack">
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_stack">
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
      </div>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<div class="button-group button-group_stack">
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
</div>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button-group_stack + button-group_full`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <div class="button-group button-group_stack button-group_full">
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_stack button-group_full">
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
      </div>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<div class="button-group button-group_stack button-group_full">
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
</div>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## Item Modifiers

## `button-group__item_equal`

Item modifier to set flex-basis to 0.

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button-group__item button-group__item_equal button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button-group__item_equal button button_outline">Button</button>
      </div>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<div class="button-group button-group_full">
  <button class="button-group__item button-group__item_equal button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
</div>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button-group__item_static`

Item modifier to remove flex-grow.

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button-group__item button-group__item_static button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
        <button class="button-group__item button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button button_outline">Button</button>
        <button class="button-group__item button-group__item_static button button_outline">Button</button>
      </div>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<div class="button-group button-group_full">
  <button class="button-group__item button-group__item_static button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
  <button class="button-group__item button button_color_primary">Button</button>
</div>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->
