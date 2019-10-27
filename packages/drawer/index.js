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
    dataFocus: "drawer-focus",

    // State classes
    stateOpen: "is-open",
    stateOpening: "is-opening",
    stateClosing: "is-closing",
    stateClosed: "is-closed", // Default state

    // Classes
    classModal: "drawer_modal", // TODO: Apply class on breakpoint

    // Feature toggles
    focus: true,
    saveState: true
  }

  api.settings = { ...defaults, ...options }

  api.memoryTrigger = null
  api.memoryTarget = null
  api.state = {}

  api.init = () => {
    applyState()
    document.addEventListener("click", run, false)
    document.addEventListener("touchend", run, false)
    document.addEventListener("keyup", escape, false)
  }

  api.destroy = () => {
    api.memoryTrigger = null
    api.memoryTarget = null
    document.removeEventListener("click", run, false)
    document.removeEventListener("touchend", run, false)
    document.removeEventListener("keyup", escape, false)
  }

  const run = (event) => {
    // Trigger click
    let trigger = event.target.closest(`[data-${api.settings.dataTrigger}]`)
    if (trigger) {
      const selector = event.target.dataset[camelCase(api.settings.dataTrigger)]
      saveTrigger(trigger)
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

  const open = (drawer, callback) => {
    if (!hasClass(drawer, api.settings.stateOpen)) {
      saveTarget(drawer)
      addClass(drawer, api.settings.stateOpening)
      drawer.addEventListener("transitionend", function _listener() {
        addClass(drawer, api.settings.stateOpen)
        removeClass(drawer, api.settings.stateOpening)
        saveState(drawer)
        setFocus()
        typeof callback === "function" && callback()
        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const close = (drawer, callback) => {
    if (hasClass(drawer, api.settings.stateOpen)) {
      addClass(drawer, api.settings.stateClosing)
      removeClass(drawer, api.settings.stateOpen)
      drawer.addEventListener("transitionend", function _listener() {
        removeClass(drawer, api.settings.stateClosing)
        saveState(drawer)
        returnFocus()
        typeof callback === "function" && callback()
        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const saveTarget = (target) => {
    if (api.settings.focus) {
      api.memoryTarget = target
    }
  }

  const saveTrigger = (trigger) => {
    if (api.settings.focus) {
      api.memoryTrigger = trigger
    }
  }

  const setFocus = () => {
    if (api.settings.focus && api.memoryTarget) {
      const innerFocus = api.memoryTarget.querySelector(
        `[data-${api.settings.dataFocus}]`
      )
      if (innerFocus) {
        innerFocus.focus()
      } else {
        api.memoryTarget.focus()
      }
      api.memoryTarget = null
    }
  }

  const returnFocus = () => {
    if (api.settings.focus && api.memoryTrigger) {
      api.memoryTrigger.focus()
      api.memoryTrigger = null
    }
  }

  const saveState = (target = false) => {
    if (api.settings.saveState) {
      const drawers = (!target) ?
        document.querySelectorAll(`[data-${api.settings.dataDrawer}]`):
        (target.forEach) ? target : [target]
      drawers.forEach((el) => {
        if (!hasClass(el, api.settings.classModal)) {
          api.state[el.dataset[camelCase(api.settings.dataDrawer)]] =
            (hasClass(el, api.settings.stateOpen)) ?
              api.settings.stateOpen:
              api.settings.stateClosed
        }
      })
      localStorage.setItem("DrawerState", JSON.stringify(api.state))
    }
  }

  const applyState = () => {
    if (api.settings.saveState) {
      if (localStorage.getItem("DrawerState")) {
        api.state = JSON.parse(localStorage.getItem("DrawerState"))
        Object.keys(api.state).forEach((key) => {
          const item = document.querySelector(
            `[data-${api.settings.dataDrawer}="${key}"]`
          )
          if (item) {
            if (api.state[key] == api.settings.stateOpen) {
              addClass(item, api.settings.stateOpen)
            } else {
              removeClass(item, api.settings.stateOpen)
            }
          }
        })
      } else {
        saveState()
      }
    } else {
      if (localStorage.getItem("DrawerState")) {
        localStorage.removeItem("DrawerState")
      }
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
