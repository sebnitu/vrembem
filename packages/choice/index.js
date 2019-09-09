import { addClass, removeClass } from "@vrembem/core"

// TODO: If it's a radio, remove active class from inputs with same name attr

export const Choice = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    classStateActive: "is-active",
    classStateFocus: "is-focus",
    trigger: ".choice"
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    const choice = document.querySelectorAll(api.settings.trigger)
    choice.forEach((item) => {
      updateChoice(item)
      item.querySelector("input").addEventListener("focus", onFocus, false)
      item.querySelector("input").addEventListener("blur", onBlur, false)
    })
    document.addEventListener("change", onChange, false)
  }

  api.destroy = () => {
    const choice = document.querySelectorAll(api.settings.trigger)
    choice.forEach((item) => {
      item.querySelector("input").removeEventListener("focus", onFocus, false)
      item.querySelector("input").removeEventListener("blur", onBlur, false)
    })
    document.removeEventListener("change", onChange, false)
  }

  const updateChoice = (item) => {
    const input = item.querySelector("input")
    if (input.type === "radio") {
      const radioInput = document.querySelectorAll(`[name="${input.name}"]`)
      radioInput.forEach((el) => {
        removeClass(
          el.closest(api.settings.trigger),
          api.settings.classStateActive
        )
      })
    }
    if (input.checked) {
      addClass(item, api.settings.classStateActive)
    } else {
      removeClass(item, api.settings.classStateActive)
    }
  }

  const onChange = (e) => {
    let trigger = e.target.closest(api.settings.trigger)
    if (trigger) {
      updateChoice(trigger)
    }
  }

  const onFocus = (e) => {
    addClass(
      e.target.closest(api.settings.trigger),
      api.settings.classStateFocus
    )
  }

  const onBlur = (e) => {
    removeClass(
      e.target.closest(api.settings.trigger),
      api.settings.classStateFocus
    )
  }

  if (api.settings.autoInit) api.init()
  return api
}
