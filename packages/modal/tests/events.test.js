import "@testing-library/jest-dom/vitest";
import Modal from "../index";

const markup = `
  <button data-modal-open="modal-default">...</button>
  <div id="modal-default" class="modal is-closed">
    <div class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
`;

beforeEach(() => {
  document.body.innerHTML = markup;
  document
    .querySelector("#modal-default")
    .style.setProperty("--modal-transition-duration", "0.3s");
  vi.useFakeTimers();
});

test("should emit custom event when modal has opened", async () => {
  const modal = new Modal();
  await modal.mount();
  const el = document.querySelector("#modal-default");
  const btn = document.querySelector("[data-modal-open]");
  let eventFired = false;

  document.addEventListener("modal:opened", () => {
    eventFired = true;
  });

  btn.click();
  await vi.runAllTimers();

  expect(el).toHaveClass("is-opened");
  expect(eventFired).toBe(true);
});

test("should emit custom event when modal has closed", async () => {
  const modal = new Modal();
  await modal.mount();
  const el = document.querySelector("#modal-default");
  const btn = document.querySelector("[data-modal-open]");
  const btnClose = document.querySelector("[data-modal-close]");
  let eventFired = false;

  document.addEventListener("modal:closed", () => {
    eventFired = true;
  });

  btn.click();
  await vi.runAllTimers();

  expect(el).toHaveClass("is-opened");
  expect(eventFired).toBe(false);

  btnClose.click();
  await vi.runAllTimers();

  expect(el).toHaveClass("is-closed");
  expect(eventFired).toBe(true);
});

test("should be able to set a custom event prefix", async () => {
  const modal = new Modal({
    customEventPrefix: "vrembem:"
  });
  await modal.mount();
  const btn = document.querySelector("[data-modal-open]");
  const btnClose = document.querySelector("[data-modal-close]");
  let eventOpened = false;
  let eventClosed = false;

  document.addEventListener("vrembem:opened", () => {
    eventOpened = true;
  });

  document.addEventListener("vrembem:closed", () => {
    eventClosed = true;
  });

  btn.click();
  await vi.runAllTimers();

  expect(eventOpened).toBe(true);
  expect(eventClosed).toBe(false);

  eventOpened = false;

  btnClose.click();
  await vi.runAllTimers();

  expect(eventOpened).toBe(false);
  expect(eventClosed).toBe(true);
});
