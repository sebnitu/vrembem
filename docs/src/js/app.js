import u from 'utility'
import Dismissible from 'dismissible'
import Modal from 'modal'
import Toggle from 'toggle'
import listjs from 'list.js'

const dismissible = new Dismissible()
const modal = new Modal()
const toggle = new Toggle()
const dropdown = new Toggle({
  trigger: '.dropdown.on-click',
  targets: '',
  class: 'is-active'
})

/**
 * Drawer JavaScript (Pre-plugin)
 * ---
 * This is we save the state of our drawer component.
 * https://gomakethings.com/using-localstorage-to-save-user-data-with-vanilla-javascript/
 */

// Set
// localStorage.setItem('drawer_state', drawer_state)
// ---
// Get
// localStorage.getItem('drawer_state')
// ---
// Remove
// localStorage.removeItem('drawer_state')

// Init: Setup our variables
let drawer_state = localStorage.getItem('drawer_state')
if (drawer_state) {
  drawer_state = JSON.parse(drawer_state)
} else {
  drawer_state = {}
}
let drawers = document.querySelectorAll('.drawer__item')

// Drawer open method
let drawer_open = (item) => {
  console.log('open: ', item)
  u.addClass(item, 'is-open')
  u.removeClass(item, 'is-closed')
  drawer_state[item.id] = u.hasClass(item, 'is-open')
  localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
  console.log('drawer_state: ', drawer_state)
}

// Drawer close method
let drawer_close = (item) => {
  console.log('close: ', item)
  u.addClass(item, 'is-closed')
  u.removeClass(item, 'is-open')
  drawer_state[item.id] = u.hasClass(item, 'is-open')
  localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
  console.log('drawer_state: ', drawer_state)
}

// Step 3: Add listener to drawer toggle button
document.addEventListener('click', () => {
  let trigger = event.target.closest('.drawer__trigger')
  if (trigger) {
    let dataDrawer = trigger.dataset.drawer
    if (dataDrawer) {
      let drawer = document.getElementById(dataDrawer)
      if (drawer) {
        if (u.hasClass(drawer, 'is-closed')) {
          drawer_open(drawer)
        } else if (u.hasClass(drawer, 'is-open')) {
          drawer_close(drawer)
        }
      }
    }
  }
}, false)

// Loop through all drawers and save/init their state
for (let i = 0; i < drawers.length; ++i) {
  let drawer = drawers[i]

  // Step 1: Set the default state if one is not set
  if (drawer.id in drawer_state === false) {
    drawer_state[drawer.id] = u.hasClass(drawer, 'is-open')
  }

  // Step 2: Toggle our drawer state based on the saved state
  if (drawer_state[drawer.id] === false) {
    drawer_close(drawer)
  } else {
    drawer_open(drawer)
  }
}

// if (drawer) {
//
//   // Step 1: Check if local storage variable is set, otherwise set default.
//   if (localStorage.getItem('drawer_state')) {
//     drawer_state = localStorage.getItem('drawer_state')
//   } else {
//     drawer_state = 'close'
//     localStorage.setItem('drawer_state', drawer_state)
//   }
//
//   // Step 2: Check local storage and toggle classes based on drawer state
//   if (drawer_state === 'close') {
//     drawer_close(drawer)
//   } else {
//     drawer_open(drawer)
//   }
//
// }

/**
 * Draw state based on screen size
 * ---
 * Swaps out classes on the draw element to convert it into modal or
 * dismissible style.
 */

// let breakpoints = {
//   'xs': '480px',
//   'sm': '620px',
//   'md': '760px',
//   'lg': '990px',
//   'xl': '1380px'
// }
//
// let minWidth = breakpoints.xl
// let mq = window.matchMedia( "(min-width:" + minWidth + ")" )
//
// let widthChange = (mq) => {
//   if (mq.matches) {
//     console.log('window width > ' + minWidth)
//   } else {
//     console.log('window width < ' + minWidth)
//   }
// }
//
// mq.addListener(widthChange)
// widthChange(mq)

/**
 * List.js
 * ---
 * Adds list functionality along with search.
 * list.js docs: http://listjs.com/
 */
if (document.getElementById('listjs')) {

  /**
   * Init our list.js component
   */
  const list = new listjs('listjs', {
    fuzzySearch: {
      searchClass: 'search',
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true
    },
    valueNames: [
      'name',
      { data: ['category'] }
    ],
    listClass: 'menu'
  })

  /**
   * Empty Notice
   * Displayed when the search returns no results
   */
  let notice_empty = document.querySelector('.notice_empty')
  let notice_empty_text = notice_empty.querySelector('.search_text')

  /**
   * Clear search button
   */
  let filter = document.querySelector('.filter')
  let search = document.querySelector('.filter .search')
  let search_clear = document.querySelector('.filter .search_clear')

  /**
   * On search complete callback
   */
  list.on('searchComplete', () => {

    // Update the search text in empty notice
    let value = search.value
    notice_empty_text.innerHTML = value

    // Show clear search button if a value there is something in search
    if (value) {
      u.addClass(filter, 'is-active')
      u.addClass(search, 'is-active')
      u.removeClass(search_clear, 'd_none')
    } else {
      u.removeClass(filter, 'is-active')
      u.removeClass(search, 'is-active')
      u.addClass(search_clear, 'd_none')
    }

    // Toggle notice depending on the number of visible items
    if (list.visibleItems.length > 0) {
      u.addClass(notice_empty, 'd_none')
    } else {
      u.removeClass(notice_empty, 'd_none')
    }
  })

  /**
   * Click events for category and clears
   */
  document.addEventListener('click', () => {
    let trigger_search_clear = event.target.closest('.search_clear')
    let trigger_search_cat = event.target.closest('.category')

    if (trigger_search_clear) {
      search.value = ''
      list.search()
      event.preventDefault()
    }

    if (trigger_search_cat) {
      search.value = trigger_search_cat.dataset.category
      list.search(search.value)
      event.preventDefault()
    }

  }, false)

}
