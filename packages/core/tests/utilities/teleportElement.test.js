import { teleportElement } from "../../index";

const markup = `
  <div id="box-a"><span id="span-1"></span></div>
  <div id="box-b"></div>
`;

describe("teleportElement()", () => {
  let cleanup, el, boxA, boxB;

  beforeAll(() => {
    document.body.innerHTML = markup;
    el = document.querySelector("#span-1");
    boxA = document.querySelector("#box-a");
    boxB = document.querySelector("#box-b");
  });

  it("should teleportElement element inside the provided container", () => {
    cleanup = teleportElement(el, boxB, "append");
    expect(boxB.childNodes[0]).toBe(el);
    expect(boxB.childNodes.length).toBe(1);
  });

  it("should return the teleportElemented element when cleanup function is run", () => {
    expect(typeof cleanup).toBe("function");
    cleanup();
    expect(boxA.childNodes[0]).toBe(el);
    expect(boxA.childNodes.length).toBe(1);
  });

  it("should query teleportElement reference using a valid selector", () => {
    teleportElement(el, "#box-a", "after");
    expect(boxA.nextSibling).toBe(el);
  });

  it("should throw an error if no teleport reference is found with the provided selector", () => {
    expect(() => teleportElement(el, "asdf")).toThrow(
      "No teleport reference found for selector: asdf"
    );
  });

  it("should throw an error if the teleport element provided is not valid", () => {
    expect(() => teleportElement(el, {})).toThrow(
      "Not a valid teleport reference: '[object Object]'"
    );
  });

  it("should throw an error if not a valid teleportElement method", () => {
    expect(() => teleportElement(el, boxB, "asdf")).toThrow(
      "Not a valid teleport method: 'asdf'"
    );
  });
});
