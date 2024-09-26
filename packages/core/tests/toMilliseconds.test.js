import { toMilliseconds } from "../index";

test("should return the input value if it is a number", () => {
  expect(toMilliseconds(1000)).toBe(1000);
  expect(toMilliseconds(500)).toBe(500);
});

test("should convert seconds to milliseconds", () => {
  expect(toMilliseconds("1")).toBe(1000);
  expect(toMilliseconds("2")).toBe(2000);
});

test("should convert milliseconds to milliseconds", () => {
  expect(toMilliseconds("500ms")).toBe(500);
  expect(toMilliseconds("1000ms")).toBe(1000);
});

test("should handle float values as input", () => {
  expect(toMilliseconds("1.5")).toBe(1500);
  expect(toMilliseconds("0.5")).toBe(500);
  expect(toMilliseconds("0.001")).toBe(1);
});

test("should throw an error for invalid inputs", () => {
  expect(() => toMilliseconds("abc")).toThrow("Could not convert value to milliseconds: abc");
  expect(() => toMilliseconds("")).toThrow("Could not convert value to milliseconds: ");
  expect(() => toMilliseconds(null)).toThrow("Could not convert value to milliseconds: null");
  expect(() => toMilliseconds(undefined)).toThrow("Could not convert value to milliseconds: undefined");
});
