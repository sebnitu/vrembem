import { PluginArray } from "../../src/js/modules";

console.error = vi.fn();

const plugins = new PluginArray({
  module: "Example"
});

describe("PluginArray", () => {
  it("should add a plugin to the plugins array", () => {
    expect(plugins.length).toBe(0);
    plugins.add({ name: "asdf" });
    expect(plugins.length).toBe(1);
  });

  it("should override existing plugins when added with the same name", async () => {
    expect(plugins.length).toBe(1);
    await plugins.add({ name: "fdsa" });
    expect(plugins.length).toBe(2);
    await plugins.add({ name: "fdsa" });
    expect(plugins.length).toBe(2);
  });

  it("should remove a plugin from the plugins array", async () => {
    expect(plugins.length).toBe(2);
    await plugins.remove("asdf");
    expect(plugins.length).toBe(1);
    await plugins.remove("fdsa");
    expect(plugins.length).toBe(0);
  });

  it("should return a specific plugin when using the get method", async () => {
    await plugins.add({ name: "one", options: { a: "a" } });
    await plugins.add({ name: "two", options: { b: "b" } });

    const pluginOne = plugins.get("one");
    expect(pluginOne.config).toStrictEqual({ a: "a" });

    const pluginTwo = plugins.get("two");
    expect(pluginTwo.config).toStrictEqual({ b: "b" });

    expect(plugins.get("three")).toBe(null);
  });

  it("should log a console error if the plugin is missing a name property", () => {
    plugins.add({});
    expect(console.error).toBeCalledWith("Plugin requires a name!");
  });
});
