import u from './utility.js'

export default function() {

  'use strict'

  let api = {}
  let settings
  let defaults = {
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
    classActive: 'is-active'
  }

  let open = (target) => {
    u.addClass(target, settings.classActive)
  }

  let close = () => {
    let modals = document.querySelectorAll('.' + settings.classModal)
    for (let i = 0; i < modals.length; ++i) {
      u.removeClass(modals[i], settings.classActive)
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
        open(document.getElementById(dataModal))
      }
      event.preventDefault()
    } else if (modal && !dialog) {
      close()
    }
  }

  api.init = (options) => {
    api.destroy()
    settings = u.extend( defaults, options || {} )
    document.addEventListener('click', run, false)
    document.addEventListener('touchend', run, false)
  }

  api.destroy = () => {
    settings = null
    document.removeEventListener('click', run, false)
    document.removeEventListener('touchend', run, false)
  }

  api.init()

  return api
}
