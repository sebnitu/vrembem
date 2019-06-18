import u from './utility.js'

/**
 * Drawer plugin
 * ---
 * The drawer component is used to create hidden but toggle-able content for an
 * application. This is typically used for a long form naivation list.
 *
 * Key features:
 * [x] Save state via localhost
 * [x] Modal switch between drawer and modal styles
 * [ ] Animations (fade and/or slide in)
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
    classModalPos: {
      'top': 'modal_pos_top',
      'bottom': 'modal_pos_bottom',
      'left': 'modal_pos_left',
      'right': 'modal_pos_right'
    },
    modalPosition: '[data-modal-pos]',
    modalSwitch: '[data-modal-switch]',
    modalSwitchBreakpoint: '1200px',
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
    drawers = document.querySelectorAll('.drawer__item')

    // Init save state if it's enabled
    if (settings.saveState) {
      initSaveState()
    }

    // Init modal switch if it's enabled
    if (settings.modalSwitch) {
      initModalSwitch()
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
    if (settings.modalSwitch) {
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

  const open = (target) => {
    u.addClass(target, 'is-active')
    if (!target.forEach) {
      target = u.toArray(target)
    }
    target.forEach((target) => {
      if (settings.saveState) {
        drawer_state[target.id] = u.hasClass(target, 'is-active')
        localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
      }
      // debug('open', target)
    })
  }

  const close = (target) => {
    u.removeClass(target, 'is-active')
    if (!target.forEach) {
      target = u.toArray(target)
    }
    target.forEach((target) => {
      if (settings.saveState) {
        drawer_state[target.id] = u.hasClass(target, 'is-active')
        localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
      }
      // debug('close', target)
    })
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
    drawer_state = localStorage.getItem('drawer_state')

    // Check if drawer state was saved otherwise init a new object
    if (drawer_state) {
      drawer_state = JSON.parse(drawer_state)
    }

    // Loop through all drawers and save/init their state
    drawers.forEach((drawer) => {

      // Set the default state if one is not set
      if (drawer.id in drawer_state === false) {
        drawer_state[drawer.id] = u.hasClass(drawer, 'is-active')
      }

      // Toggle our drawer state based on the saved state
      if (drawer_state[drawer.id] === false) {
        close(drawer)
      } else {
        open(drawer)
      }
    })
  }

  const initModalSwitch = () => {
    modalDrawers = document.querySelectorAll(settings.modalSwitch)
    modalDrawers.forEach((drawer) => {
      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      let clean = settings.modalSwitch
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
        bp = settings.modalSwitchBreakpoint
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
    let inner = drawer.querySelector('.dialog')

    // Remove modal classes
    u.removeClass(drawer, 'modal')
    u.removeClass(inner, 'modal__dialog')

    // Add drawer classes
    u.addClass(drawer, 'drawer__item')
    u.addClass(inner, 'drawer__dialog')

    // Switch trigger class
    let trigger = document.querySelectorAll('[data-target="#' + drawer.id + '"]')
    u.addClass(trigger, 'drawer__trigger')
    u.removeClass(trigger, 'modal__trigger')

    // Remove the modal position class via [data-modal-pos]
    let pos = drawer.dataset.modalPos
    if (pos) {
      if (settings.classModalPos[pos]) {
        u.removeClass(drawer, settings.classModalPos[pos])
      } else {
        u.removeClass(drawer, pos)
      }
    }

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
    let inner = drawer.querySelector('.dialog')

    // Remove active class for modal styles by default
    u.removeClass(drawer, 'is-active')

    // Remove drawer classes
    u.removeClass(drawer, 'drawer__item')
    u.removeClass(inner, 'drawer__dialog')

    // Add modal classes
    u.addClass(drawer, 'modal')
    u.addClass(inner, 'modal__dialog')

    // Switch trigger class
    let trigger = document.querySelectorAll('[data-target="#' + drawer.id + '"]')
    u.addClass(trigger, 'modal__trigger')
    u.removeClass(trigger, 'drawer__trigger')

    // Add the modal position class via [data-modal-pos]
    let pos = drawer.dataset.modalPos
    if (pos) {
      if (settings.classModalPos[pos]) {
        u.addClass(drawer, settings.classModalPos[pos])
      } else {
        u.addClass(drawer, pos)
      }
    }
  }

  api.init(options)
  return api
}
