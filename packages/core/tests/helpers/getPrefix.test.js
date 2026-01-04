import { getPrefix } from "../../index";

test("should return the vrembem prefix value", () => {
  const data = getPrefix();
  expect(data).toBe("");
});

test("should return the vrembem prefix value", () => {
  document.body.style.setProperty("--vb-prefix", "vb");
  const data = getPrefix();
  expect(data).toBe("vb-");
});
