# Dropdown

<p class="text_lead">A component that is initially hidden and revealed upon user interaction either through a click or hover event. Dropdown components typically display lists of possible actions or navigation but this is not always the case.</p>

## `dropdown`

The base dropdown component provides the following elements:

* `dropdown`
  * `dropdown__trigger`
  * `dropdown__menu`
    * `dropdown__item`
      * `dropdown__link`
      * `dropdown__content`
        * `dropdown__title`
    * `dropdown__sep`

State classes:

* `is-active`
* `is-disabled`

Trigger classes:

* `on-hover`
* `on-focus`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="dropdown is-active">
      <button class="dropdown__trigger button button_color_primary">Trigger</button>
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          <div class="dropdown__content">
            <h2 class="dropdown__title">Dropdown Title</h2>
            <p>This is some content for a dropdown...</p>
          </div>
        </li>
        <li class="dropdown__sep"></li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link is-active">Dropdown Item</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
        <li class="dropdown__sep"></li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="demo__code">

```html
<div class="dropdown is-active">
  <button class="dropdown__trigger button button_color_primary">Dropdown</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <div class="dropdown__content">
        <h2 class="dropdown__title">Dropdown Title</h2>
        <p>This is some content for a dropdown...</p>
      </div>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link is-active">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
  </ul>
</div>
```

  </div>
</div>

## `dropdown__item > dropdown__menu`

This illustrates the use of sub dropdown menus and also the `dropdown__menu_pos_switch` class for reversing the direction of a sub dropdown.

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="dropdown on-hover">
      <button class="dropdown__trigger button button_color_primary">Trigger</button>
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
          <ul class="dropdown__menu">
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
              <ul class="dropdown__menu dropdown__menu_pos_switch">
                <li class="dropdown__item">
                  <a href="#" class="dropdown__link">Dropdown Item</a>
                </li>
                <li class="dropdown__item">
                  <a href="#" class="dropdown__link">Dropdown Item</a>
                </li>
                <li class="dropdown__item">
                  <a href="#" class="dropdown__link">Dropdown Item</a>
                </li>
                <li class="dropdown__sep"></li>
                <li class="dropdown__item">
                  <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
                </li>
                <li class="dropdown__item">
                  <a href="#" class="dropdown__link">Dropdown Item</a>
                </li>
              </ul>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
            <li class="dropdown__sep"></li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
          </ul>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
        <li class="dropdown__sep"></li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="demo__code">

```html
<div class="dropdown is-active">
  <button class="dropdown__trigger button button_color_primary">Trigger</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
          <ul class="dropdown__menu dropdown__menu_pos_switch">
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
            <li class="dropdown__sep"></li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
          </ul>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
        <li class="dropdown__sep"></li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
      </ul>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
  </ul>
</div>
```

  </div>
</div>

## `dropdown__menu_pos`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-down"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_down-left">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-down"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_down">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-down"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_down-right">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-left"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_left-down">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-left"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_left">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-left"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_left-up">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
    </div><!-- .demo__group -->
    <div class="demo__group">
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-up"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_up-left">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-up"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_up">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-up"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_up-right">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-right"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_right-down">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-right"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_right">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
      <div class="dropdown on-hover">
        <button class="button button_icon">
          <svg role="img" class="icon">
            <use xlink:href="#chevron-right"></use>
          </svg>
        </button>
        <ul class="dropdown__menu dropdown__menu_pos_right-up">
          <li class="dropdown__item dropdown__content">This is a dropdown...</li>
        </ul>
      </div><!-- .dropdown -->
    </div><!-- .demo__group -->
  </div>
  <div class="demo__code">

```html
<ul class="dropdown__menu dropdown__menu_pos_up-left">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_up">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_up-right">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_down-left">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_down">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_down-right">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_left-up">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_left">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_left-down">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_right-up">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_right">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_right-down">...</ul>
```

  </div>
</div>

## Examples

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="dropdown is-active">
      <button class="dropdown__trigger button button_color_primary">Twitter</button>
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          <a href="#" class="dropdown__content">
            <div>
              <h2 class="dropdown__title">Sebastian Nitu</h2>
              <span class="text_subtle">@sebnitu</span>
            </div>
          </a>
        </li>
        <li class="dropdown__sep"></li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">
            <svg role="img" class="dropdown__icon icon">
              <use xlink:href="#user"></use>
            </svg>
            <span class="dropdown__text">Profile</span>
          </a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">
            <svg role="img" class="dropdown__icon icon">
              <use xlink:href="#list"></use>
            </svg>
            <span class="dropdown__text">Lists</span>
          </a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">
            <svg role="img" class="dropdown__icon icon">
              <use xlink:href="#zap"></use>
            </svg>
            <span class="dropdown__text">Moments</span>
          </a>
        </li>
        <li class="dropdown__sep"></li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">
            <svg role="img" class="dropdown__icon icon">
              <use xlink:href="#heart"></use>
            </svg>
            <span class="dropdown__text">Promote Mode</span>
          </a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">
            <svg role="img" class="dropdown__icon icon">
              <use xlink:href="#external-link"></use>
            </svg>
            <span class="dropdown__text">Twitter Ads</span>
          </a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">
            <svg role="img" class="dropdown__icon icon">
              <use xlink:href="#activity"></use>
            </svg>
            <span class="dropdown__text">Analytics</span>
          </a>
        </li>
        <li class="dropdown__sep"></li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Settings and privacy</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Help Center</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Keyboard shortcuts</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Log out</a>
        </li>
        <li class="dropdown__sep"></li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link dropdown__link_split">
            <span class="dropdown__text">Night mode</span>
            <svg role="img" class="dropdown__icon icon">
              <use xlink:href="#moon"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="demo__code">

```html
<div class="dropdown is-active">
  <button class="dropdown__trigger button button_color_primary">Twitter</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <a href="#" class="dropdown__content">
        <div>
          <strong class="dropdown__title">Sebastian Nitu</strong><br />
          <span class="text_subtle">@sebnitu</span>
        </div>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <svg role="img" class="dropdown__icon icon">
          <use xlink:href="#user"></use>
        </svg>
        <span class="dropdown__text">Profile</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <svg role="img" class="dropdown__icon icon">
          <use xlink:href="#list"></use>
        </svg>
        <span class="dropdown__text">Lists</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <svg role="img" class="dropdown__icon icon">
          <use xlink:href="#zap"></use>
        </svg>
        <span class="dropdown__text">Moments</span>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <svg role="img" class="dropdown__icon icon">
          <use xlink:href="#heart"></use>
        </svg>
        <span class="dropdown__text">Promote Mode</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <svg role="img" class="dropdown__icon icon">
          <use xlink:href="#external-link"></use>
        </svg>
        <span class="dropdown__text">Twitter Ads</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <svg role="img" class="dropdown__icon icon">
          <use xlink:href="#activity"></use>
        </svg>
        <span class="dropdown__text">Analytics</span>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Settings and privacy</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Help Center</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Keyboard shortcuts</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Log out</a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link dropdown__link_split">
        <span class="dropdown__text">Night mode</span>
        <svg role="img" class="dropdown__icon icon">
          <use xlink:href="#moon"></use>
        </svg>
      </a>
    </li>
  </ul>
</div>
```

  </div>
</div>