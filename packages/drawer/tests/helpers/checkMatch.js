export const checkMatch = (query) => {
  let value = query.match(/\d+/)[0];
  let match = (query.includes('min-width')) ?
    window.innerWidth > value:
    window.innerWidth < value;

  return match;
};
