import { getBreakpoint, getDrawerID, getDrawerElements } from "../src/js/helpers";

const markup = `
  <div class="drawer__wrapper">
    <div id="drawer" class="drawer">
      <div class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div class="drawer missing-id">...</div>
    <div id="drawer-missing-dialog" class="drawer missing-dialog">...</div>
    <div class="drawer__main">
      <button data-drawer-open="drawer">...</button>
      <button data-drawer-close="drawer">...</button>
      <button class="empty" data-drawer-close>...</button>
      <button data-drawer-toggle="drawer">...</button>
    </div>
  </div>
`;

const markupBreakpoint = `
  <div id="drawer-1" class="drawer" data-drawer-breakpoint="600px">...</div>
  <div id="drawer-2" class="drawer" data-drawer-breakpoint="md">...</div>
  <div id="drawer-3" class="drawer" data-drawer-breakpoint="lg">...</div>
`;

const mockObj = {
  settings: {
    dataOpen: "drawer-open",
    dataClose: "drawer-close",
    dataToggle: "drawer-toggle",
    dataBreakpoint: "drawer-breakpoint",
    selectorDrawer: ".drawer",
    selectorDialog: ".drawer__dialog",
    breakpoints: {
      "md": "700px"
    }
  }
};

describe("getBreakpoint()", () => {
  beforeAll(() => {
    document.body.innerHTML = markupBreakpoint;
    document.body.style.setProperty("--breakpoint-lg", "800px");
    document.body.style.setProperty("--vrembem-breakpoint-lg", "900px");
  });

  it("should return a fixed breakpoint value", () => {
    const el = document.querySelector("#drawer-1");
    const result = getBreakpoint.call(mockObj, el);
    expect(result).toBe("600px");
  });

  it("should return a breakpoint reference from object property", () => {
    const el = document.querySelector("#drawer-2");
    const result = getBreakpoint.call(mockObj, el);
    expect(result).toBe("700px");
  });

  it("should return a breakpoint from a CSS variable", () => {
    const el = document.querySelector("#drawer-3");
    const result = getBreakpoint.call(mockObj, el);
    expect(result).toBe("800px");
  });

  it("should return a breakpoint from a CSS variable with prefix", () => {
    document.body.style.setProperty("--vrembem-variable-prefix", "vrembem-");
    const el = document.querySelector("#drawer-3");
    const result = getBreakpoint.call(mockObj, el);
    expect(result).toBe("900px");
  });
});

describe("getDrawerID()", () => {
  beforeAll(() => {
    document.body.innerHTML = markup;
  });

  it("should return the string if a string is passed", () => {
    const result = getDrawerID("asdf");
    expect(result).toBe("asdf");
  });

  it("should return the id property of an object", () => {
    const result = getDrawerID({ id: "asdf" });
    expect(result).toBe("asdf");
  });

  it("should return the resolved id of a data-drawer-open button", () => {
    const el = document.querySelector("[data-drawer-open]");
    const result = getDrawerID.call(mockObj, el);
    expect(result).toBe("drawer");
  });

  it("should return the resolved id of a data-drawer-close button", () => {
    const el = document.querySelector("[data-drawer-close=\"drawer\"]");
    const result = getDrawerID.call(mockObj, el);
    expect(result).toBe("drawer");
  });

  it("should return the resolved id of a data-drawer-toggle button", () => {
    const el = document.querySelector("[data-drawer-toggle]");
    const result = getDrawerID.call(mockObj, el);
    expect(result).toBe("drawer");
  });

  it("should return the resolved id of a passed drawer", () => {
    const el = document.querySelector(".drawer");
    const result = getDrawerID.call(mockObj, el);
    expect(result).toBe("drawer");
  });

  it("should return the resolved id of a passed modal dialog", () => {
    const el = document.querySelector(".drawer__dialog");
    const result = getDrawerID.call(mockObj, el);
    expect(result).toBe("drawer");
  });

  it("should return false if passed HTML element has no ID", () => {
    const el = document.querySelector(".missing-id");
    const result = getDrawerID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it("should return false if passed HTML element does not match a selector", () => {
    const el = document.querySelector(".drawer__wrapper");
    const result = getDrawerID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it("should return false if passed close button is valueless", () => {
    const el = document.querySelector(".drawer [data-drawer-close]");
    const result = getDrawerID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it("should return false if pass object has no id property", () => {
    const result = getDrawerID({});
    expect(result).toBe(false);
  });
});

describe("getDrawerElements()", () => {
  beforeAll(() => {
    document.body.innerHTML = markup;
  });

  it("should return the drawer and drawer dialog elements using the passed id", () => {
    const result = getDrawerElements.call(mockObj, "drawer");
    const drawer = document.querySelector("#drawer");
    const dialog = drawer.querySelector(".drawer__dialog");
    expect(result.drawer).toBe(drawer);
    expect(result.dialog).toBe(dialog);
  });

  it("should return error if no drawer elements are found", () => {
    const func = getDrawerElements.call(mockObj, "asdf");
    expect(func.error.message).toBe("No drawer elements found using the ID: \"asdf\".");
  });

  it("should return error if no drawer dialog is found", () => {
    const el = document.querySelector(".missing-dialog");
    const func = getDrawerElements.call(mockObj, el);
    expect(func.error.message).toBe("Drawer is missing dialog element.");
  });

  it("should return error if drawer id could not be resolved", () => {
    const el = document.querySelector(".missing-id");
    const func = getDrawerElements.call(mockObj, el);
    expect(func.error.message).toBe("Could not resolve the drawer ID.");
  });
});
