import { toCamel } from "../index";

test("should convert a kebab string to camel case", () => {
  expect(toCamel("one-more-time")).toBe("oneMoreTime");
});

test("should make no changes to an already camel cased string", () => {
  expect(toCamel("oneMoreTime")).toBe("oneMoreTime");
});
