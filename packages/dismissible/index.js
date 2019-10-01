export const Dismissible = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
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
        target.remove()
      }
      e.preventDefault()
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
