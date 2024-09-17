import "@testing-library/jest-dom/vitest";
import { delay } from "./helpers/delay";
import Popover from "../index.js";
import { handleClick, handleMouseEnter, handleMouseLeave } from "../src/js/handlers";

const keyEsc = new KeyboardEvent("keydown", {
  key: "Escape"
});

const keySpace = new KeyboardEvent("keydown", {
  key: "Space"
});

const keyTab = new KeyboardEvent("keydown", {
  key: "Tab"
});

const markup = `
  <div id="app">
    <button aria-controls="asdf">...</button>
    <div id="asdf" class="popover">
      <button class="focus-test">...</button>
    </div>
    <button aria-controls="fdsa">...</button>
    <div id="fdsa" class="popover is-active">
      ...
    </div>
  </div>
`;

const hoverMarkup = `
  <div id="app">
    <button aria-describedby="tooltip-1">...</button>
    <div id="tooltip-1" class="popover popover_tooltip">
      <button class="focus-test">...</button>
    </div>
    <button aria-describedby="tooltip-2">...</button>
    <div id="tooltip-2" class="popover popover_tooltip">
      ...
    </div>
  </div>
`;

const multiplePopover = `
  <div id="app">
    <button aria-controls="popover" aria-describedby="tooltip">
      ...
    </button>
    <div id="popover" class="popover">
      ...
    </div>
    <div id="tooltip" class="popover popover_tooltip">
      ...
    </div>
  </div>
`;

describe("handleClick()", () => {
  it("should open popover if it does not contain the active class", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection.length).toBe(2);

    handleClick.bind(popover, popover.collection[0])();
    expect(popover.collection[0].el).toHaveClass("is-active");
  });

  it("should close popover if it contains the active class", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection.length).toBe(2);

    handleClick.bind(popover, popover.collection[1])();
    expect(popover.collection[1].el).not.toHaveClass("is-active");
  });

  it("should attach document click event listener when popover is opened", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    handleClick.bind(popover, popover.collection[0])();
    expect(popover.collection[0].el).toHaveClass("is-active");
    expect(popover.collection[1].el).toHaveClass("is-active");

    document.querySelector("#app").click();
    await delay();

    expect(popover.collection[0].el).not.toHaveClass("is-active");
    expect(popover.collection[1].el).not.toHaveClass("is-active");
  });

  it("should properly clear toggle delay if one exists on click", async () => {
    document.body.innerHTML = multiplePopover;
    const popover = new Popover();
    await popover.mount();

    const trigger = document.querySelector("button");
    const entry1 = popover.get("popover");
    const entry2 = popover.get("tooltip");

    const event = new Event("mouseenter");
    handleMouseEnter.bind(popover, entry2, event)();
    trigger.click();
    await delay(100);
    
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(entry1.state).toBe("opened");
    expect(entry2.state).toBe("closed");
  });
});

