const validStates = ["opened", "opening", "closed", "closing", "indeterminate"];
const validMode = ["inline", "modal"];

export function validate(prop: string, value: any) {
  if (prop === "state") {
    if (!validStates.includes(value)) {
      throw new Error(`Not a valid drawer state: "${value}"`);
    } else {
      return true;
    }
  }

  if (prop === "mode") {
    if (!validMode.includes(value)) {
      throw new Error(`Not a valid drawer mode: "${value}"`);
    } else {
      return true;
    }
  }
}
