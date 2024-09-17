import "@testing-library/jest-dom/vitest";
import Popover from "../index";

console.error = vi.fn();

const markup = `
  <main>
    <button class="button" aria-describedby="popover-1">Left</button>
    <button class="button" aria-describedby="popover-2">Top</button>
    <div id="popover-1" class="popover popover_tooltip">
      Popover
      <span class="popover__arrow"></span>
    </div>
    <div id="popover-2" class="popover popover_tooltip">
      Popover
      <span class="popover__arrow"></span>
    </div>
  </main>
  <div class="popovers"></div>
`;

describe("mount()", () => {
  let popover, entry, div;
  
  it("should teleport popovers to the provided reference selector using the default method", async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ teleport: ".popovers" });
    div = document.querySelector(".popovers");
    expect(div.children.length).toBe(0);
    await popover.mount();
    expect(div.children.length).toBe(2);
  });

  it("should return teleport when a popover is deregistered", async () => {
    entry = popover.get("popover-1");
    await entry.deregister();
    expect(div.children.length).toBe(1);
    entry = popover.get("popover-2");
    await entry.deregister();
    expect(div.children.length).toBe(0);
  });
});

describe("entry.teleport() & entry.teleportReturn()", () => {
  let popover, entry, div;

  beforeAll(async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.mount();
    entry = popover.collection[0];
    div = document.querySelector(".popovers");
  });

  it("should teleport a registered entry", () => {
    expect(div.children.length).toBe(0);
    entry.teleport(".popovers");
    expect(div.children.length).toBe(1);
    expect(entry.returnRef.textContent).toBe("teleported #popover-1");
  });

  it("should log error if teleport is run on a popover that has already been teleported", () => {
    expect(div.children.length).toBe(1);
    entry.teleport(".popovers");
    expect(console.error).toHaveBeenCalledWith("Element has already been teleported:", entry.el);
    expect(div.children.length).toBe(1);
  });

  it("should return the teleported entry", () => {
    expect(div.children.length).toBe(1);
    entry.teleportReturn();
    expect(div.children.length).toBe(0);
    expect(entry.returnRef).toBe(null);
  });

  it("should log error if teleportReturn is run with no return reference", () => {
    expect(entry.returnRef).toBe(null);
    expect(div.children.length).toBe(0);
    entry.teleportReturn();
    expect(console.error).toHaveBeenCalledWith("No return reference found:", entry.el);
    expect(div.children.length).toBe(0);
  });
});
