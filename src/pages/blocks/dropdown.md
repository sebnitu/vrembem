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
            <p><b class="dropdown__title">Dropdown Title</b></p>
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
        <p><strong>Some Title</strong></p>
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

## Examples

<div class="demo demo_medium_row">
  <div class="demo__render">
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