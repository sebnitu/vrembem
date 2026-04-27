import "@testing-library/jest-dom/vitest";
import { PopoverCollection } from "../index";

vi.useFakeTimers();

const markup = `
  <button aria-controls="asdf">...</button>
  <div id="asdf" class="popover">...</div>
  <button aria-controls="fdsa">...</button>
  <div id="fdsa" class="popover">...</div>
  <button aria-describedby="tooltip">...</button>
  <div id="tooltip" class="popover popover_tooltip">...</div>
`;

describe("mount() & unmount()", () => {
  it("should mount the popover module when mount is run", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();
    expect(popovers.collection.length).toBe(3);
  });

  it("running mount multiple times should not create duplicates in collection", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();
    await popovers.mount();
    expect(popovers.collection.length).toBe(3);
  });

  it("should be able to pass options through updateConfig method", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection({ selector: ".asdf" });
    expect(popovers.config.selector).toBe(".asdf");
    popovers.updateConfig({ selector: ".popover" });
    await popovers.mount();
    expect(popovers.config.selector).toBe(".popover");
  });

  it("should remove all event listeners and clear collection", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    expect(popovers.collection.length).toBe(3);
    await popovers.unmount();
    expect(popovers.collection.length).toBe(0);
    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).not.toHaveClass("is-active");
  });

  it("should close open popovers when before being unmounted", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();
    const entry = await popovers.get("asdf");
    await entry.open();
    await popovers.unmount();
    const el = document.getElementById("asdf");
    expect(el).not.toHaveClass("is-active");
  });
});

describe("register() & deregister()", () => {
  it("should be able to manually register a popover", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();

    expect(popovers.collection.length).toBe(0);

    const el = document.querySelector(".popover");
    const trigger = document.querySelector("button");

    await popovers.register(await popovers.createEntry(el));
    expect(popovers.collection.length).toBe(1);
    expect(popovers.collection[0].el).toBe(el);
    expect(popovers.collection[0].trigger).toBe(trigger);
  });

  it("should be able to manually deregister a popover", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();

    expect(popovers.collection.length).toBe(3);
    await popovers.deregister(popovers.collection[0]);
    expect(popovers.collection.length).toBe(2);
  });
});

describe("open() & close()", () => {
  it("should open the provided popover", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();

    const target = document.querySelector(".popover");

    expect(target).not.toHaveClass("is-active");
    await popovers.open(popovers.collection[0].id);
    expect(target).toHaveClass("is-active");
  });

  it("should close the provided popover", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();

    const target = document.querySelector(".popover");

    await popovers.open(popovers.collection[0].id);
    await popovers.close(popovers.collection[0].id);
    expect(target).not.toHaveClass("is-active");
  });

  it("should close all popovers", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();

    for (const item of popovers.collection) {
      await popovers.open(item.id);
    }

    for (const item of popovers.collection) {
      expect(item.state).toBe("opened");
      expect(item.el).toHaveClass("is-active");
    }

    await popovers.close();

    for (const item of popovers.collection) {
      expect(item.state).toBe("closed");
      expect(item.el).not.toHaveClass("is-active");
    }
  });

  it("should reject promise with error when open is run on popover it could not find", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();

    let catchError = false;
    await popovers.open("missing").catch((error) => {
      expect(error.message).toBe(
        'Popover entry not found in collection with id of "missing"'
      );
      catchError = true;
    });
    expect(catchError).toBe(true);
  });

  it("should reject promise with error when close is run on popover it could not find", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();

    let catchError = false;
    await popovers.close("missing").catch((error) => {
      expect(error.message).toBe(
        'Popover entry not found in collection with id of "missing"'
      );
      catchError = true;
    });
    expect(catchError).toBe(true);
  });
});

describe("active() & activeHover()", () => {
  it("should return the active popover when popovers.active is called", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();
    expect(popovers.active).toBe(undefined);
    await popovers.get("asdf").open();
    expect(popovers.active).toBe(popovers.get("asdf"));
  });

  it("should return the active tooltip popover when popovers.activeHover is called", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();
    expect(popovers.activeHover).toBe(undefined);
    await popovers.get("tooltip").open();
    expect(popovers.activeHover).toBe(popovers.get("tooltip"));
  });
});
