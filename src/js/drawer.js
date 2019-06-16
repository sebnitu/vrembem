import u from './utility.js'

export default function(options) {

  'use strict'

  let api = {}
  let settings
  const defaults = {
    classTrigger: 'drawer__trigger',
    classDrawer: 'drawer',
    classDialog: 'drawer__dialog',
    classActive: 'is-active',
    classModalSwap: '[data-modal-swap]',
    saveState: true
  }

  let drawer_state
  let drawers

  const open = (target) => {
    u.addClass(target, 'is-active')
    if (!target.forEach) {
      target = u.toArray(target)
    }
    target.forEach((target) => {
      drawer_state[target.id] = u.hasClass(target, 'is-active')
      localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
      // console.log('open: ', target)
      // console.log('drawer_state: ', drawer_state)
    })
  }

  const close = (target) => {
    u.removeClass(target, 'is-active')
    if (!target.forEach) {
      target = u.toArray(target)
    }
    target.forEach((target) => {
      drawer_state[target.id] = u.hasClass(target, 'is-active')
      localStorage.setItem('drawer_state', JSON.stringify(drawer_state))
      // console.log('close: ', target)
      // console.log('drawer_state: ', drawer_state)
    })
  }

  const run = () => {
    let trigger = event.target.closest('.drawer__trigger')
    if (trigger) {
      let dataDrawer = trigger.dataset.target
      if (dataDrawer) {
        let drawer = document.querySelectorAll(dataDrawer)
        if (drawer) {
          if (u.hasClass(drawer, 'is-active')) {
            close(drawer)
          } else {
            open(drawer)
          }
        }
      }
    }
  }

  const modalSwap = (target) => {
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
        console.log('window width > ' + minWidth)
      } else {
        console.log('window width < ' + minWidth)
      }
    }

    mq.addListener(widthChange)
    widthChange(mq)
  }

  api.open = (target) => {
    open(document.querySelectorAll(target))
  }

  api.close = (clear) => {
    close(clear)
  }

  api.init = (drawers) => {

    // Init: Setup our variables
    // Get the drawer state from local storage
    drawer_state = localStorage.getItem('drawer_state')

    // Check if drawer state was saved otherwise init a new object
    if (drawer_state) {
      drawer_state = JSON.parse(drawer_state)
    } else {
      drawer_state = {}
    }

    // Get all the drawers on the page
    drawers = document.querySelectorAll('.drawer__item')

    // Loop through all drawers and save/init their state
    drawers.forEach((drawer) => {

      // Set the default state if one is not set
      if (drawer.id in drawer_state === false) {
        drawer_state[drawer.id] = u.hasClass(drawer, 'is-active')
      }

      // Toggle our drawer state based on the saved state
      if (drawer_state[drawer.id] === false) {
        close(drawer)
      } else {
        open(drawer)
      }
    })

    // Add our drawer trigger event listener
    document.addEventListener('click', run, false)
  }

  api.destroy = () => {
    // Reset the drawer state variable and remove localstorage veriable
    drawer_state = {}
    localStorage.removeItem('drawer_state')
    // Remove the drawer trigger event listener
    document.removeEventListener('click', run, false)
  }

  api.init(options)
  return api
}
