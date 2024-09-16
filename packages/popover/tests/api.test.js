import "@testing-library/jest-dom/vitest";
import Popover from "../index.js";
import { describe, expect } from "vitest";

let popover;

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

afterEach(() => {
  popover.unmount();
  popover = null;
  document.body.innerHTML = null;
});

describe("mount() & unmount()", () => {
  it("should mount the popover module when mount is run", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    popover.mount();
    expect(popover.collection.length).toBe(3);
  });

  it("should auto mount the popover module autoMount is set to true", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });
    expect(popover.collection.length).toBe(3);
  });

  it("running mount multiple times should not create duplicates in collection", async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });
    await popover.mount();
    expect(popover.collection.length).toBe(3);
  });

  it("should not attach keyboard event listener if eventListeners is set to false", () => {
    document.body.innerHTML = markup;
    popover = new Popover({
      autoMount: true,
      eventListeners: false
    });

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    trigger.click();
    expect(target).toHaveClass("is-active");
    document.dispatchEvent(keyEsc);
    expect(target).toHaveClass("is-active");
  });

  it("should be able to pass options through mount method", async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ selectorPopover: ".asdf" });
    expect(popover.settings.selectorPopover).toBe(".asdf");
    await popover.mount({ selectorPopover: ".popover" });
    expect(popover.settings.selectorPopover).toBe(".popover");
  });

  it("should remove all event listeners and clear collection", async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    expect(popover.collection.length).toBe(3);
    await popover.unmount();
    expect(popover.collection.length).toBe(0);
    trigger.click();
    expect(target).not.toHaveClass("is-active");
  });
});

describe("mountEventListeners() & unmountEventListeners()", () => {
  it("should remove event listeners", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    popover.unmountEventListeners();

    trigger.click();
    expect(target).not.toHaveClass("is-active");
  });

  it("should re-mount event listeners", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    popover.unmountEventListeners();
    popover.mountEventListeners();

    trigger.click();
    expect(target).toHaveClass("is-active");
  });

  it("should remove keyboard event listener", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    trigger.click();
    expect(target).toHaveClass("is-active");

    popover.unmountEventListeners();

    document.dispatchEvent(keyEsc);
    expect(target).toHaveClass("is-active");
  });

  it("should re-mount keyboard event listener", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    trigger.click();
    expect(target).toHaveClass("is-active");

    popover.unmountEventListeners();
    popover.mountEventListeners();

    document.dispatchEvent(keyEsc);
    expect(target).not.toHaveClass("is-active");
  });
});

describe("register() & deregister()", () => {
  it("should be able to manually register a popover", () => {
    document.body.innerHTML = markup;
    popover = new Popover();

    expect(popover.collection.length).toBe(0);

    const el = document.querySelector(".popover");
    const trigger = document.querySelector("button");

    popover.register(trigger);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].el).toBe(el);
    expect(popover.collection[0].trigger).toBe(trigger);
  });

  it("should be able to manually deregister a popover", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    expect(popover.collection.length).toBe(3);
    popover.deregister(popover.collection[0]);
    expect(popover.collection.length).toBe(2);

    const el = document.querySelector(".popover");
    const trigger = document.querySelector("button");

    trigger.click();
    expect(el).not.toHaveClass("is-active");
  });

  it("should reject promise with error if deregister is called on non-existent entry", async () => {
    popover = new Popover({ autoMount: true });
    const result = await popover.deregister("asdf").catch((error) => { return error.message; });
    expect(result).toBe("Failed to deregister; popover does not exist in collection with ID of: \"asdf\".");
  });
});

describe("registerCollection() & deregisterCollection()", () => {
  it("should remove all items from collection and their event listeners", async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");

    expect(popover.collection.length).toBe(3);
    trigger.click();
    expect(target).toHaveClass("is-active");

    await popover.deregisterCollection();

    expect(popover.collection.length).toBe(0);
    expect(target).not.toHaveClass("is-active");
    trigger.click();
    expect(target).not.toHaveClass("is-active");
  });

  it("should register all items into collection and add their event listeners", () => {
    document.body.innerHTML = markup;
    popover = new Popover();

    const trigger = document.querySelector("button");
    const target = document.querySelector(".popover");
    const items = document.querySelectorAll(".popover");

    expect(popover.collection.length).toBe(0);
    trigger.click();
    expect(target).not.toHaveClass("is-active");

    popover.registerCollection(items);

    expect(popover.collection.length).toBe(3);
    trigger.click();
    expect(target).toHaveClass("is-active");
  });
});

describe("open() & close()", () => {
  it("should open the provided popover", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    const target = document.querySelector(".popover");

    expect(target).not.toHaveClass("is-active");
    popover.open(popover.collection[0].id);
    expect(target).toHaveClass("is-active");
  });

  it("should close the provided popover", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });

    const target = document.querySelector(".popover");

    popover.open(popover.collection[0].id);
    popover.close(popover.collection[0].id);
    expect(target).not.toHaveClass("is-active");
  });

  it("should close all popovers", async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
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
    popover = new Popover();
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
    popover = new Popover({ autoMount: true });

    let catchError = false;
    await popover.close("missing").catch((error) => {
      expect(error.message).toBe("Popover not found in collection with id of \"missing\".");
      catchError = true;
    });
    expect(catchError).toBe(true);
  });
});

describe("active() & activeTooltip()", () => {
  it("should return the active popover when popover.active is called", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });
    expect(popover.active).toBe(undefined);
    popover.get("asdf").open();
    expect(popover.active).toBe(popover.get("asdf"));
  });

  it("should return the active tooltip popover when popover.activeTooltip is called", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });
    expect(popover.activeTooltip).toBe(undefined);
    popover.get("tooltip").open();
    expect(popover.activeTooltip).toBe(popover.get("tooltip"));
  });
});

describe("getSetting()", () => {
  it("should return a setting value from wherever it was set", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoMount: true });
    const entry = popover.get("asdf");
    expect(entry.id).toBe("asdf");
    expect(entry.getSetting("dataConfig")).toBe("popover-config");
    entry.settings["dataConfig"] = "asdf";
    expect(entry.getSetting("dataConfig")).toBe("asdf");
  });
});
