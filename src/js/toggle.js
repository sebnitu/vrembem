import u from './utility.js'

export default function(options) {

  'use strict'

  let api = {}
  let settings
  const defaults = {
    trigger: '[data-toggle-class]',
    targets: '',
    class: ''
  }

  api.init = (options) => {
    settings = u.extend( defaults, options || {} )
    document.addEventListener('click', run, false)
  }

  api.destroy = () => {
    settings = null
    document.removeEventListener('click', run, false)
  }

  const run = () => {

    let trigger = event.target.closest(settings.trigger)

    if (trigger) {

      let targets

      if (settings.targets) {
        targets = document.querySelectorAll(settings.targets)
      } else {
        targets = document.querySelectorAll(trigger.dataset.toggleTarget)
      }

      if (targets.length) {
        targets.forEach((target) => {
          u.toggleClass(target, trigger.dataset.toggleClass.split(' '))
        })
      } else {
        if (settings.class) {
          u.toggleClass(trigger, settings.class)
        } else {
          u.toggleClass(trigger, trigger.dataset.toggleClass.split(' '))
        }
      }

      event.preventDefault()
    }
  }

  api.init(options)
  return api
}
