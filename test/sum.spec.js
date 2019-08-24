import { sum } from "./sum"

describe("without arguments", () => {
  test("should return 0", function() {
    let result = sum()
    expect(result).toBe(0)
  })
})

describe("with number arguments", () => {
  test("should return sum of arguments", function() {
    let result = sum(1, 2, 3, 4, 5)
    expect(result).toBe(15)
  })

  test("should return argument when only one argument is passed", function() {
    let result = sum(5)
    expect(result).toBe(5)
  })
})

describe("with non-number", () => {
  test("arguments should throw error", function() {
    expect(() => sum(1, 2, "3", [4], 5)).toThrow()
  })
})
