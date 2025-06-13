import "@testing-library/jest-dom/vitest";
import Popover from "../index";

vi.useFakeTimers();

const markup = `
  <div id="app">
    <button id="asdf-trigger" aria-controls="asdf">...</button>
    <div id="asdf" class="popover">
      ...
    </div>
    <button id="tooltip-trigger" aria-describedby="tooltip">...</button>
    <div id="tooltip" class="popover popover_tooltip">
      ...
    </div>
    <button id="fdsa-trigger" aria-controls="fdsa">...</button>
    <div id="fdsa" class="popover" style="--vb-popover-event: hover;">
      ...
    </div>
    <button id="third" aria-controls="missing">...</button>
  </div>
`;

beforeAll(() => {
  document.body.style.setProperty("--vb-prefix", "vb-");
});

describe("register() & entry.deregister()", () => {
  it("should register a popover using the provided ID", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    const trigger = document.querySelector("#asdf-trigger");
    const target = document.querySelector("#asdf");
    await popover.register("asdf");
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].trigger).toBe(trigger);
    expect(popover.collection[0].el).toBe(target);
    trigger.click();
    vi.advanceTimersByTime(500);
    expect(popover.collection[0].el).toHaveClass("is-active");
  });

  it("should return an error if the provided id has no associated popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await expect(popover.register("missing")).rejects.toThrow(
      'Element not found with ID: "missing"'
    );
  });

  it("should attach hover event listeners when registered", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.register("fdsa");
    expect(popover.collection.length).toBe(1);
  });

  it("should attach open and close methods to registered popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.register("asdf");
    const entry = popover.get("asdf");

    await entry.open();
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-active");

    await entry.close();
    expect(entry.state).toBe("closed");
    expect(entry.el).not.toHaveClass("is-active");
  });

  it("should attach deregister method to registered popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.register("asdf");
    const entry = popover.get("asdf");
    expect(entry.id).toBe("asdf");
    await entry.deregister();
    expect(entry.id).toBe("asdf");
  });
});

describe("entry.isTooltip", () => {
  it("should return whether or not a popover is a tooltip", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    const entry1 = await popover.register("asdf");
    const entry2 = await popover.register("tooltip");
    expect(entry1.isTooltip).toBe(false);
    expect(entry2.isTooltip).toBe(true);
  });
});
