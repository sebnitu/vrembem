import "@testing-library/jest-dom/vitest";
import { PopoverCollection } from "../index";
import { teleport } from "@vrembem/core";

document.body.innerHTML = `
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

const popovers = new PopoverCollection({
  plugins: [
    teleport({
      where: ".popovers"
    })
  ]
});

const div = document.querySelector(".popovers");

describe("mount()", () => {
  it("should teleport popovers to the provided reference selector using the default method", async () => {
    expect(div.children.length).toBe(0);
    await popovers.mount();
    expect(div.children.length).toBe(2);
  });

  it("should return teleport when a popover is deregistered", async () => {
    let entry = popovers.get("popover-1");
    await popovers.deregister(await popovers.destroyEntry(entry));
    expect(div.children.length).toBe(1);
    entry = popovers.get("popover-2");
    await popovers.deregister(await popovers.destroyEntry(entry));
    expect(div.children.length).toBe(0);
  });
});
