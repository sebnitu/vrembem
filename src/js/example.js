import u from './utility.js'

export default function() {

  'use strict'

  // Init variables
  let api = {}
  let settings

  // Default settings
  let defaults = {
    classTrigger: 'trigger',
    classTarget: 'target',
    classActive: 'active'
  }

  // Private functions
  let run = () => {
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
  api.init = (options) => {
    api.destroy()
    settings = u.extend( defaults, options || {} )
    document.addEventListener('click', run, false)
  }

  api.destroy = () => {
    settings = null
    document.removeEventListener('click', run, false)
  }

  // Initialize our component when an instance is created
  api.init()

  // Return the application program interface
  return api
}
