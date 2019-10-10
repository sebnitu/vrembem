---
layout: article
title: Choice
description: "A component for form checkbox and radio button patterns."
category: simple
usage:
  npm: "@vrembem/choice"
  scss: "vrembem/choice/index"
---

{% include flag.html heading="radio choice" %}

<div>
  <div class="level">
    <label class="choice">
      <input class="choice__input" type="radio" name="choice-left">
      <span class="choice__text">Yes</span>
    </label>
    <label class="choice">
      <input class="choice__input" type="radio" name="choice-left">
      <span class="choice__text">No</span>
    </label>
    <label class="choice">
      <input class="choice__input" type="radio" name="choice-left">
      <span class="choice__text">Maybe</span>
    </label>
  </div>
</div>

<div>
  <div class="level">
    <label class="choice">
      {% include radio.html name="choice-radio-left" %}
      <span class="choice__text">Yes</span>
    </label>
    <label class="choice">
      {% include radio.html name="choice-radio-left" %}
      <span class="choice__text">No</span>
    </label>
    <label class="choice">
      {% include radio.html name="choice-radio-left" %}
      <span class="choice__text">Maybe</span>
    </label>
  </div>
</div>

<div>
  <div class="level">
    <label class="choice">
      <span class="choice__text">Yes</span>
      <input class="choice__input" type="radio" name="choice-right">
    </label>
    <label class="choice">
      <span class="choice__text">No</span>
      <input class="choice__input" type="radio" name="choice-right">
    </label>
    <label class="choice">
      <span class="choice__text">Maybe</span>
      <input class="choice__input" type="radio" name="choice-right">
    </label>
  </div>
</div>

<div>
  <div class="level">
    <label class="choice">
      <span class="choice__text">Yes</span>
      {% include radio.html name="choice-radio-right" %}
    </label>
    <label class="choice">
      <span class="choice__text">No</span>
      {% include radio.html name="choice-radio-right" %}
    </label>
    <label class="choice">
      <span class="choice__text">Maybe</span>
      {% include radio.html name="choice-radio-right" %}
    </label>
  </div>
</div>

<div>
  <div class="level">
    <label class="choice">
      <input class="choice__hidden" type="radio" name="choice-text">
      <span class="choice__text">Yes</span>
    </label>
    <label class="choice">
      <input class="choice__hidden" type="radio" name="choice-text">
      <span class="choice__text">No</span>
    </label>
    <label class="choice">
      <input class="choice__hidden" type="radio" name="choice-text">
      <span class="choice__text">Maybe</span>
    </label>
  </div>
</div>

{% include flag.html heading="checkbox choice" %}

<div class="spacing">
  <label class="choice">
    <input class="choice__input" type="checkbox">
    <span class="choice__text">Are you a big fan of checkboxes lets make this really long so that it wraps?</span>
  </label>
  <label class="choice">
    <input class="choice__input" type="checkbox">
    <span class="choice__text">Do you prefer to write your own styles lets make this really long so that it wraps?</span>
  </label>
</div>

<div class="spacing">
  <label class="choice">
    {% include checkbox.html %}
    <span class="choice__text">Are you a big fan of checkboxes lets make this really long so that it wraps?</span>
  </label>
  <label class="choice">
    {% include checkbox.html %}
    <span class="choice__text">Do you prefer to write your own styles lets make this really long so that it wraps?</span>
  </label>
</div>

<div class="spacing">
  <label class="choice">
    <span class="choice__text">Are you a big fan of checkboxes lets make this really long so that it wraps?</span>
    <input class="choice__input" type="checkbox">
  </label>
  <label class="choice">
    <span class="choice__text">Do you prefer to write your own styles lets make this really long so that it wraps?</span>
    <input class="choice__input" type="checkbox">
  </label>
</div>

<div class="spacing">
  <label class="choice">
    <span class="choice__text">Are you a big fan of checkboxes lets make this really long so that it wraps?</span>
    {% include checkbox.html %}
  </label>
  <label class="choice">
    <span class="choice__text">Do you prefer to write your own styles lets make this really long so that it wraps?</span>
    {% include checkbox.html %}
  </label>
</div>

<div class="spacing">
  <label class="choice">
    <input class="choice__hidden" type="checkbox">
    <span class="choice__text">Are you a big fan of checkboxes lets make this really long so that it wraps?</span>
  </label>
  <label class="choice">
    <input class="choice__hidden" type="checkbox">
    <span class="choice__text">Do you prefer to write your own styles lets make this really long so that it wraps?</span>
  </label>
</div>
