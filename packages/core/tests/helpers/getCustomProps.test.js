import { getCustomProps, getSetting } from "../../index";

document.body.innerHTML = "<div id='asdf'>asdf</div>";
document.body.style.setProperty("--vb-prefix", "vb-");
document.getElementById("asdf").style.setProperty("--vb-asdf-background", "pink");
document.getElementById("asdf").style.setProperty("--vb-asdf-foreground", "green");

const mockEntry = {
  el: document.getElementById("asdf"),
  settings: {
    customProps: ["background", "foreground"],
  },
  parent: { 
    module: "asdf",
    settings: {
      background: "black",
      foreground: "white"
    }
  },
  getSetting(key) {
    return getSetting.call(this, key);
  }
};

test("should build a config object with the provided custom properties", () => {
  const obj = getCustomProps(mockEntry);
  expect(obj.background).toBe("pink");
  expect(obj.foreground).toBe("green");
});
