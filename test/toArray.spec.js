import { toArray } from "../packages/core/dist/scripts.cjs.js"

describe("with a string", () => {
  test("return the string in an array", () => {
    let result = toArray("string")
    expect(result).toStrictEqual(["string"])
  })
})
