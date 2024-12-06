export function getDelay(popover, index) {
  // Get the initial toggle delay value from settings.
  let value = popover.getSetting("toggle-delay");

  // Check if value is a string.
  if (typeof value == "string") {
    // Convert it to an array if value contains a comma.
    if (value.indexOf(",") > -1) {
      value = value.split(",");
    }
    // Convert it to an array if value contains a space.
    if (value.indexOf(" ") > -1) {
      value = value.split(" ");
    }
  }

  // Check if value is an array and get the index.
  if (Array.isArray(value)) {
    value = value[index];
  }

  // Convert the value to a number if possible.
  const number = Number(value);

  // Check if the number is in fact a number.
  if (!Number.isNaN(number)) {
    return number;
  } else {
    throw new Error(`Provided delay value is not a number: "${value}"`);
  }
}
