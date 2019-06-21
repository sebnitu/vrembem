import u from './utility.js'

/**
 * Drawer plugin
 * ---
 * A container component that slides in from the left or right. It typically
 * contains menus, search or other content for your app.
 */
export default function(options) {

  'use strict'

  // The api where we assign our methods to and return after running init
  let api = {}

  // The settings object which will contain our merged options and defaults obj
  let settings

  // The default settings of the component
  const defaults = {
    // Class options
    // {string} The class name to be searched for or used
    classTrigger: 'drawer__trigger',
    classDrawer: 'drawer',
    classDialog: 'drawer__dialog',
    classModal: 'modal',
    classActive: 'is-active',

    // Whether or not to enable the switch functionality
    // {false} || {string} e.g. '[data-drawer-switch]'
    switch: '[data-drawer-switch]',

    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',

    // Whether or not to store the save state in local storage
    // {false} || {string} The string to save our state object as
    saveState: 'drawerState',

    // Whether or not to output component behavior in console
    debug: true
  }

  // Drawer specific variables
  // Where we store all our drawers available in the DOM
  let drawers
  // Where we store all our switch drawers available in the DOM
  let switchDrawers
  // Where we store a save state object before we pass it to local storage
  let drawerState = {}

  /**
   * The constructor method, run as soon as an instance is created
   * ---
   * @param {Object} - A json object with your custom settings
   */
  api.init = (options) => {

    // Merge the defaults and passed options into our settings obj
    settings = u.extend( defaults, options || {} )

    // Get all the drawers on the page
    drawers = document.querySelectorAll('.' + settings.classDrawer)

    // Init save state functionality if it's enabled
    if (settings.saveState) {
      initSaveState()
    }

    // Init switch functionality if it's enabled
    if (settings.switch) {
      initSwitch()
    }

    // Add our drawer trigger event listener
    document.addEventListener('click', trigger, false)
  }

  /**
   * The deconstructor method, used to reset or destory the drawer instance
   */
  api.destroy = () => {
    // Clear our variables
    settings = null
    drawers = null
    switchDrawers = null
    drawerState = {}
    // Delete the local storage data
    localStorage.removeItem(settings.saveState)
    // Remove the drawer trigger event listener
    document.removeEventListener('click', trigger, false)
  }

  /**
   * Public method to open a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */
  api.open = (selector) => {
    selector = (selector) ? selector : '.' + settings.classDrawer
    toggle(document.querySelectorAll(selector), 'open')
  }

  /**
   * Public method to close a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */
  api.close = (selector) => {
    selector = (selector) ? selector : '.' + settings.classDrawer
    toggle(document.querySelectorAll(selector), 'close')
  }

  /**
   * Public method to toggle a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */
  api.toggle = (selector) => {
    selector = (selector) ? selector : '.' + settings.classDrawer
    toggle(document.querySelectorAll(selector))
  }

  /**
   * Save the drawer current drawer state
   */
  api.stateSave = () => {
    stateSave()
  }

  /**
   * Return to drawer default state
   */
  api.stateReset = () => {
    stateReset()
  }

  /**
   * Private function to close a drawer or group of drawers
   * ---
   * @param {Object} || {Nodelist} - The drawer element(s) to close
   * @param {String} ['open' || 'close' || 'toggle'] - Whether to open, close
   *  or toggle the drawer(s)
   * @param {Function} - The callback function
   */
  const toggle = (drawer, state, callback) => {

    // Check if drawer(s) should be opened, closed or toggled and either add or
    // remove the active class to the passed drawer(s)
    if (state === 'open') {
      u.addClass(drawer, settings.classActive)
    } else if (state === 'close') {
      u.removeClass(drawer, settings.classActive)
    } else {
      u.toggleClass(drawer, settings.classActive)
    }

    // Check if save state is enabled
    if (settings.saveState) {
      stateSave(drawer)
    }

    // Fire the callback function if one was passed
    typeof callback === 'function' && callback()
  }

  const trigger = () => {
    let trigger = event.target.closest('.' + settings.classTrigger)
    if (trigger) {
      let dataDrawer = trigger.dataset.target
      if (dataDrawer) {
        let drawer = document.querySelectorAll(dataDrawer)
        if (drawer) {
          toggle(drawer)
        }
      }
    }
  }

  const initSaveState = () => {

    // Init: Setup our variables
    // Get the drawer state from local storage
    // Check if drawer state was saved otherwise init a new object
    if (localStorage.getItem(settings.saveState)) {
      drawerState = JSON.parse(localStorage.getItem(settings.saveState))
    }

    // Loop through all drawers and save/init their state
    drawers.forEach((drawer) => {

      // Set the default state if one is not set
      if (drawer.id in drawerState === false) {
        if (drawer.id) {
          drawerState[drawer.id] = u.hasClass(drawer, settings.classActive)
          localStorage.setItem(settings.saveState, JSON.stringify(drawerState))
        }
      }

      // Get our drawer dialog element
      let dialog = drawer.querySelector('.' + settings.classDialog)

      // Add a no-transition class and remove it within a transition duration
      u.addClass(dialog, 'transition_none')
      let revert = () => {
        setTimeout(
          function() {
            u.removeClass(dialog, 'transition_none')
          }, 500
        )
      }

      // Toggle our drawer state based on the saved state
      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close', revert)
      } else {
        toggle(drawer, 'open', revert)
      }
    })
  }

  const stateSave = (items) => {

    items = (items) ? items : drawers

    // Convert to array if only one drawer is passed
    if (!items.forEach) {
      items = u.toArray(items)
    }

    // Loop through our drawers and save their new state to local storage
    items.forEach((item) => {
      // Only save drawer state if an id exists
      if (item.id) {
        drawerState[item.id] = u.hasClass(item, settings.classActive)
        localStorage.setItem(settings.saveState, JSON.stringify(drawerState))
      }
    })
  }

  const stateReset = () => {

    // Reset our local drawer state variable
    // Delete the local storage data
    drawerState = {}
    localStorage.removeItem(settings.saveState)
  }

  const initSwitch = () => {
    switchDrawers = document.querySelectorAll(settings.switch)
    switchDrawers.forEach((drawer) => {
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
      let bp = drawer.dataset[clean]
      if (bp) {
        bp = u.getBreakpoint(bp)
        if (!bp) {
          bp = drawer.dataset[clean]
        }
      } else {
        bp = u.getBreakpoint(settings.switchBreakpoint)
        if (!bp) {
          bp = settings.switchBreakpoint
        }
      }

      // Media query listener
      let mq = window.matchMedia( "(min-width:" + bp + ")" )
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

    drawer.className = drawer.className.replace(regex, settings.classDrawer)
    dialog.className = dialog.className.replace(regex, settings.classDrawer)
    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(regex, settings.classDrawer)
    })

    // Open or close drawer based on save state
    if (settings.saveState) {
      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close')
      } else {
        toggle(drawer, 'open')
      }
    }
  }

  const switchModal = (drawer) => {
    let dialog = drawer.querySelector('.dialog')
    let triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]')
    let regex = /drawer/gi

    drawer.className = drawer.className.replace(regex, settings.classModal)
    dialog.className = dialog.className.replace(regex, settings.classModal)
    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(regex, settings.classModal)
    })

    // Remove active class for modal styles by default
    u.removeClass(drawer, settings.classActive)
  }

  // Run the constructor method
  api.init(options)

  // Return the API for running public methods
  return api
}
