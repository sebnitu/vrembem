---
layout: article
title: Type
description: "The type utility component is used for displaying formatted text like you would see in a blog post or document."
category: compound
# usage:
  # npm: "@vrembem/type"
  # scss: "vrembem/type/all"
---

{% include flag.html heading="type > heading" %}

{% include demo_open.html %}

<div class="type">
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="type > paragraph" %}

{% include demo_open.html %}

<div class="type">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <p>...</p>
</div>
```

{% include demo_close.html %}


{% include flag.html heading="type > blockquote" %}

{% include demo_open.html %}

<div class="type">
  <blockquote cite="https://www.huxley.net/bnw/four.html">
    <p>&ldquo;Words can be like X-rays, if you use them properly – they'll go through anything. You read and you're pierced.&rdquo;</p>
    <p><cite>– Aldous Huxley, Brave New World</cite></p>
  </blockquote>
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <blockquote cite="...">
    <p>&ldquo; ... &rdquo;</p>
    <p><cite>...</cite></p>
  </blockquote>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="type > figure" %}

{% include demo_open.html %}

<div class="type">
  <figure>
    <img src="https://picsum.photos/600/200/?random" width="600" height="200" />
    <figcaption>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</figcaption>
  </figure>
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <figure>
    <img src="..." />
    <figcaption>...</figcaption>
  </figure>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="type > hr" %}

{% include demo_open.html %}

<div class="type">
  <hr />
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <hr />
</div>
```

{% include demo_close.html %}

{% include flag.html heading="type > lists" %}

{% include demo_open.html %}

<div class="type">
  <ul>
    <li>Milk</li>
    <li>Cheese
      <ul>
        <li>Blue cheese</li>
        <li>Feta</li>
      </ul>
    </li>
  </ul>
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <ul>
    <li>Milk</li>
    <li>Cheese
      <ul>
        <li>Blue cheese</li>
        <li>Feta</li>
      </ul>
    </li>
  </ul>
</div>
```

{% include demo_close.html %}

{% include demo_open.html %}

<div class="type">
  <ol>
    <li>Mix flour, baking powder, sugar, and salt.</li>
    <li>In another bowl, mix eggs, milk, and oil.</li>
    <li>Stir both mixtures together.</li>
    <li>Fill muffin tray 3/4 full.</li>
    <li>Bake for 20 minutes.</li>
  </ol>
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <ol>
    <li>Mix flour, baking powder, sugar, and salt.</li>
    <li>In another bowl, mix eggs, milk, and oil.</li>
    <li>Stir both mixtures together.</li>
    <li>Fill muffin tray 3/4 full.</li>
    <li>Bake for 20 minutes.</li>
  </ol>
</div>
```

{% include demo_close.html %}

{% include demo_open.html %}

<div class="type">
  <dl>
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>

    <dt>Morgawr</dt>
    <dd>A sea serpent.</dd>

    <dt>Owlman</dt>
    <dd>A giant owl-like creature.</dd>
  </dl>
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <dl>
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>

    <dt>Morgawr</dt>
    <dd>A sea serpent.</dd>

    <dt>Owlman</dt>
    <dd>A giant owl-like creature.</dd>
  </dl>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="type > table" %}

{% include demo_open.html %}

<div class="type">
  <table>
    <thead>
      <tr>
        <th colspan="2">The table header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>The table body</td>
        <td>with two columns</td>
      </tr>
    </tbody>
  </table>
</div>

{% include demo_switch.html %}

```html
<div class="type">
  <table>
    <thead>
      <tr>
        <th colspan="2">The table header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>The table body</td>
        <td>with two columns</td>
      </tr>
    </tbody>
  </table>
</div>
```

{% include demo_close.html %}
