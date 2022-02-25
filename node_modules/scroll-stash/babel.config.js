module.exports = (api) => {
  const config = {};

  if (api.env('test')) {
    config.presets = [
      ['@babel/preset-env', {
        targets: { node: 'current' }
      }]
    ];
  }

  return config;
};
