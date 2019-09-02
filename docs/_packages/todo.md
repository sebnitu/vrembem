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

<form>
  <div class="grid todo">
    <div class="grid__item todo__list todo__list_open" data-todo-open>
      <div class="todo__notice notice notice_type_success" data-todo-notice>
        <p>Todo list is empty!</p>
      </div>
      <label class="todo__item" data-todo>
        <input type="checkbox" class="todo__input" data-todo-toggle>
        <span class="todo__text">Todo item 1</span>
      </label>
      <label class="todo__item" data-todo>
        <input type="checkbox" class="todo__input" data-todo-toggle>
        <span class="todo__text">Todo item 2</span>
      </label>
      <label class="todo__item" data-todo>
        <input type="checkbox" class="todo__input" data-todo-toggle>
        <span class="todo__text">Todo item 3</span>
      </label>
    </div>
    <div class="grid__item todo__list todo__list_done" data-todo-done>
      <div class="todo__notice notice" data-todo-notice>
        <p>No todos have been finished yet.</p>
      </div>
      <label class="todo__item" data-todo>
        <input type="checkbox" class="todo__input" data-todo-toggle checked>
        <span class="todo__text">Todo item 4</span>
      </label>
    </div>
  </div>
</form>
