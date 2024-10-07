import "@testing-library/jest-dom/vitest";
import Modal from "../index";

vi.useFakeTimers();

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div id="modal-default" class="modal is-closed" style="--modal-transition-duration: 300ms">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

const markupCustomState = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div id="modal-default" class="modal off" style="--modal-transition-duration: 300ms">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

const markupConfig = `
  <button data-modal-open="modal-default">...</button>
  <div id="modal-default" class="modal" data-config="{ 'transition': false }">
    <div class="modal__dialog">...</div>
  </div>
`;

test("should apply state classes on `click` and `transitionend` events", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  const el = document.querySelector(".modal");
  const btnOpen = document.querySelector("[data-modal-open]");
  const btnClose = el.querySelector("[data-modal-close]");

  await modal.mount();
  expect(el).toHaveClass("modal");

  btnOpen.click();
  expect(el).toHaveClass("is-opening");

  await vi.runAllTimers();
  expect(el).toHaveClass("is-opened");

  btnClose.click();
  expect(el).toHaveClass("is-closing");

  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-closed");
  expect(el).not.toHaveClass("is-opening is-opened is-closing");
});

test("should apply custom state classes", async () => {
  document.body.innerHTML = markupCustomState;
  const modal = new Modal({
    stateOpened: "on",
    stateOpening: "enable",
    stateClosing: "disable",
    stateClosed: "off"
  });
  await modal.mount();
  const el = document.querySelector(".modal");
  const btnOpen = document.querySelector("[data-modal-open]");
  const btnClose = el.querySelector("[data-modal-close]");

  btnOpen.click();
  expect(el).toHaveClass("enable");

  await vi.runAllTimers();
  expect(el).toHaveClass("on");

  btnClose.click();
  expect(el).toHaveClass("disable");

  await vi.runAllTimers();
  expect(el).toHaveClass("modal off");
  expect(el).not.toHaveClass("enable on disable");
});

test("should not apply transition classes when transitions are disabled", async () => {
  document.body.innerHTML = markup;
  const el = document.querySelector(".modal");
  const modal = new Modal({ transition: false });
  await modal.mount();
  await modal.open("modal-default");
  expect(el).toHaveClass("is-opened");
  expect(el.classList.length).toBe(2);

  await modal.close("modal-default");
  expect(el).toHaveClass("is-closed");
  expect(el.classList.length).toBe(2);
});

test("should open and close modal while using the data modal config attribute", async () => {
  document.body.innerHTML = markupConfig;
  const modal = new Modal();
  await modal.mount();

  const entry = modal.get("modal-default");
  await entry.open();
  expect(entry.el).toHaveClass("is-opened");
  expect(entry.state).toBe("opened");

  await entry.close();
  expect(entry.el).toHaveClass("is-closed");
  expect(entry.state).toBe("closed");
});

test("should return modal config if set, otherwise should return global settings", async () => {
  document.body.innerHTML = markupConfig;
  const modal = new Modal();
  await modal.mount();

  const entry = modal.get("modal-default");
  expect(entry.getSetting("transition")).toBe(false);
  expect(modal.settings.transition).toBe(true);
});
