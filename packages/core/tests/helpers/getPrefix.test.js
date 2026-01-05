import { getPrefix } from "../../index";

test("should return an empty string if no prefix is found", () => {
  expect(getPrefix()).toBe("");
});

test("should return the vrembem prefix value", () => {
  document.body.style.setProperty("--vb-prefix", "vb");
  expect(getPrefix()).toBe("vb");
});

test("should return the vrembem prefix value with an affixed delimiter", () => {
  document.body.style.setProperty("--vb-prefix", "vb");
  expect(getPrefix("-")).toBe("vb-");
});
