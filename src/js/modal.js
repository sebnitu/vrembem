import u from './utility.js'

export default function() {

  'use strict'

  /**
   * Variables
   */

  let api = {}
  let settings
  let defaults = {
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
    classActive: 'is-active',
    focus: '[data-focus]'
  }

  let memoryTrigger
  let memoryTarget

  /**
   * Private functions
   */

  let open = (target) => {
    u.addClass(target, settings.classActive)
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

  let close = () => {
    let modals = document.querySelectorAll('.' + settings.classModal)
    for (let i = 0; i < modals.length; ++i) {
      u.removeClass(modals[i], settings.classActive)
    }
    if (memoryTrigger && memoryTarget) {
      memoryTarget.addEventListener('transitionend', function _listener() {
        if (memoryTrigger) {
          memoryTrigger.focus()
        }
        memoryTarget = null
        memoryTrigger = null
        this.removeEventListener('transitionend', _listener, true)
      }, true);
    }
  }

  let escape = () => {
    if (event.keyCode == 27) {
      close()
    }
  }

  let run = () => {
    let trigger = event.target.closest('.' + settings.classTrigger)
    let modal = event.target.closest('.' + settings.classModal)
    let dialog = event.target.closest('.' + settings.classDialog)
    if (trigger) {
      close()
      let dataModal = trigger.dataset.modal
      if (dataModal) {
        memoryTarget = document.getElementById(dataModal)
        memoryTrigger = trigger
        open(memoryTarget)
      }
      event.preventDefault()
    } else if (modal && !dialog) {
      close()
    }
  }

  /**
   * Public functions
   */

  api.open = (target) => {
    open(document.getElementById(target))
  }

  api.close = () => {
    close()
  }

  api.clear_memory = () => {
    memoryTarget = null
    memoryTrigger = null
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

  /**
   * Init the plugin
   */
  api.init()

  /**
   * Return the API
   */
  return api
}
