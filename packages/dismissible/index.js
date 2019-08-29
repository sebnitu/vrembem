import { toggleClass } from "@vrembem/core"

export const Dismissible = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    classToggle: "dismiss",
    target: "[data-dismissible]",
    trigger: "[data-dismiss]"
  }

  api.settings = { ...defaults, ...options }

  const run = (e) => {
    let trigger = e.target.closest(api.settings.trigger)
    if (trigger) {
      let target = trigger.closest(api.settings.target)
      if (target) {
        toggleClass(target, api.settings.classToggle)
      }
      e.preventDefault()
    }
  }

  api.init = () => {
    document.addEventListener("click", run, false)
  }

  api.destroy = () => {
    document.removeEventListener("click", run, false)
  }

  if (api.settings.autoInit) api.init()

  return api
}
