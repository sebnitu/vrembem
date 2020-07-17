export const delay = (time = 0) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
};
