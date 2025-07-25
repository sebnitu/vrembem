import { updateGlobalState } from "../index";
import "@testing-library/jest-dom";

document.body.innerHTML = `
  <header class="header"></header>
  <div class="main"></div>
  <aside class="aside aside-1"></aside>
  <aside class="aside aside-2"></aside>
`;

const header = document.querySelector(".header");
const main = document.querySelector(".main");
const config = {
  selectorInert: ".main, .header",
  selectorOverflow: "body, .main"
};
const configEmpty = {
  selectorInert: null,
  selectorOverflow: null
};

describe("updateGlobalState()", () => {
  it("should apply inert and aria hidden to passed selectors", () => {
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);

    updateGlobalState(true, config);
    expect(main.inert).toBe(true);
    expect(header.inert).toBe(true);
  });

  it("should remove inert and aria hidden when set to false", () => {
    updateGlobalState(false, config);
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);
  });

  it("should do nothing if selector is not passed", () => {
    updateGlobalState(true, configEmpty);
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);
  });

  it("should apply overflow hidden to passed selectors", () => {
    expect(document.body).not.toHaveStyle("overflow: hidden");
    expect(main).not.toHaveStyle("overflow: hidden");
    updateGlobalState(true, config);
    expect(document.body).toHaveStyle("overflow: hidden");
    expect(main).toHaveStyle("overflow: hidden");
  });

  it("should remove overflow hidden when set to false", () => {
    updateGlobalState(false, config);
    expect(document.body).not.toHaveStyle("overflow: hidden");
    expect(main).not.toHaveStyle("overflow: hidden");
  });

  it("should do nothing if selector is not passed", () => {
    updateGlobalState(true, configEmpty);
    expect(document.body).not.toHaveStyle("overflow: hidden");
    expect(main).not.toHaveStyle("overflow: hidden");
  });
});
