import u from './utility.js'

/**
 * Drawer plugin
 * ---
 * The drawer component is used to create hidden but toggle-able content for an
 * application. This is typically used for a long form naivation list.
 */
export default function(options) {

  'use strict'

  let api = {}
  let settings
  const defaults = {
    classTrigger: 'drawer__trigger',
    classDrawer: 'drawer',
    classDialog: 'drawer__dialog',
    classActive: 'is-active',
    switch: '[data-drawer-switch]',
    switchBreakpoint: '1200px',
    saveState: true
  }

  let drawers
  let drawer_state = {}
  let modalDrawers
  let bp
  let mq

  api.init = (options) => {

    settings = u.extend( defaults, options || {} )

    // Get all the drawers on the page
    drawers = document.querySelectorAll('.drawer')

    // Init save state if it's enabled
    if (settings.saveState) {
      initSaveState()
    }

    // Init modal switch if it's enabled
    if (settings.switch) {
      initSwitch()
    }

    // Add our drawer trigger event listener
    document.addEventListener('click', trigger, false)
  }

  api.destroy = () => {

    settings = null
    drawers = null

    // Check if save state is enabled
    if (settings.saveState) {
      drawer_state = {}
      localStorage.removeItem('drawer_state')
    }

    // Check if modal switch is enabled
    if (settings.switch) {
      modalDrawers = null
      bp = null
      mq = null
    }

    // Remove the drawer trigger event listener
    document.removeEventListener('click', trigger, false)
  }

  api.open = (selector) => {
    open(document.querySelectorAll(selector))
  }

  api.close = (selector) => {
    close(document.querySelectorAll(selector))
  }

  const open = (target, callback) => {
    u.addClass(target, 'is-active')
    if (!target.forEach) {
      target = u.toArray(target)
    }
    target.forEach((target) => {
      if (settings.saveState) {
        drawer_state[target.id] = u.hasClass(target, 'is-active')
        localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
      }
    })
    // Fire the callback if one was passed
    typeof callback === 'function' && callback()
  }

  const close = (target, callback) => {
    u.removeClass(target, 'is-active')
    if (!target.forEach) {
      target = u.toArray(target)
    }
    target.forEach((target) => {
      if (settings.saveState) {
        drawer_state[target.id] = u.hasClass(target, 'is-active')
        localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
      }
    })
    // Fire the callback if one was passed
    typeof callback === 'function' && callback()
  }

  const debug = (event, element) => {
    console.log(`${event}: ` , element)
    if (settings.saveState) {
      console.log('drawer_state: ', drawer_state)
    }
  }

  const trigger = () => {
    let trigger = event.target.closest('.drawer__trigger')
    if (trigger) {
      let dataDrawer = trigger.dataset.target
      if (dataDrawer) {
        let drawer = document.querySelectorAll(dataDrawer)
        if (drawer) {
          if (u.hasClass(drawer, 'is-active')) {
            close(drawer)
          } else {
            open(drawer)
          }
        }
      }
    }
  }

  const initSaveState = () => {

    // Init: Setup our variables
    // Get the drawer state from local storage
    // Check if drawer state was saved otherwise init a new object
    if (localStorage.getItem('drawer_state')) {
      drawer_state = JSON.parse(localStorage.getItem('drawer_state'))
    }

    // Loop through all drawers and save/init their state
    drawers.forEach((drawer) => {

      // Set the default state if one is not set
      if (drawer.id in drawer_state === false) {
        drawer_state[drawer.id] = u.hasClass(drawer, 'is-active')
      }

      // Get our drawer dialog element
      let dialog = drawer.querySelector('.drawer__dialog')

      // Add a no-transition class and remove it within a transition duration
      u.addClass(dialog, 'no-transition')
      let revert = () => {
        setTimeout(
          function() {
            u.removeClass(dialog, 'no-transition')
          }, 500
        )
      }

      // Toggle our drawer state based on the saved state
      if (drawer_state[drawer.id] === false) {
        close(drawer, revert)
      } else {
        open(drawer, revert)
      }
    })
  }

  const initSwitch = () => {
    modalDrawers = document.querySelectorAll(settings.switch)
    modalDrawers.forEach((drawer) => {
      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      let clean = settings.switch
        .replace('[', '')
        .replace(']', '')
        .replace('data-', '')

      // Convert sring to camelCase
      clean = clean.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase()
      })

      // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings
      bp = drawer.dataset[clean]
      if (bp) {
        bp = u.getBreakpoint(bp)
        if (!bp) {
          bp = drawer.dataset[clean]
        }
      } else {
        bp = settings.switchBreakpoint
      }

      // Media query listener
      mq = window.matchMedia( "(min-width:" + bp + ")" )
      mq.addListener((mq) => {
        switchCheck(mq, drawer)
      })
      switchCheck(mq, drawer)
    })
  }

  const switchCheck = (mq, drawer) => {
    if (mq.matches) {
      switchDrawer(drawer)
    } else {
      switchModal(drawer)
    }
  }

  const switchDrawer = (drawer) => {
    let dialog = drawer.querySelector('.dialog')
    let triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]')
    let regex = /modal/gi

    drawer.className = drawer.className.replace(regex, 'drawer')
    dialog.className = dialog.className.replace(regex, 'drawer')
    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(regex, 'drawer')
    })

    // Open or close drawer based on save state
    if (settings.saveState) {
      if (drawer_state[drawer.id] === false) {
        close(drawer)
      } else {
        open(drawer)
      }
    }
  }

  const switchModal = (drawer) => {
    let dialog = drawer.querySelector('.dialog')
    let triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]')
    let regex = /drawer/gi

    drawer.className = drawer.className.replace(regex, 'modal')
    dialog.className = dialog.className.replace(regex, 'modal')
    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(regex, 'modal')
    })

    // Remove active class for modal styles by default
    u.removeClass(drawer, 'is-active')
  }

  api.init(options)
  return api
}
