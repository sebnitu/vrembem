import "@testing-library/jest-dom/vitest";
import Popover from "../index";

vi.useFakeTimers();

const keyEsc = new KeyboardEvent("keydown", {
  key: "Escape"
});

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
    const popover = new Popover();
    await popover.mount();
    expect(popover.collection.length).toBe(3);
  });

  it("should auto mount the popover module autoMount is set to true", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    expect(popover.collection.length).toBe(3);
  });

  it("running mount multiple times should not create duplicates in collection", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    await popover.mount();
    expect(popover.collection.length).toBe(3);
  });

  it("should not attach keyboard event listener if eventListeners is set to false", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover({
      eventListeners: false
    });
    await popover.mount();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).toHaveClass("is-active");
    document.dispatchEvent(keyEsc);
    expect(target).toHaveClass("is-active");
  });

  it("should be able to pass options through mount method", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover({ selectorPopover: ".asdf" });
    expect(popover.settings.selectorPopover).toBe(".asdf");
    await popover.mount({ selectorPopover: ".popover" });
    expect(popover.settings.selectorPopover).toBe(".popover");
  });

  it("should remove all event listeners and clear collection", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    expect(popover.collection.length).toBe(3);
    await popover.unmount();
    expect(popover.collection.length).toBe(0);
    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).not.toHaveClass("is-active");
  });
});

describe("mountEventListeners() & unmountEventListeners()", () => {
  it("should remove event listeners", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    popover.unmountEventListeners();

    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).not.toHaveClass("is-active");
  });

  it("should re-mount event listeners", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    popover.unmountEventListeners();
    popover.mountEventListeners();

    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).toHaveClass("is-active");
  });

  it("should remove keyboard event listener", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).toHaveClass("is-active");

    popover.unmountEventListeners();

    document.dispatchEvent(keyEsc);
    expect(target).toHaveClass("is-active");
  });

  it("should re-mount keyboard event listener", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).toHaveClass("is-active");

    popover.unmountEventListeners();
    popover.mountEventListeners();

    document.dispatchEvent(keyEsc);
    expect(target).not.toHaveClass("is-active");
  });
});

describe("register() & deregister()", () => {
  it("should be able to manually register a popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();

    expect(popover.collection.length).toBe(0);

    const el = document.querySelector(".popover");
    const trigger = document.querySelector("button");

    await popover.register(trigger);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].el).toBe(el);
    expect(popover.collection[0].trigger).toBe(trigger);
  });

  it("should be able to manually deregister a popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection.length).toBe(3);
    await popover.deregister(popover.collection[0]);
    expect(popover.collection.length).toBe(2);

    const el = document.querySelector(".popover");
    const trigger = document.querySelector("button");

    trigger.click();
    vi.advanceTimersByTime(500);
    expect(el).not.toHaveClass("is-active");
  });

  it("should reject promise with error if deregister is called on non-existent entry", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    const result = await popover.deregister("fake-id").catch((error) => { return error.message; });
    expect(result).toBe("Failed to deregister; popover does not exist in collection with ID of: \"fake-id\".");
  });
});

describe("registerCollection() & deregisterCollection()", () => {
  it("should remove all items from collection and close open popovers", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");
    trigger.click();

    expect(popover.collection.length).toBe(3);
    expect(target).toHaveClass("is-active");

    await popover.deregisterCollection();

    expect(popover.collection.length).toBe(0);
    expect(target).not.toHaveClass("is-active");
  });

  it("should register all items into collection and add their event listeners", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");
    const items = document.querySelectorAll(".popover");

    expect(popover.collection.length).toBe(0);
    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).not.toHaveClass("is-active");

    await popover.registerCollection(items);

    expect(popover.collection.length).toBe(3);
    trigger.click();
    vi.advanceTimersByTime(500);
    expect(target).toHaveClass("is-active");
  });
});

describe("open() & close()", () => {
  it("should open the provided popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const target = document.querySelector(".popover");

    expect(target).not.toHaveClass("is-active");
    await popover.open(popover.collection[0].id);
    expect(target).toHaveClass("is-active");
  });

  it("should close the provided popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    const target = document.querySelector(".popover");

    await popover.open(popover.collection[0].id);
    await popover.close(popover.collection[0].id);
    expect(target).not.toHaveClass("is-active");
  });

  it("should close all popovers", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    popover.collection.forEach(async (item) => {
      await popover.open(item.id);
    });

    popover.collection.forEach((item) => {
      expect(item.state).toBe("opened");
      expect(item.el).toHaveClass("is-active");
    });

    await popover.close();

    popover.collection.forEach((item) => {
      expect(item.state).toBe("closed");
      expect(item.el).not.toHaveClass("is-active");
    });
  });

  it("should reject promise with error when open is run on popover it could not find", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    let catchError = false;
    await popover.open("missing").catch((error) => {
      expect(error.message).toBe("Popover not found in collection with id of \"missing\".");
      catchError = true;
    });
    expect(catchError).toBe(true);
  });

  it("should reject promise with error when close is run on popover it could not find", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    let catchError = false;
    await popover.close("missing").catch((error) => {
      expect(error.message).toBe("Popover not found in collection with id of \"missing\".");
      catchError = true;
    });
    expect(catchError).toBe(true);
  });
});

describe("active() & activeHover()", () => {
  it("should return the active popover when popover.active is called", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    expect(popover.active).toBe(undefined);
    await popover.get("asdf").open();
    expect(popover.active).toBe(popover.get("asdf"));
  });

  it("should return the active tooltip popover when popover.activeHover is called", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    expect(popover.activeHover).toBe(undefined);
    await popover.get("tooltip").open();
    expect(popover.activeHover).toBe(popover.get("tooltip"));
  });
});

describe("getSetting()", () => {
  it("should return a setting value from wherever it was set", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    const entry = popover.get("asdf");
    expect(entry.id).toBe("asdf");
    expect(entry.getSetting("dataConfig")).toBe("popover-config");
    entry.settings["dataConfig"] = "asdf";
    expect(entry.getSetting("dataConfig")).toBe("asdf");
  });

  it("should throw an error if searching for a setting that doesn't exist", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    const entry = popover.get("asdf");
    expect(() => entry.getSetting("asdf")).toThrow("Popover setting does not exist: asdf");
  });
});
