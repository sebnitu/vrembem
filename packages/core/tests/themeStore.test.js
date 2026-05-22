import { themeStore } from "../index";

let store;

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  delete document.documentElement.dataset.mode;
});

test("should setup a theme store with no stored values", () => {
  store = themeStore();
  expect(store.theme).toBeUndefined();
  expect(store.mode).toBeUndefined();
  expect(localStorage.getItem("VB:Profile")).toBe(null);
});

test("should set the data-theme attribute when theme is changed", () => {
  store = themeStore({ themes: ["light", "dark"] });

  expect(document.documentElement.dataset.theme).toBeUndefined();

  store.theme = "light";

  expect(document.documentElement.dataset.theme).toBe("light");
});

test("should set the data-mode attribute when mode is changed", () => {
  store = themeStore({ modes: ["auto", "light", "dark"] });

  expect(document.documentElement.dataset.mode).toBeUndefined();

  store.mode = "dark";

  expect(document.documentElement.dataset.mode).toBe("dark");
});

test("should persist theme in local storage", () => {
  store = themeStore({ themes: ["light", "dark"] });
  store.theme = "light";
  const result = JSON.parse(localStorage.getItem("VB:Profile"));
  expect(result).toStrictEqual({ theme: "light" });
});

test("should persist mode in local storage", () => {
  store = themeStore({ modes: ["auto", "light", "dark"] });
  store.mode = "dark";
  const result = JSON.parse(localStorage.getItem("VB:Profile"));
  expect(result).toStrictEqual({ mode: "dark" });
});

test("should read stored theme on initialization", () => {
  localStorage.setItem("VB:Profile", JSON.stringify({ theme: "dark" }));
  store = themeStore({ themes: ["light", "dark"] });
  expect(store.theme).toBe("dark");
});

test("should read stored mode on initialization", () => {
  localStorage.setItem("VB:Profile", JSON.stringify({ mode: "light" }));
  store = themeStore({ modes: ["auto", "light", "dark"] });
  expect(store.mode).toBe("light");
});

test("should run onInit callback on initialization", () => {
  const onInitFunc = vi.fn();
  store = themeStore({ onInit: onInitFunc });
  expect(onInitFunc).toHaveBeenCalledOnce();
  expect(onInitFunc).toHaveBeenCalledWith(store);
});

test("should run onChange callback when theme changes", () => {
  const onChangeFunc = vi.fn();
  store = themeStore({
    themes: ["light", "dark"],
    onChange: onChangeFunc
  });
  expect(onChangeFunc).not.toHaveBeenCalled();
  store.theme = "dark";
  expect(onChangeFunc).toHaveBeenCalledOnce();
});

test("should run onChange callback when mode changes", () => {
  const onChangeFunc = vi.fn();
  store = themeStore({
    modes: ["auto", "light", "dark"],
    onChange: onChangeFunc
  });
  expect(onChangeFunc).not.toHaveBeenCalled();
  store.mode = "dark";
  expect(onChangeFunc).toHaveBeenCalledOnce();
});

test("should not run onChange when setting the same value", () => {
  const onChangeFunc = vi.fn();
  store = themeStore({
    themes: ["light", "dark"],
    onChange: onChangeFunc
  });
  store.theme = "dark";
  store.theme = "dark";
  expect(onChangeFunc).toHaveBeenCalledTimes(1);
});

test("should update the config object when options are passed", () => {
  store = themeStore({
    storeKey: "SN:Key",
    themes: ["light", "dark"]
  });
  expect(store.config.storeKey).toBe("SN:Key");
  store.theme = "light";
  const result = JSON.parse(localStorage.getItem("SN:Key"));
  expect(result).toStrictEqual({ theme: "light" });
});

test("should log a console error for an invalid theme value", () => {
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});
  store = themeStore({ themes: ["light", "dark"] });
  store.theme = "asdf";
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    'Not a valid theme value: "asdf"'
  );
  consoleErrorSpy.mockRestore();
});

test("should log a console error for an invalid mode value", () => {
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});
  store = themeStore({ modes: ["auto", "light", "dark"] });
  store.mode = "asdf";
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    'Not a valid mode value: "asdf"'
  );
  consoleErrorSpy.mockRestore();
});

test("should support both theme and mode simultaneously", () => {
  store = themeStore({
    modes: ["auto", "light", "dark"],
    themes: ["default", "forest", "ocean"]
  });
  store.mode = "dark";
  store.theme = "forest";
  expect(document.documentElement.dataset.mode).toBe("dark");
  expect(document.documentElement.dataset.theme).toBe("forest");
});
