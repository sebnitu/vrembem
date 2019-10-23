import {
  addClass,
  breakpoint,
  hasClass,
  removeClass,
  toggleClass
} from "@vrembem/core"

// TODO: Remove the switch feature and build the drawer styles directly into
//       the drawer componnent itself so it doesn't rely on modals.

export const Drawer = (options) => {

  let api = {}

  const defaults = {
    autoInit: false,
    // Component element classes
    classTarget: "drawer__item",
    classTrigger: "drawer__trigger",
    classInner: "drawer__dialog",

    // Component element switch classes
    // Used with RegExp to search and replace element classes
    classTargetSwitch: "modal",
    classTriggerSwitch: "modal__trigger",
    classInnerSwitch: "modal__dialog",

    // State and utility classes
    classActive: "is-active",
    classTransitionNone: "transition_none",

    // Whether or not to store the save state in local storage
    // {boolean} The string to save our state object as
    saveState: true,

    // Whether or not to enable the switch functionality. If enabled, a string
    // selector to check for should be passed.
    // {false} || {string} e.g. "[data-drawer-switch]"
    switch: "[data-drawer-switch]",

    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: "lg",

    // Duration before removing the transition_none class on initial load
    transitionDuration: 500
  }

  api.settings = { ...defaults, ...options }

  // Where we store all our drawers available in the DOM
  let drawers = []

  // Where we build the save state object before we pass it to local storage
  let drawerState = {}

  // Where we store all our switch drawers available in the DOM
  let switchDrawers

  // Where we store all our media query lists along with their drawers
  let mqlArray = []

  /**
   * The constructor method, run as soon as an instance is created
   * ---
   * @param {Object} options - A json object with your custom settings
   */
  api.init = () => {

    // Get all the drawers on the page and save them with their default state
    document.querySelectorAll("." + api.settings.classTarget).forEach((drawer) => {
      drawers.push({
        "drawer": drawer,
        "defaultState": hasClass(drawer, api.settings.classActive)
      })
    })

    // Initialize a promise and init save state if it's enabled
    let promiseSaveState = new Promise((resolve) => {
      if (api.settings.saveState) {
        initSaveState(resolve)
      } else {
        resolve()
      }
    })

    // After promise is resolved and switch is enabled, initialize switch
    promiseSaveState.then(() => {
      if (api.settings.switch) {
        initSwitch()
      }
    })

    // Add our drawer trigger event listener
    document.addEventListener("click", trigger, false)
  }

  /**
   * The deconstructor method, used to reset and destroy the drawer instance
   * ---
   * @param {Boolean} defaultState - Return drawers to their default state?
   */
  api.destroy = (defaultState = true) => {

    // Destroy our switch
    destroySwitch()

    // Destroy our state
    stateClear()

    // Return drawrs to their default state
    if (defaultState) {
      drawers.forEach((item) => {
        if (item.defaultState) {
          addClass(item.drawer, api.settings.classActive)
        } else {
          removeClass(item.drawer, api.settings.classActive)
        }
      })
    }

    // Clear our variables
    drawers = []

    // Remove the drawer trigger event listener
    document.removeEventListener("click", trigger, false)
  }

  /**
   * Public method to open a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.open = (selector) => {
    selector = (selector) ? selector : "." + api.settings.classTarget
    toggle(document.querySelectorAll(selector), "open")
  }

  /**
   * Public method to close a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.close = (selector) => {
    selector = (selector) ? selector : "." + api.settings.classTarget
    toggle(document.querySelectorAll(selector), "close")
  }

  /**
   * Public method to toggle a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.toggle = (selector) => {
    selector = (selector) ? selector : "." + api.settings.classTarget
    toggle(document.querySelectorAll(selector))
  }

  /**
   * Public method to switch a modal into drawer
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.switchToDrawer = (selector) => {

    // Use default selector if one isn't passed
    selector = (selector) ? selector : api.settings.switch

    // Query our elements using the provided selector
    let items = document.querySelectorAll(selector)

    // Convert to array if only one drawer is passed
    items = (items.forEach) ? items : [items]

    items.forEach((item) => {
      switchToDrawer(item)
    })
  }

  /**
   * Public method to switch a drawer into modal
   * ---
   * @param {String} selector - A valid CSS selector
   */
  api.switchToModal = (selector) => {

    // Use default selector if one isn't passed
    selector = (selector) ? selector : api.settings.switch

    // Query our elements using the provided selector
    let items = document.querySelectorAll(selector)

    // Convert to array if only one drawer is passed
    items = (items.forEach) ? items : [items]

    items.forEach((item) => {
      switchToModal(item)
    })
  }

  /**
   * Save the drawer current drawer state
   */
  api.stateSave = () => {
    stateSave()
  }

  /**
   * Clears drawer state from local storage
   */
  api.stateClear = () => {
    stateClear()
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
    if (state === "open") {
      addClass(drawer, api.settings.classActive)
    } else if (state === "close") {
      removeClass(drawer, api.settings.classActive)
    } else {
      toggleClass(drawer, api.settings.classActive)
    }

    // Save state if feature is enabled
    if (api.settings.saveState) {
      stateSave(drawer)
    }

    // Fire the callback function if one was passed
    typeof callback === "function" && callback()
  }

  /**
   * Private function to toggle drawer via a trigger
   */
  const trigger = () => {

    // Get the closest trigger element from the click event
    let trigger = event.target.closest("." + api.settings.classTrigger)

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
    if (localStorage.getItem("drawerState")) {
      drawerState = JSON.parse(localStorage.getItem("drawerState"))
    }

    // Loop through all drawers
    drawers.forEach((item) => {

      let drawer = item.drawer

      // Set the default state if one is not set
      if (drawer.id in drawerState === false) {
        stateSave(drawer)
      }

      // Get our drawer dialog element
      let dialog = drawer.querySelector("." + api.settings.classInner)

      // Disables transitions as default states are being set
      let transitionDelay = () => {
        if (dialog) {
          addClass(dialog, api.settings.classTransitionNone)
          setTimeout(() => {
            removeClass(dialog, api.settings.classTransitionNone)
          }, api.settings.transitionDuration)
        }
      }

      // Toggle our drawer state based on the saved state
      if (drawerState[drawer.id] === false) {
        toggle(drawer, "close", transitionDelay)
      } else if (drawerState[drawer.id]) {
        toggle(drawer, "open", transitionDelay)
      }
    })

    // Fire the callback function if one was passed and return our state object
    typeof callback === "function" && callback(drawerState)
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
    items = (items.forEach) ? items : [items]

    // Loop through our drawers and save their new state to local storage
    items.forEach((item) => {

      if (item.drawer) {
        item = item.drawer
      }

      // Only save drawer state if an id exists
      if (item.id) {
        drawerState[item.id] = hasClass(item, api.settings.classActive)
        localStorage.setItem("drawerState", JSON.stringify(drawerState))
      }
    })
  }

  /**
   * Private function that clears the drawer state
   */
  const stateClear = () => {
    drawerState = {}
    localStorage.removeItem("drawerState")
  }

  /**
   * Private function that initializes the switch functionality
   */
  const initSwitch = () => {

    // Query all the drawers with the switch feature enabled
    switchDrawers = document.querySelectorAll(api.settings.switch)

    // Loop through the switch drawers
    switchDrawers.forEach((drawer) => {

      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      let cleanSelector = api.settings.switch
        .replace("[", "")
        .replace("]", "")
        .replace("data-", "")

      // Convert sring to camelCase
      cleanSelector = cleanSelector.replace(/-([a-z])/g, (g) => {
        return g[1].toUpperCase()
      })

      // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings
      let bp = drawer.dataset[cleanSelector]
      if (bp) {
        bp = breakpoint[bp]
        if (!bp) {
          bp = drawer.dataset[cleanSelector]
        }
      } else {
        bp = breakpoint[api.settings.switchBreakpoint]
        if (!bp) {
          bp = api.settings.switchBreakpoint
        }
      }

      // Media query listener
      let mql = window.matchMedia( "(min-width:" + bp + ")" )

      // Switch to modal if media doesn't match (< bp)
      if (!mql.matches) {
        switchToModal(drawer)
      }

      // Add our media query listener
      mql.addListener(switchCheck)

      // Push the mql to our array along with it's drawer
      mqlArray.push({
        "drawer" : drawer,
        "mql": mql
      })
    })
  }

  /**
   * Private function that destroys the switch functionality
   */
  const destroySwitch = () => {

    // Switch all modals back to their original drawer state
    switchDrawers.forEach((drawer) => {
      switchToDrawer(drawer)
    })

    // Remove the media query listeners
    mqlArray.forEach((item) => {
      item.mql.removeListener(switchCheck)
    })

    // Return switch variables to their original state
    switchDrawers = null
    mqlArray = []
  }

  /**
   * Private function that checks when a media query hits a match and switches
   * the component from drawer to modal as needed
   * ---
   * @param {MediaQueryList} mql - The MediaQueryList object for the media query
   * @param {Node} drawer - The drawer element to switch
   */
  const switchCheck = () => {
    mqlArray.forEach((item) => {
      if (item.mql.matches) {
        switchToDrawer(item.drawer)
      } else {
        switchToModal(item.drawer)
      }
    })
  }

  /**
   * Private function that switches a modal into a drawer component
   * ---
   * @param {Node} drawer - The element to switch
   */
  const switchToDrawer = (drawer) => {

    // Get the dialog and trigger elements related to this component
    let dialog = drawer.querySelector(".dialog")
    let triggers = document.querySelectorAll("[data-target=\"#" + drawer.id + "\"]")

    // Switch the modal component to drawer
    drawer.className = drawer.className.replace(
      new RegExp(api.settings.classTargetSwitch, "gi"),
      api.settings.classTarget
    )
    dialog.className = dialog.className.replace(
      new RegExp(api.settings.classInnerSwitch, "gi"),
      api.settings.classInner
    )
    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(
        new RegExp(api.settings.classTriggerSwitch, "gi"),
        api.settings.classTrigger
      )
    })

    // Open or close drawer based on save state
    if (api.settings.saveState) {
      if (drawerState[drawer.id] === false) {
        toggle(drawer, "close")
      } else {
        toggle(drawer, "open")
      }
    }
  }

  /**
   * Private function that switches a drawer into a modal component
   * ---
   * @param {Node} drawer - The element to switch
   */
  const switchToModal = (drawer) => {

    // Get the dialog and trigger elements related to this component
    let dialog = drawer.querySelector(".dialog")
    let triggers = document.querySelectorAll("[data-target=\"#" + drawer.id + "\"]")

    // Switch the drawer component to modal
    drawer.className = drawer.className.replace(
      new RegExp(api.settings.classTarget, "gi"),
      api.settings.classTargetSwitch
    )
    dialog.className = dialog.className.replace(
      new RegExp(api.settings.classInner, "gi"),
      api.settings.classInnerSwitch
    )
    triggers.forEach((trigger) => {
      trigger.className = trigger.className.replace(
        new RegExp(api.settings.classTrigger, "gi"),
        api.settings.classTriggerSwitch
      )
    })

    // Remove active class for modal styles by default
    removeClass(drawer, api.settings.classActive)
  }

  if (api.settings.autoInit) api.init()
  return api
}
