import "@testing-library/jest-dom/vitest";
import "./mocks/getComputedStyle.mock";
import Modal from "../index";

let modal, modal1, modal2, modal3, btn1, btn2, btn3, btn4, btnCloseAll;

document.body.innerHTML = `
  <button data-modal-open="modal-1">...</button>
  <div id="modal-1" class="modal">
    <div class="modal__dialog">
      <button data-modal-open="modal-2">...</button>
    </div>
  </div>
  <div id="modal-2" class="modal">
    <div class="modal__dialog">
      <button data-modal-open="modal-3">...</button>
    </div>
  </div>
  <div id="modal-3" class="modal">
    <div class="modal__dialog">
      <button data-modal-open="modal-2">...</button>
      <button data-modal-close="*">...</button>
    </div>
  </div>
`;

beforeAll(async () => {
  modal = new Modal({ transition: false });
  await modal.mount();

  modal1 = modal.get("modal-1");
  modal2 = modal.get("modal-2");
  modal3 = modal.get("modal-3");

  btn1 = document.querySelector("[data-modal-open=\"modal-1\"]");
  btn2 = document.querySelector("[data-modal-open=\"modal-2\"]");
  btn3 = document.querySelector("[data-modal-open=\"modal-3\"]");
  btn4 = document.querySelector("#modal-3 [data-modal-open=\"modal-2\"]");
  btnCloseAll = document.querySelector("[data-modal-close]");
});

test("should allow opening multiple modals at once", async () => {
  expect(modal.collection.length).toBe(3);
  expect(modal.stack.value.length).toBe(0);

  btn1.click();
  btn2.click();
  btn3.click();

  expect(modal.stack.value.length).toBe(3);
  expect(modal1.state).toBe("opened");
  expect(modal2.state).toBe("opened");
  expect(modal3.state).toBe("opened");
});

test("should correctly apply z-index styles in the order modals were opened", () => {
  expect(modal1.el.style.zIndex).toBe("1001");
  expect(modal2.el.style.zIndex).toBe("1002");
  expect(modal3.el.style.zIndex).toBe("1003");
});

test("should have set focus to the modal dialog of the last modal opened", () => {
  expect(document.activeElement).toBe(modal3.dialog);
});

test("should correctly update the z-index styles when modal stack order is changed", async () => {
  btn4.click();

  expect(modal1.el.style.zIndex).toBe("1001");
  expect(modal2.el.style.zIndex).toBe("1003");
  expect(modal3.el.style.zIndex).toBe("1002");
});

test("should have set focus to the correct modal dialog when stack order is changed", () => {
  expect(document.activeElement).toBe(modal2.dialog);
});

test("should close the currently opened modal at the top of the stack", async () => {
  expect(modal2.state).toBe("opened");

  modal.close();

  expect(modal2.state).toBe("closed");
  expect(document.activeElement).toBe(modal3.dialog);
});

test("should update the stack array and z-index of remaining active modals", () => {
  expect(modal.stack.value.length).toBe(2);
  expect(modal.stack.value[0]).toBe(modal1);
  expect(modal.stack.value[1]).toBe(modal3);

  expect(modal1.el.style.zIndex).toBe("1001");
  expect(modal2.el.style.zIndex).toBe("");
  expect(modal3.el.style.zIndex).toBe("1002");
});

test("should close the currently opened modal and update stack array and z-index styles", async () => {
  expect(modal3.state).toBe("opened");

  modal.close();

  expect(modal3.state).toBe("closed");
  expect(document.activeElement).toBe(modal1.dialog);

  expect(modal.stack.value.length).toBe(1);
  expect(modal.stack.value[0]).toBe(modal1);

  expect(modal1.el.style.zIndex).toBe("1001");
  expect(modal2.el.style.zIndex).toBe("");
  expect(modal3.el.style.zIndex).toBe("");
});

test("should focus root trigger when the last modal in stack is closed", async () => {
  expect(modal1.state).toBe("opened");

  modal.close();

  expect(modal1.state).toBe("closed");
  expect(document.activeElement).toBe(btn1);

  expect(modal.stack.value.length).toBe(0);
});

test("should close all open modals when close button with value of * is set", async () => {
  btn1.click();
  btn2.click();
  btn3.click();

  expect(modal.stack.value.length).toBe(3);
  expect(modal1.state).toBe("opened");
  expect(modal2.state).toBe("opened");
  expect(modal3.state).toBe("opened");

  btnCloseAll.click();

  expect(modal.stack.value.length).toBe(0);
  expect(modal1.state).toBe("closed");
  expect(modal2.state).toBe("closed");
  expect(modal3.state).toBe("closed");
});

test("should properly replace all modal modals with the trigger modal", async () => {
  btn1.click();
  btn2.click();

  expect(modal.stack.value.length).toBe(2);
  expect(modal1.state).toBe("opened");
  expect(modal2.state).toBe("opened");
  expect(modal3.state).toBe("closed");

  await modal.replace("modal-3");

  expect(modal.stack.value.length).toBe(1);
  expect(modal1.state).toBe("closed");
  expect(modal2.state).toBe("closed");
  expect(modal3.state).toBe("opened");
});
