import { getElement } from "../../index";

document.body.innerHTML = `
  <div id="asdf"></div>
`;

test("should return an HTML element with the provided ID", () => {
  const el = getElement("asdf");
  expect(el instanceof HTMLElement).toBe(true);
});

test("should throw if the element is not found with the provided ID", () => {
  expect(() => getElement("does-not-exist")).toThrow(
    'Element not found with ID: "does-not-exist"'
  );
});

test("should throw if an HTMLElement is provided without an id", () => {
  const el = document.createElement("div");
  expect(() => getElement(el)).toThrow("HTMLElement must have an ID");
});

test("should throw if the provided argument isn't valid", () => {
  expect(() => getElement(64)).toThrow(
    "Invalid argument: query must be a string or HTMLElement"
  );
});
