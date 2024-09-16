import Checkbox from "../index.js";

let checkbox;

const markupSingle = `
  <input type="checkbox" aria-checked="mixed">
`;

const markupMulti = `
  <input type="checkbox" aria-checked="mixed">
  <input type="checkbox" aria-checked="mixed">
  <input type="checkbox" aria-checked="mixed">
`;

afterEach(() => {
  checkbox.destroy();
  checkbox = null;
  document.body.innerHTML = null;
});

test("set checkboxes to indeterminate on init", () => {
  document.body.innerHTML = markupSingle;
  checkbox = new Checkbox();
  const input = document.querySelector("[type=\"checkbox\"]");

  checkbox.init();
  expect(input.indeterminate).toBe(true);
});

test("should allow for passing options on init method call", () => {
  checkbox = new Checkbox({ stateValue: "OnNew" });
  checkbox.init({ stateValue: "OnInit" });
  expect(checkbox.settings.stateValue).toBe("OnInit");
});

test("click event removes aria checked attribute", () => {
  document.body.innerHTML = markupSingle;
  checkbox = new Checkbox({ autoInit: true });
  const input = document.querySelector("[type=\"checkbox\"]");

  expect(input.hasAttribute("aria-checked")).toBe(true);
  expect(input.indeterminate).toBe(true);
  input.click();
  expect(input.hasAttribute("aria-checked")).toBe(false);
  expect(input.indeterminate).toBe(false);
});

test("should do nothing if clicked checkbox doesn't match selector", () => {
  document.body.innerHTML = "<input type=\"checkbox\">";
  checkbox = new Checkbox({ autoInit: true });
  checkbox.removeAriaState = jest.fn();
  checkbox.setIndeterminate = jest.fn();
  const el = document.querySelector("[type=\"checkbox\"]");

  el.click();
  expect(checkbox.removeAriaState).not.toHaveBeenCalled();
  expect(checkbox.setIndeterminate).not.toHaveBeenCalled();
});

test("destroy should remove event listener", () => {
  document.body.innerHTML = markupSingle;
  checkbox = new Checkbox({ autoInit: true });
  const input = document.querySelector("[type=\"checkbox\"]");

  checkbox.destroy();
  input.click();
  expect(input.hasAttribute("aria-checked")).toBe(true);
});

test("set aria checked state attribute", () => {
  document.body.innerHTML = "<input type=\"checkbox\">";
  checkbox = new Checkbox({ autoInit: true });
  const input = document.querySelector("[type=\"checkbox\"]");

  expect(input.hasAttribute("aria-checked")).toBe(false);
  expect(input.indeterminate).toBe(false);

  checkbox.setAriaState(input);
  expect(input.hasAttribute("aria-checked")).toBe(true);
  expect(input.indeterminate).toBe(false);
});

test("set aria checked state attribute on multiple checkboxes", () => {
  document.body.innerHTML = `
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
  `;
  checkbox = new Checkbox({ autoInit: true });
  const inputs = document.querySelectorAll("[type=\"checkbox\"]");

  inputs.forEach((el) => {
    expect(el.hasAttribute("aria-checked")).toBe(false);
    expect(el.indeterminate).toBe(false);
  });

  checkbox.setAriaState(inputs);
  inputs.forEach((el) => {
    expect(el.hasAttribute("aria-checked")).toBe(true);
    expect(el.indeterminate).toBe(false);
  });
});

test("remove aria checked state attribute", () => {
  document.body.innerHTML = markupSingle;
  checkbox = new Checkbox({ autoInit: true });
  const input = document.querySelector("[type=\"checkbox\"]");

  expect(input.hasAttribute("aria-checked")).toBe(true);
  expect(input.indeterminate).toBe(true);

  checkbox.removeAriaState(input);
  expect(input.hasAttribute("aria-checked")).toBe(false);
  expect(input.indeterminate).toBe(true);
});

test("remove aria checked state attribute from multiple checkboxes", () => {
  document.body.innerHTML = markupMulti;
  checkbox = new Checkbox({ autoInit: true });
  const inputs = document.querySelectorAll("[type=\"checkbox\"]");

  inputs.forEach((el) => {
    expect(el.hasAttribute("aria-checked")).toBe(true);
    expect(el.indeterminate).toBe(true);
  });

  checkbox.removeAriaState(inputs);
  inputs.forEach((el) => {
    expect(el.hasAttribute("aria-checked")).toBe(false);
    expect(el.indeterminate).toBe(true);
  });
});

test("set indeterminate based on state attribute", () => {
  document.body.innerHTML = markupSingle;
  checkbox = new Checkbox({ autoInit: true });
  const input = document.querySelector("[type=\"checkbox\"]");

  expect(input.hasAttribute("aria-checked")).toBe(true);
  expect(input.indeterminate).toBe(true);

  checkbox.removeAriaState(input);
  checkbox.setIndeterminate(input);
  expect(input.hasAttribute("aria-checked")).toBe(false);
  expect(input.indeterminate).toBe(false);
});

test("custom options are passed and used properly", () => {
  document.body.innerHTML = `
    <input type="checkbox" data-status="indeterminate">
  `;
  checkbox = new Checkbox({
    stateAttr: "data-status",
    stateValue: "indeterminate"
  });
  const input = document.querySelector("[type=\"checkbox\"]");

  checkbox.init();
  expect(input.hasAttribute("data-status")).toBe(true);
  expect(input.indeterminate).toBe(true);

  checkbox.removeAriaState(input);
  checkbox.setIndeterminate(input);
  expect(input.hasAttribute("data-status")).toBe(false);
  expect(input.indeterminate).toBe(false);

  checkbox.setAriaState(input);
  checkbox.setIndeterminate(input);
  expect(input.hasAttribute("data-status")).toBe(true);
  expect(input.indeterminate).toBe(true);
});
