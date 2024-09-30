import { getCustomProps, toCamel, toKebab } from "../index";

document.body.innerHTML = `
  <div id="asdf">asdf</div>
`;
document.body.style.setProperty("--vb-prefix", "vb-");
document.getElementById("asdf").style.setProperty("--vb-asdf-background", "pink");
document.getElementById("asdf").style.setProperty("--vb-asdf-foreground", "green");

const mockEntry = {
  el: document.getElementById("asdf"),
  settings: {
    customProps: ["background", "foreground"],
  },
  context: { 
    module: "asdf",
    settings: {
      background: "black",
      foreground: "white"
    }
  },
  getSetting(key) {
    // Store our key in both camel and kebab naming conventions.
    const camel = toCamel(key);
    const kebab = toKebab(key);

    // Check the data config object.
    if ("dataConfig" in this && camel in this.dataConfig) {
      return this.dataConfig[camel];
    }

    // Check the custom properties object.
    if ("customProps" in this && kebab in this.customProps) {
      return this.customProps[kebab];
    }

    // Check the entry settings.
    if ("settings" in this && camel in this.settings) {
      return this.settings[camel];
    }

    // Check the context settings.
    if ("settings" in this.context && camel in this.context.settings) {
      return this.context.settings[camel];
    }

    // Throw error if setting does not exist.
    throw(new Error(`${this.context.module} setting does not exist: ${key}`));
  }
};

test("should build a config object with the provided custom properties", () => {
  const obj = getCustomProps(mockEntry);
  expect(obj.background).toBe("pink");
  expect(obj.foreground).toBe("green");
});
