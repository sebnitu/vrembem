import { toggleClass } from "@vrembem/core"

export const Toggle = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    class: "is-active",
    dataClass: "toggle",
    dataTarget: "toggle-target",
    selectorTarget: "[data-toggle-target]",
    selectorTrigger: "[data-toggle]"
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    document.addEventListener("click", run, false)
  }

  api.destroy = () => {
    document.removeEventListener("click", run, false)
  }

  // Move me to core
  const camelCase = (str) => {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase()
    })
  }

  // Move me to core
  const hyphenCase = (str) => {
    return str.replace(/([a-z][A-Z])/g, function (g) {
      return g[0] + "-" + g[1].toLowerCase()
    })
  }

  const run = (e) => {
    let trigger = e.target.closest(api.settings.selectorTrigger)
    if (trigger) {

      // Get the class to toggle via dataClass or class
      let cl = trigger.dataset[camelCase(api.settings.dataClass)]
      cl = (cl) ? cl : api.settings.class

      // Resolve the target
      let target = trigger.dataset[camelCase(api.settings.dataTarget)]
      target = document.querySelectorAll(target)
      target = (target.length) ? target : trigger

      toggleClass(target, cl)
      e.preventDefault()
    }
  }

  if (api.settings.autoInit) api.init()

  return api
}
