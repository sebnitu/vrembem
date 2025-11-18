import { FocusableArray } from "../../src/js/modules";

describe("FocusableArray", () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="container">
        <button id="btn1">Button 1</button>
        <a href="#" id="link1">Link 1</a>
        <input type="text" id="input1" />
        <div id="nonFocusable">Non-focusable</div>
      </div>
    `;
    container = document.getElementById("container");
  });

  it("initializes correctly with elements matching selectors", () => {
    const focusableArray = new FocusableArray(container);
    expect(focusableArray).toHaveLength(3);
    expect(focusableArray.first).toBe(focusableArray[0]);
    expect(focusableArray.last).toBe(focusableArray[focusableArray.length - 1]);
  });

  it("handles empty containers gracefully", () => {
    const emptyDiv = document.createElement("div");
    const focusableArray = new FocusableArray(emptyDiv);
    expect(focusableArray).toHaveLength(0);
    expect(focusableArray.first).toBeUndefined();
    expect(focusableArray.last).toBeUndefined();
  });

  it("sets a new container and updates the array with matching elements", () => {
    const focusableArray = new FocusableArray();
    focusableArray.set(container);
    expect(focusableArray).toHaveLength(3);
    expect(focusableArray.first).toBe(focusableArray[0]);
    expect(focusableArray.last).toBe(focusableArray[focusableArray.length - 1]);
  });

  it("clears all elements from the array", () => {
    const focusableArray = new FocusableArray(container);
    focusableArray.clear();
    expect(focusableArray).toHaveLength(0);
    expect(focusableArray.first).toBeUndefined();
    expect(focusableArray.last).toBeUndefined();
  });

  it("can reset with a new element using set()", () => {
    const newContainer = document.createElement("div");
    newContainer.innerHTML = `
      <button id="btn2">Button 2</button>
      <a href="#" id="link2">Link 2</a>
    `;
    document.body.appendChild(newContainer);

    const focusableArray = new FocusableArray(container);
    expect(focusableArray).toHaveLength(3);

    focusableArray.set(newContainer);
    expect(focusableArray).toHaveLength(2);
    expect(focusableArray.first).toBe(focusableArray[0]);
    expect(focusableArray.last).toBe(focusableArray[focusableArray.length - 1]);

    document.body.removeChild(newContainer);
  });

  it("does nothing if no container is set on construction or set()", () => {
    const focusableArray = new FocusableArray();
    expect(focusableArray).toHaveLength(0);
    expect(focusableArray.first).toBeUndefined();
    expect(focusableArray.last).toBeUndefined();
  });

  it("handles duplicate set() calls gracefully", () => {
    const focusableArray = new FocusableArray(container);
    focusableArray.set(container);
    expect(focusableArray).toHaveLength(3);
    expect(focusableArray.first).toBe(focusableArray[0]);
    expect(focusableArray.last).toBe(focusableArray[focusableArray.length - 1]);
  });
});
