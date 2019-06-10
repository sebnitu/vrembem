---
layout: article
title: Embed
description: "A container component for wrapping embeded media content in order to make them responsive."
category: simple
# usage:
  # npm: "@vrembem/embed"
  # scss: "vrembem/embed/all"
---

{% include flag.html heading="embed" %}

{% include demo_open.html %}

<div class="embed">
  <iframe class="embed__item" width="560" height="315" src="https://www.youtube.com/embed/YTsf-OAaoKc" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
</div>

{% include demo_switch.html %}

```html
<div class="embed">
  <iframe class="embed__item" ...></iframe>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="embed_ratio" %}

<div class="type" markdown="1">
Some media require different aspect ratios. In these cases there are a few modifiers for common ratios.
</div>

{% include demo_open.html %}

<div class="embed embed_ratio_4x3">
  <iframe class="embed__item" width="560" height="315" src="https://www.youtube.com/embed/CtMllWsML5M" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
</div>

{% include demo_switch.html %}

```html
<div class="embed embed_ratio_16x9">
  <iframe class="embed__item" ...></iframe>
</div>

<div class="embed embed_ratio_4x3">
  <iframe class="embed__item" ...></iframe>
</div>

<div class="embed embed_ratio_3x2">
  <iframe class="embed__item" ...></iframe>
</div>
```

{% include demo_close.html %}
