import u from './utility.js'

/**
 * Toggle
 * ---
 * A general class toggle script.
 */
export default function(options) {

  'use strict'

  let api = {}
  let defaults = {
    trigger: '[data-toggle-class]',
    targets: '',
    class: ''
  }
  let settings

  let run = () => {

    let trigger = event.target.closest(settings.trigger)

    if (trigger) {

      let targets

      if (settings.targets) {
        targets = document.querySelectorAll(settings.targets)
      } else {
        targets = document.querySelectorAll(trigger.dataset.toggleTarget)
      }

      if (targets.length) {
        targets.forEach(function(target) {
          u.toggleClass(target, trigger.dataset.toggleClass)
        })
      } else {
        if (settings.class) {
          u.toggleClass(trigger, settings.class)
        } else {
          u.toggleClass(trigger, trigger.dataset.toggleClass)
        }
      }

      event.preventDefault()
    }
  }

  api.init = (options) => {
    api.destroy()
    settings = u.extend( defaults, options || {} )
    document.addEventListener('click', run, false)
  }

  api.destroy = () => {
    settings = null
    document.removeEventListener('click', run, false)
  }

  api.init(options)

  return api
}
