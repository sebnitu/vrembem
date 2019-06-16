import u from './utility.js'

export default function(options) {

  'use strict'

  let api = {}
  let settings
  const defaults = {
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
    classActive: 'is-active',
    focus: '[data-focus]'
  }

  let memoryTrigger
  let memoryTarget

  const open = (target) => {
    u.addClass(target, settings.classActive)
    if (target.length === 1) {
      target = target.item(0)
      let focus = target.querySelector(settings.focus)
      target.addEventListener('transitionend', function _listener() {
        if (focus) {
          focus.focus()
        } else {
          target.focus()
        }
        this.removeEventListener('transitionend', _listener, true)
      }, true);
    }
  }

  const close = (clear = false) => {
    let modals = document.querySelectorAll('.' + settings.classModal)
    u.removeClass(modals, settings.classActive)
    if (clear == false && memoryTrigger && memoryTarget) {
      if (memoryTarget.length === 1) {
        memoryTarget = memoryTarget.item(0)
        memoryTarget.addEventListener('transitionend', function _listener() {
          if (memoryTrigger) {
            memoryTrigger.focus()
          }
          memoryTarget = null
          memoryTrigger = null
          this.removeEventListener('transitionend', _listener, true)
        }, true);
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
    let trigger = event.target.closest('.' + settings.classTrigger)
    let modal = event.target.closest('.' + settings.classModal)
    let dialog = event.target.closest('.' + settings.classDialog)
    if (trigger) {
      close()
      let dataModal = trigger.dataset.target
      if (dataModal) {
        memoryTarget = document.querySelectorAll(dataModal)
        memoryTrigger = trigger
        open(memoryTarget)
      }
      event.preventDefault()
    } else if (modal && !dialog) {
      close()
    }
  }

  api.open = (target) => {
    open(document.querySelectorAll(target))
  }

  api.close = (clear) => {
    close(clear)
  }

  api.init = (options) => {
    api.destroy()
    settings = u.extend( defaults, options || {} )
    document.addEventListener('click', run, false)
    document.addEventListener('touchend', run, false)
    document.addEventListener('keyup', escape, false)
  }

  api.destroy = () => {
    settings = null
    memoryTarget = null
    memoryTrigger = null
    document.removeEventListener('click', run, false)
    document.removeEventListener('touchend', run, false)
    document.removeEventListener('keyup', escape, false)
  }

  api.init(options)
  return api
}
