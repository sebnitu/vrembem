import defaults from '../../src/defaults';

export const throttleDelay = (time = defaults.throttleDelay) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};
