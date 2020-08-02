import { delay } from './delay';

export const transitionStart = async (el) => {
  el.dispatchEvent(new Event('transitionend'));
  await delay();
  return el;
};

export const transitionEnd = async (el) => {
  await delay();
  el.dispatchEvent(new Event('transitionend'));
  return el;
};

export const transition = async (el) => {
  await delay();
  el.dispatchEvent(new Event('transitionend'));
  await delay();
  return el;
};