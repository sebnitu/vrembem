---
title: Menu
---

# Menu

<p class="text_lead">Menus represent groups of links, actions or navigation that a user can interact with. They come with a variety of elements and modifiers to facilitate many contexts and roles.</p>

## `menu`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code" markdown="1">

```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">Menu Item</a>
  </li>
  <li class="menu__sep"></li>
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `menu__link_icon`

Used for displaying icon-only links.

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#arrow-right"></use>
          </svg>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#rotate-cw"></use>
          </svg>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#home"></use>
          </svg>
        </a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#at-sign"></use>
          </svg>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#more-vertical"></use>
          </svg>
        </a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link menu__link_icon" href="#">
      <svg role="img" class="icon">
        <use xlink:href="#arrow-left"></use>
      </svg>
    </a>
  </li>
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `menu__text`

For creating non-link menu item content.

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <strong class="menu__text">Actions:</strong>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu">
  <li class="menu__item">
    <strong class="menu__text">Actions:</strong>
  </li>
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `menu > *`

Elements inside the menu__link and menu__text elements receive appropriate spacing.

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#thumbs-up"></use>
          </svg>
          <span>30k</span>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#thumbs-down"></use>
          </svg>
          <span>1k</span>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#share"></use>
          </svg>
          <span>Share</span>
        </a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          <svg role="img" class="icon">
            <use xlink:href="#more-horizontal"></use>
          </svg>
        </a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">
      <svg role="img" class="icon">
        <use xlink:href="#thumbs-up"></use>
      </svg>
      <span>30k</span>
    </a>
  </li>
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `is-active` `is-disabled`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link is-active" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link is-disabled" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link is-active" href="#">
      Create
    </a>
  </li>
  <li class="menu__item">
    <a class="menu__link is-disabled" href="#">
      Edit
    </a>
  </li>
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## Menu Modifiers

## `menu_full`

Allows a horizontal menu to span the full width of it's container.

<div class="demo">
  <div class="demo__render">
    <ul class="menu menu_full">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu menu_full">
  ...
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `menu_scroll`

Allows a horizontal menu to scroll if it exceeds the full width of it's container.

<div class="demo">
  <div class="demo__render">
    <ul class="menu menu_scroll">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Read</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Read</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Settings</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu menu_scroll">
  ...
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `menu_stack`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ul class="menu menu_stack">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu menu_stack">
  ...
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `menu_align`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ul class="menu menu_align_left">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
    </ul>
    <ul class="menu menu_align_center">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
    </ul>
    <ul class="menu menu_align_right">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
    </ul>
    <ul class="menu menu_stack menu_align_left">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
    </ul>
    <ul class="menu menu_stack menu_align_center">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
    </ul>
    <ul class="menu menu_stack menu_align_right">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu menu_align_left">
  ...
</ul>

<ul class="menu menu_align_center">
  ...
</ul>

<ul class="menu menu_align_right">
  ...
</ul>

<ul class="menu menu_stack menu_align_left">
  ...
</ul>

<ul class="menu menu_stack menu_align_center">
  ...
</ul>

<ul class="menu menu_stack menu_align_right">
  ...
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## Menu Themes

## `menu_theme_inverted`

This theme is perfect for using menus on a dark background.

<div class="demo demo_medium_row">
  <div class="demo__render demo__render_dark">
    <div class="demo__inner">
      <div class="demo__group">
        <ul class="menu menu_theme_inverted">
          <li class="menu__item">
            <a class="menu__link is-active" href="#">Create</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Read</a>
          </li>
          <li class="menu__item">
            <a class="menu__link is-disabled" href="#">Update</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Delete</a>
          </li>
          <li class="menu__sep"></li>
          <li class="menu__item">
            <a class="menu__link" href="#">Logout</a>
          </li>
        </ul>
      </div>
      <div class="demo__group">
        <ul class="menu menu_stack menu_theme_inverted">
          <li class="menu__item">
            <a class="menu__link is-active" href="#">Create</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Read</a>
          </li>
          <li class="menu__item">
            <a class="menu__link is-disabled" href="#">Update</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Delete</a>
          </li>
          <li class="menu__sep"></li>
          <li class="menu__item">
            <a class="menu__link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu menu_theme_inverted">
  <li class="menu__item">
    <a class="menu__link is-active" href="#">Create</a>
  </li>
  <li class="menu__item">
    <a class="menu__link" href="#">Read</a>
  </li>
  <li class="menu__item">
    <a class="menu__link is-disabled" href="#">Edit</a>
  </li>
  <li class="menu__item">
    <a class="menu__link" href="#">Delete</a>
  </li>
  <li class="menu__sep"></li>
  <li class="menu__item">
    <a class="menu__link" href="#">Logout</a>
  </li>
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `menu_theme_tabs`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <ul class="menu menu_theme_tabs">
        <li class="menu__item">
          <a class="menu__link is-active" href="#">Create</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">Read</a>
        </li>
        <li class="menu__item">
          <a class="menu__link is-disabled" href="#">Update</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">Delete</a>
        </li>
        <li class="menu__sep"></li>
        <li class="menu__item">
          <a class="menu__link" href="#">Logout</a>
        </li>
      </ul>
    </div>
    <div class="demo__group">
      <ul class="menu menu_stack menu_theme_tabs">
        <li class="menu__item">
          <a class="menu__link is-active" href="#">Create</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">Read</a>
        </li>
        <li class="menu__item">
          <a class="menu__link is-disabled" href="#">Update</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">Delete</a>
        </li>
        <li class="menu__sep"></li>
        <li class="menu__item">
          <a class="menu__link" href="#">Logout</a>
        </li>
      </ul>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu menu_theme_tabs">
  <li class="menu__item">
    <a class="menu__link is-active" href="#">Create</a>
  </li>
  <li class="menu__item">
    <a class="menu__link" href="#">Read</a>
  </li>
  <li class="menu__item">
    <a class="menu__link is-disabled" href="#">Update</a>
  </li>
  <li class="menu__item">
    <a class="menu__link" href="#">Delete</a>
  </li>
  <li class="menu__sep"></li>
  <li class="menu__item">
    <a class="menu__link" href="#">Logout</a>
  </li>
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

