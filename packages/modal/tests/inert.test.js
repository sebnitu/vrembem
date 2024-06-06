import Modal from "../index";

const markup = `
  <main>
    <button data-modal-open="modal-default">...</button>
  </main>
  <div id="modal-default" class="modal">
    <div class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
`;

describe("when selectorInert is set:", () => {
  let main, el;

  beforeAll(() => {
    document.body.innerHTML = markup;
    new Modal({
      autoMount: true,
      selectorInert: "main"
    });
    main = document.querySelector("main");
    el = document.querySelector("#modal-default");
    el.style.setProperty("--modal-transition-duration", "0.3s");
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should properly hide content when modal is opened", async () => {
    const btnOpen = document.querySelector("[data-modal-open]");
    btnOpen.click();
    await vi.runAllTimers();
    expect(main.inert).toBe(true);
    expect(main.getAttribute("aria-hidden")).toBe("true");
  });

  it("should properly show content when modal is closed", async () => {
    const btnClose = document.querySelector("[data-modal-close]");
    btnClose.click();
    await vi.runAllTimers();
    expect(main.inert).toBe(null);
    expect(main.hasAttribute("aria-hidden")).toBe(false);
  });
});
