export const Version = (options) => {

  let api = {}
  const defaults = {
    autoInit: false
  }

  api.settings = { ...defaults, ...options }

  api.init = () => {
    console.log("Things are happening...")
    // document.addEventListener("click", run, false)
  }

  api.destroy = () => {
    // document.removeEventListener("click", run, false)
  }

  // const run = (event) => {
  //
  // }

  if (api.settings.autoInit) api.init()
  return api
}
