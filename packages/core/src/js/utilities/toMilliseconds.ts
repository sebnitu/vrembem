export function toMilliseconds(value: string | number): number {
  // Return the value directly if it's a number
  if (typeof value === "number") {
    return value;
  }

  const parsed = parseFloat(value);

  // Check if parsed value is a valid number
  if (!Number.isNaN(parsed)) {
    const isMilliseconds = value.includes("ms");
    return parsed * (isMilliseconds ? 1 : 1000);
  }

  // Throw an error if the value could not be converted
  throw new Error(`Could not convert value to milliseconds: ${value}`);
}
