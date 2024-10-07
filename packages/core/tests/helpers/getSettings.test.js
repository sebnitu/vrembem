import { getSetting } from "../../src/js/helpers/getSetting";

const dataConfig = {
  dataConfig: {
    someSetting: "asdf"
  }
};

const customProps = {
  customProps: {
    "some-setting": "fdsa"
  }
};

const settings = {
  settings: {
    someSetting: "1234"
  }
};

const parentSettings = {
  parent: {
    module: "MyModule",
    settings: {
      someSetting: "parent-123"
    }
  }
};

test("should return a settings value from settings", () => {
  const mockData = settings;
  const result = getSetting.call(mockData, "someSetting");
  expect(result).toBe("1234");
});

test("should return a settings value from parent settings", () => {
  const mockData = parentSettings;
  const result = getSetting.call(mockData, "someSetting");
  expect(result).toBe("parent-123");
});

test("should return a settings value from dataConfig", () => {
  const mockData = dataConfig;
  const result = getSetting.call(mockData, "someSetting");
  expect(result).toBe("asdf");
});

test("should return a settings value from customProps", () => {
  const mockData = customProps;
  const result = getSetting.call(mockData, "someSetting");
  expect(result).toBe("fdsa");
});

test("should prioritize settings over parent settings", () => {
  const mockData = { ...settings, ...parentSettings };
  const result = getSetting.call(mockData, "someSetting");
  expect(result).toBe("1234");
});

test("should prioritize customProps over settings", () => {
  const mockData = { ...customProps, ...settings, ...parentSettings };
  const result = getSetting.call(mockData, "someSetting");
  expect(result).toBe("fdsa");
});

test("should prioritize dataConfig over customProps", () => {
  const mockData = {
    ...dataConfig, 
    ...customProps, 
    ...settings, 
    ...parentSettings
  };
  const result = getSetting.call(mockData, "someSetting");
  expect(result).toBe("asdf");
});

test("should throw an error if a setting doesn't exist anywhere", () => {
  const mockData = {
    ...dataConfig, 
    ...customProps, 
    ...settings, 
    ...parentSettings
  };
  expect(() => getSetting.call(mockData, "asdf")).toThrow("MyModule setting does not exist: asdf");
});

test("should be able to provide a fallback if a setting isn't found", () => {
  const mockData = {
    ...dataConfig, 
    ...customProps, 
    ...settings, 
    ...parentSettings
  };
  const result = getSetting.call(mockData, "color", {
    fallback: "blue"
  });
  expect(result).toBe("blue");
});

test("should be able to change the properties and the order they are checked", () => {
  const mockData = {
    ...dataConfig, 
    ...customProps, 
    ...settings, 
    ...parentSettings
  };
  const result = getSetting.call(mockData, "someSetting", {
    props: ["customProps", "settings"]
  });
  expect(result).toBe("fdsa");
});
