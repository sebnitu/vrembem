import "@testing-library/jest-dom/vitest";
import Modal from "../index";

const keyEsc = new KeyboardEvent("keydown", {
  key: "Escape"
});
const keySpace = new KeyboardEvent("keydown", {
  key: "Space"
});

const markup = `
  <button data-modal-open="modal-default">...</button>
  <button data-modal-replace="modal-default">...</button>
  <div id="modal-default" class="modal" style="--modal-transition-duration: 300ms">
    <div class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
`;

const markupReq = `
  <button data-modal-open="modal-default">...</button>
  <div id="modal-default" class="modal" style="--modal-transition-duration: 300ms">
    <div class="modal__dialog" role="alertdialog">
      <button data-modal-close data-focus>...</button>
    </div>
  </div>
`;

beforeEach(() => {
  vi.useFakeTimers();
});

test("should close when root modal (screen) is clicked", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.mount();
  const el = document.querySelector(".modal");
  const dialog = document.querySelector(".modal__dialog");
  const btnOpen = document.querySelector("[data-modal-open]");

  expect(modal.get("modal-default").required).toBe(false);

  btnOpen.click();
  await vi.runAllTimers();

  dialog.click();
  await vi.runAllTimers();
  expect(el).not.toHaveClass("is-closing");

  el.click();
  expect(el).toHaveClass("is-closing");

  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-closed");
  expect(el.classList.length).toBe(2);
});

test("should close when the escape key is pressed", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.mount();
  const el = document.querySelector(".modal");
  const btnOpen = document.querySelector("[data-modal-open]");

  btnOpen.click();
  expect(el).toHaveClass("modal is-opening");

  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-opened");

  document.dispatchEvent(keyEsc);
  expect(el).toHaveClass("modal is-closing");

  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-closed");
  expect(el.classList.length).toBe(2);
});

test("should do nothing if none escape key is pressed", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.mount();
  const el = document.querySelector(".modal");
  const btnOpen = document.querySelector("[data-modal-open]");

  btnOpen.click();
  expect(el).toHaveClass("modal is-opening");

  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-opened");

  document.dispatchEvent(keySpace);
  expect(el).not.toHaveClass("is-closing");

  await vi.runAllTimers();
  expect(el).not.toHaveClass("is-closed");
  expect(el.classList.length).toBe(2);
});

test("should not be able to close while modal transition is in process", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.mount();
  const el = document.querySelector(".modal");
  const btnOpen = document.querySelector("[data-modal-open]");

  btnOpen.click();
  expect(el).toHaveClass("modal is-opening");

  document.dispatchEvent(keyEsc);
  expect(el).toHaveClass("modal is-opening");

  await vi.runAllTimers();
  expect(el).toHaveClass("is-opened");
  expect(el.classList.length).toBe(2);
});

test("should prevent escape or screen click closing modal if required", async () => {
  document.body.innerHTML = markupReq;
  const modal = new Modal();
  await modal.mount();
  const el = document.querySelector(".modal");
  const btnOpen = document.querySelector("[data-modal-open]");
  const btnClose = el.querySelector("[data-modal-close]");

  expect(modal.get("modal-default").required).toBe(true);

  btnOpen.click();
  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-opened");

  document.dispatchEvent(keyEsc);
  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-opened");

  el.click();
  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-opened");

  btnClose.click();
  await vi.runAllTimers();
  expect(el).toHaveClass("modal is-closed");
  expect(el.classList.length).toBe(2);
});

test("should run the replace method when replace button is clicked", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.mount();
  const el = document.querySelector(".modal");
  const btnReplace = document.querySelector("[data-modal-replace]");

  btnReplace.click();
  await vi.runAllTimers();

  expect(el).toHaveClass("modal is-opened");
  expect(el.classList.length).toBe(2);
});
