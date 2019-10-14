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

<div>
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

{% include flag.html heading="Constrols + label + for" %}

<div>
  <p class="level">
    {% include checkbox.html id="checkbox-example" %}
    <label for="checkbox-example">
      Generic label text
    </label>
  </p>
  <p class="level">
    {% include radio.html name="radio-2" id="radio-example-1" %}
    <label for="radio-example-1">
      Generic label text
    </label>
  </p>
  <p class="level">
    {% include radio.html name="radio-2" id="radio-example-2" %}
    <label for="radio-example-2">
      Generic label text
    </label>
  </p>
  <p class="level">
    {% include switch.html id="switch-example" %}
    <label for="switch-example">
      Generic label text
    </label>
  </p>
</div>
