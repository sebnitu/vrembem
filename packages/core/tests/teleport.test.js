import { teleport } from "../index";

const markup = `
  <div id="box-a"><span id="span-1"></span></div>
  <div id="box-b"></div>
`;

describe("teleport()", () => {
  let cleanup, el, boxA, boxB;

  beforeAll(() => {
    document.body.innerHTML = markup;
    el = document.querySelector("#span-1");
    boxA = document.querySelector("#box-a");
    boxB = document.querySelector("#box-b");
  });

  it("should teleport element inside the provided container", () => {
    cleanup = teleport(el, boxB, "append");
    expect(boxB.childNodes[0]).toBe(el);
    expect(boxB.childNodes.length).toBe(1);
  });

  it("should return the teleported element when cleanup function is run", () => {
    expect(typeof cleanup).toBe("function");
    cleanup();
    expect(boxA.childNodes[0]).toBe(el);
    expect(boxA.childNodes.length).toBe(1);
  });

  it("should query teleport reference using a valid selector", () => {
    teleport(el, "#box-a", "after");
    expect(boxA.nextSibling).toBe(el);
  });

  it("should throw an error if not a valid teleport reference element", () => {
    expect(() => teleport(el, "asdf")).toThrow("Not a valid teleport reference: 'null'");
  });

  it("should throw an error if not a valid teleport method", () => {
    expect(() => teleport(el, boxB, "asdf")).toThrow("Not a valid teleport method: 'asdf'");
  });
});
