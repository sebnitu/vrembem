import "@testing-library/jest-dom/vitest";
import Popover from "../index";
import { expect } from "vitest";

vi.useFakeTimers();

// const keyEsc = new KeyboardEvent("keydown", {
//   key: "Escape"
// });

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

  it("running mount multiple times should not create duplicates in collection", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    await popover.mount();
    expect(popover.collection.length).toBe(3);
  });

  it("should be able to pass options through mount method", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover({ selector: ".asdf" });
    expect(popover.settings.selector).toBe(".asdf");
    await popover.mount({ selector: ".popover" });
    expect(popover.settings.selector).toBe(".popover");
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

  it("should close open popovers when before being unmounted", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    const entry = await popover.get("asdf");
    await entry.open();
    await popover.unmount();
    const el = document.getElementById("asdf");
    expect(el).not.toHaveClass("is-active");
  });
});

describe("register() & deregister()", () => {
  it("should be able to manually register a popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();

    expect(popover.collection.length).toBe(0);

    const el = document.querySelector(".popover");
    const trigger = document.querySelector("button");

    await popover.register(el);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].el).toBe(el);
    expect(popover.collection[0].trigger).toBe(trigger);
  });

  it("should be able to manually deregister a popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();

    expect(popover.collection.length).toBe(3);
    await popover.deregister(popover.collection[0].id);
    expect(popover.collection.length).toBe(2);

    const el = document.querySelector(".popover");
    const trigger = document.querySelector("button");

    trigger.click();
    vi.advanceTimersByTime(500);
    expect(el).not.toHaveClass("is-active");
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
