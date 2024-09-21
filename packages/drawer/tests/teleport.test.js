import "@testing-library/jest-dom/vitest";
import Drawer from "../index";

console.error = vi.fn();

const markup = `
  <main>
    <div id="drawer-one" class="drawer">
      <div class="drawer__dialog">...</div>
    </div>
    <div id="drawer-two" class="drawer">
      <div class="drawer__dialog">...</div>
    </div>
  </main>
  <div class="drawers"></div>
`;

describe("mount()", () => {
  it("should teleport drawers to the provided reference selector using the default method", async () => {
    document.body.innerHTML = markup;
    const drawer = new Drawer({ teleport: ".drawers" });
    const div = document.querySelector(".drawers");
    expect(div.children.length).toBe(0);
    await drawer.mount();
    expect(div.children.length).toBe(2);
  });
});
