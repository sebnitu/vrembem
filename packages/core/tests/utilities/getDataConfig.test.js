import { getAttrConfig } from "../../index";

document.body.innerHTML = `
  <div id="div-1" data-config="{ 'one': '1111', 'two': true }"></div>
  <div id="div-2" data-config></div>
  <div id="div-3"></div>
`;

describe("getAttrConfig", () => {
  it("should return a data config object from HTML element", () => {
    const el = document.querySelector("#div-1");
    const data = getAttrConfig(el, "config");
    expect(data.one).toBe("1111");
    expect(data.two).toBe(true);
  });

  it("should return an empty data config object if no data is found", () => {
    const el = document.querySelector("#div-2");
    const data = getAttrConfig(el, "config");
    expect(data).toEqual({});
  });

  it("should return an empty data config object if no data attribute is found", () => {
    const el = document.querySelector("#div-3");
    const data = getAttrConfig(el, "config");
    expect(data).toEqual({});
  });
});
