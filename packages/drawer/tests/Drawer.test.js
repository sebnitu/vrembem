import "@testing-library/jest-dom/vitest";
import {
  installMatchMedia,
  resetMatchMedia,
  resizeWindow
} from "./helpers/matchMedia";
import { setBreakpointVars } from "./helpers/setBreakpointVars";

installMatchMedia();

import { Drawer } from "../index";

function mount(html, width = 1024) {
  window.innerWidth = width;
  document.body.innerHTML = html;
  return document.body.firstElementChild;
}

beforeEach(() => {
  resetMatchMedia();
  document.body.innerHTML = "";
  document.body.removeAttribute("style");
  window.innerWidth = 1024;
});

describe("registration", () => {
  it("should register the <vb-drawer> custom element", () => {
    expect(customElements.get("vb-drawer")).toBe(Drawer);
  });

  it("should instantiate as a Drawer when placed in the DOM", () => {
    const el = mount(`<vb-drawer id="d1"></vb-drawer>`);
    expect(el).toBeInstanceOf(Drawer);
  });
});

describe("connectedCallback()", () => {
  it("should create an internal <dialog> element", () => {
    const el = mount(`<vb-drawer id="d1"></vb-drawer>`);
    const dialog = el.querySelector("dialog");
    expect(dialog).not.toBeNull();
    expect(el.drawerModal).toBe(dialog);
  });

  it("should assign the dialog an id of `[id]-modal`", () => {
    const el = mount(`<vb-drawer id="my-drawer"></vb-drawer>`);
    expect(el.drawerModal.id).toBe("my-drawer-modal");
  });

  it("should set closedby='any' on the dialog", () => {
    const el = mount(`<vb-drawer id="d1"></vb-drawer>`);
    expect(el.drawerModal.getAttribute("closedby")).toBe("any");
  });

  it("should apply the modal, modal--drawer, and panel classes to the dialog", () => {
    const el = mount(`<vb-drawer id="d1"></vb-drawer>`);
    expect(el.drawerModal).toHaveClass("modal");
    expect(el.drawerModal).toHaveClass("modal--drawer");
    expect(el.drawerModal).toHaveClass("panel");
  });

  it("should add a panel__container child to the dialog", () => {
    const el = mount(`<vb-drawer id="d1"></vb-drawer>`);
    const container = el.drawerModal.querySelector(".panel__container");
    expect(container).not.toBeNull();
    expect(el.drawerContainer).toBe(container);
  });

  it("should apply the position modifier from the attribute", () => {
    const el = mount(`<vb-drawer id="d1" position="right"></vb-drawer>`);
    expect(el.drawerModal).toHaveClass("modal--pos-right");
  });

  it("should fall back to 'left' when no position attribute or default is set", () => {
    const el = mount(`<vb-drawer id="d1"></vb-drawer>`);
    expect(el.drawerModal).toHaveClass("modal--pos-left");
  });

  it("should throw when no id attribute is provided", () => {
    const el = new Drawer();
    expect(() => {
      el.connectedCallback();
    }).toThrow('<vb-drawer> failed to initialize: "id" attribute is required.');
  });
});

describe("breakpoint parsing", () => {
  it("should resolve named breakpoint tokens from CSS custom properties", () => {
    setBreakpointVars();
    const el = mount(`<vb-drawer id="d1" breakpoint="md"></vb-drawer>`);
    expect(el.breakpoint).toBe("760px");
  });

  it("should treat unitless numbers as pixel values", () => {
    const el = mount(`<vb-drawer id="d1" breakpoint="600"></vb-drawer>`);
    expect(el.breakpoint).toBe("600px");
  });

  it("should pass CSS length values through unchanged", () => {
    const el = mount(`<vb-drawer id="d1" breakpoint="48rem"></vb-drawer>`);
    expect(el.breakpoint).toBe("48rem");
  });

  it("should fall back to 760px when no attribute or default is provided", () => {
    const el = mount(`<vb-drawer id="d1"></vb-drawer>`);
    expect(el.breakpoint).toBe("760px");
  });
});

