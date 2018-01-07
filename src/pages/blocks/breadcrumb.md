# Breadcrumb

<p class="text_lead">The breadcrumb is a navigation component that shows the hierarchical path to a users current location.</p>

## `breadcrumb`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ol class="breadcrumb">
      <li class="breadcrumb__item">
        <a href="#" class="breadcrumb__link">Home</a>
      </li>
      <li class="breadcrumb__item">
        <a href="#" class="breadcrumb__link">Blog</a>
      </li>
      <li class="breadcrumb__item">
        <a href="#" class="breadcrumb__link">Category</a>
      </li>
      <li class="breadcrumb__item">
        <span class="breadcrumb__text">Current Page</span>
      </li>
    </ol>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ol class="breadcrumb">
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">Home</a>
  </li>
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">Blog</a>
  </li>
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">Category</a>
  </li>
  <li class="breadcrumb__item">
    Current Page
  </li>
</ol>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `breadcrumb_size`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <ol class="breadcrumb breadcrumb_size_small">
        <li class="breadcrumb__item">
          <a href="#" class="breadcrumb__link">Home</a>
        </li>
        <li class="breadcrumb__item">
          <a href="#" class="breadcrumb__link">Blog</a>
        </li>
        <li class="breadcrumb__item">
          <a href="#" class="breadcrumb__link">Category</a>
        </li>
        <li class="breadcrumb__item">
          <span class="breadcrumb__text">Current Page</span>
        </li>
      </ol>
    </div>
    <div class="demo__group">
      <ol class="breadcrumb breadcrumb_size_large">
        <li class="breadcrumb__item">
          <a href="#" class="breadcrumb__link">Home</a>
        </li>
        <li class="breadcrumb__item">
          <a href="#" class="breadcrumb__link">Blog</a>
        </li>
        <li class="breadcrumb__item">
          <a href="#" class="breadcrumb__link">Category</a>
        </li>
        <li class="breadcrumb__item">
          <span class="breadcrumb__text">Current Page</span>
        </li>
      </ol>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ol class="breadcrumb breadcrumb_size_small">
  ...
</ol>
<ol class="breadcrumb breadcrumb_size_large">
  ...
</ol>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->
