import { teleport } from "../src/js/teleport";

const markup = `
  <div id="box-a"><span id="span-1"></span></div>
  <div id="box-b"></div>
`;

describe("teleport()", () => {
  let result, el, boxA, boxB;

  beforeAll(() => {
    document.body.innerHTML = markup;
    el = document.querySelector("#span-1");
    boxA = document.querySelector("#box-a");
    boxB = document.querySelector("#box-b");
  });

  it("should teleport element inside the provided container", () => {
    result = teleport(el, boxB, "append");
    expect(boxB.childNodes[0]).toBe(el);
    expect(boxB.childNodes.length).toBe(1);
  });

  it("should teleport return a comment node reference", () => {
    expect(result.nodeType).toBe(Node.COMMENT_NODE);
    expect(result.textContent).toBe("teleported #span-1");
    expect(boxA.childNodes[0]).toBe(result);
    expect(boxA.childNodes.length).toBe(1);
  });

  it("should return the teleported element to the provided comment node reference", () => {
    result = teleport(el, result);

    expect(result).toBe(null);
    expect(boxA.childNodes[0]).toBe(el);
    expect(boxA.childNodes.length).toBe(1);
    expect(boxB.childNodes.length).toBe(0);
  });

  it("should query teleport reference using a valid selector", () => {
    teleport(el, "#box-a", "after");
    expect(boxA.nextSibling).toBe(el);
  });

  it("should throw an error if not a valid teleport reference element", () => {
    expect(
      teleport.bind(null, el, "asdf")
    ).toThrow("Not a valid teleport reference: 'null'");
  });

  it("should throw an error if not a valid teleport method", () => {
    expect(
      teleport.bind(null, el, boxB, "asdf")
    ).toThrow("Not a valid teleport method: 'asdf'");
  });
});
