import type { PopoverEntry } from "../PopoverEntry";

export function getDelay(popover: PopoverEntry, index: number): number {
  // Get the initial toggle delay value from config
  let value = popover.config.get("toggleDelay");

  // Check if value is a string
  if (typeof value == "string") {
    // Convert string to an array if value contains a comma and/or space
    const parts = value.split(/[\s,]+/).filter(Boolean);
    value = parts.length > 1 ? parts : parts[0];
  }

  // Check if value is an array and get the index
  if (Array.isArray(value)) {
    value = value[index];
  }

  // Convert the value to a number if possible
  const number = Number(value);

  // Check if the number is in fact a number
  if (!Number.isNaN(number)) {
    return number;
  } else {
    throw new Error(`Provided delay value is not a number: "${value}"`);
  }
}
