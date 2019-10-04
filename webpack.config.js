import { ProgressPlugin } from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackMerge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
/*global require */
const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
import loadPresets from './build-utils/loadPresets';

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: 'vendor',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: 'vendor/bundles',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: 'vendor',
    flatten: true
  }
];

const assets = [
  {
    from: 'src/img',
    to: 'img/'
  },
  'src/manifest.webmanifest'
];

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new ProgressPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }
  }),
  new CopyWebpackPlugin([...polyfills, ...assets], {
    ignore: ['.DS_Store']
  })
];

export default ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      output: {
        filename: '[name].[chunkhash:8].js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-dynamic-import'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    targets: '>1%, not dead, not ie 11'
                  }
                ]
              ]
            }
          }
        ]
      },
      plugins
    },
    modeConfig({ mode, presets }),
    loadPresets({ mode, presets })
  );
};
