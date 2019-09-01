import { addClass, removeClass } from "@vrembem/core"

export const Todo = (options) => {

  let api = {}
  const defaults = {
    selectorTodo: "[data-todo]",
    selectorTodoList: "[data-todo-open]",
    selectorTodoDone: "[data-todo-done]",
    selectorNotice: "[data-todo-notice]",
    selectorToggle: "[data-todo-toggle]",
    transitionDuration: 500
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    updateLists()
    document.addEventListener("change", run, false)
  }

  api.destroy = () => {
    document.removeEventListener("change", run, false)
  }

  const todoList = document.querySelector(api.settings.selectorTodoList)
  const todoListDone = document.querySelector(api.settings.selectorTodoDone)
  const todoLists = [todoList, todoListDone]

  const updateLists = () => {
    todoLists.forEach((list) => {
      if (list.childElementCount <= 1) {
        removeClass(list.querySelector(api.settings.selectorNotice), "d_none")
      } else {
        addClass(list.querySelector(api.settings.selectorNotice), "d_none")
      }
    })
  }

  const moveTodo = (item) => {
    const list = (item.querySelector("input").checked) ?
      api.settings.selectorTodoDone:
      api.settings.selectorTodoList

    console.log(item)
    document.querySelector(list).append(item)
    updateLists()
  }

  const run = () => {
    let trigger = event.target.closest(api.settings.selectorTodo)
    if (trigger) {
      moveTodo(trigger)
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
