# Navbar

<p class="text_lead">A component wrapper for displaying a global navigation bar.</p>

## `navbar`

Navbar provides the following elements for composition:

* `navbar`
  * `navbar__container`
    * `navbar__item`
      * `navbar__title`
      * `navbar__desc`

<div class="demo">
  <div class="demo__render">
    <div class="navbar">
      <div class="navbar__container">
        <div class="navbar__item">
          <span class="navbar__title">Some Title</span>
          <span class="navbar__desc">Some text description...</span>
        </div>
        <div class="navbar__item">
          <ul class="menu">
            <li class="menu__item">
              <a href="#" class="menu__link">Home</a>
            </li>
            <li class="menu__item">
              <a href="#" class="menu__link">About</a>
            </li>
            <li class="menu__item">
              <a href="#" class="menu__link">Blog</a>
            </li>
            <li class="menu__item">
              <a href="#" class="menu__link">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="demo__code">

```html
<div class="navbar">
  <div class="navbar__container">
    <div class="navbar__item">
      <span class="navbar__title">Some Title</span>
    </div>
    <div class="navbar__item">
      ...
    </div>
  </div>
</div>
```

  </div>
</div>

## `navbar_theme_inverted`

<div class="demo">
  <div class="demo__render">
    <div class="navbar navbar_theme_inverted">
      <div class="navbar__container">
        <div class="navbar__item">
          <span class="navbar__title">Some Title</span>
          <span class="navbar__desc">Some text description...</span>
        </div>
        <div class="navbar__item">
          <ul class="menu menu_theme_inverted">
            <li class="menu__item">
              <a href="#" class="menu__link">Home</a>
            </li>
            <li class="menu__item">
              <a href="#" class="menu__link">About</a>
            </li>
            <li class="menu__item">
              <a href="#" class="menu__link">Blog</a>
            </li>
            <li class="menu__item">
              <a href="#" class="menu__link">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="demo__code">

```html
<div class="navbar navbar_theme_inverted">
  <div class="navbar__container">
    <div class="navbar__item">
      <span class="navbar__title">Some Title</span>
    </div>
    <div class="navbar__item">
      ...
    </div>
  </div>
</div>
```

  </div>
</div>
