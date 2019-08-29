import { toggleClass } from "@vrembem/core"

export const Dismissible = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    class: "dismiss",
    target: "[data-dismissible]",
    trigger: "[data-dismiss]"
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    document.addEventListener("click", run, false)
  }

  api.destroy = () => {
    document.removeEventListener("click", run, false)
  }

  const run = (e) => {
    let trigger = e.target.closest(api.settings.trigger)
    if (trigger) {
      let target = trigger.closest(api.settings.target)
      if (target) {
        toggleClass(target, api.settings.class)
      }
      e.preventDefault()
    }
  }

  if (api.settings.autoInit) api.init()

  return api
}
