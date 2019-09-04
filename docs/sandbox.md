---
layout: article
title: "Sandbox"
description: "A place for me to play and test components."
---

<div class="level">

  <div class="checkbox">
    <input type="checkbox" class="checkbox__native" checked>
    <div class="checkbox__background">
      {% include icon.html icon="check" class="checkbox__icon" %}
    </div>
  </div>

  <div class="checkbox">
    <input type="checkbox" class="checkbox__native">
    <div class="checkbox__background">
      {% include icon.html icon="check" class="checkbox__icon" %}
    </div>
  </div>

  <div class="radio">
    <input type="radio" class="radio__native" name="radio-1" checked>
    <div class="radio__background">
      <div class="radio__circle"></div>
    </div>
  </div>

  <div class="radio">
    <input type="radio" class="radio__native" name="radio-1">
    <div class="radio__background">
      <div class="radio__circle"></div>
    </div>
  </div>

</div>

<div>
  <div class="level">
    <label class="level">
      <div class="checkbox">
        <input type="checkbox" class="checkbox__native" checked>
        <div class="checkbox__background">
          {% include icon.html icon="check" class="checkbox__icon" %}
        </div>
      </div>
      <span>Are you awesome?</span>
    </label>
    <label class="level">
      <div class="checkbox">
        <input type="checkbox" class="checkbox__native">
        <div class="checkbox__background">
          {% include icon.html icon="check" class="checkbox__icon" %}
        </div>
      </div>
      <span>Are you awesome?</span>
    </label>
  </div>

  <div class="level">
    <label class="level">
      <div class="radio">
        <input type="radio" class="radio__native" name="radio-2" checked>
        <div class="radio__background">
          <div class="radio__circle"></div>
        </div>
      </div>
      <span>Are you awesome?</span>
    </label>
    <label class="level">
      <div class="radio">
        <input type="radio" class="radio__native" name="radio-2">
        <div class="radio__background">
          <div class="radio__circle"></div>
        </div>
      </div>
      <span>Are you awesome?</span>
    </label>
  </div>
</div>

<div>
  <label class="choice choice_inline">
    <div class="checkbox">
      <input type="checkbox" class="checkbox__native">
      <div class="checkbox__background">
        {% include icon.html icon="check" class="checkbox__icon" %}
      </div>
    </div>
    <span>Are you awesome?</span>
  </label>
</div>

<div class="spacing">
  <div class="level">
    <input type="text" class="input input_size_sm input_auto" placeholder="Who are you...">
    <label class="choice choice_size_sm">
      <div class="checkbox">
        <input type="checkbox" class="checkbox__native">
        <div class="checkbox__background">
          {% include icon.html icon="check" class="checkbox__icon" %}
        </div>
      </div>
      <span>Are you awesome?</span>
    </label>
    <button class="button button_size_sm button_color_primary">Sure</button>
  </div>
  <div class="level">
    <input type="text" class="input input_auto" placeholder="Who are you...">
    <label class="choice">
      <div class="checkbox">
        <input type="checkbox" class="checkbox__native">
        <div class="checkbox__background">
          {% include icon.html icon="check" class="checkbox__icon" %}
        </div>
      </div>
      <span>Are you awesome?</span>
    </label>
    <button class="button button_color_primary">Sure</button>
  </div>
  <div class="level">
    <input type="text" class="input input_size_lg input_auto" placeholder="Who are you...">
    <label class="choice choice_size_lg">
      <div class="checkbox">
        <input type="checkbox" class="checkbox__native">
        <div class="checkbox__background">
          {% include icon.html icon="check" class="checkbox__icon" %}
        </div>
      </div>
      <span>Are you awesome?</span>
    </label>
    <button class="button button_size_lg button_color_primary">Sure</button>
  </div>
</div>
