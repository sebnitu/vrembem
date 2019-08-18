---
layout: article
title: "Roadmap"
description: "While in the process of transitioning the Vrembem project into a monorepo using Lerna, this file will document the progress and keep track of remaining tasks."
include:
  css: "styles.css"
---

<div class="content">
  <ol class="list list_inline">
    <li class="is-done"><span class="list__icon"></span> Scripts</li>
    <li class="is-done"><span class="list__icon"></span> Linting</li>
    <li class="is-done"><span class="list__icon"></span> Components</li>
    <li class=""><span class="list__icon"></span> Audit</li>
    <li class=""><span class="list__icon"></span> Refactor</li>
    <li class=""><span class="list__icon"></span> Readme</li>
    <li class=""><span class="list__icon"></span> Test</li>
    <li class=""><span class="list__icon"></span> Docs</li>
  </ol>
</div>

<h2 class="h3">Components</h2>

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
      <h3 class="notice__title">Notes</h3>
      <ul class="list list_todo">
        <li class="is-done">
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/utility</strong> Update the utility classes to have use the short name patterns.</p>
        </li>
        <li>
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/utility</strong> Add border and border-radius modifiers.</p>
        </li>
        <li>
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/drawer</strong> Change the way that drawers are saved via saveState. Instead of requiring an ID, maybe use a data attribute.</p>
        </li>
        <li>
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/drawer</strong> Refactor the drawer to better define "left" and "right" drawers and only allow one of the same drawer position type to be open at a time.</p>
        </li>
        <li>
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/all</strong> Create package that incorporates and compiles everything. Maybe this can be done in root? Otherwise, use "all" package.</p>
        </li>
        <li>
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/layout</strong> Create package that incorporates and compiles all layout components. This would include things like "container", "grid", "level", "section", "spacing" and "span".</p>
        </li>
        <li>
          <span class="list__icon"></span>
          <p><strong class="list__title">@vrembem/dropdown</strong> Create a JavaScript dropdown component for <code>on-click</code> event handling.</p>
        </li>
      </ul>
    </div>
  </div>

</div>

<h2 class="h3">Build scripts</h2>

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

  <div class="grid__item span_full">
    <div class="notice notice_theme_paper">
      <h3 class="notice__title">Notes</h3>
      <ul class="list list_todo">
        <li class="is-done">
          <span class="list__icon"></span>
          <p>Incorporate UMD (Universal Module Definition) for JavaScript plugins. Look into using this Babel transform: <a class="link" target="_blank" href="https://babeljs.io/docs/en/babel-plugin-transform-modules-umd">@babel/plugin-transform-modules-umd</a></p>
        </li>
      </ul>
    </div>
  </div>

</div>

<h2 class="h3">Script groups</h2>

The set of scripts that are to be used depending on the package type.

<div class="m_top_md">
  <button class="button button_outline" data-toggle-target=".code" data-toggle-class="dismiss">Toggle Scripts</button>
</div>

<h2 class="subtitle" data-toggle-target=".code_root" data-toggle-class="dismiss">
  <span class="level">
    <span>Root</span>
    <span class="arrow"></span>
  </span>
</h2>

```js
// component package.json
"scripts": {
  "build": "lerna run build --parallel",
  "clean": "lerna run clean --parallel",
  "fix": "npm-run-all fix:styles fix:scripts",
  "fix:scripts": "eslint --fix packages",
  "fix:styles": "stylelint --fix \"packages/**/*.scss\"",
  "lint": "npm-run-all lint:styles lint:scripts",
  "lint:scripts": "eslint packages",
  "lint:styles": "stylelint \"packages/**/*.scss\"",
  "watch": "lerna run watch --parallel"
}
```

<h2 class="subtitle" data-toggle-target=".code_scripts" data-toggle-class="dismiss">
  <span class="level">
    <span>Scripts</span>
    <span class="arrow"></span>
  </span>
</h2>

```js
// component package.json
"scripts": {
  "build": "npm-run-all clean scripts",
  "clean": "del dist",
  "scripts": "rollup -c",
  "watch": "npm run watch:scripts",
  "watch:scripts": "rollup -c -w"
}
```

<h2 class="subtitle" data-toggle-target=".code_styles" data-toggle-class="dismiss">
  <span class="level">
    <span>Styles</span>
    <span class="arrow"></span>
  </span>
</h2>

```js
// component package.json
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

<h2 class="subtitle" data-toggle-target=".code_both" data-toggle-class="dismiss">
  <span class="level">
    <span>Both</span>
    <span class="arrow"></span>
  </span>
</h2>

```js
// component package.json
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
