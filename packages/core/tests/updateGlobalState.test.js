import { updateGlobalState } from "../index";
import "@testing-library/jest-dom/vitest";

document.body.innerHTML = `
  <header class="header"></header>
  <div class="main"></div>
  <aside class="aside aside-1"></aside>
  <aside class="aside aside-2"></aside>
`;

const header = document.querySelector(".header");
const main = document.querySelector(".main");

describe("updateGlobalState()", () => {
  it("should apply inert and aria hidden to passed selectors", () => {
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);
    expect(main).not.toHaveAttribute("aria-hidden");
    expect(header).not.toHaveAttribute("aria-hidden");

    updateGlobalState(true, ".main, .header", "body, .main");
    expect(main.inert).toBe(true);
    expect(header.inert).toBe(true);
    expect(main).toHaveAttribute("aria-hidden", "true");
    expect(header).toHaveAttribute("aria-hidden", "true");
  });

  it("should remove inert and aria hidden when set to false", () => {
    updateGlobalState(false, ".main, .header", "body, .main");
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);
    expect(main).not.toHaveAttribute("aria-hidden");
    expect(header).not.toHaveAttribute("aria-hidden");
  });

  it("should do nothing if selector is not passed", () => {
    updateGlobalState(true, null, null);
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);
    expect(main).not.toHaveAttribute("aria-hidden");
    expect(header).not.toHaveAttribute("aria-hidden");
  });

  it("should apply overflow hidden to passed selectors", () => {
    expect(document.body).not.toHaveStyle("overflow: hidden");
    expect(main).not.toHaveStyle("overflow: hidden");
    updateGlobalState(true, ".main, .header", "body, .main");
    expect(document.body).toHaveStyle("overflow: hidden");
    expect(main).toHaveStyle("overflow: hidden");
  });

  it("should remove overflow hidden when set to false", () => {
    updateGlobalState(false, ".main, .header", "body, .main");
    expect(document.body).not.toHaveStyle("overflow: hidden");
    expect(main).not.toHaveStyle("overflow: hidden");
  });

  it("should do nothing if selector is not passed", () => {
    updateGlobalState(true, null, null);
    expect(document.body).not.toHaveStyle("overflow: hidden");
    expect(main).not.toHaveStyle("overflow: hidden");
  });
});
