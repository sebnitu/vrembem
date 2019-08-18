---
layout: article
title: "Roadmap"
description: "While in the process of transitioning the Vrembem project into a monorepo using Lerna, this file will document the progress and keep track of remaining tasks."
include:
  css: "styles.css"
---

{% include flag.html heading="General tasks" %}

<div class="content">
  <ol class="list list_inline">
    <li class="is-done"><span class="list__icon"></span> Scripts</li>
    <li class="is-done"><span class="list__icon"></span> Linting</li>
    <li class="is-done"><span class="list__icon"></span> Components</li>
    <li class=""><span class="list__icon"></span> Tests</li>
    <li class=""><span class="list__icon"></span> Audit</li>
    <li class=""><span class="list__icon"></span> Refactor</li>
    <li class=""><span class="list__icon"></span> Docs</li>
  </ol>
</div>

{% include flag.html heading="Components" %}

I'm starting to import the rest of my components into their own package file.

<div class="grid grid_break_md count-group">

  <div class="grid__item count count_done">
    <ol class="list list_count list_grid">
      <li class="is-done"><span class="list__icon"></span> all</li>
      <li class="is-done"><span class="list__icon"></span> arrow</li>
      <li class="is-done"><span class="list__icon"></span> base</li>
      <li class="is-done"><span class="list__icon"></span> breadcrumb</li>
      <li class="is-done"><span class="list__icon"></span> button</li>
      <li class="is-done"><span class="list__icon"></span> button-group</li>
      <li class="is-done"><span class="list__icon"></span> card</li>
      <li class="is-done"><span class="list__icon"></span> container</li>
      <li class="is-done"><span class="list__icon"></span> core</li>
      <li class="is-done"><span class="list__icon"></span> dialog</li>
      <li class="is-done"><span class="list__icon"></span> dismissible</li>
      <li class="is-done"><span class="list__icon"></span> drawer</li>
      <li class="is-done"><span class="list__icon"></span> dropdown</li>
      <li class="is-done"><span class="list__icon"></span> embed</li>
      <li class="is-done"><span class="list__icon"></span> grid</li>
      <li class="is-done"><span class="list__icon"></span> icon</li>
      <li class="is-done"><span class="list__icon"></span> icon-action</li>
      <li class="is-done"><span class="list__icon"></span> input</li>
      <li class="is-done"><span class="list__icon"></span> level</li>
      <li class="is-done"><span class="list__icon"></span> media</li>
      <li class="is-done"><span class="list__icon"></span> menu</li>
      <li class="is-done"><span class="list__icon"></span> modal</li>
      <li class="is-done"><span class="list__icon"></span> notice</li>
      <li class="is-done"><span class="list__icon"></span> section</li>
      <li class="is-done"><span class="list__icon"></span> spacing</li>
      <li class="is-done"><span class="list__icon"></span> span</li>
      <li class="is-done"><span class="list__icon"></span> toggle</li>
      <li class="is-done"><span class="list__icon"></span> tooltip</li>
      <li class="is-done"><span class="list__icon"></span> utility</li>
      <li class="is-done"><span class="list__icon"></span> type</li>
    </ol>
    <h3 class="subtitle">
      Processed
      <span class="sep"></span>
      <span class="count__total"></span>
    </h3>
  </div>

  <div class="grid__item span_full">
    <h3 class="subtitle">
      <span class="t_nowrap">Total components</span>
      <span class="sep"></span>
      <span class="count-group__total"></span>
    </h3>
  </div>

  <div class="grid__item span_full">
    <div class="notice notice_theme_paper">
      <h3 class="notice__title">Task notes</h3>
      <ul class="list list_todo">
        <li class="is-done">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/utility</strong> Update the utility classes to have use the short name patterns.</p>
        </li>
        <li class="is-done">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/all</strong> Create package that incorporates and compiles everything. Maybe this can be done in root? Otherwise, use "all" package.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/utility</strong> Add border and border-radius modifiers.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/drawer</strong> Change the way that drawers are saved via saveState. Instead of requiring an ID, maybe use a data attribute.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/drawer</strong> Refactor the drawer to better define "left" and "right" drawers and only allow one of the same drawer position type to be open at a time.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/dropdown</strong> Create a JavaScript dropdown component for <code>on-click</code> event handling.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/list</strong> Creat a list component that creates a stylized list with multiple modifier options.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/panel</strong> Creat a panel component whos purpose is a general wrapper element more generic than the card component.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/docs</strong> Look into switching the docs from using Jekyll to use Gatsby instead.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/docs</strong> Tie together the README.md files that exist per package into the documentation.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/docs</strong> Create docs pages for core, base, utiltiy, dismissible and toggle.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/docs</strong> Create a page that lists all available components along with tags.</p>
        </li>
        <li class="">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/docs</strong> Add a "getting started" page to the docs.</p>
        </li>
      </ul>
    </div>
  </div>

