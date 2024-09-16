import { delay } from "./delay";

export const transition = async (el) => {
  await delay();
  el.dispatchEvent(new Event("transitionend"));
  await delay();
  return el;
};