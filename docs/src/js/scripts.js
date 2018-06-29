var list = require('list.js')
var modal = require('./modal.js')

var blocksList = new list('vrembem-blocks', {
  valueNames: [
    'jumbo-list__name',
    { data: ['type'] }
  ],
  listClass: 'jumbo-list'
})

var updateList = function() {
  var values_type = document.getElementById('jumbo-filter__type').value

  blocksList.filter(function(item) {
    return (values_type.includes(item.values().type) || !values_type)
  })
}

document.addEventListener('DOMContentLoaded',function() {
  var filter = document.getElementById('jumbo-filter__type')
  if (filter) {
    filter.onchange=updateList
  }
}, false)

// blocksList.sort('jumbo-list__name', { order: 'asc' })

var demoModal = new modal()

demoModal.init()
