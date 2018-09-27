import Modal from 'modal.js'
import Dismissible from 'dismissible.js'
import list from 'list.js'

const modal = new Modal()
const dismissible = new Dismissible()

const home = document.getElementById('vrembem-blocks')

if (home) {

  const blocksList = new list('vrembem-blocks', {
    valueNames: [
      'jumbo-list__name',
      { data: ['type'] }
    ],
    listClass: 'jumbo-list'
  })

  const updateList = function() {
    const values_type = document.getElementById('jumbo-filter__type').value
    blocksList.filter(function(item) {
      return (values_type.includes(item.values().type) || !values_type)
    })
  }

  document.addEventListener('DOMContentLoaded',function() {
    const filter = document.getElementById('jumbo-filter__type')
    if (filter) {
      filter.onchange=updateList
    }
  }, false)

  blocksList.sort('jumbo-list__name', { order: 'asc' })

}
