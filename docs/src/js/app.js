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
 * Local storage
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

let drawer_state
let drawer = document.querySelector('.drawer__left')

if (drawer) {

  // Step 1: Check if local storage variable is set, otherwise set default.
  if (localStorage.getItem('drawer_state')) {
    drawer_state = localStorage.getItem('drawer_state')
  } else {
    drawer_state = 'close'
    localStorage.setItem('drawer_state', drawer_state)
  }

  // Step 2: Check local storage and toggle classes based on drawer state
  if (drawer_state === 'close') {
    u.addClass(drawer, 'drawer_close')
    u.removeClass(drawer, 'drawer_open')
  } else {
    u.removeClass(drawer, 'drawer_close')
    u.addClass(drawer, 'drawer_open')
  }

  // Step 3: Add listener to drawer toggle button
  document.addEventListener('click', () => {
    let trigger = event.target.closest('.drawer__toggle')
    if (trigger) {
      if (u.hasClass(drawer, 'drawer_close')) {
        drawer_state = 'close'
      } else if (u.hasClass(drawer, 'drawer_open')) {
        drawer_state = 'open'
      }
      localStorage.setItem('drawer_state', drawer_state)
    }
  }, false)

}

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
