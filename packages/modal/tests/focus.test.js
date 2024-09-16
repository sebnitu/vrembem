import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { transition } from "./helpers/transition";
import Modal from "../index";

const markup = `
  <button data-modal-open="modal-one">Modal One</button>
  <button data-modal-open="modal-two">Modal Two</button>
  <div id="modal-one" class="modal">
    <div class="modal__dialog">
      <button data-modal-close class="first">Close</button>
      <button>...</button>
      <button data-modal-open="modal-two" class="last">Modal Two</button>
    </div>
  </div>
  <div id="modal-two" class="modal">
    <div data-modal-dialog class="modal__dialog">
      <button data-modal-close data-focus>Close</button>
      <button data-modal-open="modal-one">Modal One</button>
    </div>
  </div>
  <div id="modal-empty" class="modal">
    <div class="modal__dialog">
      <p>This modal has nothing to focus...</p>
    </div>
  </div>
`;

test("should focus modal dialog when opened and refocus trigger when closed", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.init();
  const el = document.querySelector("#modal-one");
  const dialog = el.querySelector(".modal__dialog");
  const btnOpen = document.querySelector("[data-modal-open=\"modal-one\"]");

  btnOpen.click();
  await transition(el);
  expect(dialog).toHaveFocus();
});

test("should focus inner modal element and refocus trigger when closed", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.init();
  const el = document.querySelector("#modal-two");
  const btnOpen = document.querySelector("[data-modal-open=\"modal-two\"]");
  const btnClose = el.querySelector("[data-modal-close]");

  btnOpen.click();
  await transition(el);
  expect(btnClose).toHaveFocus();

  btnClose.click();
  await transition(el);
  expect(btnOpen).toHaveFocus();
});

test("should remember initial trigger when opening modal through another modal", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.init();
  const elOne = document.querySelector("#modal-one");
  const elTwo = document.querySelector("#modal-two");
  const btnOpen = document.querySelector("[data-modal-open=\"modal-one\"]");
  const btnTwo = elOne.querySelector("[data-modal-open=\"modal-two\"]");

  btnOpen.click();
  await transition(elOne);

  btnTwo.click();
  await transition(elOne);
  await transition(elTwo);

  expect(elOne).toHaveClass("is-opened");
  expect(elTwo).toHaveClass("is-opened");

  await modal.closeAll(false, false);

  expect(btnOpen).toHaveFocus();
});

test("should retain focus on modal if nothing inner is focusable", async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.init();
  const elModal = document.querySelector("#modal-empty");
  const dialog = elModal.querySelector(".modal__dialog");
  modal.open("modal-empty");
  await transition(elModal);
  expect(elModal).toHaveClass("is-opened");
  expect(dialog).toHaveFocus();
  userEvent.tab();
  expect(dialog).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(dialog).toHaveFocus();
});
