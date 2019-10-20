export const Checkbox = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    stateAttr: "aria-checked",
    stateValue: "mixed"
  }

  api.settings = { ...defaults, ...options }
  api.settings.selector = 
    `[${api.settings.stateAttr}="${api.settings.stateValue}"]`

  api.init = () => {
    let mixed = document.querySelectorAll(api.settings.selector)
    api.setIndeterminate(mixed)
    document.addEventListener("click", removeAriaState, false)
  }

  api.destroy = () => {
    document.removeEventListener("click", removeAriaState, false)
  }

  api.setAriaState = (el, value = api.settings.stateValue) => {
    el = (el.forEach) ? el : [el]
    el.forEach((el) => {
      el.setAttribute(api.settings.stateAttr, value)
    })
  }

  api.removeAriaState = (el) => {
    el = (el.forEach) ? el : [el]
    el.forEach((el) => {
      el.removeAttribute(api.settings.stateAttr)
    })
  }

  api.setIndeterminate = (el) => {
    el = (el.forEach) ? el : [el]
    el.forEach((el) => {
      if (el.hasAttribute(api.settings.stateAttr)) {
        el.indeterminate = true
      } else {
        el.indeterminate = false
      }
    })
  }

  const removeAriaState = (event) => {
    let el = event.target.closest(api.settings.selector)
    if (el) {
      api.removeAriaState(el)
      api.setIndeterminate(el)
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