describe("handleMouseEnter() & handleMouseLeave()", () => {
  it("should open tooltip when handleMouseEnter() is run", async () => {
    document.body.innerHTML = hoverMarkup;
    const popover = new Popover();
    await popover.mount();

    const entry = popover.get("tooltip-1");
    expect(entry.isTooltip).toBe(true);
    expect(entry.state).toBe("closed");

    const event = new Event("mouseenter");
    handleMouseEnter.bind(popover, entry, event)();
    await delay();
    expect(entry.state).toBe("opened");
  });

  it("should close tooltip when handleMouseLeave() is run", async () => {
    document.body.innerHTML = hoverMarkup;
    const popover = new Popover();
    await popover.mount();

    const entry = popover.get("tooltip-2");
    expect(entry.isTooltip).toBe(true);
    entry.open();
    expect(entry.state).toBe("opened");

    handleMouseLeave.bind(popover, entry)();
    await delay(100); // Not sure why this is needed.
    expect(entry.state).toBe("closed");
  });

  it("should correctly clear timeout when multiple enter/leave events are run", async () => {
    document.body.innerHTML = hoverMarkup;
    const popover = new Popover();
    await popover.mount();

    const entry1 = popover.get("tooltip-1");
    const entry2 = popover.get("tooltip-2");

    const event = new Event("mouseenter");
    handleMouseEnter.bind(popover, entry1, event)();
    handleMouseEnter.bind(popover, entry2, event)();
    await delay();
    handleMouseLeave.bind(popover, entry1, event)();
    await delay();
    handleMouseEnter.bind(popover, entry2, event)();
    await delay();

    expect(entry1.state).toBe("closed");
    expect(entry2.state).toBe("opened");

    handleMouseLeave.bind(popover, entry2)();
    await delay(100);

    expect(entry2.state).toBe("closed");
  });

  it("should not open tooltip if a popover for a trigger is already open", async () => {
    document.body.innerHTML = multiplePopover;
    const popover = new Popover();
    await popover.mount();

    const trigger = document.querySelector("button");
    const entry1 = popover.get("popover");
    const entry2 = popover.get("tooltip");

    trigger.click();
    await delay(100);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(entry1.state).toBe("opened");
    expect(entry2.state).toBe("closed");

    const event = new Event("mouseenter");
    handleMouseEnter.bind(popover, entry2, event)();
    await delay(100);

    expect(entry1.state).toBe("opened");
    expect(entry2.state).toBe("closed");
  });

  it("should guard against focus if the trigger is not focus-visible", async () => {
    document.body.innerHTML = multiplePopover;
    const popover = new Popover();
    await popover.mount();

    const entry1 = popover.get("popover");
    const entry2 = popover.get("tooltip");

    const event = new Event("focus");
    handleMouseEnter.bind(popover, entry2, event)();
    await delay(100);

    expect(entry1.state).toBe("closed");
    expect(entry2.state).toBe("closed");
  });
});

describe("handlerKeydown()", () => {
  it("should close open popover when escape key is pressed", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection[1].el).toHaveClass("is-active");
    document.dispatchEvent(keyEsc);
    await delay();
    expect(popover.collection[1].el).not.toHaveClass("is-active");
  });

  it("should do nothing when a non-escape key is pressed", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection[1].el).toHaveClass("is-active");
    document.dispatchEvent(keySpace);
    await delay();
    expect(popover.collection[1].el).toHaveClass("is-active");
  });

  it("should return focus to the trigger element when escape key is pressed", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const button = document.querySelector(".focus-test");

    expect(popover.trigger).toBe(null);
    popover.collection[0].trigger.click();
    expect(popover.trigger).toBe(popover.collection[0].trigger);

    button.focus();
    expect(document.activeElement).toBe(button);

    document.dispatchEvent(keyEsc);
    await delay();

    expect(document.activeElement).toBe(popover.collection[0].trigger);
    expect(popover.trigger).toBe(null);
  });

  it("should run close check when the tab key is pressed", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection.length).toBe(2);
    expect(popover.collection[1].el).toHaveClass("is-active");
    document.dispatchEvent(keyTab);
    await delay();
    expect(popover.collection[1].el).not.toHaveClass("is-active");
  });
});

describe("documentClick()", () => {
  it("should close other popover instances when a new one is toggled", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection[0].el).not.toHaveClass("is-active");
    expect(popover.collection[1].el).toHaveClass("is-active");

    popover.collection[0].trigger.click();

    expect(popover.collection[0].el).toHaveClass("is-active");
    expect(popover.collection[1].el).not.toHaveClass("is-active");
  });

  it("should remove document event listener when popover is closed", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection[0].el).not.toHaveClass("is-active");
    expect(popover.collection[1].el).toHaveClass("is-active");

    popover.collection[1].trigger.click();

    expect(popover.collection[0].el).not.toHaveClass("is-active");
    expect(popover.collection[1].el).not.toHaveClass("is-active");
  });
});
