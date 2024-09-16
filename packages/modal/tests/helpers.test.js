import "./mocks/getComputedStyle.mock";
import { getModalID, getModalElements } from "../src/js/helpers";

document.body.innerHTML = `
  <button data-modal-open="modal-1">...</button>
  <button data-modal-close="modal-1">...</button>
  <button data-modal-replace="modal-1">...</button>
  <div id="modal-1" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-2" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-3" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div class="modal missing-id">
    <div class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
  <div class="random"></div>
  <div id="missing-dialog" class="modal"></div>
`;

const mockObj = {
  settings: {
    dataOpen: "modal-open",
    dataClose: "modal-close",
    dataReplace: "modal-replace",
    selectorModal: ".modal",
    selectorDialog: ".modal__dialog"
  }
};

describe("getModalID()", () => {
  it("should return the string if a string is passed", () => {
    const result = getModalID("asdf");
    expect(result).toBe("asdf");
  });

  it("should return the id property of an object", () => {
    const result = getModalID({ id: "asdf" });
    expect(result).toBe("asdf");
  });

  it("should return the resolved id of a passed modal open button", () => {
    const el = document.querySelector("[data-modal-open]");
    const result = getModalID.call(mockObj, el);
    expect(result).toBe("modal-1");
  });

  it("should return the resolved id of a passed modal close button", () => {
    const el = document.querySelector("[data-modal-close]");
    const result = getModalID.call(mockObj, el);
    expect(result).toBe("modal-1");
  });

  it("should return the resolved id of a passed modal replace button", () => {
    const el = document.querySelector("[data-modal-replace]");
    const result = getModalID.call(mockObj, el);
    expect(result).toBe("modal-1");
  });

  it("should return the resolved id of a passed modal", () => {
    const el = document.querySelector(".modal");
    const result = getModalID.call(mockObj, el);
    expect(result).toBe("modal-1");
  });

  it("should return the resolved id of a passed modal dialog", () => {
    const el = document.querySelector(".modal__dialog");
    const result = getModalID.call(mockObj, el);
    expect(result).toBe("modal-1");
  });

  it("should return false if passed HTML element has no ID", () => {
    const el = document.querySelector(".missing-id");
    const result = getModalID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it("should return false if passed HTML element does not match a selector", () => {
    const el = document.querySelector(".random");
    const result = getModalID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it("should return false if passed close button is valueless", () => {
    const el = document.querySelector(".missing-id [data-modal-close]");
    const result = getModalID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it("should return false if pass object has no id property", () => {
    const result = getModalID({});
    expect(result).toBe(false);
  });
});

describe("getModalElements()", () => {
  it("should return the modal and modal dialog elements using the passed id", () => {
    const result = getModalElements.call(mockObj, "modal-1");
    const modal = document.querySelector("#modal-1");
    const dialog = modal.querySelector(".modal__dialog");
    expect(result.modal).toBe(modal);
    expect(result.dialog).toBe(dialog);
  });

  it("should return error if no modal elements are found", () => {
    const func = getModalElements.call(mockObj, "asdf");
    expect(func.error.message).toBe("No modal elements found using the ID: \"asdf\".");
  });

  it("should return error if no modal dialog is found", () => {
    const el = document.querySelector("#missing-dialog");
    const func = getModalElements.call(mockObj, el);
    expect(func.error.message).toBe("Modal is missing dialog element.");
  });

  it("should return error if modal id could not be resolved", () => {
    const el = document.querySelector(".missing-id");
    const func = getModalElements.call(mockObj, el);
    expect(func.error.message).toBe("Could not resolve the modal ID.");
  });
});
