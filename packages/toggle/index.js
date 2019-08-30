import { camelCase, toggleClass } from "@vrembem/core"

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

  const run = (e) => {
    let trigger = e.target.closest(api.settings.selectorTrigger)
    if (trigger) {

      let cl = trigger.dataset[camelCase(api.settings.dataClass)]
      cl = (cl) ? cl : api.settings.class

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
