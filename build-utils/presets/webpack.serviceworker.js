import { InjectManifest } from 'workbox-webpack-plugin';

export default () => ({
  plugins: [
    new InjectManifest({
      swSrc: './src/sw.js'
    })
  ]
});
