import u from './utility.js'

export default function() {

  'use strict'

  var api = {}
  var settings
  var defaults = {
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
    classActive: 'is-active'
  }

  var open = function(target) {
    u.addClass(target, settings.classActive)
  }

  var close = function() {
    var modals = document.querySelectorAll('.' + settings.classModal)
    for (var i = 0; i < modals.length; ++i) {
      u.removeClass(modals[i], settings.classActive)
    }
  }

  var run = function() {
    var trigger = event.target.closest('.' + settings.classTrigger)
    var modal = event.target.closest('.' + settings.classModal)
    var dialog = event.target.closest('.' + settings.classDialog)

    if (trigger) {
      close()
      var dataModal = trigger.dataset.modal
      if (dataModal) {
        open(document.getElementById(dataModal))
      }
      event.preventDefault()
    } else if (modal && !dialog) {
      close()
    }
  }

  api.init = function(options) {
    api.destroy()
    settings = u.extend( defaults, options || {} )
    document.addEventListener('click', run, false)
  }

  api.destroy = function() {
    settings = null
    document.removeEventListener('click', run, false)
  }

  return api
}
