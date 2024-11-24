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
  
  it("should remove a plugin from the plugins array", async () => {
    expect(plugins.length).toBe(1);
    await plugins.remove("asdf");
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

// console.error = vi.fn();

// const obj = {
//   name: "example",
//   options: {
//     value: true,
//     string: "asdf"
//   },
//   beforeMount() {},
//   beforeUnmount() {}
// };

// describe("setupPluginObject", () => {
//   it("should create and return a plugin object", () => {
//     const plugin = setupPluginObject(obj);
//     expect(plugin.name).toBe("example");
//     expect(typeof plugin.beforeMount).toBe("function");
//     expect(typeof plugin.beforeUnmount).toBe("function");
//     expect(plugin.settings.string).toBe("asdf");
//     expect(plugin.settings.value).toBe(true);
//   });
  
//   it("should be able to pass lifecycle hooks and name through settings", () => {
//     obj.options = {
//       name: "newExample",
//       onRegisterEntry() {}
//     };
//     const plugin = setupPluginObject(obj);
//     expect(plugin.name).toBe("newExample");
//     expect(typeof plugin.onRegisterEntry).toBe("function");
//   });
  
//   it("should allow overriding lifecycle hooks that have already been defined if override is set to true", () => {
//     obj.options = {
//       override: true,
//       onMount() {}
//     };
//     setupPluginObject(obj);
//     expect(console.error).not.toHaveBeenCalled();
//   });
  
//   it("should log console error if setting a lifecycle hook that has already been defined", () => {
//     obj.options = {
//       override: false,
//       beforeMount() {}
//     };
//     setupPluginObject(obj);
//     expect(console.error).toBeCalledWith("newExample plugin already has \"beforeMount\" lifecycle hook defined!");
//   });  
// });
