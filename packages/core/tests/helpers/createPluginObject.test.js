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
  onMount() {},
  onUnmount() {}
};

test("should create and return a plugin object", () => {
  const plugin = createPluginObject(props, methods);
  expect(plugin.name).toBe("example");
  expect(typeof plugin.onMount).toBe("function");
  expect(typeof plugin.onUnmount).toBe("function");
  expect(plugin.settings.string).toBe("asdf");
  expect(plugin.settings.value).toBe(true);
});

test("should be able to pass lifecycle hooks and name through settings", () => {
  const settings = {
    name: "newExample",
    beforeRegister() {}
  };
  props.settings = {...props.settings, ...settings};
  const plugin = createPluginObject(props, methods);
  expect(plugin.name).toBe("newExample");
  expect(typeof plugin.beforeRegister).toBe("function");
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
    onUnmount() {}
  };
  props.settings = {...props.settings, ...settings};
  createPluginObject(props, methods);
  expect(console.error).toBeCalledWith("newExample plugin already has \"onUnmount\" lifecycle hook defined!");
});
