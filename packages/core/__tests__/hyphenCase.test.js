import { hyphenCase } from "../index"

test("properly converts camel case string to a hyphen separated string", () => {
  const str = hyphenCase("someStringGoesHere")
  expect(str).toMatch("some-string-goes-here")
})
