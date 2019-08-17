import { hasClass, addClass, removeClass } from "@vrembem/core"
import {
  dismissible,
  drawer,
  modal,
  toggle
} from "@vrembem/all"
import listjs from "list.js"

let dismissibleDefault = new dismissible()
let drawerDefault = new drawer()
let modalDefault = new modal()
let toggleDefault = new toggle()

console.log("dismissible:", dismissibleDefault)
console.log("drawer:", drawerDefault)
console.log("modal:", modalDefault)
console.log("toggle:", toggleDefault)

/**
 * General event trigger for testing
 */

document.addEventListener("click", function() {

  // Get the element that triggered the event
  let trigger = event.target

  // Run the script if it exists as a data attribute
  if (trigger.dataset.script) {
    // Get our script string for processing
    let string = trigger.dataset.script

    // console.log("Run: ", string)

    // Get indexes of string
    let indexObject = string.indexOf(".")
    let indexMethod = string.indexOf("(")
    let indexParamStart = string.indexOf("\"")
    let indexParamEnd = string.indexOf("\"", indexParamStart + 1)

    // Get the object, method and if params are passed
    let obj = string.substring(0, indexObject)
    let method = string.substring(indexObject + 1, indexMethod)
    let params = string.substring(indexParamStart + 1, indexParamEnd)

    // console.log("Obj: ", obj)
    // console.log("Method: ", method)
    // console.log("Params: ", params)

    // Run our data script
    if (obj === "drawer") {
      drawer[method](params)
    }
  }

})

/**
 * List.js
 * ---
 * Adds list functionality along with search.
 * list.js docs: http://listjs.com/
 */
if (document.getElementById("listjs")) {

  // Init our list.js component
  const list = new listjs("listjs", {
    fuzzySearch: {
      searchClass: "search",
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true
    },
    valueNames: [
      "name",
      { data: ["category"] }
    ],
    listClass: "menu"
  })

  // Empty Notice
  // Displayed when the search returns no results
  let notice_empty = document.querySelector(".notice_empty")
  let notice_empty_text = notice_empty.querySelector(".search_text")

  // Clear search button
  let filter = document.querySelector(".filter")
  let search = document.querySelector(".filter .search")
  let search_clear = document.querySelector(".filter .search_clear")

  let isMenuLinkActive = () => {
    let menuLinks = document.querySelectorAll("#listjs .menu__link")
    let isActive = hasClass(menuLinks, "is-active")
    return isActive
  }

  // On search complete callback
  list.on("searchComplete", () => {

    // Update the search text in empty notice
    let value = search.value
    notice_empty_text.innerHTML = value
    localStorage.setItem("searchValue", value)

    // Show clear search button if a value there is something in search
    if (value) {
      addClass(filter, "is-active")
      addClass(search, "is-active")
      removeClass(search_clear, "dismiss")
    } else {
      removeClass(filter, "is-active")
      removeClass(search, "is-active")
      addClass(search_clear, "dismiss")
    }

    // Toggle notice depending on the number of visible items
    if (list.visibleItems.length > 0) {
      addClass(notice_empty, "dismiss")
    } else {
      removeClass(notice_empty, "dismiss")
    }
  })

  // Click events for category and clears
  document.addEventListener("click", () => {
    let trigger_search_clear = event.target.closest(".search_clear")
    let trigger_search_cat = event.target.closest(".category")

    if (trigger_search_clear) {
      search.value = ""
      list.search()
      event.preventDefault()
    }

    if (trigger_search_cat) {
      search.value = trigger_search_cat.dataset.category
      list.search(search.value)
      event.preventDefault()
    }

  }, false)

  // Restore our local storage value
  if (localStorage.getItem("searchValue")) {
    search.value = localStorage.getItem("searchValue")
    list.search(search.value)
    if (!isMenuLinkActive()) {
      search.value = ""
      list.search()
    }
  }
}
