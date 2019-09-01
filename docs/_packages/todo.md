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
  <div class="todo">
    <div class="todo__list todo__list_open" data-todo-open>
      <div class="notice d_none" data-todo-notice>
        <p>Todo list is empty!</p>
      </div>
      <label class="todo__item" data-todo>
        <input type="checkbox" class="todo__input" data-todo-toggle>
        <span class="todo__text">Todo item...</span>
      </label>
      <label class="todo__item" data-todo>
        <input type="checkbox" class="todo__input" data-todo-toggle>
        <span class="todo__text">Todo item...</span>
      </label>
      <label class="todo__item" data-todo>
        <input type="checkbox" class="todo__input" data-todo-toggle>
        <span class="todo__text">Todo item...</span>
      </label>
    </div>
    <hr class="hr">
    <div class="todo__list todo__list_done" data-todo-done>
      <div class="notice d_none" data-todo-notice>
        <p>No todos have been finished yet.</p>
      </div>
      <label class="todo__item" data-todo>
        <input type="checkbox" class="todo__input" data-todo-toggle checked>
        <span class="todo__text">Todo item...</span>
      </label>
    </div>
  </div>
</form>
