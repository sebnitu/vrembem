import { getElement } from "../../index";

document.body.innerHTML = `
  <div id="asdf"></div>
`;

test("should return an HTML element with the provided ID", () => {
  const el = getElement("asdf");
  expect(el instanceof HTMLElement).toBe(true);
});

test("should return an HTML element if an HTML element is provided", () => {
  const el = document.getElementById("asdf");
  expect(getElement(el)).toEqual(el);
});

test("should return undefined if the provided argument isn't valid", () => {
  expect(getElement(64)).toBe(null);
});
