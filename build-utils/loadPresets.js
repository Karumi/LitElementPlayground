import webpackMerge from 'webpack-merge';
/*global require */
const loadPresets = (env = { presets: [] }) => {
  const presets = env.presets || [];

  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map(presetName => {
    return require(`./presets/webpack.${presetName}`)(env);
  });

  return webpackMerge({}, ...mergedConfigs);
};

export default loadPresets;
