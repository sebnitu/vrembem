import { camelCase, toggleClass } from "@vrembem/core"

export const Toggle = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    class: "is-active",
    dataClass: "toggle",
    dataTarget: "toggle-target",
    dataTargetSelf: "toggle-self",
    dataTargetParent: "toggle-parent",
    dataTargetSibling: "toggle-sibling",
    dataTargetChild: "toggle-child",
    selectorTrigger: "[data-toggle]"
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    document.addEventListener("click", run, false)
  }

  api.destroy = () => {
    document.removeEventListener("click", run, false)
  }

  const run = (e) => {
    let trigger = e.target.closest(api.settings.selectorTrigger)
    if (trigger) {

      let cl = trigger.dataset[camelCase(api.settings.dataClass)]
      cl = (cl) ? cl : api.settings.class
      cl = cl.split(/[ ,]+/)

      // "[data-toggle-parent]"
      let targetParent = trigger.hasAttribute(
        `data-${api.settings.dataTargetParent}`
      )
      if (targetParent) {
        targetParent = trigger.dataset[camelCase(api.settings.dataTargetParent)]
        targetParent = trigger.closest(targetParent)
        if (targetParent) {
          toggleClass(targetParent, ...cl)
        }
      }

      // "[data-toggle-sibling]"
      let targetSibling = trigger.hasAttribute(
        `data-${api.settings.dataTargetSibling}`
      )
      if (targetSibling) {
        targetSibling = trigger.dataset[camelCase(api.settings.dataTargetSibling)]
        targetSibling = trigger.parentElement.querySelectorAll(`:scope > ${targetSibling}`)
        if (targetSibling) {
          toggleClass(targetSibling, ...cl)
        }
      }

      // "[data-toggle-child]"
      let targetChild = trigger.hasAttribute(
        `data-${api.settings.dataTargetChild}`
      )
      if (targetChild) {
        targetChild = trigger.dataset[camelCase(api.settings.dataTargetChild)]
        targetChild = trigger.querySelectorAll(targetChild)
        if (targetChild) {
          toggleClass(targetChild, ...cl)
        }
      }

      // "[data-toggle-target]"
      let target = trigger.dataset[camelCase(api.settings.dataTarget)]
      target = document.querySelectorAll(target)
      if (!target.length && !targetParent && !targetSibling && !targetChild) {
        target = trigger
      }
      toggleClass(target, ...cl)

      // "[data-toggle-self]"
      if (trigger.hasAttribute(`data-${api.settings.dataTargetSelf}`)) {
        let targetSelf = trigger.dataset[camelCase(api.settings.dataTargetSelf)]
        let clSelf = (targetSelf) ? targetSelf.split("/[ ,]+/") : cl
        toggleClass(trigger, ...clSelf)
      }

      e.preventDefault()
    }
  }

  if (api.settings.autoInit) api.init()

  return api
}