</div>

{% include flag.html heading="Build scripts" %}

These are tasks I need to setup with NPM scripts and sorting the output and how to use them.

<div class="grid grid_break_sm count-group">

  <div class="grid__item count">
    <ul class="list list_count">
      <li class="is-done"><span class="list__icon"></span> build [--parallel]</li>
      <li class="is-done"><span class="list__icon"></span> clean [--parallel]</li>
      <li class="is-done"><span class="list__icon"></span> fix</li>
      <li class="is-done"><span class="list__icon"></span> fix:scripts</li>
      <li class="is-done"><span class="list__icon"></span> fix:styles</li>
      <li class="is-done"><span class="list__icon"></span> lint</li>
      <li class="is-done"><span class="list__icon"></span> lint:scripts</li>
      <li class="is-done"><span class="list__icon"></span> lint:styles</li>
      <li class="is-done"><span class="list__icon"></span> watch [--parallel]</li>
    </ul>
    <h3 class="subtitle">
      Root
      <span class="sep"></span>
      <span class="count__total"></span>
    </h3>
  </div>

  <div class="grid__item count">
    <ul class="list list_count">
      <li class="is-done"><span class="list__icon"></span> build</li>
      <li class="is-done"><span class="list__icon"></span> clean</li>
      <li class="is-done"><span class="list__icon"></span> scripts</li>
      <li class="is-done"><span class="list__icon"></span> watch</li>
      <li class="is-done"><span class="list__icon"></span> watch:scripts</li>
    </ul>
    <h3 class="subtitle">
      Scripts
      <span class="sep"></span>
      <span class="count__total"></span>
    </h3>
  </div>

  <div class="grid__item count">
    <ul class="list list_count">
      <li class="is-done"><span class="list__icon"></span> build</li>
      <li class="is-done"><span class="list__icon"></span> clean</li>
      <li class="is-done"><span class="list__icon"></span> styles</li>
      <li class="is-done"><span class="list__icon"></span> styles:compile</li>
      <li class="is-done"><span class="list__icon"></span> styles:min</li>
      <li class="is-done"><span class="list__icon"></span> watch</li>
      <li class="is-done"><span class="list__icon"></span> watch:styles</li>
    </ul>
    <h3 class="subtitle">
      Styles
      <span class="sep"></span>
      <span class="count__total"></span>
    </h3>
  </div>

  <div class="grid__item span_full">
    <h3 class="subtitle">
      <span class="t_nowrap">Total Scripts</span>
      <span class="sep"></span>
      <span class="count-group__total"></span>
    </h3>
  </div>

</div>

{% include flag.html heading="Script groups" %}

The set of scripts that are to be used depending on the package type.

<div class="spacing" markdown="1">

<h2 class="subtitle">Root</h2>

```js
"scripts": {
  "build": "lerna run build --parallel",
  "clean": "lerna run clean --parallel",
  "fix": "npm-run-all fix:styles fix:scripts",
  "fix:scripts": "eslint --fix packages",
  "fix:styles": "stylelint --fix 'packages/**/*.scss'",
  "lint": "npm-run-all lint:styles lint:scripts",
  "lint:scripts": "eslint packages",
  "lint:styles": "stylelint 'packages/**/*.scss'",
  "watch": "lerna run watch --parallel"
}
```

<h2 class="subtitle">Scripts</h2>

```js
"scripts": {
  "build": "npm-run-all clean scripts",
  "clean": "del dist",
  "scripts": "rollup -c",
  "watch": "npm run watch:scripts",
  "watch:scripts": "rollup -c -w"
}
```

<h2 class="subtitle">Styles</h2>

```js
"scripts": {
  "build": "npm-run-all clean styles",
  "clean": "del dist",
  "styles": "npm-run-all styles:compile styles:min",
  "styles:compile": "sass index.scss dist/styles.css --load-path node_modules",
  "styles:min": "sass dist/styles.css dist/styles.min.css --style compressed",
  "watch": "npm run watch:styles",
  "watch:styles": "nodemon -e scss -x 'npm run styles'"
}
```

<h2 class="subtitle">Both</h2>

```js
"scripts": {
  "build": "npm-run-all clean scripts styles",
  "clean": "del dist",
  "scripts": "rollup -c",
  "styles": "npm-run-all styles:compile styles:min",
  "styles:compile": "sass index.scss dist/styles.css --load-path node_modules",
  "styles:min": "sass dist/styles.css dist/styles.min.css --style compressed",
  "watch": "npm run watch:scripts watch:styles",
  "watch:scripts": "rollup -c -w",
  "watch:styles": "nodemon -e scss -x 'npm run styles'"
}
```

</div>
