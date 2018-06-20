import u from './utility.js'

export default function() {

  'use strict'

  // Init variables
  var api = {}
  var settings

  // Default settings
  var defaults = {
    classTrigger: 'trigger',
    classTarget: 'target',
    classActive: 'active'
  }

  // Private functions
  var run = function() {
    var trigger = event.target.closest('.' + settings.classTrigger)

    if (trigger) {
      close()
      var dataModal = trigger.dataset.modal
      if (dataModal) {
        open(document.getElementById(dataModal))
      }
      event.preventDefault()
    }
  }

  // Public functions
  api.init = function(options) {
    api.destroy()
    settings = u.extend( defaults, options || {} )
    document.addEventListener('click', run, false)
  }

  api.destroy = function() {
    settings = null
    document.removeEventListener('click', run, false)
  }

  // Return the application program interface
  return api
}
