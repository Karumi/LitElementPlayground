import CopyWebpackPlugin from 'copy-webpack-plugin';

export default () => ({
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
    new CopyWebpackPlugin(['src/sw.js'])
  ],
  devtool: 'source-map'
});
