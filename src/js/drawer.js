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
    classDrawer: 'drawer__item',
    classTrigger: 'drawer__trigger',
    classDialog: 'drawer__dialog',
    classActive: 'is-active',

    // The classes that get switched depending on the element
    classSwitch: {
      'item': {
        'drawer': 'drawer__item',
        'modal': 'modal'
      },
      'trigger': {
        'drawer': 'drawer__trigger',
        'modal': 'modal__trigger'
      },
      'dialog': {
        'drawer': 'drawer__dialog',
        'modal': 'modal__dialog'
      }
    },

    // Whether or not to enable the switch functionality
    // {false} || {string} e.g. '[data-drawer-switch]'
    switch: '[data-drawer-switch]',

    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',

    // Whether or not to store the save state in local storage
    // {false} || {string} The string to save our state object as
    saveState: 'drawerState',

    // Transition options
    transitionDuration: 500
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
   * @param {Object} options - A json object with your custom settings
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
   * The deconstructor method, used to reset and destory the drawer instance
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
   * @param {String} selector - A valid CSS selector
   */
  api.open = (selector) => {
    selector = (selector) ? selector : '.' + settings.classDrawer
    toggle(document.querySelectorAll(selector), 'open')
  }

  /**
   * Public method to close a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.close = (selector) => {
    selector = (selector) ? selector : '.' + settings.classDrawer
    toggle(document.querySelectorAll(selector), 'close')
  }

  /**
   * Public method to toggle a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.toggle = (selector) => {
    selector = (selector) ? selector : '.' + settings.classDrawer
    toggle(document.querySelectorAll(selector))
  }

  /**
   * Public method to switch a drawer into modal
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.switchDrawer = (selector) => {

    // Use default selector if one isn't passed
    selector = (selector) ? selector : settings.switch

    // Query our elements using the provided selector
    let items = document.querySelectorAll(selector)

    // Convert to array if only one drawer is passed
    items = (items.forEach) ? items : u.toArray(items)

    items.forEach((item) => {
      switchDrawer(item)
    })
  }

  /**
   * Public method to switch a drawer into modal
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.switchModal = (selector) => {

    // Use default selector if one isn't passed
    selector = (selector) ? selector : settings.switch

    // Query our elements using the provided selector
    let items = document.querySelectorAll(selector)

    // Convert to array if only one drawer is passed
    items = (items.forEach) ? items : u.toArray(items)

    items.forEach((item) => {
      switchModal(item)
    })
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
   * @param {Node} drawer - The drawer element(s) to close
   * @param {String} state - Whether to open, close or toggle the drawer(s)
   * @param {Function} callback - The callback function
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

  /**
   * Private function to toggle drawer via a trigger
   */
  const trigger = () => {

    // Get the closest trigger element from the click event
    let trigger = event.target.closest('.' + settings.classTrigger)

    // Check that the class trigger was clicked
    if (trigger) {

      // Get the drawer selector from the trigger via [data-target]
      let dataDrawer = trigger.dataset.target

      // Check that a drawer target was given
      if (dataDrawer) {

        // Query the drawer element and toggle it if it exists
        let drawer = document.querySelectorAll(dataDrawer)
        if (drawer.length) {
          toggle(drawer)
        }
      }
    }
  }

  /**
   * Private function that initializes the save state functionality
   */
  const initSaveState = () => {

    // Check if a drawer state is already saved in local storage and save the
    // json parsed data to our local variable if it does
    if (localStorage.getItem(settings.saveState)) {
      drawerState = JSON.parse(localStorage.getItem(settings.saveState))
    }

    // Loop through all drawers
    drawers.forEach((drawer) => {

      // Set the default state if one is not set
      if (drawer.id in drawerState === false) {
        stateSave(drawer)
      }

      // Get our drawer dialog element
      let dialog = drawer.querySelector('.' + settings.classDialog)

      // Transition delay: disables transitions as default states are being set
      let transitionDelay = () => {
        if (dialog) {
          u.addClass(dialog, 'transition_none')
          setTimeout(
            function() {
              u.removeClass(dialog, 'transition_none')
            }, settings.transitionDuration
          )
        }
      }

      // Toggle our drawer state based on the saved state
      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close', transitionDelay)
      } else if (drawerState[drawer.id]) {
        toggle(drawer, 'open', transitionDelay)
      }
    })
  }

  /**
   * Private function that saves the state of a specific or all drawers
   * ---
   * @param {Node} items - The drawer element(s) to save state
   */
  const stateSave = (items) => {

    // Save all drawers if an items arg wasn't passed
    items = (items) ? items : drawers

    // Convert to array if only one drawer is passed
    items = (items.forEach) ? items : u.toArray(items)

    // Loop through our drawers and save their new state to local storage
    items.forEach((item) => {
      // Only save drawer state if an id exists
      if (item.id) {
        drawerState[item.id] = u.hasClass(item, settings.classActive)
        localStorage.setItem(settings.saveState, JSON.stringify(drawerState))
      }
    })
  }

  /**
   * Private function that clears the drawer state
   */
  const stateReset = () => {

    // Reset our local drawer state variable and delete the local storage data
    drawerState = {}
    localStorage.removeItem(settings.saveState)
  }

  /**
   * Private function that initializes the switch functionality
   */
  const initSwitch = () => {

    // Query all the drawers with the switch feature enabled
    switchDrawers = document.querySelectorAll(settings.switch)

    // Loop through the switch drawers
    switchDrawers.forEach((drawer) => {

      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      let cleanSelector = settings.switch
        .replace('[', '')
        .replace(']', '')
        .replace('data-', '')

      // Convert sring to camelCase
      cleanSelector = cleanSelector.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase()
      })

      // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings
      let bp = drawer.dataset[cleanSelector]
      if (bp) {
        bp = u.getBreakpoint(bp)
        if (!bp) {
          bp = drawer.dataset[cleanSelector]
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

  /**
   * Private function that checks when a media query hits a match and switches
   * the component from drawer to modal as needed
   * ---
   * @param {MediaQueryList} mq - The MediaQueryList object for the media query
   * @param {Node} drawer - The drawer element to switch
   */
  const switchCheck = (mq, drawer) => {
    if (mq.matches) {
      switchDrawer(drawer)
    } else {
      switchModal(drawer)
    }
  }

  /**
   * Private function that switches a modal into a drawer component
   * ---
   * @param {Node} drawer - The element to switch
   */
  const switchDrawer = (drawer) => {

    // Get the dialog and trigger elements related to this component
    let dialog = drawer.querySelector('.dialog')
    let triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]')

    // Switch the modal component to drawer
    drawer.className = drawer.className.replace(
      new RegExp(settings.classSwitch.item.modal, 'gi'),
      settings.classSwitch.item.drawer
    )

    dialog.className = dialog.className.replace(
      new RegExp(settings.classSwitch.dialog.modal, 'gi'),
      settings.classSwitch.dialog.drawer
    )

    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(
        new RegExp(settings.classSwitch.trigger.modal, 'gi'),
        settings.classSwitch.trigger.drawer
      )
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

  /**
   * Private function that switches a drawer into a modal component
   * ---
   * @param {Node} drawer - The element to switch
   */
  const switchModal = (drawer) => {

    // Get the dialog and trigger elements related to this component
    let dialog = drawer.querySelector('.dialog')
    let triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]')

    // Switch the drawer component to modal
    drawer.className = drawer.className.replace(
      new RegExp(settings.classSwitch.item.drawer, 'gi'),
      settings.classSwitch.item.modal
    )

    dialog.className = dialog.className.replace(
      new RegExp(settings.classSwitch.dialog.drawer, 'gi'),
      settings.classSwitch.dialog.modal
    )

    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(
        new RegExp(settings.classSwitch.trigger.drawer, 'gi'),
        settings.classSwitch.trigger.modal
      )
    })

    // Remove active class for modal styles by default
    u.removeClass(drawer, settings.classActive)
  }

  // Run the constructor method
  api.init(options)

  // Return the API for running public methods
  return api
}
