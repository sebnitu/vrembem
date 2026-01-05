import { themeStore } from "../index";

let result;
let store;

test("should setup a theme store", () => {
  store = themeStore();
  expect(store.theme).toBe("root");
  expect(store.class).toBe("vb-theme-root");
  expect(store.themes).toStrictEqual(["root", "light", "dark"]);
  expect(store.classes).toStrictEqual([
    "vb-theme-root",
    "vb-theme-light",
    "vb-theme-dark"
  ]);
  expect(localStorage.getItem("VB:Profile")).toBe(null);
});

test("should update html element class when theme is changed", () => {
  result = document.documentElement.classList.contains("vb-theme-light");
  expect(result).toBe(false);

  store.theme = "light";

  result = document.documentElement.classList.contains("vb-theme-light");
  expect(result).toBe(true);
});

test("should have set the theme in local storage", () => {
  result = JSON.parse(localStorage.getItem("VB:Profile"));
  expect(result).toStrictEqual({ theme: "light" });
});

test("should be able to add and remove themes from the store", () => {
  expect(store.themes).not.toContain("matrix");
  expect(store.classes).not.toContain("vb-theme-matrix");
  store.add("matrix");
  expect(store.themes).toContain("matrix");
  expect(store.classes).toContain("vb-theme-matrix");
  store.remove("matrix");
  expect(store.themes).not.toContain("matrix");
  expect(store.classes).not.toContain("vb-theme-matrix");
});

test("should be able to set callbacks that get run on init and change", () => {
  const onInitFunc = vi.fn();
  const onChangeFunc = vi.fn();
  expect(onInitFunc).not.toHaveBeenCalledOnce();
  store = themeStore({
    onInit: onInitFunc,
    onChange: onChangeFunc
  });
  expect(onInitFunc).toHaveBeenCalledOnce();
  expect(onChangeFunc).not.toHaveBeenCalled();
  store.theme = "dark";
  result = document.documentElement.classList.contains("vb-theme-dark");
  expect(result).toBe(true);
  expect(onChangeFunc).toHaveBeenCalled();
});

test("should update the config object when options are passed", () => {
  store = themeStore({
    prefix: "sn-theme",
    storeKey: "SN:Key"
  });
  expect(store.config.prefix).toBe("sn-theme");
  expect(store.class).toBe("sn-theme-root");
  store.theme = "light";
  expect(store.class).toBe("sn-theme-light");
  result = JSON.parse(localStorage.getItem("SN:Key"));
  expect(result).toStrictEqual({ theme: "light" });
});

test("should log a console error when trying to change to a theme that doesn't exist", () => {
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});
  store = themeStore();
  store.theme = "asdf";
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    'Not a valid theme value: "asdf"'
  );
  consoleErrorSpy.mockRestore();
});
