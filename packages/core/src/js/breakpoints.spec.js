import { breakpoints } from "./breakpoints"

test("breakpoint has all size keys with a px value", () => {
  expect(breakpoints).toHaveProperty("xs", expect.stringContaining("px"))
  expect(breakpoints).toHaveProperty("sm", expect.stringContaining("px"))
  expect(breakpoints).toHaveProperty("md", expect.stringContaining("px"))
  expect(breakpoints).toHaveProperty("lg", expect.stringContaining("px"))
  expect(breakpoints).toHaveProperty("xl", expect.stringContaining("px"))
})

test("breakpoints increment in the order of their keys", () => {
  let intObj = {}
  for (let prop in breakpoints) {
    intObj[prop] = parseInt(breakpoints[prop])
  }
  expect(intObj.xs).toBeLessThan(intObj.sm)
  expect(intObj.sm).toBeLessThan(intObj.md)
  expect(intObj.md).toBeLessThan(intObj.lg)
  expect(intObj.lg).toBeLessThan(intObj.xl)
})
