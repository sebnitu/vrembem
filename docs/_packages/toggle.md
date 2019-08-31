---
layout: article
title: Toggle
description: "A JavaScript component that toggles a class on a target or set of targets."
category: simple
usage:
  npm: "@vrembem/toggle"
  js: "@vrembem/toggle"
---

<button class="button" data-toggle>
  Toggle default
</button>

<button class="button" data-toggle="button_outline">
  Toggle button outline
</button>

<button class="button" data-toggle="bg_shade" data-toggle-target="#target">
  Toggle a target div
</button>

<div id="target" class="p_md">
  <p>This is a target div that's going to get triggered.</p>
</div>

<button class="button" data-toggle="bg_shade" data-toggle-target=".todo" data-toggle-self>
  Toggle self and all todos
</button>

<button class="button" data-toggle="bg_shade" data-toggle-target=".todo:first-child, .todo:last-child" data-toggle-self="button_outline">
  Toggle first and last children of a list
</button>

<ul class="spacing">
  <li class="todo" data-toggle="bg_shade">List item</li>
  <li class="todo" data-toggle="bg_shade">List item</li>
  <li class="todo" data-toggle="bg_shade">List item</li>
  <li class="todo" data-toggle="bg_shade">List item</li>
</ul>

<div class="panel">
  <button class="button" data-toggle="p_md bg_accent" data-toggle-parent=".panel">
    Toggle parent
  </button>
</div>

<div class="panel spacing">
  <button class="button" data-toggle="bg_accent" data-toggle-sibling="ul">
    Toggle sibling unordered lists
  </button>
  <ul class="spacing p_md" data-toggle="bg_accent" data-toggle-child="*">
    <li>List item</li>
    <li>List item</li>
    <li>List item</li>
  </ul>
  <ul class="spacing p_md" data-toggle="bg_accent" data-toggle-child=".test">
    <li class="test">List item</li>
    <li class="test">List item</li>
    <li>List item</li>
  </ul>
  <p class="p_md test">This is just a paragraph</p>
</div>
