# Button

## `button`

```html
<a class="button" href="#">Button</a>
<button class="button">Button</button>
```

## `button_block`

```html
<button class="button button_block">Button</button>
```

## `button_color_`

```html
<button class="button button_color_primary">Button</button>
<button class="button button_color_secondary">Button</button>
<button class="button button_color_success">Button</button>
<button class="button button_color_caution">Button</button>
<button class="button button_color_danger">Button</button>
```

## `button_icon`

Used for when displaying a button with only an icon and no text.

```html
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
```

## `button_outline_`

```html
<button class="button button_outline">Button</button>
<button class="button button_outline_primary">Button</button>
<button class="button button_outline_secondary">Button</button>
<button class="button button_outline_success">Button</button>
<button class="button button_outline_caution">Button</button>
<button class="button button_outline_danger">Button</button>
<button class="button button_outline_light">Button</button>
<button class="button button_outline_dark">Button</button>
<button class="button button_outline_fade">Button</button>
```

## `button_size_`

```html
<button class="button button_size_small button_color_primary">Button</button>
<button class="button button_color_primary">Button</button>
<button class="button button_size_large button_color_primary">Button</button>
```

## `button__text`

Used for when you have other content within a button besides just text.

```html
<!-- Icons on the left side -->
<button class="button button_size_small button_color_primary">
  <svg role="img" class="icon">
    <use xlink:href="#github"></use>
  </svg>
  <span class="button__text">Button</span>
</button>
<button class="button button_color_primary">
  <svg role="img" class="icon">
    <use xlink:href="#github"></use>
  </svg>
  <span class="button__text">Button</span>
</button>
<button class="button button_size_large button_color_primary">
  <svg role="img" class="icon">
    <use xlink:href="#github"></use>
  </svg>
  <span class="button__text">Button</span>
</button>

<!-- Icons on the right side -->
<button class="button button_size_small button_color_primary">
  <span class="button__text">Button</span>
  <svg role="img" class="icon">
    <use xlink:href="#github"></use>
  </svg>
</button>
<button class="button button_color_primary">
  <span class="button__text">Button</span>
  <svg role="img" class="icon">
    <use xlink:href="#github"></use>
  </svg>
</button>
<button class="button button_size_large button_color_primary">
  <span class="button__text">Button</span>
  <svg role="img" class="icon">
    <use xlink:href="#github"></use>
  </svg>
</button>
```
