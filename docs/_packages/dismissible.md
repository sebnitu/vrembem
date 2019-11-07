---
layout: article
title: Dismissible
description: "A component for either removing an element from the DOM or hiding it with a CSS class."
category: simple
usage:
  npm: "@vrembem/dismissible"
  js: "@vrembem/dismissible"
---

{% include flag.html heading="dismissible" %}

...

{% include flag.html heading="Dismissible Settings" %}

<table class="table table_zebra">
  <thead>
    <tr class="border_top_0">
      <th>Key</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="code text_nowrap">autoInit</code></td>
      <td><code class="code text_nowrap">false</code></td>
      <td>Automatically instantiates the instance</td>
    </tr>

    <!-- Data attributes -->
    <tr>
      <td><code class="code text_nowrap">dataTrigger</code></td>
      <td><code class="code text_nowrap">"dismiss"</code></td>
      <td>Data attribute for a dismiss trigger</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">dataTarget</code></td>
      <td><code class="code text_nowrap">"dismissible"</code></td>
      <td>Data attribute for a dismissible element</td>
    </tr>
  </tbody>
</table>

{% include flag.html heading="Dismissible API" %}

<table class="table table_zebra">
  <thead>
    <tr class="border_top_0">
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="code text_nowrap">modal.init()</code></td>
      <td>Initializes the dismissible instance</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">modal.destroy()</code></td>
      <td>Destroys and cleans up the dismissible instantiation</td>
    </tr>
  </tbody>
</table>
