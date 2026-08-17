import "@testing-library/jest-dom/vitest";

import { Popover } from "../src/register";

function mount(html) {
  document.body.innerHTML = html;
  return document.body.firstElementChild;
}

function dispatchToggle(el, newState) {
  const event = new Event("toggle");
  Object.defineProperty(event, "newState", {
    configurable: true,
    value: newState
  });
  el.dispatchEvent(event);
}

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("registration", () => {
  it("should register the <vb-popover> custom element", () => {
    expect(customElements.get("vb-popover")).toBe(Popover);
  });

  it("should instantiate as a Popover when placed in the DOM", () => {
    const el = mount(`<vb-popover></vb-popover>`);
    expect(el).toBeInstanceOf(Popover);
  });
});

describe("connectedCallback()", () => {
  it("should store the trigger, popover, and tooltip elements", () => {
    const el = mount(`
      <vb-popover>
        <button popovertarget="popover-1" interestfor="tooltip-1">Trigger</button>
        <div id="popover-1" popover></div>
        <div id="tooltip-1" popover="hint"></div>
      </vb-popover>
    `);

    expect(el.triggerEl).toBe(el.querySelector("button"));
    expect(el.popoverEl).toBe(document.getElementById("popover-1"));
    expect(el.tooltipEl).toBe(document.getElementById("tooltip-1"));
    expect(el.tooltipId).toBe("tooltip-1");
  });

  it("should bind the toggle listener to the popover element", () => {
    const addEventListener = vi.spyOn(
      HTMLElement.prototype,
      "addEventListener"
    );

    const el = mount(`
      <vb-popover>
        <button popovertarget="popover-1" interestfor="tooltip-1">Trigger</button>
        <div id="popover-1" popover></div>
        <div id="tooltip-1" popover="hint"></div>
      </vb-popover>
    `);

    expect(addEventListener).toHaveBeenCalledWith("toggle", el.onToggle);
  });

  it("should return early when no trigger has both popovertarget and interestfor", () => {
    const el = mount(`
      <vb-popover>
        <button popovertarget="popover-1">Trigger</button>
        <div id="popover-1" popover></div>
        <div id="tooltip-1" popover="hint"></div>
      </vb-popover>
    `);

    expect(el.triggerEl).toBeNull();
    expect(el.popoverEl).toBeNull();
    expect(el.tooltipEl).toBeNull();
    expect(el.tooltipId).toBeNull();
  });

  it("should return early when the referenced popover does not exist", () => {
    const el = mount(`
      <vb-popover>
        <button popovertarget="popover-1" interestfor="tooltip-1">Trigger</button>
        <div id="tooltip-1" popover="hint"></div>
      </vb-popover>
    `);

    expect(el.triggerEl).toBe(el.querySelector("button"));
    expect(el.tooltipEl).toBe(el.querySelector('[popover="hint"]'));
    expect(el.popoverEl).toBeNull();
    expect(el.tooltipId).toBeNull();
  });

  it("should return early when the referenced tooltip does not exist", () => {
    const el = mount(`
      <vb-popover>
        <button popovertarget="popover-1" interestfor="tooltip-1">Trigger</button>
        <div id="popover-1" popover></div>
      </vb-popover>
    `);

    expect(el.triggerEl).toBe(el.querySelector("button"));
    expect(el.popoverEl).toBe(document.getElementById("popover-1"));
    expect(el.tooltipEl).toBeNull();
    expect(el.tooltipId).toBeNull();
  });
});

describe("onToggle()", () => {
  it("should remove interestfor and hide the tooltip when the popover opens", () => {
    const el = mount(`
      <vb-popover>
        <button popovertarget="popover-1" interestfor="tooltip-1">Trigger</button>
        <div id="popover-1" popover></div>
        <div id="tooltip-1" popover="hint"></div>
      </vb-popover>
    `);
    const hidePopover = vi.fn();
    el.tooltipEl.hidePopover = hidePopover;

    dispatchToggle(el.popoverEl, "open");

    expect(el.triggerEl.hasAttribute("interestfor")).toBe(false);
    expect(hidePopover).toHaveBeenCalled();
  });

  it("should restore interestfor when the popover closes", () => {
    const el = mount(`
      <vb-popover>
        <button popovertarget="popover-1" interestfor="tooltip-1">Trigger</button>
        <div id="popover-1" popover></div>
        <div id="tooltip-1" popover="hint"></div>
      </vb-popover>
    `);

    dispatchToggle(el.popoverEl, "open");
    dispatchToggle(el.popoverEl, "closed");

    expect(el.triggerEl.getAttribute("interestfor")).toBe("tooltip-1");
  });

  it("should do nothing if the required element references are missing", () => {
    const el = new Popover();
    expect(() => {
      el.onToggle({ newState: "open" });
    }).not.toThrow();
  });
});

describe("disconnectedCallback()", () => {
  it("should remove the toggle listener from the popover element", () => {
    const el = mount(`
      <vb-popover>
        <button popovertarget="popover-1" interestfor="tooltip-1">Trigger</button>
        <div id="popover-1" popover></div>
        <div id="tooltip-1" popover="hint"></div>
      </vb-popover>
    `);
    const removeEventListener = vi.spyOn(el.popoverEl, "removeEventListener");

    el.remove();

    expect(removeEventListener).toHaveBeenCalledWith("toggle", el.onToggle);
  });
});
