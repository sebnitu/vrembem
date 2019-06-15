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
 * Creates the drawer toggle functionality along with save state.
 */

// Init: Setup our variables
// Get the drawer state from local storage
let drawer_state = localStorage.getItem('drawer_state')

// Check if drawer state was saved otherwise init a new object
if (drawer_state) {
  drawer_state = JSON.parse(drawer_state)
} else {
  drawer_state = {}
}

// Get all the drawers on the page
let drawers = document.querySelectorAll('.drawer__item')

// Drawer methods
//---

let drawer_open = (item) => {
  u.addClass(item, 'is-active')
  if (!item.forEach) {
    item = u.toArray(item)
  }
  item.forEach((item) => {
    drawer_state[item.id] = u.hasClass(item, 'is-active')
    localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
    // console.log('open: ', item)
    // console.log('drawer_state: ', drawer_state)
  })
}

let drawer_close = (item) => {
  u.removeClass(item, 'is-active')
  if (!item.forEach) {
    item = u.toArray(item)
  }
  item.forEach((item) => {
    drawer_state[item.id] = u.hasClass(item, 'is-active')
    localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
    // console.log('close: ', item)
    // console.log('drawer_state: ', drawer_state)
  })
}

let drawer_run = () => {
  let trigger = event.target.closest('.drawer__trigger')
  if (trigger) {
    let dataDrawer = trigger.dataset.target
    if (dataDrawer) {
      let drawer = document.querySelectorAll(dataDrawer)
      if (drawer) {
        if (u.hasClass(drawer, 'is-active')) {
          drawer_close(drawer)
        } else {
          drawer_open(drawer)
        }
      }
    }
  }
}

let drawer_init = (drawers) => {

  // Loop through all drawers and save/init their state
  drawers.forEach((drawer) => {

    // Set the default state if one is not set
    if (drawer.id in drawer_state === false) {
      drawer_state[drawer.id] = u.hasClass(drawer, 'is-active')
    }

    // Toggle our drawer state based on the saved state
    if (drawer_state[drawer.id] === false) {
      drawer_close(drawer)
    } else {
      drawer_open(drawer)
    }
  })

  // Add our drawer trigger event listener
  document.addEventListener('click', drawer_run, false)
}

let drawer_destroy = () => {
  // Reset the drawer state variable and remove localstorage veriable
  drawer_state = {}
  localStorage.removeItem('drawer_state')
  // Remove the drawer trigger event listener
  document.removeEventListener('click', drawer_run, false)
}

// Run our drawer init
// ---

// drawer_destroy()
drawer_init(drawers)

/**
 * Draw state based on screen size
 * ---
 * Swaps out classes on the draw element to convert it into modal or
 * dismissible style.
 */

let breakpoints = {
  'xs': '480px',
  'sm': '620px',
  'md': '760px',
  'lg': '990px',
  'xl': '1380px'
}

let minWidth = breakpoints.xl
let mq = window.matchMedia( "(min-width:" + minWidth + ")" )

let widthChange = (mq) => {
  if (mq.matches) {
    // console.log('window width > ' + minWidth)
  } else {
    // console.log('window width < ' + minWidth)
  }
}

mq.addListener(widthChange)
widthChange(mq)

/**
 * List.js
 * ---
 * Adds list functionality along with search.
 * list.js docs: http://listjs.com/
 */
if (document.getElementById('listjs')) {

  // Init our list.js component
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

  // Empty Notice
  // Displayed when the search returns no results
  let notice_empty = document.querySelector('.notice_empty')
  let notice_empty_text = notice_empty.querySelector('.search_text')

  // Clear search button
  let filter = document.querySelector('.filter')
  let search = document.querySelector('.filter .search')
  let search_clear = document.querySelector('.filter .search_clear')

  // On search complete callback
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

  // Click events for category and clears
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
