import { getBreakpoint } from "../src/js/helpers";

const markup = `
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
    document.body.innerHTML = markup;
    document.body.style.setProperty("--breakpoint-lg", "800px");
    document.body.style.setProperty("--asdf-breakpoint-lg", "900px");
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
    document.body.style.setProperty("--vb-prefix", "asdf-");
    const el = document.querySelector("#drawer-3");
    const result = getBreakpoint.call(mockObj, el);
    expect(result).toBe("900px");
  });
});
