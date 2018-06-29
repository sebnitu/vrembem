---
title: Input-group
---

# Input-group

<p>A container component for grouping inputs and buttons together.</p>

## `input-group`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="input-group">
      <input class="input-group__item input" placeholder="..." type="text" />
      <button class="input-group__item button button_color_primary">Submit</button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="input-group">
  <input class="input-group__item input" placeholder="..." type="text" />
  <button class="input-group__item button">Submit</button>
</div>
```
  </div>
  </div>
</div>

## `input-group__item_grow`

You can adjust the flex grow property on items using the following modifiers:

* `input-group__item_grow_large`
* `input-group__item_grow_small`
* `input-group__item_grow_none`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input-group__item_grow_large input" placeholder="..." type="text" />
        <button class="input-group__item button button_color_primary">Submit</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input" placeholder="..." type="text" />
        <button class="input-group__item input-group__item_grow_small button button_color_primary">Submit</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input" placeholder="..." type="text" />
        <button class="input-group__item input-group__item_grow_none button button_color_primary">Submit</button>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="input-group">
  <input class="input-group__item input-group__item_grow_large input" placeholder="..." type="text" />
  <button class="input-group__item button button_color_primary">Submit</button>
</div>
<div class="input-group">
  <input class="input-group__item input" placeholder="..." type="text" />
  <button class="input-group__item input-group__item_grow_small button button_color_primary">Submit</button>
</div>
<div class="input-group">
  <input class="input-group__item input" placeholder="..." type="text" />
  <button class="input-group__item input-group__item_grow_none button button_color_primary">Submit</button>
</div>
```
  </div>
  </div>
</div>

## Examples

<div class="demo spacing">
  <div class="demo__render spacing">
    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input-group__item_grow_small input input_size_small" placeholder="Title" type="text" />
        <input class="input-group__item input input_size_small" placeholder="First" type="text" />
        <input class="input-group__item input input_size_small" placeholder="Last" type="text" />
        <button class="input-group__item input-group__item_grow_small button button_size_small button_color_primary">Submit</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input-group__item_grow_small input" placeholder="Title" type="text" />
        <input class="input-group__item input" placeholder="First" type="text" />
        <input class="input-group__item input" placeholder="Last" type="text" />
        <button class="input-group__item input-group__item_grow_small button button_color_primary">Submit</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input-group__item_grow_small input input_size_large" placeholder="Title" type="text" />
        <input class="input-group__item input input_size_large" placeholder="First" type="text" />
        <input class="input-group__item input input_size_large" placeholder="Last" type="text" />
        <button class="input-group__item input-group__item_grow_small button button_size_large button_color_primary">Submit</button>
      </div>
    </div>
  </div>
  <div class="demo__code" markdown="1">
```html
<div class="input-group">
  <input class="input-group__item input-group__item_grow_small input" placeholder="Title" type="text" />
  <input class="input-group__item input" placeholder="First" type="text" />
  <input class="input-group__item input" placeholder="Last" type="text" />
  <button class="input-group__item input-group__item_grow_small button button_color_primary">Submit</button>
</div>
```
  </div>
</div>

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="input-group">
      <input class="input-group__item input" placeholder="Search" type="text" />
      <button class="input-group__item input-group__item_grow_none button button_icon button_color_primary">
        {% include icon.html icon="search" %}
      </button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="input-group">
  <input class="input-group__item input" placeholder="Search" type="text" />
  <button class="input-group__item input-group__item_grow_none button button_icon button_color_primary">
    <svg role="img" class="icon">
      <use xlink:href="#search"></use>
    </svg>
  </button>
</div>
```
  </div>
  </div>
</div>
