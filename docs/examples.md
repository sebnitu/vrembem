---
layout: article
title: "Examples"
description: "A list of all the examples..."
---

<div class="type">
  <ol class="list">
    {% for item in site.examples %}
      <li class="list__item">
        <a href="{{ item.url }}" class="list__link">{{ item.title }}</a>
      </li>
    {% endfor %}
  </ol>
</div>
