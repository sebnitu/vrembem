---
layout: article
title: "Components"
description: "A list of all the components..."
---

<div class="type">
  <ol class="list">
    {% for item in site.components %}
      <li class="list__item">
        <a href="{{ item.url }}" class="list__link">{{ item.title }}</a>
      </li>
    {% endfor %}
  </ol>
</div>
