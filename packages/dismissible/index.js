import { extend, toggleClass } from "@vrembem/core"

export default (options) => {

  let api = {}
  let settings
  const defaults = {
    trigger: "[data-dismiss]",
    target: "[data-dismissible]",
    classToggle: "dismiss"
  }

  api.init = (options) => {
    settings = extend( defaults, options || {} )
    document.addEventListener("click", run, false)
  }

  api.destroy = () => {
    settings = null
    document.removeEventListener("click", run, false)
  }

  const run = () => {
    let trigger = event.target.closest(settings.trigger)
    if (trigger) {
      let target = trigger.closest(settings.target)
      if (target) {
        toggleClass(target, settings.classToggle)
      }
      event.preventDefault()
    }
  }

  api.init(options)
  return api
}
