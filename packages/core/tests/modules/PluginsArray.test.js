import { PluginsArray } from "../../src/js/modules";

console.error = vi.fn();

const plugins = new PluginsArray({
  module: "Example"
});

describe("pluginsArray", () => {
  it("should add a plugin to the plugins array", () => {
    expect(plugins.length).toBe(0);
    plugins.add({ name: "asdf" });
    expect(plugins.length).toBe(1);
  });

  it("should override existing plugins when added with the same name", () => {
    expect(plugins.length).toBe(1);
    plugins.add({ name: "fdsa" });
    expect(plugins.length).toBe(2);
    plugins.add({ name: "fdsa" });
    expect(plugins.length).toBe(2);
  });
  
  it("should remove a plugin from the plugins array", async () => {
    expect(plugins.length).toBe(2);
    plugins.remove("asdf");
    expect(plugins.length).toBe(1);
    plugins.remove("fdsa");
    expect(plugins.length).toBe(0);
  });
  
  it("should add an array of plugins at once", () => {
    expect(plugins.length).toBe(0);
    plugins.add([
      { name: "one", options: { a: "a" } },
      { name: "two", options: { b: "b" } }
    ]);
    expect(plugins.length).toBe(2);
  });
  
  it("should return a specific plugin when using the get method", () => {
    const pluginOne = plugins.get("one");
    expect(pluginOne.settings).toStrictEqual({ a: "a" });

    const pluginTwo = plugins.get("two");
    expect(pluginTwo.settings).toStrictEqual({ b: "b" });

    expect(plugins.get("three")).toBe(undefined);
  });
  
  it("should log a console error if the plugin is missing a name property", () => {
    plugins.add({});
    expect(console.error).toBeCalledWith("Plugin requires a name!");
  });
});
