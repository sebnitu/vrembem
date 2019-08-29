import { Toggle } from "./index.js"
import "@testing-library/jest-dom/extend-expect"

document.body.innerHTML = `
  <div data-toggle-target>
    <button data-toggle></button>
  </div>
`

test("toggle using default settings", () => {
  const toggle = new Toggle()
  toggle.init()
})
