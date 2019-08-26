import { toggleClass } from "@vrembem/core"

export const Toggle = (options) => {

  let api = {}
  let settings
  const defaults = {
    trigger: "[data-toggle-class]",
    targets: "",
    class: ""
  }

  api.init = (options) => {
    settings = { ...defaults, ...options }
    document.addEventListener("click", run, false)
  }

  api.destroy = () => {
    settings = null
    document.removeEventListener("click", run, false)
  }

  const run = () => {
    let trigger = event.target.closest(settings.trigger)
    if (trigger) {
      let targets
      if (settings.targets) {
        targets = document.querySelectorAll(settings.targets)
      } else {
        targets = document.querySelectorAll(trigger.dataset.toggleTarget)
      }
      if (targets.length) {
        targets.forEach((target) => {
          toggleClass(target, trigger.dataset.toggleClass.split(" "))
        })
      } else {
        if (settings.class) {
          toggleClass(trigger, settings.class)
        } else {
          toggleClass(trigger, trigger.dataset.toggleClass.split(" "))
        }
      }
      event.preventDefault()
    }
  }

  api.init(options)
  return api
}
