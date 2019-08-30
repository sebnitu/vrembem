import { hyphenCase } from "./hyphenCase"

test("breakpoint has all size keys with a px value", () => {
  const str = hyphenCase("someStringGoesHere")
  expect(str).toMatch("some-string-goes-here")
})
