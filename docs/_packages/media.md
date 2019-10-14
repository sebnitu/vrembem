---
layout: article
title: Media
description: "The media component allows the composition of content which contains images, thumbnails or other media related to the content."
category: compound
usage:
  npm: "@vrembem/media"
  scss: "vrembem/media/index"
---

{% include flag.html heading="media" %}

{% include demo_open.html class_parent="spacing" %}
<div class="media">
  <div class="media__image">
    <img class="radius" src="https://picsum.photos/90/90/?11" width="90" height="90" />
  </div>
  <div class="media__body">
    <h2 class="h4"><a href="#">Media Content Title</a></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
<div class="media">
  <div class="media__icon">
    {% include icon.html icon="alert-circle" %}
  </div>
  <div class="media__body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media">
  <div class="media__image">
    ...
  </div>
  <div class="media__body">
    ...
  </div>
</div>

<div class="media">
  <div class="media__icon">
    ...
  </div>
  <div class="media__body">
    ...
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="media_reverse" %}

{% include demo_open.html class_parent="spacing" %}
<div class="media media_reverse">
  <img class="media__image radius" src="https://picsum.photos/90/90/?12" width="90" height="90" />
  <div class="media__body">
    <h2 class="h4"><a href="#">Media Content Title</a></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
<div class="media media_reverse">
  <div class="media__icon">
    {% include icon.html icon="alert-circle" %}
  </div>
  <div class="media__body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_reverse">
  ...
</div>
```
{% include demo_close.html %}

{% include flag.html heading="media_stack_[bp]" %}

{% include demo_open.html class_parent="spacing" %}
<div class="media media_stack_md">
  <img class="media__image radius" src="https://picsum.photos/90/90/?15" width="90" height="90" />
  <div class="media__body">
    <h2 class="h4"><a href="#">Media Content Title</a></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
<div class="media media_reverse media_stack_md">
  <img class="media__image radius" src="https://picsum.photos/90/90/?15" width="90" height="90" />
  <div class="media__body">
    <h2 class="h4"><a href="#">Media Content Title</a></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media media_stack_md">
  ...
</div>
```
{% include demo_close.html %}

{% include flag.html heading="Blog listing" %}

{% include demo_open.html class_parent="spacing spacing_xl" %}
<div class="media items_center">
  <img class="media__image radius" src="https://picsum.photos/90/90/?21" width="90" height="90" />
  <div class="media__body">
    <h2 class="h4"><a href="#">Suspendisse elementum pharetra risus sed commodo</a></h2>
    <p class="text_subtle">December 24th, 2017</p>
  </div>
</div>
<div class="media items_center">
  <img class="media__image radius" src="https://picsum.photos/90/90/?22" width="90" height="90" />
  <div class="media__body">
    <h2 class="h4"><a href="#">Aliquam vehicula eros eget neque aliquet</a></h2>
    <p class="text_subtle">October 13th, 2018</p>
  </div>
</div>
<div class="media items_center">
  <img class="media__image radius" src="https://picsum.photos/90/90/?23" width="90" height="90" />
  <div class="media__body">
    <h2 class="h4"><a href="#">Integer ullamcorper eget est nec libero est</a></h2>
    <p class="text_subtle">November 16th, 2018</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="media items_center">
  <img class="media__image" src="..." />
  <div class="media__body">
    <h2 class="h3"><a href="#">...</a></h2>
    <p class="text_subtle">...</p>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="Comments section" %}

{% include demo_open.html class_parent="spacing spacing_xl" %}
<div class="level flex_justify_between">
  <h2 class="h4">3 Comments</h2>
  <button class="button button_outline">
    {% include icon.html icon="sliders" %}
    <span>Sort by</span>
  </button>
</div>
<div class="media">
  <img class="media__image radius_circle" src="https://picsum.photos/40/40/?30" width="40" height="40" />
  <div class="media__body">
    <textarea class="input input_textarea" placeholder="Add a public comment..."></textarea>
  </div>
</div><!-- .media -->
<div class="media">
  <img class="media__image radius_circle" src="https://picsum.photos/40/40/?31" width="40" height="40" />
  <div class="media__body spacing">
    <div class="level flex_justify_between">
      <h2>
        <a href="#">Noam Chomsky</a>
      </h2>
      <a class="link link_subtle" href="#">47 minutes ago</a>
    </div>
    <p>Suspendisse potenti. Nullam tincidunt venenatis urna, at pharetra justo imperdiet vehicula. Morbi rutrum dapibus placerat. Maecenas a neque ut dui tincidunt pharetra et fermentum diam.</p>
    <ul class="menu">
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="thumbs-up" %}
          <span>12</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="thumbs-down" %}
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          Reply
        </a>
      </li>
    </ul>
  </div>
