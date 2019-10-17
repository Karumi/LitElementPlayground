const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'electron') {
      args.width = 1280;
      args.height = 1024;

      return args;
    }
  });
};
