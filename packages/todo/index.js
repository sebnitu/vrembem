import { addClass, removeClass, toggleClass } from "@vrembem/core"

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

  const updateLists = () => {
    const todoList = document.querySelector(api.settings.selectorTodoList)
    const todoDone = document.querySelector(api.settings.selectorTodoDone)
    const todoLists = [todoList, todoDone]

    if (todoList && todoDone) {
      todoLists.forEach((list) => {
        const item = list.querySelector(api.settings.selectorNotice)
        if (list.childElementCount <= 1) {
          addClass(item, "is-block")
          setTimeout(() => {
            toggleClass(item, "is-block", "is-active")
          }, 50)
        } else {
          removeClass(item, "is-active")
        }
      })
    }
  }

  const moveTodo = (item) => {
    const list = (item.querySelector("input").checked) ?
      api.settings.selectorTodoDone:
      api.settings.selectorTodoList

    toggleClass(item, "is-animating")
    setTimeout(() => {
      document.querySelector(list).append(item)
      setTimeout(() => {
        toggleClass(item, "is-animating")
        updateLists()
      }, 50)
    }, 300)
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
