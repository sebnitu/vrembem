---
layout: article
title: Base
description: "Includes useful default styles and base components for common HTML elements."
category: simple
usage:
  npm: "@vrembem/base"
  scss: "@vrembem/base/index"
---

{% include flag.html heading="Heading" %}

{% include demo_open.html class_parent="spacing" %}
<p class="h1">Heading</p>
<p class="h2">Heading</p>
<p class="h3">Heading</p>
<p class="h4">Heading</p>
<p class="h5">Heading</p>
<p class="h6">Heading</p>
{% include demo_switch.html %}
```html
<p class="h1">...</p>
<p class="h2">...</p>
<p class="h3">...</p>
<p class="h4">...</p>
<p class="h5">...</p>
<p class="h6">...</p>
```
{% include demo_close.html %}

{% include flag.html heading="Link" %}

{% include demo_open.html %}
<div class="spacing padding">
  <p><a href="#" class="link">Default link</a></p>
  <p><a href="#" class="link link_subtle">Subtle link</a></p>
</div>
<div class="spacing padding radius background_night">
  <p><a href="#" class="link link_invert">Inverted link</a></p>
  <p><a href="#" class="link link_invert-subtle">Inverted link</a></p>
</div>
{% include demo_switch.html %}
```html
<a href="#" class="link">Link</p>
<a href="#" class="link link_subtle">Link</a>
<a href="#" class="link link_invert">Link</a>
<a href="#" class="link link_invert-subtle">Link</a>
```
{% include demo_close.html %}

{% include flag.html heading="List" %}

{% include demo_open.html %}
<div class="spacing_xl">
  <ul class="list">
    <li>One</li>
    <li>Two
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    </li>
    <li>Three</li>
  </ul>

  <ol class="list">
    <li>One</li>
    <li>Two
      <ol>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ol>
    </li>
    <li>Three</li>
  </ol>
</div>
{% include demo_switch.html %}
```html
<ul class="list">
  <li>One</li>
  <li>Two
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  </li>
  <li>Three</li>
</ul>

<ol class="list">
  ...
</ol>
```
{% include demo_close.html %}

{% include flag.html heading="Separator" %}

<div class="type" markdown="1">
Typically used on an `<hr>` HTML element representing a thematic break between paragraph-level elements.
</div>

{% include demo_open.html %}
<div class="spacing padding">
  <hr class="sep sep_light">
  <hr class="sep">
  <hr class="sep sep_dark">
  <hr class="sep sep_darker">
</div>
<div class="spacing padding radius background_night">
  <hr class="sep sep_invert-light">
  <hr class="sep sep_invert">
  <hr class="sep sep_invert-dark">
  <hr class="sep sep_invert-darker">
</div>
{% include demo_switch.html %}
```html
<!-- Separator -->
<hr class="sep sep_light">
<hr class="sep">
<hr class="sep sep_dark">
<hr class="sep sep_darker">

<!-- Invert separator -->
<hr class="sep sep_invert-light">
<hr class="sep sep_invert">
<hr class="sep sep_invert-dark">
<hr class="sep sep_invert-darker">
```
{% include demo_close.html %}

{% include flag.html heading="embed" %}

{% include demo_open.html class_gridItem="span_6" %}
<div class="embed">
  <iframe class="embed__item" src="https://www.youtube.com/embed/YTsf-OAaoKc?rel=0&showinfo=0" width="560" height="315" frameborder="0" scrolling="no" allowfullscreen></iframe>
</div>
{% include demo_switch.html %}
```html
<div class="embed">
  <iframe class="embed__item" src="..." width="560" height="315"></iframe>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="blockquote" %}

{% include demo_open.html class_parent="spacing" %}
<blockquote class="blockquote" cite="https://ideapod.com/35-noam-chomsky-quotes-will-make-question-everything-society/">
  <p>"All over the place, from the popular culture to the propaganda system, there is constant pressure to make people feel that they are helpless, that the only role they can have is to ratify decisions and to consume."</p>
  <footer>Noam Chomsky, <cite>On Keeping the Population Passive</cite></footer>
</blockquote>
{% include demo_switch.html %}
```html
<blockquote class="blockquote" cite="...">
  <p>...</p>
  <footer>
    ...,
    <cite>...</cite>
  </footer>
