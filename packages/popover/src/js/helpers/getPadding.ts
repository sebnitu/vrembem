export type PaddingObject = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export function getPadding(
  value: string | number
): PaddingObject | number | undefined {
  // Initialize the padding var
  let padding: PaddingObject | number | undefined;

  // Split the value by spaces if it's a string and convert it into an array of numbers
  const array = (
    typeof value === "string"
      ? value
          .trim()
          .split(" ")
          .map((str) => parseFloat(str))
          .filter((num) => !isNaN(num))
      : [value]
  ) as number[];

  // Convert individual values to integers
  for (let index = 0; index < array.length; index++) {
    array[index] = Number(array[index]);
  }

  // Build the padding object based on the number of values passed
  switch (array.length) {
    case 1:
      padding = array[0];
      break;
    case 2:
      padding = {
        top: array[0],
        right: array[1],
        bottom: array[0],
        left: array[1]
      };
      break;
    case 3:
      padding = {
        top: array[0],
        right: array[1],
        bottom: array[2],
        left: array[1]
      };
      break;
    case 4:
      padding = {
        top: array[0],
        right: array[1],
        bottom: array[2],
        left: array[3]
      };
      break;
    default:
      padding = undefined;
      break;
  }

  return padding;
}
