import { addClass, removeClass } from "@vrembem/core"

export const Modal = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    classTarget: "modal",
    classTrigger: "modal__trigger",
    classInner: "modal__dialog",
    classActive: "is-active",
    focus: "[data-focus]"
  }

  api.settings = { ...defaults, ...options }

  let memoryTrigger
  let memoryTarget

  api.init = () => {
    document.addEventListener("click", run, false)
    document.addEventListener("touchend", run, false)
    document.addEventListener("keyup", escape, false)
  }

  api.destroy = () => {
    memoryTarget = null
    memoryTrigger = null
    document.removeEventListener("click", run, false)
    document.removeEventListener("touchend", run, false)
    document.removeEventListener("keyup", escape, false)
  }

  api.open = (selector) => {
    open(document.querySelectorAll(selector))
  }

  api.close = (clear) => {
    close(clear)
  }

  const open = (target) => {
    addClass(target, api.settings.classActive)
    if (target.length === 1) {
      target = target.item(0)
      let focus = target.querySelector(api.settings.focus)
      target.addEventListener("transitionend", function _listener() {
        if (focus) {
          focus.focus()
        } else {
          target.focus()
        }
        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const close = (clear = false) => {
    let target = document.querySelectorAll("." + api.settings.classTarget)
    removeClass(target, api.settings.classActive)
    if (clear == false && memoryTrigger && memoryTarget) {
      if (memoryTarget.length === 1) {
        memoryTarget = memoryTarget.item(0)
        memoryTarget.addEventListener("transitionend", function _listener() {
          if (memoryTrigger) {
            memoryTrigger.focus()
          }
          memoryTarget = null
          memoryTrigger = null
          this.removeEventListener("transitionend", _listener, true)
        }, true)
      }
    } else if (clear == true) {
      memoryTarget = null
      memoryTrigger = null
    }
  }

  const escape = () => {
    if (event.keyCode == 27) {
      close()
    }
  }

  const run = () => {
    let target = event.target.closest("." + api.settings.classTarget)
    let trigger = event.target.closest("." + api.settings.classTrigger)
    let inner = event.target.closest("." + api.settings.classInner)
    if (trigger) {
      close()
      let targetData = trigger.dataset.target
      if (targetData) {
        memoryTarget = document.querySelectorAll(targetData)
        memoryTrigger = trigger
        open(memoryTarget)
      }
      event.preventDefault()
    } else if (target && !inner) {
      close()
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
