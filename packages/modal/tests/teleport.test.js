import "@testing-library/jest-dom/vitest";
import Modal from "../index";
import { teleport } from "@vrembem/core";

document.body.innerHTML = `
  <main>
    <div id="modal-one" class="modal">
      <div class="modal__dialog">...</div>
    </div>
    <div id="modal-two" class="modal">
      <div class="modal__dialog">...</div>
    </div>
  </main>
  <div class="modals"></div>
`;

describe("mount()", () => {
  it("should teleport modals to the provided reference selector using the default method", async () => {
    const modal = new Modal({
      plugins: [
        teleport({
          where: ".modals"
        })
      ]
    });
    const div = document.querySelector(".modals");
    expect(div.children.length).toBe(0);
    await modal.mount();
    expect(div.children.length).toBe(2);
  });
});
