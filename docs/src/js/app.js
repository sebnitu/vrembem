import u from 'utility'
import Modal from 'modal'
import Dismissible from 'dismissible'
import listjs from 'list.js'

const modal = new Modal()
const dismissible = new Dismissible()

/**
 * Check if listjs should be run
 */
if (document.getElementById('listjs')) {

  /**
   * Init our list.js component
   */
  const list = new listjs('listjs', {
    valueNames: [
      'name',
      { data: ['tags'] }
    ],
    listClass: 'jumbo-list'
  })

  /**
   * Empty Notice
   * Displayed when the search returns no results
   */
  let notice_empty = document.querySelector('.notice_empty')
  let notice_empty_text = notice_empty.querySelector('.search_text')

  /**
   * On search complete callback
   */
  list.on('searchComplete', function() {

    // Update the search text in empty notice
    let value = document.querySelector('.jumbo-filter .search').value
    notice_empty_text.innerHTML = value

    // Toggle notice depending on the number of visible items
    if (list.visibleItems.length > 0) {
      u.addClass(notice_empty, 'd_none')
    } else {
      u.removeClass(notice_empty, 'd_none')
    }
  })

}
