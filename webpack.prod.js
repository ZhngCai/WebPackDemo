const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");//清理dist

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let prodConfig = {
  mode:'production',
  output:{
    filename:'js/index.[hash].js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
        // {
        //     test:/\.(sc|c|sa)ss$/,
        //     use: [
        //         MiniCssExtractPlugin.loader,
        //         {
        //             loader:'css-loader',
        //             options:{
        //                 sourceMap:true
        //             }
        //         },
        //         'postcss-loader'
        //         // {
        //         //     loader: 'postcss-loader',
        //         //     options: {
        //         //       ident: 'postcss',
        //         //       sourceMap:true,
        //         //       plugins: (loader) => [
        //         //         require('autoprefixer')({ browsers: ['> 0.15% in CN'] })
        //         //       ]
        //         //     }
        //         // }
        //         ,
        //         {
        //             loader: 'sass-loader',
        //             options:{
        //                 sourceMap:true
        //             }
        //         }
               
        //     ]
        // }
      ]
  },
  // 单独提取css文件
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/[name][hash].css',
      chunkFilename:'css/[id][hash].css'
    }),
  ],
  // 压缩
  optimization:{
    minimizer : [
      // 压缩css插件
      new OptimizeCssAssetsPlugin({}),
      // 压缩js插件
      // new UglifyJsPlugin({ // 压缩JS
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true
      // }),
    ]
  }
}


module.exports = merge(common,prodConfig);