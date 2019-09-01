import { camelCase, hyphenCase, toggleClass } from "@vrembem/core"

export const Toggle = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    class: "is-active",
    dataChild: "toggle-child",
    dataParent: "toggle-parent",
    dataSelf: "toggle-self",
    dataSibling: "toggle-sibling",
    dataTarget: "toggle-target",
    dataTrigger: "toggle",
    selectorTrigger: "[data-toggle]"
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    document.addEventListener("click", run, false)
  }

  api.destroy = () => {
    document.removeEventListener("click", run, false)
  }

  const resolveClass = (trigger) => {
    let cl = trigger.dataset[camelCase(api.settings.dataTrigger)]
    cl = (cl) ? cl : api.settings.class
    return cl.split(/[ ,]+/)
  }

  const toggleChild = (trigger, cl) => {
    let target = trigger.dataset[camelCase(api.settings.dataChild)]
    target = trigger.querySelectorAll(target)
    if (target) {
      toggleClass(target, ...cl)
    }
  }

  const toggleParent = (trigger, cl) => {
    let target = trigger.dataset[camelCase(api.settings.dataParent)]
    target = trigger.closest(target)
    if (target) {
      toggleClass(target, ...cl)
    }
  }

  const toggleSelf = (trigger, cl) => {
    let clSelf = trigger.dataset[camelCase(api.settings.dataSelf)]
    clSelf = (clSelf) ? clSelf.split(/[ ,]+/) : cl
    toggleClass(trigger, ...clSelf)
  }

  const toggleSibling = (trigger, cl) => {
    let target = trigger.dataset[camelCase(api.settings.dataSibling)]
    target = trigger.parentElement.querySelectorAll(`:scope > ${target}`)
    if (target) {
      toggleClass(target, ...cl)
    }
  }

  const toggleTarget = (trigger, cl) => {
    let target = trigger.dataset[camelCase(api.settings.dataTarget)]
    target = document.querySelectorAll(target)
    if (target) {
      toggleClass(target, ...cl)
    }
  }

  const toggle = (trigger, cl, dataKey) => {
    let hasAttr = trigger.hasAttribute(`data-${hyphenCase(dataKey)}`)
    if (hasAttr) {
      switch (dataKey) {
      case api.settings.dataChild : toggleChild(trigger, cl)
        break
      case api.settings.dataParent: toggleParent(trigger, cl)
        break
      case api.settings.dataSelf : toggleSelf(trigger, cl)
        break
      case api.settings.dataSibling : toggleSibling(trigger, cl)
        break
      case api.settings.dataTarget : toggleTarget(trigger, cl)
      }
    }
    return hasAttr
  }

  const run = (e) => {
    let trigger = e.target.closest(api.settings.selectorTrigger)
    if (trigger) {
      let cl = resolveClass(trigger)
      let toggleConditions = [
        toggle(trigger, cl, api.settings.dataChild),
        toggle(trigger, cl, api.settings.dataParent),
        toggle(trigger, cl, api.settings.dataSelf),
        toggle(trigger, cl, api.settings.dataSibling),
        toggle(trigger, cl, api.settings.dataTarget)
      ]
      if (toggleConditions.every((i) => i === false)) {
        toggleClass(trigger, ...cl)
      }
      e.preventDefault()
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
