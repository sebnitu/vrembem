import Modal from "../index";

document.body.innerHTML = `
  <main>
    <button data-modal-open="modal-default">...</button>
  </main>
  <div id="modal-default" class="modal" style="--modal-transition-duration: 0.3s">
    <div class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
`;

const main = document.querySelector("main");
const modal = new Modal({
  selectorInert: "main"
});

describe("when selectorInert is set:", () => {
  vi.useFakeTimers();

  beforeAll(async () => {
    await modal.mount();
  });

  it("should properly hide content when modal is opened", async () => {
    const btnOpen = document.querySelector("[data-modal-open]");
    btnOpen.click();
    await vi.runAllTimers();
    expect(main.inert).toBe(true);
    expect(main.hasAttribute("aria-hidden")).toBe(true);
    expect(main.getAttribute("aria-hidden")).toBe("true");
  });

  it("should properly show content when modal is closed", async () => {
    const btnClose = document.querySelector("[data-modal-close]");
    btnClose.click();
    await vi.runAllTimers();
    expect(main.inert).toBe(false);
    expect(main.hasAttribute("aria-hidden")).toBe(false);
  });
});
