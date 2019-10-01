---
layout: article
title: "Todo"
description: "A todo list component."
category: compound
usage:
  npm: "@vrembem/todo"
  scss: "vrembem/todo/index"
  js: "vrembem/todo"
---

{% include flag.html heading="todo" %}

<div class="todo todo_theme_boxed" data-todo-block>

  <div>
    <div class="todo__empty notice notice_state_success" data-todo-empty>
      <p>All todo's have been completed!</p>
    </div>
    <ul class="todo__list todo__list_open" data-todo-open>
      <li class="todo__item" data-todo>
        <label class="todo__control">
          {% include checkbox.html %}
          <span>Todo item 1</span>
        </label>
      </li>
      <li class="todo__item" data-todo>
        <label class="todo__control">
          {% include checkbox.html %}
          <span>Todo item 2</span>
        </label>
      </li>
      <li class="todo__item" data-todo>
        <label class="todo__control">
          {% include checkbox.html %}
          <span>Todo item 3</span>
        </label>
      </li>
    </ul>
  </div>

  <div>
    <div class="todo__empty notice color_light" data-todo-empty>
      <p>No todos have been completed yet.</p>
    </div>
    <ul class="todo__list todo__list_done" data-todo-done>
      <li class="todo__item" data-todo>
        <label class="todo__control">
          {% include checkbox.html checked="" %}
          <span>Todo item 4</span>
        </label>
      </li>
    </ul>
  </div>

</div>