</div><!-- .media -->
<div class="media">
  <img class="media__image radius_circle" src="https://picsum.photos/40/40/?32" width="40" height="40" />
  <div class="media__body spacing">
    <div class="level flex_justify_between">
      <h2>
        <a href="#">Howard Zinn</a>
      </h2>
      <a class="link link_subtle" href="#">18 hours ago</a>
    </div>
    <p>Suspendisse potenti. Nullam tincidunt venenatis urna, at pharetra justo imperdiet vehicula. Morbi rutrum dapibus placerat. Maecenas a neque ut dui tincidunt pharetra et fermentum diam.</p>
    <ul class="menu">
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="thumbs-up" %}
          <span>26</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="thumbs-down" %}
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          Reply
        </a>
      </li>
    </ul>
  </div>
</div><!-- .media -->
<div class="media">
  <img class="media__image radius_circle" src="https://picsum.photos/40/40/?33" width="40" height="40" />
  <div class="media__body spacing">
    <div class="level flex_justify_between">
      <h2>
        <a href="#">Emma Goldman</a>
      </h2>
      <a class="link link_subtle" href="#">4 days ago</a>
    </div>
    <p>Suspendisse potenti. Nullam tincidunt venenatis urna, at pharetra justo imperdiet vehicula. Morbi rutrum dapibus placerat. Maecenas a neque ut dui tincidunt pharetra et fermentum diam.</p>
    <ul class="menu">
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="thumbs-up" %}
          <span>4</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="thumbs-down" %}
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          Reply
        </a>
      </li>
    </ul>
  </div>
</div><!-- .media -->
{% include demo_switch.html %}
```html
<div class="media">
  <img class="media__image radius_circle" src="..." />
  <div class="media__body">
    <textarea class="input input_textarea" placeholder="Add a public comment..."></textarea>
  </div>
</div><!-- .media -->
<div class="media">
  <img class="media__image radius_circle" src="" />
  <div class="media__body">
    <h2 class="level flex_justify_between">
      <a href="#">[name]</a>
      <a class="link link_subtle" href="#">[timestamp]</a>
    </h2>
    <p>[comment]</p>
    <ul class="menu">
      [menuitems]
    </ul>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="Quotes listing" %}

{% include demo_open.html class_grid="grid_break" class_parent="spacing spacing_xl" %}

<h2 class="h2 text_align_center">Tweet Quotes</h2>

<div class="media media_stack_md items_center">
  <img class="media__image radius_circle" src="https://picsum.photos/200/200/?41" width="200" height="200" />
  <blockquote class="media__body text_lead">
    <p>For those who stubbornly seek freedom there can be no more urgent task than to come to understand the mechanisms & practices of indoctrination.These are easy to perceive in totalitarian societies, much less so in the system of brainwashing under freedom to which we are subjected.</p>
    <footer>
      <cite>Chomsky Quotes <a class="link link_subtle" href="#">@quotes_chomsky</a></cite>
    </footer>
  </blockquote>
</div><!-- .media -->

<div class="media media_stack_md media_reverse items_center">
  <img class="media__image radius_circle" src="https://picsum.photos/200/200/?42" width="200" height="200" />
  <blockquote class="media__body text_lead">
    <p>Hitler, Mussolini, Japanese fascists - all of them - are all full of humanitarian rhetoric. States are not moral agents. They can be compelled to observe legal and other requirements, but that can only be either by countervailing force or by their own citizens.</p>
    <footer>
      <cite>Chomsky Quotes <a class="link link_subtle" href="#">@quotes_chomsky</a></cite>
    </footer>
  </blockquote>
</div><!-- .media -->

<div class="media media_stack_md items_center">
  <img class="media__image radius_circle" src="https://picsum.photos/200/200/?43" width="200" height="200" />
  <blockquote class="media__body text_lead">
    <p>The UN outlawed the use of threat of intervention unless authorized by the UN Security Council or in self-defence against armed attack.That system did not survive for a second. It was violated immediately by the great powers, any power that could get away with it.</p>
    <footer>
      <cite>Chomsky Quotes <a class="link link_subtle" href="#">@quotes_chomsky</a></cite>
    </footer>
  </blockquote>
</div><!-- .media -->

{% include demo_switch.html %}

```html
<div class="media media_stack_md items_center">
  <img class="media__image radius_circle" src="..." />
  <blockquote class="media__body text_lead">
    <p>[quote]</p>
    <footer>
      <cite>[name] <a class="link link_subtle" href="#">@[handle]</a></cite>
    </footer>
  </blockquote>
</div>
```

{% include demo_close.html %}
