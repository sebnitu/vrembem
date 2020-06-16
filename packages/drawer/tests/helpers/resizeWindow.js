export const resizeWindow = (value) => {
  window.innerWidth = value;
  window.dispatchEvent(new Event('resize'));
};
