const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')

let devConfig = {
  mode: 'development',
  output:{
    filename:'index.js',
    path: path.resolve(__dirname,'dist')
  },
  devtool: 'inline-source-map',
  module:{
    rules:[
      
    ],
  },
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    // host: '0.0.0.0',
    port: 8080,
    inline: true,
    progress: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    open:true,
    overlay: {
      warnings: true,
      errors: true
    }
    // proxy: {
    //   '/api': {
    //     target: 'https://www.qk365.com/qkkx',
    //     changeOrigin: true,
    //     pathRewrite: {'^/api' : ''}
    //   }
    // }
  },plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
}

module.exports = merge(common,devConfig);