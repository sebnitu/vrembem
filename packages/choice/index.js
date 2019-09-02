import { addClass, removeClass } from "@vrembem/core"

export const Choice = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    classStateActive: "is-active",
    trigger: ".choice"
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    initChoice()
    document.addEventListener("change", run, false)
  }

  api.destroy = () => {
    document.removeEventListener("change", run, false)
  }

  const initChoice = () => {
    const choice = document.querySelectorAll(api.settings.trigger)
    choice.forEach((item) => {
      updateChoice(item)
    })
  }

  const updateChoice = (item) => {
    const input = item.querySelector("input")
    if (input.checked) {
      addClass(item, api.settings.classStateActive)
    } else {
      removeClass(item, api.settings.classStateActive)
    }
  }

  const run = (e) => {
    let trigger = e.target.closest(api.settings.trigger)
    if (trigger) {
      updateChoice(trigger)
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
