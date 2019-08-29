import { toggleClass } from "@vrembem/core"

export const Toggle = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    class: "is-active",
    target: "[data-toggle-target]",
    trigger: "[data-toggle]"
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

      let target
      if (api.settings.target) {
        target = document.querySelectorAll(api.settings.target)
      } else {
        target = document.querySelectorAll(trigger.dataset.toggleTarget)
      }

      if (target.length) {
        toggleClass(target, trigger.dataset.toggle.split(" "))
      } else {
        if (api.settings.class) {
          toggleClass(trigger, api.settings.class)
        } else {
          toggleClass(trigger, trigger.dataset.toggle.split(" "))
        }
      }

      e.preventDefault()
    }
  }

  if (api.settings.autoInit) api.init()

  return api
}
