import {
  utility,
  Checkbox,
  Dismissible,
  Drawer,
  Modal
} from 'vrembem';
import listjs from 'list.js';
import 'svgxuse';
import { Version } from './version';

/**
 * Initialize Vrembem components
 */

new Checkbox({ autoInit: true });
new Dismissible({ autoInit: true });
new Drawer({ autoInit: true });
new Modal({ autoInit: true });
new Version({ autoInit: true });

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
  });

  // Empty Notice
  // Displayed when the search returns no results
  let notice_empty = document.querySelector('.notice_empty');
  let notice_empty_text = notice_empty.querySelector('.search_text');

  // Clear search button
  let filter = document.querySelector('.filter');
  let search = document.querySelector('.filter .search');
  let search_clear = document.querySelector('.filter .search_clear');

  let isMenuLinkActive = () => {
    let menuLinks = document.querySelectorAll('#listjs .menu__link');
    let isActive = utility.hasClass(menuLinks, 'is-active');
    return isActive;
  };

  // On search complete callback
  list.on('searchComplete', () => {

    // Update the search text in empty notice
    let value = search.value;
    notice_empty_text.innerHTML = value;
    localStorage.setItem('searchValue', value);

    // Show clear search button if a value there is something in search
    if (value) {
      utility.addClass(filter, 'is-active');
      utility.addClass(search, 'is-active');
      utility.removeClass(search_clear, 'display_none');
    } else {
      utility.removeClass(filter, 'is-active');
      utility.removeClass(search, 'is-active');
      utility.addClass(search_clear, 'display_none');
    }

    // Toggle notice depending on the number of visible items
    if (list.visibleItems.length > 0) {
      utility.addClass(notice_empty, 'display_none');
    } else {
      utility.removeClass(notice_empty, 'display_none');
    }
  });

  // Click events for category and clears
  document.addEventListener('click', () => {
    let trigger_search_clear = event.target.closest('.search_clear');
    let trigger_search_cat = event.target.closest('.category');

    if (trigger_search_clear) {
      search.value = '';
      list.search();
      event.preventDefault();
    }

    if (trigger_search_cat) {
      search.value = trigger_search_cat.dataset.category;
      list.search(search.value);
      event.preventDefault();
    }

  }, false);

  // Restore our local storage value
  if (localStorage.getItem('searchValue')) {
    search.value = localStorage.getItem('searchValue');
    list.search(search.value);
    if (!isMenuLinkActive()) {
      search.value = '';
      list.search();
    }
  }
}
