---
layout: article
title: "Examples"
description: "..."
---

{% assign size = site.examples | size %}
{% if size != 0 %}
<div class="type">
  <ol>
    {% for item in site.examples %}
      <li>
        <a href="{{ item.url }}">{{ item.title }}</a>
      </li>
    {% endfor %}
  </ol>
</div>
{% endif %}
