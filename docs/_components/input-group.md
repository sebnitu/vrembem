---
layout: page
title: Input-group
description: "A container component for grouping inputs and buttons together."
category: compound
# usage:
  # npm: "@vrembem/input-group"
  # scss: "vrembem/input-group/all"
---

{% include flag.html heading="input-group" %}

{% include demo_open.html %}

<div class="input-group">
  <input class="input-group__item input" placeholder="..." type="text" />
  <button class="input-group__item button button_color_primary">Submit</button>
</div>

{% include demo_switch.html %}

```html
<div class="input-group">
  <input class="input-group__item input" placeholder="..." type="text" />
  <button class="input-group__item button">Submit</button>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="input-group__item_grow" %}

<div class="type" markdown="1">

You can adjust the flex grow property on items using the following modifiers:

* `input-group__item_grow_lg`
* `input-group__item_grow_sm`
* `input-group__item_grow_none`

</div>

{% include demo_open.html class_parent="spacing" %}

    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input-group__item_grow_lg input" placeholder="..." type="text" />
        <button class="input-group__item button button_color_primary">Submit</button>
      </div>
    </div>

    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input" placeholder="..." type="text" />
        <button class="input-group__item input-group__item_grow_sm button button_color_primary">Submit</button>
      </div>
    </div>

    <div class="demo__group">
      <div class="input-group">
        <input class="input-group__item input" placeholder="..." type="text" />
        <button class="input-group__item input-group__item_grow_none button button_color_primary">Submit</button>
      </div>
    </div>

{% include demo_switch.html %}

```html
<div class="input-group">
  <input class="input-group__item input-group__item_grow_lg input" placeholder="..." type="text" />
  <button class="input-group__item button button_color_primary">Submit</button>
</div>
<div class="input-group">
  <input class="input-group__item input" placeholder="..." type="text" />
  <button class="input-group__item input-group__item_grow_sm button button_color_primary">Submit</button>
</div>
<div class="input-group">
  <input class="input-group__item input" placeholder="..." type="text" />
  <button class="input-group__item input-group__item_grow_none button button_color_primary">Submit</button>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="Demos" %}

<div class="demo spacing">
  <div class="demo__render spacing">

    <div class="demo__group">
      <div class="input-group">
        <select class="input-group__item input-group__item_grow_sm input input_type_select input_size_lg" placeholder="Title" type="text">
          <option selected="selected">Title</option>
          <option>Master</option>
          <option>Mr</option>
          <option>Mister</option>
          <option>Miss</option>
          <option>Mrs</option>
          <option>Ms</option>
          <option>Mx</option>
          <option>Other</option>
        </select>
        <input class="input-group__item input input_size_lg" placeholder="First" type="text" />
        <input class="input-group__item input input_size_lg" placeholder="Last" type="text" />
        <button class="input-group__item input-group__item_grow_none button button_size_lg button_color_primary">Submit</button>
      </div>
    </div>

  </div>
  <div class="demo__code" markdown="1">

```html
<div class="input-group">
  <input class="input-group__item input-group__item_grow_sm input" placeholder="Title" type="text" />
  <input class="input-group__item input" placeholder="First" type="text" />
  <input class="input-group__item input" placeholder="Last" type="text" />
  <button class="input-group__item input-group__item_grow_sm button button_color_primary">Submit</button>
</div>
```

  </div>
</div>

{% include demo_open.html %}

<div class="input-group">
  <input class="input-group__item input" placeholder="Search" type="text" />
  <button class="input-group__item grow_0 button button_icon button_color_primary">
    {% include icon.html icon="search" %}
  </button>
</div>

{% include demo_switch.html %}

```html
<div class="input-group">
  <input class="input-group__item input" placeholder="Search" type="text" />
  <button class="input-group__item grow_0 button button_icon button_color_primary">
    <svg role="img" class="icon">
      <use xlink:href="#search"></use>
    </svg>
  </button>
</div>
```

{% include demo_close.html %}
