---
layout: page
title: Card
desc: "The cards component provide a flexible and extensible content container with multiple variants and options."
---

## `.card`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="card card_max">
      <img src="https://picsum.photos/600/400/?random" class="card__image" width="600" height="400" />
      <div class="card__body spacing">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="card">
  <img class="card__image" src="..." />
  <div class="card__body">
    ...
  </div>
</div>
```
  </div>
  </div>
</div>

## `.card__screen` `+` `.card__background`

<div class="demo grid grid_md">
  <div class="demp__render grid__item">
    <div class="card">
      <div class="card__body spacing c_white text_align_center">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p>
          <button class="button button_color_secondary">Card Action</button>
        </p>
      </div>
      <img src="https://picsum.photos/600/400/?20" class="card__background" width="600" height="400" />
      <div class="card__screen"></div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="card">
  <div class="card__body">
    ...
  </div>
  <img src="..." class="card__background" />
  <div class="card__screen"></div>
</div>
```
  </div>
  </div>
</div>

## `.card_size_[value]`

<div class="demo grid grid_md">
  <div class="demp__render grid__item">
    <div class="card card_size_lg">
      <div class="card__body spacing c_white text_align_center">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p>
          <button class="button button_color_primary">Card Action</button>
        </p>
      </div>
      <img src="https://picsum.photos/600/400/?9" class="card__background" width="600" height="400" />
      <div class="card__screen"></div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="card card_size_lg">
  ...
</div>
```
  </div>
  </div>
</div>

<div class="demo grid grid_md">
  <div class="demp__render grid__item">
    <div class="card card_size_xl">
      <div class="card__body spacing c_white text_align_center">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p>
          <button class="button button_color_secondary">Card Action</button>
        </p>
      </div>
      <img src="https://picsum.photos/600/400/?10" class="card__background" width="600" height="400" />
      <div class="card__screen"></div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="card card_size_xl">
  ...
</div>
```
  </div>
  </div>
</div>

## Examples

Below are a few examples of different ways to build a card.

<div class="grid">

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card">
      <img src="https://picsum.photos/600/400/?2" class="card__image" width="600" height="400" />
      <div class="card__body spacing">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card">
      <div class="card__body spacing">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
      <img src="https://picsum.photos/600/400/?3" class="card__image" width="600" height="400" />
    </div>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item size_12 size_6_xs grid__item_fill">
    <div class="card card_size_lg">
      <div class="card__body card__body_center spacing c_white text_align_center">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_secondary">Card Action</button></p>
      </div>
      <img src="https://picsum.photos/600/400/?4" class="card__background" width="600" height="400" />
      <div class="card__screen"></div>
    </div>
  </div>

  <div class="grid__item size_12 size_6_md grid__item_fill">
    <div class="card card_size_lg">
      <div class="card__body spacing">
        <blockquote>
          <p class="text_lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et, efficitur ultricies metus. Vestibulum rutrum dolor dui, lacinia viverra tellus molestie eget. Proin tempor mauris id velit luctus, sit amet varius erat vestibulum.</p>
          <footer class="text_subtle mt_1">
            <cite title="Source Title">&mdash; Someone famous in Source Title</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card">
      <img src="https://picsum.photos/600/400/?11" class="card__image" width="600" height="400" />
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_outline_primary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <img src="https://picsum.photos/600/400/?12" class="card__image" width="600" height="400" />
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_outline_secondary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item size_12 size_4_md grid__item_fill">
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_outline_success">Card Action</button></p>
      </div>
      <img src="https://picsum.photos/600/400/?13" class="card__image d_none_xs d_block_md" width="600" height="400" />
    </div>
  </div>

</div><!-- .grid -->

