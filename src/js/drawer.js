import u from './utility.js'

/**
 * Drawer plugin
 * ---
 * A container component that slides in from the left or right. It typically
 * contains menus, search or other content for your app.
 *
 * Todos:
 * [ ] Debug why I'm getting "TypeError: s is null" on lines 396 and 433. This is probably do to not removing the media query event listener on destroy
 */
export default function(options) {

  'use strict'

  let api = {}
  let settings
  const defaults = {
    // Element classes
    classTarget: 'drawer__item',
    classTrigger: 'drawer__trigger',
    classInner: 'drawer__dialog',

    // Used with RegExp to search and replace element classes
    classTargetSwitch: 'modal',
    classTriggerSwitch: 'modal__trigger',
    classInnerSwitch: 'modal__dialog',

    // The class that is used to make an item active
    classActive: 'is-active',
    classTransitionNone: 'transition_none',

    // Whether or not to store the save state in local storage
    // {boolean} The string to save our state object as
    saveState: true,

    // Whether or not to enable the switch functionality
    // If enabled, a string selector to check for should be passed.
    // {false} || {string} e.g. '[data-drawer-switch]'
    switch: '[data-drawer-switch]',

    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',

    // Duration before removing the transition_none class on initial load
    transitionDuration: 500
  }

  // Drawer specific variables
  // Where we store all our drawers available in the DOM
  let drawers
  // Where we store all our switch drawers available in the DOM
  let switchDrawers
  // Where we build the save state object before we pass it to local storage
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
    drawers = document.querySelectorAll('.' + settings.classTarget)

    // Initialize a promise and init save state if it's enabled
    let promiseSaveState = new Promise(function(resolve) {
      if (settings.saveState) {
        initSaveState(resolve)
      } else {
        resolve()
      }
    })

    // After promise is resolved and switch is enabled, initialize switch
    promiseSaveState.then(function() {
      if (settings.switch) {
        initSwitch()
      }
    })

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
    localStorage.removeItem('drawerState')

    // Remove the drawer trigger event listener
    document.removeEventListener('click', trigger, false)
  }

  /**
   * Public method to open a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.open = (selector) => {
    selector = (selector) ? selector : '.' + settings.classTarget
    toggle(document.querySelectorAll(selector), 'open')
  }

  /**
   * Public method to close a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.close = (selector) => {
    selector = (selector) ? selector : '.' + settings.classTarget
    toggle(document.querySelectorAll(selector), 'close')
  }

  /**
   * Public method to toggle a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.toggle = (selector) => {
    selector = (selector) ? selector : '.' + settings.classTarget
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
   * ---
   * @param {Function} callback - The callback function
   */
  const initSaveState = (callback) => {

    // Check if a drawer state is already saved in local storage and save the
    // json parsed data to our local variable if it does
    if (localStorage.getItem('drawerState')) {
      drawerState = JSON.parse(localStorage.getItem('drawerState'))
    }

    // Loop through all drawers
    drawers.forEach((drawer) => {

      // Set the default state if one is not set
      if (drawer.id in drawerState === false) {
        stateSave(drawer)
      }

      // Get our drawer dialog element
      let dialog = drawer.querySelector('.' + settings.classInner)

      // Transition delay: disables transitions as default states are being set
      let transitionDelay = () => {
        if (dialog) {
          u.addClass(dialog, settings.classTransitionNone)
          setTimeout(
            function() {
              u.removeClass(dialog, settings.classTransitionNone)
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

    // Fire the callback function if one was passed and return our state object
    typeof callback === 'function' && callback(drawerState)
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
        localStorage.setItem('drawerState', JSON.stringify(drawerState))
      }
    })
  }

  /**
   * Private function that clears the drawer state
   */
  const stateReset = () => {

    // Reset our local drawer state variable and delete the local storage data
    drawerState = {}
    localStorage.removeItem('drawerState')
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
      new RegExp(settings.classTargetSwitch, 'gi'),
      settings.classTarget
    )
    dialog.className = dialog.className.replace(
      new RegExp(settings.classInnerSwitch, 'gi'),
      settings.classInner
    )
    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(
        new RegExp(settings.classTriggerSwitch, 'gi'),
        settings.classTrigger
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
      new RegExp(settings.classTarget, 'gi'),
      settings.classTargetSwitch
    )
    dialog.className = dialog.className.replace(
      new RegExp(settings.classInner, 'gi'),
      settings.classInnerSwitch
    )
    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(
        new RegExp(settings.classTrigger, 'gi'),
        settings.classTriggerSwitch
      )
    })

    // Remove active class for modal styles by default
    u.removeClass(drawer, settings.classActive)
  }

  /**
   *
   */
  // Run the constructor method
  api.init(options)

  // Return the API for running public methods
  return api
}