</blockquote>
```
{% include demo_close.html %}

{% include flag.html heading="code" %}

{% include demo_open.html class_parent="spacing" %}
<code class="code">a = 17</code>
{% include demo_switch.html %}
```html
<code class="code">a = 17</code>
```
{% include demo_close.html %}

{% include flag.html heading="pre" %}

{% include demo_open.html class_parent="spacing" %}
<pre class="pre"><code>a = 17
print "a = #{a}";</code></pre>
{% include demo_switch.html %}
```html
<pre class="pre"><code>...</code></pre>
```
{% include demo_close.html %}

{% include flag.html heading="type" %}

<div class="type" markdown="1">
The `type` component is a quick way to apply all base styles to components directy based on their respective HTML elements. Base component modifiers will override a parent `type` component when explicitly set. Other components will run into style conflicts unless written with `type` inheritance in mind.
</div>

{% include demo_open.html class_parent="spacing" %}
<div class="type">

  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>This is a paragraph <code>$code-example</code> and some other things. <a href="#">Click here</a> for a link example. You can still apply <a class="link_subtle" href="#">link modifiers</a> inside of a type component.</p>

  <hr>

  <ul>
    <li>One</li>
    <li>Two
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    </li>
    <li>Three</li>
  </ul>

  <ol>
    <li>One</li>
    <li>Two
      <ol>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ol>
    </li>
    <li>Three</li>
  </ol>

  <blockquote cite="https://ideapod.com/35-noam-chomsky-quotes-will-make-question-everything-society/">
    <p>"History shows that, more often than not, loss of sovereignty leads to liberalization imposed in the interests of the powerful."</p>
    <footer>Noam Chomsky, <cite>On Authority</cite></footer>
  </blockquote>

<pre><code>a = 17
print "a = #{a}";</code></pre>

</div>
{% include demo_switch.html %}
```html
<div class="type">

  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>...</p>

  <hr>

  <ul>
    <li>One</li>
    ...
  </ul>

  <ol>
    <li>One</li>
    ...
  </ol>

  <blockquote cite="...">
    ...
  </blockquote>

  <pre>
    <code>
      ...
    </code>
  </pre>

</div>
```
{% include demo_close.html %}

{% include flag.html heading="type_invert" %}

{% include demo_open.html class_parent="spacing" %}
<div class="type type_invert background_night_dark padding radius">

  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>This is a paragraph <code>$code-example</code> and some other things. <a href="#">Click here</a> for a link example. You can still apply <a class="link_invert-subtle" href="#">link modifiers</a> inside of a type component.</p>

  <hr>

  <ul>
    <li>One</li>
    <li>Two
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    </li>
    <li>Three</li>
  </ul>

  <ol>
    <li>One</li>
    <li>Two
      <ol>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ol>
    </li>
    <li>Three</li>
  </ol>

  <blockquote cite="https://ideapod.com/35-noam-chomsky-quotes-will-make-question-everything-society/">
    <p>"History shows that, more often than not, loss of sovereignty leads to liberalization imposed in the interests of the powerful."</p>
    <footer>Noam Chomsky, <cite>On Authority</cite></footer>
  </blockquote>

<pre><code>a = 17
print "a = #{a}";</code></pre>

</div>
{% include demo_switch.html %}
```html
<div class="type type_invert">

  <h1>Heading</h1>
  <h2>Heading</h2>
  <h3>Heading</h3>
  <h4>Heading</h4>
  <h5>Heading</h5>
  <h6>Heading</h6>

  <p>...</p>

  <hr>

  <ul>
    <li>One</li>
    ...
  </ul>

  <ol>
    <li>One</li>
    ...
  </ol>

  <blockquote cite="...">
    ...
  </blockquote>

  <pre>
    <code>
      ...
    </code>
  </pre>

</div>
```
{% include demo_close.html %}
