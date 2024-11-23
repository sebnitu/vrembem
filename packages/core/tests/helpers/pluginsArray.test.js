import { pluginsArray } from "../../src/js/helpers/pluginsArray";

console.error = vi.fn();

const plugins = new pluginsArray({
  module: "Example"
});

describe("pluginsArray", () => {
  it("should add a plugin to the plugins array", () => {
    expect(plugins.length).toBe(0);
    plugins.add({ name: "asdf" });
    expect(plugins.length).toBe(1);
  });
  
  it("should remove a plugin from the plugins array", async () => {
    expect(plugins.length).toBe(1);
    await plugins.remove("asdf");
    expect(plugins.length).toBe(0);
  });
  
  it("should add an array of plugins at once", () => {
    expect(plugins.length).toBe(0);
    plugins.add([
      { name: "one", config: { a: "a" } },
      { name: "two", config: { b: "b" } }
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
  
  it("should log a console error if the plugin name is already used", () => {
    plugins.add({ name: "asdf" });
    plugins.add({ name: "asdf" });
    expect(console.error).toBeCalledWith("Plugin with the name \"asdf\" is already being used!");
  });  
});
