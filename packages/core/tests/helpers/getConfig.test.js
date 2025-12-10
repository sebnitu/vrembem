import { getConfig } from "../../src/js/helpers/getConfig";

const dataConfig = {
  dataConfig: {
    someConfig: "asdf"
  }
};

const customProps = {
  customProps: {
    "some-config": "fdsa"
  }
};

const config = {
  config: {
    someConfig: "1234"
  }
};

const parentconfig = {
  parent: {
    module: "MyModule",
    config: {
      someConfig: "parent-123"
    }
  }
};

test("should return a config value from config", () => {
  const mockData = config;
  const result = getConfig.call(mockData, "someConfig");
  expect(result).toBe("1234");
});

test("should return a config value from parent config", () => {
  const mockData = parentconfig;
  const result = getConfig.call(mockData, "someConfig");
  expect(result).toBe("parent-123");
});

test("should return a config value from dataConfig", () => {
  const mockData = dataConfig;
  const result = getConfig.call(mockData, "someConfig");
  expect(result).toBe("asdf");
});

test("should return a config value from customProps", () => {
  const mockData = customProps;
  const result = getConfig.call(mockData, "someConfig");
  expect(result).toBe("fdsa");
});

test("should prioritize config over parent config", () => {
  const mockData = { ...config, ...parentconfig };
  const result = getConfig.call(mockData, "someConfig");
  expect(result).toBe("1234");
});

test("should prioritize customProps over config", () => {
  const mockData = { ...customProps, ...config, ...parentconfig };
  const result = getConfig.call(mockData, "someConfig");
  expect(result).toBe("fdsa");
});

test("should prioritize dataConfig over customProps", () => {
  const mockData = {
    ...dataConfig,
    ...customProps,
    ...config,
    ...parentconfig
  };
  const result = getConfig.call(mockData, "someConfig");
  expect(result).toBe("asdf");
});

test("should throw an error if a config doesn't exist anywhere", () => {
  const mockData = {
    ...dataConfig,
    ...customProps,
    ...config,
    ...parentconfig
  };
  expect(() => getConfig.call(mockData, "asdf")).toThrow(
    "MyModule config does not exist: asdf"
  );
});

test("should be able to provide a fallback if a config isn't found", () => {
  const mockData = {
    ...dataConfig,
    ...customProps,
    ...config,
    ...parentconfig
  };
  const result = getConfig.call(mockData, "color", {
    fallback: "blue"
  });
  expect(result).toBe("blue");
});

test("should be able to change the properties and the order they are checked", () => {
  const mockData = {
    ...dataConfig,
    ...customProps,
    ...config,
    ...parentconfig
  };
  const result = getConfig.call(mockData, "someConfig", {
    props: ["customProps", "config"]
  });
  expect(result).toBe("fdsa");
});
