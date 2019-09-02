---
layout: article
title: "Todo"
description: "A todo list component."
category: compound
# usage:
  # npm: "@vrembem/todo"
  # scss: "vrembem/todo/all"
  # js: "vrembem/todo"
---

{% include flag.html heading="todo" %}

<div class="todo todo_theme_boxed grid" data-todo-block>
  <div class="grid__item">
    <div class="todo__empty notice notice_size_sm notice_type_success" data-todo-empty>
      <p>All todo's have been completed!</p>
    </div>
    <ul class="todo__list todo__list_open spacing_xs" data-todo-open>
      <li class="todo__item" data-todo>
        <label class="choice choice_size_lg">
          <input type="checkbox">
          <span>Todo item 1</span>
        </label>
      </li>
      <li class="todo__item" data-todo>
        <label class="choice choice_size_lg">
          <input type="checkbox">
          <span>Todo item 2</span>
        </label>
      </li>
      <li class="todo__item" data-todo>
        <label class="choice choice_size_lg">
          <input type="checkbox">
          <span>Todo item 3</span>
        </label>
      </li>
    </ul>
  </div>
  <div class="grid__item">
    <div class="todo__empty notice notice_size_sm" data-todo-empty>
      <p>No todos have been completed yet.</p>
    </div>
    <ul class="todo__list todo__list_done spacing_xs" data-todo-done>
      <li class="todo__item" data-todo>
        <label class="choice choice_size_lg">
          <input type="checkbox" checked>
          <span>Todo item 4</span>
        </label>
      </li>
    </ul>
  </div>
</div>
