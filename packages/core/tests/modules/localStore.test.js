import { localStore } from "../../src/js/modules";

let result;

test("should setup a poxy that updates local storage on set", () => {
  const store = localStore("asdf");

  result = localStorage.getItem("asdf");
  expect(result).toBe(null);

  store.set("asdf", "fdsa");

  result = localStorage.getItem("asdf");
  expect(JSON.parse(result)["asdf"]).toBe("fdsa");
});

test("should restore the state of an existing local storage object", () => {
  const store = localStore("asdf");
  expect(store.get("asdf")).toBe("fdsa");
});

test("should return the store object when get is not provided a param", () => {
  const store = localStore("asdf");
  expect(store.get()).toEqual({ asdf: "fdsa" });
});

test("should disable saving local storage if enable param is set to false", () => {
  const store = localStore("asdf", false);

  result = localStorage.getItem("asdf");
  expect(JSON.parse(result)["asdf"]).toEqual("fdsa");

  store.set("fdsa", "asdf");

  result = localStorage.getItem("asdf");
  expect(JSON.parse(result)["fdsa"]).toBe(undefined);

  store.set("asdf");

  result = localStorage.getItem("asdf");
  expect(JSON.parse(result)["asdf"]).toEqual("fdsa");
});

test("should remove property from local storage when value is set to undefined", () => {
  const store = localStore("asdf");
  store.set("asdf");

  result = localStorage.getItem("asdf");
  expect(JSON.parse(result)["asdf"]).toBe(undefined);
});
