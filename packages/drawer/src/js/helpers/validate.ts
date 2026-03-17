const validMode = ["inline", "modal"];
const validStates = ["opened", "opening", "closed", "closing", "indeterminate"];
const validInlineStates = ["opened", "closed", "indeterminate"];

export function validate(prop: string, value: any) {
  if (prop === "mode") {
    if (!validMode.includes(value)) {
      throw new Error(`Not a valid drawer mode: "${value}"`);
    } else {
      return true;
    }
  }

  if (prop === "state") {
    if (!validStates.includes(value)) {
      throw new Error(`Not a valid drawer state: "${value}"`);
    } else {
      return true;
    }
  }

  if (prop === "inlineState") {
    if (!validInlineStates.includes(value)) {
      throw new Error(`Not a valid drawer inline state: "${value}"`);
    } else {
      return true;
    }
  }
}
