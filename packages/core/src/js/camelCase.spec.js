import { camelCase } from "./camelCase"

test("breakpoint has all size keys with a px value", () => {
  const str = camelCase("some-string-goes-here")
  expect(str).toMatch("someStringGoesHere")
})
