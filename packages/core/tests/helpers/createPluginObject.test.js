import { createPluginObject } from "../../index";

console.error = vi.fn();

const props = {
  name: "example",
  settings: {
    value: true,
    string: "asdf"
  }
};

const methods = {
  beforeMount() {},
  beforeUnmount() {}
};

test("should create and return a plugin object", () => {
  const plugin = createPluginObject(props, methods);
  expect(plugin.name).toBe("example");
  expect(typeof plugin.beforeMount).toBe("function");
  expect(typeof plugin.beforeUnmount).toBe("function");
  expect(plugin.settings.string).toBe("asdf");
  expect(plugin.settings.value).toBe(true);
});

test("should be able to pass lifecycle hooks and name through settings", () => {
  const settings = {
    name: "newExample",
    onRegisterEntry() {}
  };
  props.settings = {...props.settings, ...settings};
  const plugin = createPluginObject(props, methods);
  expect(plugin.name).toBe("newExample");
  expect(typeof plugin.onRegisterEntry).toBe("function");
});

test("should allow overriding lifecycle hooks that have already been defined if override is set to true", () => {
  const settings = {
    override: true,
    onMount() {}
  };
  props.settings = {...props.settings, ...settings};
  createPluginObject(props, methods);
  expect(console.error).not.toHaveBeenCalled();
});

test("should log console error if setting a lifecycle hook that has already been defined", () => {
  const settings = {
    override: false,
    beforeMount() {}
  };
  props.settings = {...props.settings, ...settings};
  createPluginObject(props, methods);
  expect(console.error).toBeCalledWith("newExample plugin already has \"beforeMount\" lifecycle hook defined!");
});