describe("layout switching", () => {
  it("should render children inline when above the breakpoint", () => {
    const el = mount(
      `<vb-drawer id="d1" breakpoint="600"><p id="child">hi</p></vb-drawer>`,
      1024
    );
    expect(el).not.toHaveClass("is-modal");
    expect(document.getElementById("child").parentElement).toBe(el);
    expect(el.drawerContainer.children.length).toBe(0);
  });

  it("should move children into the dialog when below the breakpoint", () => {
    const el = mount(
      `<vb-drawer id="d1" breakpoint="600"><p id="child">hi</p></vb-drawer>`,
      400
    );
    expect(el).toHaveClass("is-modal");
    expect(document.getElementById("child").parentElement).toBe(
      el.drawerContainer
    );
  });

  it("should move children back out when transitioning above the breakpoint", () => {
    const el = mount(
      `<vb-drawer id="d1" breakpoint="600"><p id="child">hi</p></vb-drawer>`,
      400
    );
    expect(document.getElementById("child").parentElement).toBe(
      el.drawerContainer
    );

    resizeWindow(1024);

    expect(el).not.toHaveClass("is-modal");
    expect(document.getElementById("child").parentElement).toBe(el);
  });

  it("should move children into the dialog when transitioning below the breakpoint", () => {
    const el = mount(
      `<vb-drawer id="d1" breakpoint="600"><p id="child">hi</p></vb-drawer>`,
      1024
    );
    expect(document.getElementById("child").parentElement).toBe(el);

    resizeWindow(400);

    expect(el).toHaveClass("is-modal");
    expect(document.getElementById("child").parentElement).toBe(
      el.drawerContainer
    );
  });

  it("should close the dialog when transitioning back above the breakpoint if it was open", () => {
    const el = mount(
      `<vb-drawer id="d1" breakpoint="600"><p>content</p></vb-drawer>`,
      400
    );
    el.drawerModal.setAttribute("open", "");
    const close = vi.fn(function () {
      this.removeAttribute("open");
    });
    el.drawerModal.close = close;

    resizeWindow(1024);

    expect(close).toHaveBeenCalled();
    expect(el.drawerModal.hasAttribute("open")).toBe(false);
  });
});

describe("isModal getter", () => {
  it("should be true when below the breakpoint", () => {
    const el = mount(`<vb-drawer id="d1" breakpoint="600"></vb-drawer>`, 400);
    expect(el.isModal).toBe(true);
  });

  it("should be false when above the breakpoint", () => {
    const el = mount(`<vb-drawer id="d1" breakpoint="600"></vb-drawer>`, 1024);
    expect(el.isModal).toBe(false);
  });
});

describe("attributeChangedCallback()", () => {
  it("should re-run media query setup when breakpoint changes", () => {
    const el = mount(
      `<vb-drawer id="d1" breakpoint="600"><p id="child">hi</p></vb-drawer>`,
      500
    );
    expect(el).toHaveClass("is-modal");

    el.setAttribute("breakpoint", "400");

    expect(el.breakpoint).toBe("400px");
    expect(el).not.toHaveClass("is-modal");
    expect(document.getElementById("child").parentElement).toBe(el);
  });

  it("should swap the position modifier when position changes", () => {
    const el = mount(`<vb-drawer id="d1" position="left"></vb-drawer>`);
    expect(el.drawerModal).toHaveClass("modal--pos-left");

    el.setAttribute("position", "right");

    expect(el.drawerModal).not.toHaveClass("modal--pos-left");
    expect(el.drawerModal).toHaveClass("modal--pos-right");
  });

  it("should ignore attribute changes with identical old and new values", () => {
    const el = mount(`<vb-drawer id="d1" position="left"></vb-drawer>`);
    const spy = vi.spyOn(el, "applyPosition");
    el.setAttribute("position", "left");
    expect(spy).not.toHaveBeenCalled();
  });
});

describe("disconnectedCallback()", () => {
  it("should remove the media query change listener when the element is removed", () => {
    const el = mount(`<vb-drawer id="d1" breakpoint="600"></vb-drawer>`, 1024);
    const mql = el.mqList;
    const removeSpy = vi.spyOn(mql, "removeEventListener");

    el.remove();

    expect(removeSpy).toHaveBeenCalledWith("change", el.mqHandler);
    expect(el.mqList).toBeNull();
  });
});
