import listjs from 'list.js';

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
  const noticeEmpty = document.querySelector('.notice_empty');
  const noticeEmptyText = noticeEmpty.querySelector('.search_text');

  // Clear search button
  const filter = document.querySelector('.filter');
  const search = document.querySelector('.filter .search');
  const searchClear = document.querySelector('.filter .search_clear');

  const isMenuLinkActive = () => {
    return document.querySelectorAll('#listjs .menu__action.is-active');
  };

  // On search complete callback
  list.on('searchComplete', () => {

    // Update the search text in empty notice
    const value = search.value;
    noticeEmptyText.innerHTML = value;
    localStorage.setItem('SearchValue', value);

    // Show clear search button if a value there is something in search
    if (value) {
      filter.classList.add('is-active');
      search.classList.add('is-active');
      searchClear.classList.remove('display-none');
    } else {
      filter.classList.remove('is-active');
      search.classList.remove('is-active');
      searchClear.classList.add('display-none');
    }

    // Toggle notice depending on the number of visible items
    if (list.visibleItems.length > 0) {
      noticeEmpty.classList.add('display-none');
    } else {
      noticeEmpty.classList.remove('display-none');
    }
  });

  // Click events for category and clears
  document.addEventListener('click', (event) => {
    const trigger_search_clear = event.target.closest('.search_clear');
    if (trigger_search_clear) {
      event.preventDefault();
      search.value = '';
      list.search();
    }

    const trigger_search_cat = event.target.closest('.category');
    if (trigger_search_cat) {
      event.preventDefault();
      search.value = trigger_search_cat.dataset.category;
      list.search(search.value);
    }
  }, false);

  // Restore our local storage value
  if (localStorage.getItem('SearchValue')) {
    search.value = localStorage.getItem('SearchValue');
    list.search(search.value);
    if (!isMenuLinkActive()) {
      search.value = '';
      list.search();
    }
  }
}
