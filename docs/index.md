---
layout: base
title: "Home"
---

<div class="cover">

  <header class="cover__hero">
    <div class="cover__inner">
      <h1 class="cover__title">{{ site.title }}</h1>
      {%- if site.description -%}
        <p class="cover__desc">{{ site.description }} Currently {{ site.packages | size | minus: 1 }} available components.</p>
      {%- endif -%}
      <div class="grid grid_auto grid_gap_sm flex-align-center">
        <div class="grid__item">
          <a href="http://github.com/{{ site.repository }}" class="button button_color_primary">
            {% include icon.html icon="github" %}
            <span>GitHub Repo</span>
          </a>
        </div>
        <div class="grid__item">
          <a href="http://github.com/{{ site.repository }}/releases" class="cover__version" data-popover-trigger>
            <span>Version</span>
            <span class="version loading" data-role="version"></span>
          </a>
          <div class="popover popover_tooltip" data-popover data-popover-placement="bottom-start">
            View releases on Github
            <span class="popover__arrow" data-popover-arrow></span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div id="listjs" class="cover__aside">
    <div class="cover__header gap-y">
      {%- include filter.html -%}
    </div>
    <div class="cover__content">
      {%- include menu.html -%}
    </div>
  </div>

</div>
