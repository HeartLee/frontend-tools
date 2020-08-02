let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HelloWorldPlugin = require('./src/plugins/hello');
let webpack = require('webpack');

const isBuild = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:64].js',
    path: path.resolve('dist')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader', {
        loader: path.resolve('src/loader/style-loader.js')
      }],
      include: /src/,
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
        loader: path.resolve('src/loader/scope-css-loader.js')
      }],
      exclude: /node_modules/
    }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {   // 抽离第三方插件
          test: /node_modules/,   // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor',  // 打包后的文件名，任意命名    
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
          chunks: 'initial',
          name: 'utils',  // 任意命名
          minSize: 0    // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: isBuild ? '[name].[hash].css' : 'static/[name].css',
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HelloWorldPlugin({ test: true })
  ],
  devServer: {
    contentBase: './dist',
    host: '127.0.0.1',
    port: 3000
  },
  mode: 'development'
}