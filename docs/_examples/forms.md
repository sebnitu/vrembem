---
layout: article
title: "Forms example"
description: "..."
---

{% include flag.html heading="Constrols" %}

<div>
  {% include checkbox.html %}
  {% include radio.html name="radio-1" %}
  {% include radio.html name="radio-1" %}
  {% include switch.html %}
</div>

{% include flag.html heading="Constrols + label" %}

<div class="spacing">
  <p>
    <label>
      {% include checkbox.html %}
      Generic label text
    </label>
  </p>
  <p>
    <label>
      {% include radio.html name="radio-2" %}
      Generic label text
    </label>
  </p>
  <p>
    <label>
      {% include radio.html name="radio-2" %}
      Generic label text
    </label>
  </p>
  <p>
    <label>
      {% include switch.html %}
      Generic label text
    </label>
  </p>
</div>
