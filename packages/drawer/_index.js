import {
  addClass,
  breakpoint,
  hasClass,
  removeClass,
  toggleClass
} from "@vrembem/core"

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

  api.init = () => {

    // Get all the drawers on the page and save them with their default state
    document.querySelectorAll("." + api.settings.classTarget).forEach((drawer) => {
      drawers.push({
        "drawer": drawer,
        "defaultState": hasClass(drawer, api.settings.stateOpen)
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

  api.destroy = (defaultState = true) => {

    // Destroy our switch
    destroySwitch()

    // Destroy our state
    stateClear()

    // Return drawrs to their default state
    if (defaultState) {
      drawers.forEach((item) => {
        if (item.defaultState) {
          addClass(item.drawer, api.settings.stateOpen)
        } else {
          removeClass(item.drawer, api.settings.stateOpen)
        }
      })
    }

    // Clear our variables
    drawers = []

    // Remove the drawer trigger event listener
    document.removeEventListener("click", trigger, false)
  }

  api.open = (selector) => {
    selector = (selector) ? selector : "." + api.settings.classTarget
    toggle(document.querySelectorAll(selector), "open")
  }

  api.close = (selector) => {
    selector = (selector) ? selector : "." + api.settings.classTarget
    toggle(document.querySelectorAll(selector), "close")
  }

  api.toggle = (selector) => {
    selector = (selector) ? selector : "." + api.settings.classTarget
    toggle(document.querySelectorAll(selector))
  }

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

  api.stateSave = () => {
    stateSave()
  }

  api.stateClear = () => {
    stateClear()
  }

  const toggle = (drawer, state, callback) => {

    // Check if drawer(s) should be opened, closed or toggled and either add or
    // remove the active class to the passed drawer(s)
    if (state === "open") {
      addClass(drawer, api.settings.stateOpen)
    } else if (state === "close") {
      removeClass(drawer, api.settings.stateOpen)
    } else {
      toggleClass(drawer, api.settings.stateOpen)
    }

    // Save state if feature is enabled
    if (api.settings.saveState) {
      stateSave(drawer)
    }

    // Fire the callback function if one was passed
    typeof callback === "function" && callback()
  }

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
        drawerState[item.id] = hasClass(item, api.settings.stateOpen)
        localStorage.setItem("drawerState", JSON.stringify(drawerState))
      }
    })
  }

  const stateClear = () => {
    drawerState = {}
    localStorage.removeItem("drawerState")
  }

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

  const switchCheck = () => {
    mqlArray.forEach((item) => {
      if (item.mql.matches) {
        switchToDrawer(item.drawer)
      } else {
        switchToModal(item.drawer)
      }
    })
  }

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
    removeClass(drawer, api.settings.stateOpen)
  }

  if (api.settings.autoInit) api.init()
  return api
}
