import { createPluginObject } from "../../index";

console.error = vi.fn();

const obj = {
  name: "example",
  config: {
    value: true,
    string: "asdf"
  },
  beforeMount() {},
  beforeUnmount() {}
};

describe("createPluginObject", () => {
  it("should create and return a plugin object", () => {
    const plugin = createPluginObject(obj);
    expect(plugin.name).toBe("example");
    expect(typeof plugin.beforeMount).toBe("function");
    expect(typeof plugin.beforeUnmount).toBe("function");
    expect(plugin.settings.string).toBe("asdf");
    expect(plugin.settings.value).toBe(true);
  });
  
  it("should be able to pass lifecycle hooks and name through settings", () => {
    obj.config = {
      name: "newExample",
      onRegisterEntry() {}
    };
    const plugin = createPluginObject(obj);
    expect(plugin.name).toBe("newExample");
    expect(typeof plugin.onRegisterEntry).toBe("function");
  });
  
  it("should allow overriding lifecycle hooks that have already been defined if override is set to true", () => {
    obj.config = {
      override: true,
      onMount() {}
    };
    createPluginObject(obj);
    expect(console.error).not.toHaveBeenCalled();
  });
  
  it("should log console error if setting a lifecycle hook that has already been defined", () => {
    obj.config = {
      override: false,
      beforeMount() {}
    };
    createPluginObject(obj);
    expect(console.error).toBeCalledWith("newExample plugin already has \"beforeMount\" lifecycle hook defined!");
  });  
});
