const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // Copy empty ServiceWorker so install doesn't blow up
    new CopyWebpackPlugin(['src/sw.js']),
    new webpack.DefinePlugin({      
      'process.env.API_URL': JSON.stringify('http://localhost:1337')
    })
  ],
  devtool: 'source-map'
});
