import "@testing-library/jest-dom";
import { transition } from "./helpers/transition";
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
      autoInit: true,
      selectorInert: "main"
    });
    main = document.querySelector("main");
    el = document.querySelector("#modal-default");
  });

  it("should properly hide content when modal is opened", async () => {
    const btnOpen = document.querySelector("[data-modal-open]");
    btnOpen.click();
    await transition(el);
    expect(main.inert).toBe(true);
  });

  it("should properly show content when modal is closed", async () => {
    const btnClose = document.querySelector("[data-modal-close]");
    btnClose.click();
    await transition(el);
    expect(main).not.toHaveAttribute("inert");
  });
});
