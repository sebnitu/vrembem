import { getCustomProps } from "../index";

document.body.innerHTML = `
  <div id="asdf">asdf</div>
`;
document.body.style.setProperty("--vb-prefix", "vb-");
document.getElementById("asdf").style.setProperty("--vb-asdf-background", "pink");
document.getElementById("asdf").style.setProperty("--vb-asdf-foreground", "green");

test("should build a config object with the provided custom properties", () => {
  const el = document.getElementById("asdf");
  const array = ["background", "foreground"];
  const obj = getCustomProps(el, "asdf", array);
  expect(obj.background).toBe("pink");
  expect(obj.foreground).toBe("green");
});
