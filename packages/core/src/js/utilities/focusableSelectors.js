// This has been copied over from focusable-selectors package and modified.
// https://github.com/KittyGiraudel/focusable-selectors
const notInert = ":not([inert])"; // Previously `:not([inert]):not([inert] *)`
const notNegTabIndex = ':not([tabindex^="-"])';
const notDisabled = ":not(:disabled)";

export const focusableSelectors = [
  `a[href]${notInert}${notNegTabIndex}`,
  `area[href]${notInert}${notNegTabIndex}`,
  `input:not([type="hidden"]):not([type="radio"])${notInert}${notNegTabIndex}${notDisabled}`,
  `input[type="radio"]${notInert}${notNegTabIndex}${notDisabled}`,
  `select${notInert}${notNegTabIndex}${notDisabled}`,
  `textarea${notInert}${notNegTabIndex}${notDisabled}`,
  `button${notInert}${notNegTabIndex}${notDisabled}`,
  `details${notInert} > summary:first-of-type${notNegTabIndex}`,
  `iframe${notInert}${notNegTabIndex}`,
  `audio[controls]${notInert}${notNegTabIndex}`,
  `video[controls]${notInert}${notNegTabIndex}`,
  `[contenteditable]${notInert}${notNegTabIndex}`,
  `[tabindex]${notInert}${notNegTabIndex}`
];
