import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';

export default () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [loader, 'css-loader']
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
});
