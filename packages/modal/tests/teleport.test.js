import "@testing-library/jest-dom/vitest";
import Modal from "../index";

console.error = vi.fn();

const markup = `
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

describe("init()", () => {
  it("should teleport modals to the provided reference selector using the default method", async () => {
    document.body.innerHTML = markup;
    const modal = new Modal({ teleport: ".modals" });
    const div = document.querySelector(".modals");
    expect(div.children.length).toBe(0);
    await modal.init();
    expect(div.children.length).toBe(2);
  });
});

describe("entry.teleport() & entry.teleportReturn()", () => {
  let modal, entry, div;

  beforeAll(async () => {
    document.body.innerHTML = markup;
    modal = new Modal();
    await modal.init();
    entry = modal.collection[0];
    div = document.querySelector(".modals");
  });

  it("should teleport a registered entry", () => {
    expect(div.children.length).toBe(0);
    entry.teleport(".modals");
    expect(div.children.length).toBe(1);
    expect(entry.returnRef.textContent).toBe("teleported #modal-one");
  });

  it("should log error if teleport is run on a modal that has already been teleported", () => {
    expect(div.children.length).toBe(1);
    entry.teleport(".modals");
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
