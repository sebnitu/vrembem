import {
  addClass,
  breakpoint,
  camelCase,
  hasClass,
  removeClass
} from "@vrembem/core"

export const Drawer = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,

    // Data attributes
    dataDrawer: "drawer",
    dataToggle: "drawer-toggle",
    dataClose: "drawer-close",
    dataBreakpoint: "drawer-breakpoint",
    dataFocus: "drawer-focus",

    // State classes
    stateOpen: "is-open",
    stateOpening: "is-opening",
    stateClosing: "is-closing",
    stateClosed: "is-closed", // Default state

    // Classes
    classModal: "drawer_modal",

    // Feature toggles
    breakpoint: breakpoint,
    focus: true,
    saveState: true,
    saveKey: "DrawerState"
  }

  api.settings = { ...defaults, ...options }

  api.memoryTrigger = null
  api.memoryTarget = null
  api.state = {}
  api.mediaQueryLists = []

  api.init = () => {
    applyState()
    breakpointInit()
    document.addEventListener("click", run, false)
    document.addEventListener("touchend", run, false)
    document.addEventListener("keyup", escape, false)
  }

  api.destroy = () => {
    api.memoryTrigger = null
    api.memoryTarget = null
    api.state = {}
    document.removeEventListener("click", run, false)
    document.removeEventListener("touchend", run, false)
    document.removeEventListener("keyup", escape, false)
  }

  api.toggle = (selector) => {
    toggle(selector)
  }

  api.open = (drawer, callback) => {
    open(drawer, callback)
  }

  api.close = (drawer, callback) => {
    close(drawer, callback)
  }

  const run = (event) => {
    // Trigger click
    let trigger = event.target.closest(`[data-${api.settings.dataToggle}]`)
    if (trigger) {
      const selector = trigger.dataset[camelCase(api.settings.dataToggle)]
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
    const drawer = document.querySelector(
      `[data-${api.settings.dataDrawer}="${selector}"]`
    )
    if (drawer) {
      const isOpen = hasClass(drawer, api.settings.stateOpen)
      if (!isOpen) {
        open(drawer)
      } else {
        close(drawer)
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

  /**
   * Focus functionality
   */

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

  /**
   * Save state functionality
   */

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
      localStorage.setItem(api.settings.saveKey, JSON.stringify(api.state))
    }
  }

  const applyState = () => {
    if (api.settings.saveState) {
      if (localStorage.getItem(api.settings.saveKey)) {
        api.state = JSON.parse(localStorage.getItem(api.settings.saveKey))
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
      if (localStorage.getItem(api.settings.saveKey)) {
        localStorage.removeItem(api.settings.saveKey)
      }
    }
  }

  /**
   * Breakpoint functionality
   */

  const breakpointInit = () => {
    const drawers = document.querySelectorAll(`[data-${api.settings.dataBreakpoint}]`)
    if (drawers) {
      drawers.forEach((drawer) => {
        const key = drawer.dataset[camelCase(api.settings.dataBreakpoint)]
        const bp = (api.settings.breakpoint[key]) ?
          api.settings.breakpoint[key] : key
        const mqList = window.matchMedia( "(min-width:" + bp + ")" )
        if (mqList.matches) {
          switchToDrawer(drawer)
        } else {
          switchToModal(drawer)
        }
        mqList.addListener(breakpointCheck)
        api.mediaQueryLists.push({
          "drawer": drawer,
          "mqList": mqList
        })
      })
    }
  }

  const breakpointCheck = (event) => {
    api.mediaQueryLists.forEach((item) => {
      if (event.target == item.mqList) {
        if (item.mqList.matches) {
          switchToDrawer(item.drawer)
        } else {
          switchToModal(item.drawer)
        }
      }
    })
  }

  const switchToModal = (drawer) => {
    addClass(drawer, api.settings.classModal)
    removeClass(drawer, api.settings.stateOpen)
  }

  const switchToDrawer = (drawer) => {
    removeClass(drawer, api.settings.classModal)
    const drawerKey = drawer.dataset[camelCase(api.settings.dataDrawer)]
    const drawerState = api.state[drawerKey]
    if (drawerState == api.settings.stateOpen) {
      addClass(drawer, api.settings.stateOpen)
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
