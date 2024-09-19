import { toKebab } from "../index";

test("should convert a camel cased string to kebab case", () => {
  expect(toKebab("oneMoreTime")).toBe("one-more-time");
});

test("should make no changes to an already kebab cased string", () => {
  expect(toKebab("one-more-time")).toBe("one-more-time");
});
