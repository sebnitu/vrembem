export const checkMatch = (query) => {
  let value = query.match(/\d+/)[0];
  let match = window.innerWidth > value;
  return match;
};
