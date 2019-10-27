import { addClass, camelCase, hasClass, removeClass } from "@vrembem/core"

export const Drawer = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,

    // Data attributes
    dataDrawer: "drawer",
    dataModal: "drawer-modal", // TODO: Add modal feature
    dataTrigger: "drawer-trigger",
    dataClose: "drawer-close",
    dataFocus: "drawer-focus", // TODO: Add focus feature

    // State classes
    stateOpen: "is-open",
    stateOpening: "is-opening",
    stateClosing: "is-closing",
    stateClosed: "is-closed", // Default state

    // Classes
    classModal: "drawer_modal",

    // Feature toggles
    focus: true // TODO: Add focus feature
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    document.addEventListener("click", run, false)
    document.addEventListener("touchend", run, false)
    document.addEventListener("keyup", escape, false)
  }

  api.destroy = () => {
    document.removeEventListener("click", run, false)
    document.removeEventListener("touchend", run, false)
    document.removeEventListener("keyup", escape, false)
  }

  const run = (event) => {
    // Trigger click
    let trigger = event.target.closest(`[data-${api.settings.dataTrigger}]`)
    if (trigger) {
      const selector = event.target.dataset[camelCase(api.settings.dataTrigger)]
      toggle(selector)
      event.preventDefault()
    } else {
      // Close click
      trigger = event.target.closest(`[data-${api.settings.dataClose}]`)
      if (trigger) {
        const target = event.target.closest(`[data-${api.settings.dataDrawer}]`)
        close(target)
        event.preventDefault()
      }
      // Root click
      if (event.target.dataset[camelCase(api.settings.dataDrawer)]) {
        close(event.target)
      }
    }
  }

  const escape = (event) => {
    if (event.keyCode == 27) {
      const target = document.querySelector(
        `.${api.settings.classModal}.${api.settings.stateOpen}`
      )
      if (target) {
        close(target)
      }
    }
  }

  const toggle = (selector) => {
    const target = document.querySelector(
      `[data-${api.settings.dataDrawer}="${selector}"]`
    )
    if (target) {
      const isOpen = hasClass(target, api.settings.stateOpen)
      if (!isOpen) {
        open(target)
      } else {
        close(target)
      }
    }
  }

  const open = (drawer) => {
    addClass(drawer, api.settings.stateOpening)
    drawer.addEventListener("transitionend", function _listener() {
      addClass(drawer, api.settings.stateOpen)
      removeClass(drawer, api.settings.stateOpening)
      this.removeEventListener("transitionend", _listener, true)
    }, true)
  }

  const close = (drawer) => {
    addClass(drawer, api.settings.stateClosing)
    removeClass(drawer, api.settings.stateOpen)
    drawer.addEventListener("transitionend", function _listener() {
      removeClass(drawer, api.settings.stateClosing)
      this.removeEventListener("transitionend", _listener, true)
    }, true)
  }

  if (api.settings.autoInit) api.init()
  return api
}
