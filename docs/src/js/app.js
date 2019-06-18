import u from 'utility'
import Dismissible from 'dismissible'
import Drawer from 'drawer'
import Modal from 'modal'
import Toggle from 'toggle'
import listjs from 'list.js'

const dismissible = new Dismissible
const drawer = new Drawer()
const modal = new Modal()
const toggle = new Toggle()

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
