export const Checkbox = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    ariaState: "aria-checked",
    ariaStateMixed: "mixed"
  }

  api.settings = { ...defaults, ...options }
  api.settings.selector = `[${api.settings.ariaState}="${api.settings.ariaStateMixed}"]`

  api.init = () => {
    let mixed = document.querySelectorAll(api.settings.selector)
    api.setIndeterminate(mixed)
    document.addEventListener("click", removeAriaState, false)
  }

  api.destroy = () => {
    document.removeEventListener("click", removeAriaState, false)
  }

  api.setAriaState = (el, value = api.settings.ariaStateMixed) => {
    el = (el.forEach) ? el : [el]
    el.forEach((el) => {
      el.setAttribute(api.settings.ariaState, value)
    })
  }

  api.removeAriaState = (el) => {
    el = (el.forEach) ? el : [el]
    el.forEach((el) => {
      el.removeAttribute(api.settings.ariaState)
    })
  }

  api.setIndeterminate = (el) => {
    el = (el.forEach) ? el : [el]
    el.forEach((el) => {
      if (el.hasAttribute(api.settings.ariaState)) {
        el.indeterminate = true
      } else {
        el.indeterminate = false
      }
    })
  }

  const removeAriaState = () => {
    let el = event.target.closest(api.settings.selector)
    if (el) {
      api.removeAriaState(el)
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
