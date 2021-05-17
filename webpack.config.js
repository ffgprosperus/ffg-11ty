const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs'); 
const os = require('os');

var out_path = path.resolve(__dirname, 'build/assets')
if (!fs.existsSync(out_path)) {
    out_path = path.resolve(os.homedir(), 'prosperusdemo.xyz/build/assets')
}

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: out_path,
    filename: 'main.js'
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: 'url-loader',
        type: 'asset/resource',
      },
    ]
  }
};
