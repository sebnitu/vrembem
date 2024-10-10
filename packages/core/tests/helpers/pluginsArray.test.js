import { expect } from "vitest";
import { pluginsArray } from "../../src/js/helpers/pluginsArray";

const plugins = new pluginsArray({});

console.error = vi.fn();

test("should add a plugin to the plugins array", () => {
  expect(plugins.length).toBe(0);
  plugins.add({ name: "asdf" });
  expect(plugins.length).toBe(1);
});

test("should remove a plugin from the plugins array", async () => {
  expect(plugins.length).toBe(1);
  await plugins.remove("asdf");
  expect(plugins.length).toBe(0);
});

test("should add an array of plugins at once", () => {
  expect(plugins.length).toBe(0);
  plugins.add([
    { name: "one", settings: { a: "a" } },
    { name: "two", settings: { b: "b" } }
  ]);
  expect(plugins.length).toBe(2);
});

test("should return a specific plugin when using the get method", () => {
  expect(plugins.get("one")).toStrictEqual({ name: "one", settings: { a: "a" } });
  expect(plugins.get("two")).toStrictEqual({ name: "two", settings: { b: "b" } });
  expect(plugins.get("three")).toBe(undefined);
});

test("should log a console error if the plugin is not a valid object", () => {
  plugins.add("asdf");
  expect(console.error).toBeCalledWith("Plugin is not a valid object!");
});

test("should log a console error if the plugin is missing a name property", () => {
  plugins.add({});
  expect(console.error).toBeCalledWith("Plugin requires a name!");
});

test("should log a console error if the plugin name is already used", () => {
  plugins.add({ name: "asdf" });
  plugins.add({ name: "asdf" });
  expect(console.error).toBeCalledWith("Plugin with the name \"asdf\" is already being used!");
});
