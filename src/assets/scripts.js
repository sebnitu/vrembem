var list = require('list.js')
var modal = require('./modal.js')

var blocksList = new list('vrembem-blocks', {
  valueNames: [ 'jumbo-menu__name' ],
  searchClass: 'jumbo-filter__search',
  sortClass: 'jumbo-filter__sort',
  listClass: 'jumbo-menu'
})

var demoModal = new modal()

demoModal.init()
