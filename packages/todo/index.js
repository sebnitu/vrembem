import { addClass, hasClass, removeClass, transition } from "@vrembem/core"

export const Todo = (options) => {

  let api = {}
  const defaults = {
    classStateActive: "is-active",
    classStateTransition: "is-animating",
    selectorTodo: "[data-todo]",
    selectorTodoBlock: "[data-todo-block]",
    selectorTodoList: "[data-todo-open]",
    selectorTodoDone: "[data-todo-done]",
    selectorNotice: "[data-todo-empty]",
    transition: true,
    transitionDuration: transition.duration,
    transitionTick: transition.tick
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    const todos = document.querySelectorAll(api.settings.selectorTodoBlock)
    if (todos.length) {
      updateSort(todos)
      const delay = (api.settings.transition) ?
        api.settings.transitionDuration * 3 : 0
      setTimeout(() => {
        updateNotice(todos)
      }, delay)
    }
    document.addEventListener("change", run, false)
  }

  api.destroy = () => {
    document.removeEventListener("change", run, false)
  }

  const updateSort = (todos) => {
    todos.forEach((todo) => {
      const listItems = todo.querySelectorAll(`
        ${api.settings.selectorTodoList}
        ${api.settings.selectorTodo}
      `)
      listItems.forEach((item) => {
        if(item.querySelector("input").checked) { moveTodo(item, false) }
      })

      const doneItems = todo.querySelectorAll(`
        ${api.settings.selectorTodoDone}
        ${api.settings.selectorTodo}
      `)
      doneItems.forEach((item) => {
        if(!item.querySelector("input").checked) { moveTodo(item, false) }
      })
    })
  }

  const updateNotice = (todos) => {
    todos.forEach((todo) => {

      const todoList = todo.querySelector(api.settings.selectorTodoList)
      const countList = todoList.querySelectorAll(api.settings.selectorTodo).length
      if (countList === 0) {
        showNotice(todoList)
      } else {
        hideNotice(todoList)
      }

      const todoDone = todo.querySelector(api.settings.selectorTodoDone)
      const countDone = todoDone.querySelectorAll(api.settings.selectorTodo).length
      if (countDone === 0) {
        showNotice(todoDone)
      } else {
        hideNotice(todoDone)
      }
    })
  }

  const showNotice = (list) => {
    let msg = list.querySelector(api.settings.selectorNotice)
    if (!msg) {
      msg = list.parentNode.querySelector(api.settings.selectorNotice)
    }
    if (msg) {
      if (api.settings.transition) {
        if (!hasClass(msg, api.settings.classStateActive)) {
          addClass(msg, api.settings.classStateTransition)
          setTimeout(() => {
            addClass(msg, api.settings.classStateActive)
            removeClass(msg, api.settings.classStateTransition)
          }, api.settings.transitionTick)
        }
      } else {
        addClass(msg, api.settings.classStateActive)
      }
    }
  }

  const hideNotice = (list) => {
    let msg = list.querySelector(api.settings.selectorNotice)
    if (!msg) {
      msg = list.parentNode.querySelector(api.settings.selectorNotice)
    }
    if (msg) {
      if (api.settings.transition) {
        if (hasClass(msg, api.settings.classStateActive)) {
          addClass(msg, api.settings.classStateTransition)
          setTimeout(() => {
            removeClass(msg, api.settings.classStateActive)
            setTimeout(() => {
              removeClass(msg, api.settings.classStateTransition)
            }, api.settings.transitionDuration)
          }, api.settings.transitionTick)
        }
      } else {
        removeClass(msg, api.settings.classStateActive)
      }
    }
  }

  const moveTodo = (item, toggleNotice = true) => {
    const todo = item.closest(api.settings.selectorTodoBlock)
    const todoList = todo.querySelector(api.settings.selectorTodoList)
    const todoDone = todo.querySelector(api.settings.selectorTodoDone)
    const itemInput = item.querySelector("input")
    const listTo = (itemInput.checked) ? todoDone : todoList
    const listFrom = (itemInput.checked) ? todoList : todoDone
    const listToCount = listTo.querySelectorAll(api.settings.selectorTodo).length
    const listFromCount = listFrom.querySelectorAll(api.settings.selectorTodo).length

    if (api.settings.transition) {
      itemInput.setAttribute("disabled", true)
      addClass(item, api.settings.classStateTransition)
      if (toggleNotice && listToCount === 0) {
        hideNotice(listTo)
      }
      setTimeout(() => {
        listTo.append(item)
        setTimeout(() => {
          removeClass(item, api.settings.classStateTransition)
          itemInput.removeAttribute("disabled")
          setTimeout(() => {
            if (toggleNotice && listFromCount <= 1) {
              showNotice(listFrom)
            }
          }, api.settings.transitionDuration)
        }, api.settings.transitionTick)
      }, api.settings.transitionDuration)
    } else {
      listTo.append(item)
      if (listToCount === 0) {
        hideNotice(listTo)
      }
      if (listFromCount <= 1) {
        showNotice(listFrom)
      }
    }
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
