---
layout: home
title: Home
---

<div class="cover">

  <header class="header cover__header">
    <div class="cover__inner">
      <h1 class="cover__title">{{ site.title }}</h1>
      <p class="cover__desc">A CSS component library based on the BEM methodology. You're viewing the component catalog where you can test all available components.</p>
      <p class="cover__version">Version {{ site.version }}</p>
    </div>
  </header>

  <div id="vrembem-blocks" class="content cover__content">
    <div class="jumbo-filter">
      <label class="input-group">
        <span class="input-group__item input-group__item_grow_none button button_outline">Filter by:</span>
        <select id="jumbo-filter__type" class="input-group__item input input_type_select">
          <option value="" selected>All</option>
          <option value="blocks">Components</option>
          <option value="layout">Layout</option>
          <option value="templates">Templates</option>
        </select>
      </label><!-- .input-group -->
      <div class="input-group">
        <input id="jumbo-filter__search" class="search input input-group__item" type="text" placeholder="Search..." />
        <button class="sort input-group__item input-group__item_grow_none button button_icon button_outline" data-sort="jumbo-list__name">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <polyline points="17 8 12 3 7 8"></polyline>
            <polyline points="17 16 12 21 7 16"></polyline>
          </svg>
        </button>
      </div><!-- .input-group -->
    </div><!-- .jumbo-filter -->
    <ul class="jumbo-list">
      {% for collection_name in site.collections %}
        {% for item in site[collection_name.label] %}
          <li class="jumbo-list__item" data-type="{{ collection_name.label }}">
            <a class="jumbo-list__link" href="{{ item.url }}">
              <span class="jumbo-list__name">{{ item.title }}</span>
            </a>
          </li>
        {% endfor %}
      {% endfor %}
    </ul><!-- .jumbo-list -->
  </div><!-- .vrembem-blocks -->

</div>
